"use client";

import { useEffect, useRef, useState } from "react";

type Block =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } };
type Msg = { role: "user" | "assistant"; content: string | Block[] | any };

type Attachment = {
  id: string;
  mediaType: string;
  base64: string; // raw base64, no data: prefix
  previewUrl: string; // data: URL for <img src>
  name: string;
};

// Cap before base64 encoding. Vercel function bodies are ~4.5 MB; base64 expands ~33%,
// so 3 MB raw → ~4 MB encoded + JSON overhead fits comfortably.
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

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
  return { mediaType: file.type, base64: btoa(bin) };
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  async function addFiles(files: FileList | File[]) {
    setErr("");
    const next: Attachment[] = [...attachments];
    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.has(file.type)) {
        setErr(`Unsupported file type: ${file.type || "unknown"} (png/jpg/webp/gif only)`);
        continue;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setErr(`${file.name} is too large (max 5 MB)`);
        continue;
      }
      const { mediaType, base64 } = await fileToBase64(file);
      next.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        mediaType,
        base64,
        previewUrl: `data:${mediaType};base64,${base64}`,
        name: file.name || "screenshot",
      });
    }
    setAttachments(next);
  }

  function removeAttachment(id: string) {
    setAttachments((cur) => cur.filter((a) => a.id !== id));
  }

  async function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const files: File[] = [];
    for (const item of Array.from(e.clipboardData.items)) {
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const f = item.getAsFile();
        if (f) files.push(f);
      }
    }
    if (files.length) {
      e.preventDefault();
      await addFiles(files);
    }
  }

  async function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length) await addFiles(files);
  }

  async function send() {
    const text = input.trim();
    if ((!text && attachments.length === 0) || busy) return;
    setErr("");

    // Build user message content. If only text, send a plain string (smaller).
    // If any images, send a Block[] mixing image blocks + text.
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

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (Array.from(e.dataTransfer.types).includes("Files")) setDragOver(true);
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDragOver(false);
      }}
      onDrop={onDrop}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 280px)",
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
            background: "rgba(212, 160, 65, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-amber)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.4rem",
            fontStyle: "italic",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          Drop screenshot to attach
        </div>
      )}
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
            Type a message or drop / paste a screenshot to start.
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
            background: "rgba(15, 13, 10, 0.4)",
          }}
        >
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
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          title="Attach image"
          style={{
            padding: "0 14px",
            background: "transparent",
            border: "1px solid var(--color-divider)",
            borderRadius: "8px",
            color: "var(--color-cream-muted)",
            cursor: busy ? "not-allowed" : "pointer",
            fontSize: "1.2rem",
          }}
        >
          📎
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          placeholder="Tell Claude what to change… (drop or paste a screenshot to attach)"
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
