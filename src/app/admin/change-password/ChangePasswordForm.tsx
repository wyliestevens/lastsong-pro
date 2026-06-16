"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "rgba(15, 13, 10, 0.6)",
  border: "1px solid var(--color-divider)",
  borderRadius: "6px",
  color: "var(--color-cream)",
  fontFamily: "'Quicksand', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Quicksand', sans-serif",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "var(--color-cream-muted)",
  marginBottom: "6px",
};

export default function ChangePasswordForm() {
  const params = useSearchParams();
  const nextRaw = params.get("next") || "/admin";
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/admin";

  const [current, setCurrent] = useState("");
  const [next1, setNext1] = useState("");
  const [next2, setNext2] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (next1.length < 8) {
      setErr("New password must be at least 8 characters.");
      setState("error");
      return;
    }
    if (next1 !== next2) {
      setErr("New passwords do not match.");
      setState("error");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next1 }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed");
      setState("success");
      setTimeout(() => {
        window.location.href = next;
      }, 1200);
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <form
      onSubmit={submit}
      style={{
        padding: "32px",
        background: "var(--color-bg-card)",
        borderRadius: "12px",
        border: "1px solid var(--color-divider)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <label style={labelStyle} htmlFor="cur">Current password</label>
        <input
          id="cur"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          autoFocus
          autoComplete="current-password"
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="new1">New password</label>
        <input
          id="new1"
          type="password"
          value={next1}
          onChange={(e) => setNext1(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="new2">Confirm new password</label>
        <input
          id="new2"
          type="password"
          value={next2}
          onChange={(e) => setNext2(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          style={inputStyle}
        />
      </div>
      {state === "error" && (
        <div
          style={{
            padding: "10px 14px",
            background: "rgba(200, 60, 60, 0.12)",
            border: "1px solid rgba(200, 60, 60, 0.4)",
            borderRadius: "6px",
            color: "#f1b4b4",
            fontSize: "0.85rem",
          }}
        >
          {err}
        </div>
      )}
      {state === "success" && (
        <div
          style={{
            padding: "10px 14px",
            background: "rgba(80, 180, 100, 0.12)",
            border: "1px solid rgba(80, 180, 100, 0.4)",
            borderRadius: "6px",
            color: "#b4f1c4",
            fontSize: "0.85rem",
          }}
        >
          Password updated. Redirecting…
        </div>
      )}
      <button
        type="submit"
        disabled={state === "loading" || state === "success"}
        style={{
          padding: "14px 24px",
          background:
            state === "loading"
              ? "rgba(212, 160, 65, 0.4)"
              : "linear-gradient(135deg, var(--color-amber), #c4922e)",
          color: "var(--color-bg-deep)",
          fontFamily: "'Quicksand', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          border: "none",
          borderRadius: "6px",
          cursor: state === "loading" ? "wait" : "pointer",
        }}
      >
        {state === "loading" ? "Saving…" : "Update Password"}
      </button>
    </form>
  );
}
