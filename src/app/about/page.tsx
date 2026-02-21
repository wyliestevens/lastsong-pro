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
              Wylie and Dawna Stevens are a husband and wife singing duet known
              for their heartfelt Christian gospel music that beautifully
              intertwines traditional hymns, scripture songs, and praise and
              worship music. With a shared passion for faith and mission, the
              couple is dedicated to spreading the uplifting message of the
              awesome love of God, Jesus Christ&apos;s soon return and
              encouraging the church to remain steadfast and faithful.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Wylie&apos;s journey in music began over 48 years ago, as a tender
              four-year old singing next to his father in a bluegrass band made
              up of friends who played together every Friday night. At age
              sixteen he committed to serving as a music minister first in the
              church he grew up in, and later at many other churches in northeast
              Texas and southern Arkansas. In his desire to share the gospel
              through song, he became lead singer in the gospel quartet, Southern
              Grace in 2001, where they toured the four-state area of Texas,
              Arkansas, Oklahoma, and Louisiana. Six years ago, Dawna joined him,
              and together they formed this dynamic duo, blending their voices to
              create a powerful ministry. Through soulful harmonies and heartfelt
              lyrics, they remind listeners to watch and pray as they eagerly
              await Christ&apos;s glorious return.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              In addition to their music, Wylie and Dawna are committed to
              mentoring young musicians and fostering a spirit of faith within
              their local community. Through engaging workshops and outreach,
              they inspire others to use their gifts for God&apos;s glory.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              With their hearts full of faith and their voices lifted in praise,
              Wylie and Dawna Stevens invite you to join them in celebrating the
              timeless truths of the gospel, ever reminding that the best is yet
              to come for those who believe.
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
