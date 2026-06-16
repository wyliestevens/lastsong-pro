import Link from "next/link";

export const metadata = {
  title: "Thank You - Last Song Ministry",
  description: "Thank you for your generous support of Last Song Ministry.",
};

export default function ThankYouPage() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "600px" }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3rem",
            fontWeight: 700,
            color: "var(--color-cream)",
            marginBottom: "16px",
            lineHeight: 1.2,
          }}
        >
          Thank You
        </h1>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.4rem",
            fontStyle: "italic",
            color: "var(--color-cream)",
            lineHeight: 1.7,
            marginBottom: "24px",
          }}
        >
          Your generosity means the world to us and to the communities we serve. May God bless you abundantly for your faithful support.
        </p>
        <p
          style={{
            color: "var(--color-amber)",
            fontSize: "0.95rem",
            fontWeight: 500,
            marginBottom: "40px",
          }}
        >
          &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo; &mdash; 2 Corinthians 9:7
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
            color: "var(--color-bg-deep)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
