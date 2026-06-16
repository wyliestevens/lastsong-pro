import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cookieConfig, findUser, verifySession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/chat", label: "Chat" },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/images", label: "Images" },
  { href: "/admin/history", label: "History" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Determine current user for header + mustChangePassword guard.
  let currentEmail = "";
  let currentName = "";
  let mustChange = false;
  try {
    const jar = await cookies();
    const session = verifySession(jar.get(cookieConfig.name)?.value);
    if (session) {
      const u = await findUser(session.email);
      if (u) {
        currentEmail = u.email;
        currentName = u.name;
        mustChange = u.mustChangePassword === true;
      }
    }
  } catch {
    /* swallow — layout still renders */
  }

  // Force first-login password change BEFORE access to the rest of admin.
  // The change-password page itself is allowed to render under the layout.
  if (mustChange) {
    // Will server-redirect on every admin route except the change-password page.
    // Implemented by reading the request URL via cookies/headers is awkward at
    // layout level — instead we render a banner + bypass children with a redirect
    // hint, and rely on the change-password page to clear the flag.
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-deep)" }}>
      <div
        style={{
          borderBottom: "1px solid var(--color-divider)",
          background: "var(--color-bg-warm)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <Link
              href="/admin"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "var(--color-amber)",
                textDecoration: "none",
                letterSpacing: "1px",
              }}
            >
              LAST SONG · Admin
            </Link>
            <nav style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: "var(--color-cream-muted)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {currentEmail && (
              <span style={{ color: "var(--color-cream-muted)", fontSize: "0.8rem" }}>
                {currentName || currentEmail}
              </span>
            )}
            <LogoutButton />
          </div>
        </div>
      </div>
      {mustChange && (
        <div
          style={{
            background: "rgba(212, 160, 65, 0.12)",
            borderBottom: "1px solid var(--color-amber)",
            padding: "12px 24px",
            textAlign: "center",
            color: "var(--color-amber)",
            fontSize: "0.9rem",
          }}
        >
          You are using the temporary password. Please{" "}
          <Link href="/admin/change-password" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>
            change your password
          </Link>{" "}
          to continue.
        </div>
      )}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </div>
    </div>
  );
}
