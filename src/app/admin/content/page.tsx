import Link from "next/link";
import { ALL_CONTENT_FILES } from "@/lib/content";

export const metadata = { title: "Content", robots: { index: false, follow: false } };

const DESC: Record<string, string> = {
  site: "Site-wide settings: name, tagline, contact info, nav menu.",
  footer: "Footer brand, tagline, connect lines, copyright, credit.",
  home: "Home page hero, scripture, Our Story, ministering card.",
  about: "About page hero, bio paragraphs, photo reel.",
  mission: "Mission page hero, paragraphs, ministry photos.",
  listen: "Listen page hero, audio tracks, video clips, nature reel.",
  schedule: "Schedule page hero, recurring + special events, invite card.",
  support: "Support page photos, How Your Gift Helps cards, Special Thanks, giving, partner tiers, fineprint.",
  contact: "Contact page hero, info, photo + quote, form labels.",
};

export default function ContentIndex() {
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
        Content Files
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "24px", maxWidth: "700px" }}>
        Every page on lastsong.pro is backed by a JSON file. Edit the raw JSON below — but for everyday edits, the Chat is far easier. Use these if you want exact control.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {ALL_CONTENT_FILES.map((f) => (
          <Link
            key={f}
            href={`/admin/content/${f}`}
            style={{
              display: "block",
              padding: "20px",
              background: "var(--color-bg-card)",
              borderRadius: "10px",
              border: "1px solid var(--color-divider)",
              borderLeft: "3px solid var(--color-amber)",
              textDecoration: "none",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem",
                color: "var(--color-amber)",
                marginBottom: "6px",
                textTransform: "capitalize",
              }}
            >
              {f}
            </h2>
            <p style={{ color: "var(--color-cream-muted)", fontSize: "0.85rem", lineHeight: 1.55 }}>
              {DESC[f] || ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
