"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: any };

function renderBlocks(content: any): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .filter((b) => b && b.type === "text")
    .map((b) => b.text)
    .join("\n\n");
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setErr("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
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
      // Use the server-returned messages so tool turns + final reply are preserved.
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
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 280px)",
        minHeight: "500px",
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-divider)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
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
            Type a message below to start.
          </p>
        )}
        {messages.map((m, i) => {
          const text = renderBlocks(m.content);
          if (!text) return null;
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
              }}
            >
              {text}
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
      <div
        style={{
          borderTop: "1px solid var(--color-divider)",
          padding: "12px",
          display: "flex",
          gap: "10px",
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
          disabled={busy || !input.trim()}
          style={{
            padding: "0 22px",
            background:
              busy || !input.trim()
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
            cursor: busy || !input.trim() ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
