"use client";

import { useEffect, useRef, useState } from "react";

type Block =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } };
type Msg = { role: "user" | "assistant"; content: string | Block[] | any };

type Attachment = {
  id: string;
  mediaType: string;
  base64: string;
  previewUrl: string;
  name: string;
};

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const EXT_MAP: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

function renderText(content: any): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .filter((b) => b && b.type === "text")
    .map((b) => b.text)
    .join("\n\n");
}

function renderImages(content: any): string[] {
  if (typeof content === "string" || !Array.isArray(content)) return [];
  return content
    .filter((b) => b && b.type === "image" && b.source?.type === "base64")
    .map((b) => `data:${b.source.media_type};base64,${b.source.data}`);
}

async function fileToBase64(file: File): Promise<{ mediaType: string; base64: string }> {
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    bin += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunkSize)) as any
    );
  }
  let mediaType = file.type;
  if (!ALLOWED_TYPES.has(mediaType)) {
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    if (EXT_MAP[ext]) mediaType = EXT_MAP[ext];
  }
  return { mediaType, base64: btoa(bin) };
}

// Robust file extraction from a DragEvent or ClipboardEvent. Walks every
// channel macOS browsers use: dataTransfer.files, dataTransfer.items (getAsFile),
// and (for clipboards) clipboardData.items.
async function extractFiles(
  source: { files?: FileList | null; items?: DataTransferItemList | null }
): Promise<File[]> {
  const out: File[] = [];
  const seen = new Set<string>();
  function pushIfNew(f: File | null | undefined) {
    if (!f) return;
    const key = `${f.name}:${f.size}:${f.type}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(f);
  }
  if (source.files) {
    for (let i = 0; i < source.files.length; i++) pushIfNew(source.files[i]);
  }
  if (source.items) {
    for (let i = 0; i < source.items.length; i++) {
      const item = source.items[i];
      if (!item) continue;
      if (item.kind === "file") {
        pushIfNew(item.getAsFile());
      }
    }
  }
  return out;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [debug, setDebug] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentsRef = useRef<Attachment[]>([]);
  attachmentsRef.current = attachments;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  async function addFiles(files: File[]) {
    setErr("");
    if (files.length === 0) {
      setDebug(`No files in event. ${new Date().toLocaleTimeString()}`);
      setErr("Drop / paste fired but the browser handed us 0 files. Use the 📎 button to upload directly.");
      return;
    }
    const next: Attachment[] = [...attachmentsRef.current];
    let added = 0;
    const skipped: string[] = [];
    for (const file of files) {
      let mediaType = file.type;
      if (!ALLOWED_TYPES.has(mediaType)) {
        const ext = (file.name.split(".").pop() || "").toLowerCase();
        if (EXT_MAP[ext]) mediaType = EXT_MAP[ext];
      }
      if (!ALLOWED_TYPES.has(mediaType)) {
        skipped.push(`${file.name || "file"} (${file.type || "no type"})`);
        continue;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        skipped.push(`${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB, max 3 MB)`);
        continue;
      }
      const { base64 } = await fileToBase64(file);
      next.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        mediaType,
        base64,
        previewUrl: `data:${mediaType};base64,${base64}`,
        name: file.name || "screenshot",
      });
      added++;
    }
    setAttachments(next);
    setDebug(
      `${new Date().toLocaleTimeString()}: received ${files.length} file(s), added ${added}` +
        (skipped.length ? `, skipped ${skipped.join("; ")}` : "")
    );
    if (added === 0 && skipped.length > 0) {
      setErr(`Could not attach: ${skipped.join("; ")}`);
    }
  }

  function removeAttachment(id: string) {
    setAttachments((cur) => cur.filter((a) => a.id !== id));
  }

  // Window-level drag/drop/paste handlers — catches the event regardless of
  // which child element is under the cursor. This is the most reliable path
  // for macOS Chrome/Safari, where drops on inner React elements can be lost.
  useEffect(() => {
    function preventDefault(e: DragEvent) {
      // Always preventDefault on dragover. Without it, the drop event is
      // never fired by the browser. Filtering by type can MISS valid drops.
      e.preventDefault();
      if (e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files")) {
        setDragOver(true);
      }
    }
    function onDragLeave(e: DragEvent) {
      // dragleave fires when crossing into a child. Only clear if we left the window.
      if (!e.relatedTarget) setDragOver(false);
    }
    async function onDrop(e: DragEvent) {
      e.preventDefault();
      setDragOver(false);
      if (!e.dataTransfer) {
        setDebug("Drop event had no dataTransfer.");
        return;
      }
      const types = Array.from(e.dataTransfer.types);
      const files = await extractFiles({
        files: e.dataTransfer.files,
        items: e.dataTransfer.items,
      });
      setDebug(
        `Drop: types=[${types.join(",")}] files=${files.length} ${new Date().toLocaleTimeString()}`
      );
      await addFiles(files);
    }
    async function onPaste(e: ClipboardEvent) {
      if (!e.clipboardData) return;
      const files = await extractFiles({
        files: e.clipboardData.files,
        items: e.clipboardData.items,
      });
      setDebug(`Paste: files=${files.length} ${new Date().toLocaleTimeString()}`);
      if (files.length > 0) {
        e.preventDefault();
        await addFiles(files);
      }
    }
    window.addEventListener("dragover", preventDefault);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    window.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
      window.removeEventListener("paste", onPaste);
    };
  }, []);

  async function send() {
    const text = input.trim();
    if ((!text && attachments.length === 0) || busy) return;
    setErr("");

    let userContent: string | Block[];
    if (attachments.length === 0) {
      userContent = text;
    } else {
      const blocks: Block[] = attachments.map((a) => ({
        type: "image",
        source: { type: "base64", media_type: a.mediaType, data: a.base64 },
      }));
      if (text) blocks.push({ type: "text", text });
      userContent = blocks;
    }

    const next: Msg[] = [...messages, { role: "user", content: userContent }];
    setMessages(next);
    setInput("");
    setAttachments([]);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Chat failed");
      }
      if (Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply || "" }]);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Chat failed");
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  async function onFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const fl = e.target.files;
    if (!fl) return;
    const files = await extractFiles({ files: fl });
    setDebug(`File picker: ${files.length} file(s) ${new Date().toLocaleTimeString()}`);
    await addFiles(files);
    e.target.value = "";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 320px)",
        minHeight: "500px",
        background: "var(--color-bg-card)",
        border: dragOver ? "2px dashed var(--color-amber)" : "1px solid var(--color-divider)",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {dragOver && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(212, 160, 65, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-amber)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontStyle: "italic",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          Drop screenshot anywhere to attach
        </div>
      )}

      {/* Primary attach button — always visible at top of chat */}
      <div
        style={{
          borderBottom: "1px solid var(--color-divider)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          style={{
            padding: "10px 16px",
            background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
            color: "var(--color-bg-deep)",
            border: "none",
            borderRadius: "6px",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: busy ? "wait" : "pointer",
          }}
        >
          📎 Attach Screenshot
        </button>
        <span style={{ color: "var(--color-cream-muted)", fontSize: "0.75rem" }}>
          or drag a screenshot anywhere on this page, or paste with ⌘V
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/*"
          multiple
          style={{ display: "none" }}
          onChange={onFilePicked}
        />
      </div>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "var(--color-cream-muted)", textAlign: "center", marginTop: "60px" }}>
            Type a message below or attach a screenshot to start.
          </p>
        )}
        {messages.map((m, i) => {
          const text = renderText(m.content);
          const imgs = renderImages(m.content);
          if (!text && imgs.length === 0) return null;
          const isUser = m.role === "user";
          return (
            <div
              key={i}
              style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "12px 16px",
                background: isUser ? "rgba(212, 160, 65, 0.12)" : "rgba(245, 239, 230, 0.04)",
                border: "1px solid var(--color-divider)",
                borderRadius: isUser ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                color: "var(--color-cream)",
                fontSize: "0.95rem",
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {imgs.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {imgs.map((src, j) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={j}
                      src={src}
                      alt="attachment"
                      style={{
                        maxWidth: "240px",
                        maxHeight: "200px",
                        borderRadius: "6px",
                        border: "1px solid var(--color-divider)",
                      }}
                    />
                  ))}
                </div>
              )}
              {text && <div>{text}</div>}
            </div>
          );
        })}
        {busy && (
          <p style={{ color: "var(--color-cream-muted)", fontStyle: "italic", fontSize: "0.85rem" }}>
            Working…
          </p>
        )}
      </div>

      {debug && (
        <div
          style={{
            padding: "6px 16px",
            borderTop: "1px solid var(--color-divider)",
            background: "rgba(15, 13, 10, 0.4)",
            color: "var(--color-cream-muted)",
            fontSize: "0.7rem",
            fontFamily: "'SF Mono', Monaco, monospace",
          }}
        >
          {debug}
        </div>
      )}

      {err && (
        <div
          style={{
            padding: "10px 16px",
            background: "rgba(200, 60, 60, 0.12)",
            color: "#f1b4b4",
            fontSize: "0.85rem",
            borderTop: "1px solid var(--color-divider)",
          }}
        >
          {err}
        </div>
      )}

      {attachments.length > 0 && (
        <div
          style={{
            borderTop: "1px solid var(--color-divider)",
            padding: "10px 12px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
            background: "rgba(212, 160, 65, 0.12)",
          }}
        >
          <div
            style={{
              color: "var(--color-amber)",
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginRight: "4px",
            }}
          >
            ✓ {attachments.length} image{attachments.length === 1 ? "" : "s"} attached
          </div>
          {attachments.map((a) => (
            <div
              key={a.id}
              style={{
                position: "relative",
                width: "80px",
                height: "80px",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid var(--color-divider)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.previewUrl}
                alt={a.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => removeAttachment(a.id)}
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(0, 0, 0, 0.7)",
                  color: "var(--color-cream)",
                  fontSize: "0.8rem",
                  lineHeight: 1,
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label="Remove attachment"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          borderTop: "1px solid var(--color-divider)",
          padding: "12px",
          display: "flex",
          gap: "10px",
          alignItems: "stretch",
        }}
      >
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Tell Claude what to change…"
          disabled={busy}
          style={{
            flex: 1,
            padding: "10px 12px",
            background: "rgba(15, 13, 10, 0.6)",
            border: "1px solid var(--color-divider)",
            borderRadius: "8px",
            color: "var(--color-cream)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.95rem",
            outline: "none",
            resize: "vertical",
          }}
        />
        <button
          onClick={send}
          disabled={busy || (!input.trim() && attachments.length === 0)}
          style={{
            padding: "0 22px",
            background:
              busy || (!input.trim() && attachments.length === 0)
                ? "rgba(212, 160, 65, 0.4)"
                : "linear-gradient(135deg, var(--color-amber), #c4922e)",
            color: "var(--color-bg-deep)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "8px",
            cursor:
              busy || (!input.trim() && attachments.length === 0) ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
