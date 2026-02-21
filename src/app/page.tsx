import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/guitar_treeImage.jpeg"
          alt="Guitar shaped trees at sunset"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,13,10,0.4) 0%, rgba(15,13,10,0.6) 50%, rgba(15,13,10,0.95) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "800px",
          }}
        >
          <p
            className="animate-fade-in-up"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--color-amber)",
              marginBottom: "20px",
              opacity: 0,
            }}
          >
            A Music Ministry
          </p>
          <h1
            className="animate-fade-in-up delay-200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--color-cream)",
              marginBottom: "24px",
              opacity: 0,
            }}
          >
            Last Song
          </h1>
          <div
            className="animate-fade-in-up delay-300"
            style={{
              width: "60px",
              height: "1px",
              background: "var(--color-amber)",
              margin: "0 auto 24px",
              opacity: 0,
            }}
          />
          <p
            className="animate-fade-in-up delay-400"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--color-cream-muted)",
              lineHeight: 1.6,
              marginBottom: "40px",
              opacity: 0,
            }}
          >
            Sharing faith through music and worship
          </p>
          <div
            className="animate-fade-in-up delay-500"
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              opacity: 0,
            }}
          >
            <Link href="/listen" className="btn-primary">
              Listen Now
            </Link>
            <Link href="/about" className="btn-outline">
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-fade-in delay-600"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--color-warm-gray)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, var(--color-amber), transparent)",
            }}
          />
        </div>
      </section>

      {/* The Faithful Harmonies Duo */}
      <section className="section-spacing" style={{ background: "var(--color-bg-deep)" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
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
              Who We Are
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 400,
                color: "var(--color-cream)",
                lineHeight: 1.2,
                marginBottom: "28px",
              }}
            >
              The Faithful Harmonies Duo:
              <br />
              <span style={{ color: "var(--color-amber)" }}>
                Wylie &amp; Dawna Stevens
              </span>
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Wylie and Dawna Stevens are a husband and wife singing duet known
              for their heartfelt Christian gospel music that beautifully
              intertwines traditional hymns with original compositions. With a
              shared passion for faith and mission, the couple is dedicated to
              spreading the uplifting message of Jesus Christ&apos;s soon return
              and encouraging the church to remain steadfast and strong in their
              beliefs.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Wylie&apos;s journey in music began over forty-five years ago,
              rooted in his desire to share the gospel through song. Eight years
              ago, Dawna joined him, and together they formed this dynamic duo,
              blending their voices to create a powerful ministry. Through
              soulful harmonies and heartfelt lyrics, they remind listeners to
              watch and pray as they eagerly await Christ&apos;s glorious return.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              With their hearts full of faith and their voices lifted in praise,
              Wylie and Dawna Stevens invite you to join them in celebrating the
              timeless truths of the gospel, ever reminding that the best is yet
              to come for those who believe.
            </p>
            <Link href="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            className="image-shine"
          >
            <Image
              src="/images/5M5A7470.jpeg"
              alt="Wylie and Dawna Stevens - Last Song ministry"
              width={600}
              height={450}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(212, 160, 65, 0.15)",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* Music Preview */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
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
            Our Music
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            Songs of Faith and Hope
          </h2>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            Listen to recordings from our worship sessions and ministry events.
            Each song is offered as praise and testimony to God&apos;s faithfulness.
          </p>
          <Link href="/listen" className="btn-primary">
            Listen Now
          </Link>
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="section-spacing" style={{ background: "var(--color-bg-deep)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
              In Ministry
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "var(--color-cream)",
              }}
            >
              Moments of Worship
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              "/images/5M5A7503.jpeg",
              "/images/5M5A7495.jpeg",
              "/images/5M5A7508.jpeg",
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

      {/* CTA */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.3,
              marginBottom: "24px",
            }}
          >
            Partner With Our Ministry
          </h2>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            Your generous support helps us continue sharing the Gospel through
            music. Every gift makes a difference.
          </p>
          <Link href="/support" className="btn-primary">
            Support Us
          </Link>
        </div>
      </section>
    </div>
  );
}
