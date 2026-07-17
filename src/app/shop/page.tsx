import Image from "next/image";
import { streamingPlatforms } from "@/data/streaming";

export default function ShopPage() {
  return (
    <div>
      {/* Hero with Background Image */}
      <section
        style={{
          position: "relative",
          paddingTop: "160px",
          paddingBottom: "80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/guitar_treeImage.jpeg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,13,10,0.6) 0%, rgba(15,13,10,0.85) 60%, rgba(15,13,10,1) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <p
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "16px",
            }}
          >
            Shop
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            Music &amp; Merchandise
          </h1>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "var(--color-amber)",
              margin: "0 auto 24px",
            }}
          />
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            Stream our music on your favorite platform or browse Last Song
            merchandise.
          </p>
        </div>
      </section>

      {/* Listen on Your Platform */}
      <section
        className="section-spacing"
        style={{ background: "var(--color-bg-deep)" }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "16px",
            }}
          >
            Stream Our Music
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Listen on Your Favorite Platform
          </h2>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "48px",
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            Scan a QR code &mdash; or tap any platform &mdash; to open our
            album, &ldquo;In the Beginning.&rdquo;
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "28px",
            }}
          >
            {streamingPlatforms.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--color-bg-card)",
                  borderRadius: "12px",
                  padding: "28px 24px",
                  border: "1px solid rgba(212, 160, 65, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "18px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    minHeight: "30px",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill={p.color}
                    aria-hidden="true"
                  >
                    <path d={p.icon} />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      color: "var(--color-cream)",
                    }}
                  >
                    {p.name}
                  </span>
                </div>
                <div
                  style={{
                    width: "180px",
                    maxWidth: "100%",
                    background: "#ffffff",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <Image
                    src={`/images/qr/${p.slug}.png`}
                    alt={`${p.name} QR code for In the Beginning`}
                    width={320}
                    height={320}
                    unoptimized
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--color-amber)",
                  }}
                >
                  Scan or Tap to Open
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Merchandise */}
      <section
        className="section-spacing"
        style={{ background: "var(--color-bg-warm)" }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "16px",
            }}
          >
            Merchandise
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Last Song Merch
          </h2>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "48px",
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            Coming soon — T-shirts, CDs, and more to support the ministry.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Placeholder merchandise cards */}
            {[
              { name: "Last Song T-Shirt", price: "Coming Soon" },
              { name: "Last Song CD", price: "Coming Soon" },
              { name: "Last Song Hat", price: "Coming Soon" },
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  background: "var(--color-bg-card)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(212, 160, 65, 0.15)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    background: "rgba(212, 160, 65, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(212, 160, 65, 0.3)"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M3 16l4-4 4 4 4-6 5 6" />
                  </svg>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "var(--color-cream)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--color-amber)",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
