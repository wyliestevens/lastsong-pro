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

export default function LoginForm() {
  const params = useSearchParams();
  const nextRaw = params.get("next") || "/admin";
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed");
      const target = data.mustChangePassword
        ? `/admin/change-password?next=${encodeURIComponent(next)}`
        : next;
      window.location.href = target;
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Login failed");
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
        <label style={labelStyle} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          autoComplete="email"
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
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
      <button
        type="submit"
        disabled={state === "loading"}
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
        {state === "loading" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
