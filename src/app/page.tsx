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
          alt="Guitar silhouette against a golden sunset background"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,13,10,0.15) 0%, rgba(15,13,10,0.3) 50%, rgba(15,13,10,0.85) 100%)",
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
          <h1
            className="animate-fade-in-up"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "var(--color-cream)",
              marginBottom: "12px",
              opacity: 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Called to Worship Together:
          </h1>
          <p
            className="animate-fade-in-up delay-200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              color: "var(--color-amber)",
              marginBottom: "16px",
              opacity: 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Wylie &amp; Dawna Stevens
          </p>
          <div
            className="animate-fade-in-up delay-300"
            style={{
              width: "60px",
              height: "1px",
              background: "var(--color-amber)",
              margin: "0 auto 20px",
              opacity: 0,
            }}
          />
          <p
            className="animate-fade-in-up delay-400"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-cream)",
              marginBottom: "40px",
              opacity: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            A Music Ministry
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

      {/* Video Section */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
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
            Watch
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "32px",
            }}
          >
            See Us in Worship
          </h2>
          <div
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              aspectRatio: "16/9",
              background: "#000",
            }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            >
              <source src="/video/worship-clip.mp4" type="video/mp4" />
              <source src="/video/iPhone001_12201709_C006.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          </div>
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
              Called to Worship Together:
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
              Wylie and Dawna Stevens are a husband-and-wife singing duo known
              for their heartfelt Christian music that beautifully intertwines
              traditional hymns, scripture songs, and praise and worship. With a
              shared passion for faith and mission, the couple is dedicated to
              spreading the uplifting message of God&apos;s awesome love, Jesus
              Christ&apos;s soon return, and encouraging the church to remain
              steadfast and faithful.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Wylie&apos;s journey in music began 48 years ago, as a tender
              four-year-old singing next to his father in a bluegrass band.
              Eight years ago, Dawna joined him, and together they formed
              &ldquo;Last Song&rdquo;, blending their voices with guitar to
              create a powerful music ministry. Through soulful harmonies and
              heartfelt lyrics, they remind listeners to watch and pray and to
              be ready for Christ&apos;s glorious return.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              With hearts full of faith and voices lifted in praise, Last Song
              invites you to join them in celebrating the timeless truths of the
              gospel, ever reminding the faithful that the best is yet to come.
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
              src="/images/5M5A7470_new.jpeg"
              alt="Wylie and Dawna Stevens posing together with guitar"
              width={600}
              height={1080}
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
              { src: "/images/1000000052.jpeg", alt: "Wylie and Dawna Stevens leading worship with guitar at a church service" },
              { src: "/images/IMG_1477.jpeg", alt: "Last Song Ministry with the congregation in Elk City, Oklahoma", label: "Elk City, OK" },
              { src: "/images/5M5A7532.jpeg", alt: "Wylie and Dawna Stevens singing together during a worship service" },
            ].map((photo, i) => (
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
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
                {photo.label && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "12px 16px",
                      background: "linear-gradient(to top, rgba(15,13,10,0.85), transparent)",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--color-amber)",
                        letterSpacing: "1px",
                      }}
                    >
                      {photo.label}
                    </p>
                  </div>
                )}
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
