import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-divider)",
        padding: "60px 0 40px",
        background: "var(--color-bg-warm)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              color: "var(--color-amber)",
              marginBottom: "16px",
              letterSpacing: "1px",
            }}
          >
            Last Song
          </h3>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            Sharing faith through music and worship, one song at a time.
          </p>
        </div>

        <div>
          <h4
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "16px",
            }}
          >
            Navigate
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/about", label: "About Us" },
              { href: "/ministry", label: "Ministry" },
              { href: "/schedule", label: "Schedule" },
              { href: "/listen", label: "Listen" },
              { href: "/support", label: "Support" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "var(--color-cream-muted)",
                  fontSize: "0.9rem",
                  transition: "color 0.3s ease",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "16px",
            }}
          >
            Connect
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              Phone: (903) 556-3650
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              Email: dbstevens04@hotmail.com
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              Kingman, AZ
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto 0",
          padding: "24px 24px 0",
          borderTop: "1px solid var(--color-divider)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--color-warm-gray)",
            fontSize: "0.8rem",
            letterSpacing: "0.5px",
          }}
        >
          &copy; {new Date().getFullYear()} Last Song Ministry. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
