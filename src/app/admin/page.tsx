import Link from "next/link";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const cards: { href: string; title: string; desc: string }[] = [
  { href: "/admin/chat", title: "Chat with Claude", desc: "Talk to your site. Add events, swap photos, edit copy — Claude makes the change and commits it for you." },
  { href: "/admin/schedule", title: "Schedule Editor", desc: "Add, edit, or remove special events. Auto-updates the calendar highlights too." },
  { href: "/admin/content", title: "Content Files", desc: "Edit raw JSON for site settings, footer, home, about, mission, listen, support, contact." },
  { href: "/admin/images", title: "Image Library", desc: "Upload new photos, browse what's already uploaded, delete unused images." },
  { href: "/admin/history", title: "Version History", desc: "See every change you've made. Restore an older version of any page with one click." },
  { href: "/admin/change-password", title: "Change Password", desc: "Update your sign-in password." },
];

export default function DashboardPage() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2.2rem",
          fontWeight: 500,
          color: "var(--color-cream)",
          marginBottom: "8px",
        }}
      >
        Dashboard
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "32px" }}>
        Every change here commits to GitHub and rebuilds the live site in about 60 seconds.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              display: "block",
              padding: "24px",
              background: "var(--color-bg-card)",
              borderRadius: "10px",
              border: "1px solid var(--color-divider)",
              borderLeft: "3px solid var(--color-amber)",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                fontWeight: 500,
                color: "var(--color-amber)",
                marginBottom: "8px",
              }}
            >
              {c.title}
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              {c.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
