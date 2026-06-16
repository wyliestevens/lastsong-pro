import type { Metadata } from "next";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function ChangePasswordPage() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2rem",
          fontWeight: 500,
          color: "var(--color-cream)",
          marginBottom: "8px",
        }}
      >
        Change Password
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "24px", maxWidth: "600px" }}>
        For security, please pick a new password before continuing. Minimum 8 characters.
      </p>
      <div style={{ maxWidth: "500px" }}>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
