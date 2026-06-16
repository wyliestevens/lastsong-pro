"use client";

import { useState } from "react";

export default function JsonEditor({
  file,
  initial,
  sha,
}: {
  file: string;
  initial: any;
  sha: string | null;
}) {
  const [text, setText] = useState(() => JSON.stringify(initial, null, 2));
  const [state, setState] = useState<"idle" | "saving" | "error" | "saved">("idle");
  const [err, setErr] = useState("");

  async function save() {
    setErr("");
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Invalid JSON");
      return;
    }
    setState("saving");
    try {
      const res = await fetch(`/api/admin/content/${file}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: parsed, sha }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setState("saved");
      setTimeout(() => setState("idle"), 2500);
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={28}
        spellCheck={false}
        style={{
          width: "100%",
          padding: "16px",
          background: "rgba(15, 13, 10, 0.6)",
          border: "1px solid var(--color-divider)",
          borderRadius: "8px",
          color: "var(--color-cream)",
          fontFamily: "'SF Mono', Monaco, Menlo, monospace",
          fontSize: "0.85rem",
          lineHeight: 1.5,
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />
      <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={save}
          disabled={state === "saving"}
          style={{
            padding: "10px 20px",
            background:
              state === "saving"
                ? "rgba(212, 160, 65, 0.4)"
                : "linear-gradient(135deg, var(--color-amber), #c4922e)",
            color: "var(--color-bg-deep)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "6px",
            cursor: state === "saving" ? "wait" : "pointer",
          }}
        >
          {state === "saving" ? "Saving…" : "Save"}
        </button>
        {state === "saved" && (
          <span style={{ color: "#9ad9a8", fontSize: "0.85rem" }}>
            Saved. Vercel rebuilding (~60s).
          </span>
        )}
        {state === "error" && (
          <span style={{ color: "#f1b4b4", fontSize: "0.85rem" }}>{err}</span>
        )}
      </div>
    </div>
  );
}
