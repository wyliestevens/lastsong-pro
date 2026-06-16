import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.4rem",
              fontWeight: 600,
              color: "var(--color-amber)",
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            LAST SONG
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
            }}
          >
            Admin Sign In
          </p>
        </div>
        <Suspense
          fallback={
            <div
              style={{
                padding: "24px",
                background: "var(--color-bg-card)",
                borderRadius: "8px",
                color: "var(--color-cream-muted)",
                textAlign: "center",
              }}
            >
              Loading…
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
