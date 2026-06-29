import Image from "next/image";

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
            Scan any QR code below to open our music on that platform.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            {/* Placeholder cards — replace with actual QR code images */}
            {[
              { platform: "Spotify", icon: "🎵" },
              { platform: "Apple Music", icon: "🎶" },
              { platform: "YouTube Music", icon: "▶" },
              { platform: "Amazon Music", icon: "🎧" },
            ].map((item) => (
              <div
                key={item.platform}
                style={{
                  background: "var(--color-bg-card)",
                  borderRadius: "12px",
                  padding: "32px 24px",
                  border: "1px solid rgba(212, 160, 65, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* QR code placeholder — replace src with actual QR images */}
                <div
                  style={{
                    width: "160px",
                    height: "160px",
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  {item.icon}
                </div>
                <p
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--color-cream)",
                  }}
                >
                  {item.platform}
                </p>
              </div>
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
