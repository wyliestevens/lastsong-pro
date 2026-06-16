"use client";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
      style={{
        background: "transparent",
        border: "1px solid var(--color-divider)",
        borderRadius: "4px",
        padding: "6px 14px",
        color: "var(--color-cream-muted)",
        fontFamily: "'Quicksand', sans-serif",
        fontSize: "0.8rem",
        cursor: "pointer",
        letterSpacing: "0.5px",
      }}
    >
      Sign out
    </button>
  );
}
