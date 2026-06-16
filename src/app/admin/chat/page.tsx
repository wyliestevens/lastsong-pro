import ChatInterface from "./ChatInterface";

export const metadata = { title: "Chat", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function ChatPage() {
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
        Chat
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "20px", maxWidth: "700px" }}>
        Ask Claude to edit any page. Examples: &ldquo;Remove the Western Slope Camp Meeting event&rdquo;, &ldquo;Change the home page hero subtitle to &lsquo;Songs of Hope&rsquo;&rdquo;, &ldquo;Add a new Special Event for Oct 4-8 in Phoenix called Fall Revival&rdquo;.
      </p>
      <ChatInterface />
    </div>
  );
}
