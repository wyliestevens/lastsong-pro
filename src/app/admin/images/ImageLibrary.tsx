"use client";

import { useEffect, useState } from "react";

type Img = { name: string; path: string; url: string; size: number; sha: string };

export default function ImageLibrary() {
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("library");

  async function refresh() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/images");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Load failed");
      setImages(data.images || []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refresh();
  }, []);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      await refresh();
    } catch (err) {
      setErr(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function onDelete(img: Img) {
    if (!confirm(`Delete ${img.name}?`)) return;
    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: img.path, sha: img.sha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      await refresh();
    } catch (err) {
      setErr(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div>
      <div
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-divider)",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "24px",
          display: "flex",
          gap: "12px",
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label style={{ display: "block", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-cream-muted)", marginBottom: "4px" }}>
            Folder
          </label>
          <input
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "rgba(15, 13, 10, 0.6)",
              border: "1px solid var(--color-divider)",
              borderRadius: "6px",
              color: "var(--color-cream)",
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.85rem",
            }}
          />
        </div>
        <label
          style={{
            padding: "10px 18px",
            background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
            color: "var(--color-bg-deep)",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            borderRadius: "6px",
            cursor: uploading ? "wait" : "pointer",
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? "Uploading…" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            disabled={uploading}
            style={{ display: "none" }}
          />
        </label>
      </div>
      {err && (
        <div style={{ color: "#f1b4b4", marginBottom: "12px", fontSize: "0.9rem" }}>{err}</div>
      )}
      {loading ? (
        <p style={{ color: "var(--color-cream-muted)" }}>Loading…</p>
      ) : images.length === 0 ? (
        <p style={{ color: "var(--color-cream-muted)" }}>No uploaded images yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {images.map((img) => (
            <div
              key={img.sha}
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-divider)",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <img
                src={img.url}
                alt={img.name}
                style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" }}
              />
              <p style={{ fontSize: "0.75rem", color: "var(--color-cream-muted)", marginTop: "8px", wordBreak: "break-all" }}>
                {img.name}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", gap: "8px" }}>
                <button
                  onClick={() => navigator.clipboard.writeText(img.url)}
                  style={{
                    fontSize: "0.7rem",
                    padding: "6px 10px",
                    background: "rgba(212, 160, 65, 0.1)",
                    border: "1px solid var(--color-divider)",
                    color: "var(--color-amber)",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Copy URL
                </button>
                <button
                  onClick={() => onDelete(img)}
                  style={{
                    fontSize: "0.7rem",
                    padding: "6px 10px",
                    background: "transparent",
                    border: "1px solid rgba(200, 60, 60, 0.4)",
                    color: "#f1b4b4",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
