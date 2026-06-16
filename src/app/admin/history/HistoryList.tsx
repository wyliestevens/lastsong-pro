"use client";

import { useEffect, useState } from "react";

const FILES = [
  "site", "footer", "home", "about", "mission", "listen", "schedule", "support", "contact",
];

type Commit = { sha: string; date: string; message: string; author: string };

export default function HistoryList() {
  const [file, setFile] = useState("schedule");
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [restoring, setRestoring] = useState(false);

  async function load(f: string) {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`/api/admin/history?file=${encodeURIComponent(f)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Load failed");
      setCommits(data.history || []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load(file);
  }, [file]);

  async function restore(sha: string) {
    if (!confirm(`Restore the entire repo to commit ${sha.slice(0, 7)}? This creates a new commit that matches that snapshot — old history is preserved.`)) return;
    setRestoring(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/restore", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ targetSha: sha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Restore failed");
      alert(`Restored. New commit: ${data.newSha?.slice(0, 7) || "?"}. Vercel rebuilding (~60s).`);
      await load(file);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Restore failed");
    } finally {
      setRestoring(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-cream-muted)", marginBottom: "4px" }}>
          File
        </label>
        <select
          value={file}
          onChange={(e) => setFile(e.target.value)}
          style={{
            padding: "10px 14px",
            background: "rgba(15, 13, 10, 0.6)",
            border: "1px solid var(--color-divider)",
            borderRadius: "6px",
            color: "var(--color-cream)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.9rem",
          }}
        >
          {FILES.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      {err && <div style={{ color: "#f1b4b4", marginBottom: "12px", fontSize: "0.9rem" }}>{err}</div>}
      {loading ? (
        <p style={{ color: "var(--color-cream-muted)" }}>Loading…</p>
      ) : commits.length === 0 ? (
        <p style={{ color: "var(--color-cream-muted)" }}>No commits yet for that file.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {commits.map((c) => (
            <div
              key={c.sha}
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-divider)",
                borderRadius: "8px",
                padding: "14px 18px",
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "240px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--color-cream)", marginBottom: "2px" }}>
                  {c.message.split("\n")[0]}
                </p>
                <p style={{ color: "var(--color-cream-muted)", fontSize: "0.75rem" }}>
                  {c.author} · {new Date(c.date).toLocaleString()} · <code style={{ fontSize: "0.7rem" }}>{c.sha.slice(0, 7)}</code>
                </p>
              </div>
              <button
                onClick={() => restore(c.sha)}
                disabled={restoring}
                style={{
                  padding: "8px 14px",
                  background: "rgba(212, 160, 65, 0.12)",
                  border: "1px solid var(--color-amber)",
                  borderRadius: "6px",
                  color: "var(--color-amber)",
                  cursor: restoring ? "wait" : "pointer",
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                }}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
