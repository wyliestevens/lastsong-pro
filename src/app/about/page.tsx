import Image from "next/image";

export const metadata = {
  title: "About Us | Last Song",
  description: "Learn about the Last Song music ministry.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "100px" }}>
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 24px 40px",
          maxWidth: "800px",
          margin: "0 auto",
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
          Our Story
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
          About Last Song
        </h1>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--color-amber)",
            margin: "0 auto",
          }}
        />
      </section>

      {/* Main Content */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "24px",
              }}
            >
              <Image
                src="/images/IMG_2137.jpeg"
                alt="Wylie and Dawna"
                width={600}
                height={750}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/IMG_1751.jpeg"
                alt="Wylie and Dawna together"
                width={600}
                height={450}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>

          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: 400,
                color: "var(--color-cream)",
                lineHeight: 1.3,
                marginBottom: "24px",
              }}
            >
              Called to Worship Together
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Last Song is the music ministry of Wylie and Dawna. Together, they
              share a deep passion for worship and a calling to bring the
              presence of God into every gathering through song.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              With Wylie on guitar and both voices lifted in harmony, Last Song
              brings a warm and intimate worship experience to churches, events,
              and special gatherings. Their music is rooted in faith, delivered
              with sincerity, and focused on drawing hearts closer to God.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Whether leading congregational worship or performing special music,
              Wylie and Dawna bring the same heart and dedication to every
              opportunity to serve through song.
            </p>

            <div
              style={{
                marginTop: "40px",
                padding: "32px",
                background: "var(--color-bg-card)",
                borderRadius: "8px",
                borderLeft: "3px solid var(--color-amber)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.3rem",
                  fontStyle: "italic",
                  color: "var(--color-cream)",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                &ldquo;Speaking to one another in psalms and hymns and spiritual
                songs, singing and making melody in your heart to the Lord.&rdquo;
              </p>
              <p
                style={{
                  color: "var(--color-amber)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Ephesians 5:19 NKJV
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        className="section-spacing"
        style={{ background: "var(--color-bg-warm)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              "/images/5M5A7520.jpeg",
              "/images/5M5A7470.jpeg",
              "/images/5M5A7495.jpeg",
              "/images/IMG_1750.jpeg",
            ].map((src, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                }}
                className="image-shine"
              >
                <Image
                  src={src}
                  alt={`Ministry photo ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
