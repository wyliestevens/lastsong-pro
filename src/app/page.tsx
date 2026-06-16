import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          height: "85vh",
          minHeight: "500px",
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
          className="hero-text-mobile"
          style={{
            position: "absolute",
            top: "15%",
            right: "15%",
            zIndex: 2,
            textAlign: "center",
            padding: "0",
            maxWidth: "600px",
          }}
        >
          <h1
            className="animate-fade-in-up"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#ffffff",
              marginBottom: "8px",
              opacity: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)",
            }}
          >
            Last Song
          </h1>
          <p
            className="animate-fade-in-up delay-200 hero-subtitle"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
              fontWeight: 600,
              letterSpacing: "4px",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              color: "#ffffff",
              marginBottom: "20px",
              opacity: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)",
            }}
          >
            Singing with Eternity in View
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
          </div>
        </div>

      </section>

      {/* Ministry Scripture */}
      <section
        style={{
          background: "var(--color-bg-warm)",
          padding: "16px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "var(--color-cream)",
              lineHeight: 1.7,
              marginBottom: "16px",
              textWrap: "balance",
            }}
          >
            &ldquo;Sing to Him a new song; Play skillfully with a shout of joy.&rdquo;
          </p>
          <p
            style={{
              color: "var(--color-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Psalm 33:3
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-spacing" style={{ background: "var(--color-bg-deep)" }}>
        <div
          className="grid-2-col mobile-gap-sm"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <Image
              src="/images/full_body_guitar.jpeg"
              alt="Wylie playing guitar"
              width={840}
              height={1600}
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
          <div>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1.2rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 700, color: "var(--color-cream)" }}>Last Song</span> is the husband-and-wife duet of Wylie and Dawna Stevens, sharing heartfelt Christian music that blends traditional hymns, scripture songs, and praise songs with simple accompaniment, including acoustic guitar. Through song and testimony, they remind listeners of the hope we have in Christ, the promises of Scripture, and the mission the church is called to in this exciting time in history.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1.2rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              The name Last Song reflects the realization that we, the church, are truly singing our &lsquo;last songs&rsquo; as we finish the work in anticipation of the soon return of our Lord. Wylie and Dawna seek to use their time and talents to encourage others to join in sharing the Gospel and to hold fast to their faith. Each song is chosen with the purpose of pointing hearts to God.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1.2rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Last Song has a special heart for ministering in churches, Christian gatherings, and outreach events where music can uplift, strengthen, and encourage the body of Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Ministering in Churches */}
      <section className="section-spacing" style={{ background: "var(--color-bg-warm)" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "12px",
              padding: "48px 40px",
              border: "1px solid rgba(212, 160, 65, 0.2)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem",
                fontWeight: 500,
                color: "var(--color-cream)",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Ministering in Churches and Christian Events
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Last Song shares music in churches, outreach events, camp meetings and other Christian gatherings.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              If your church or ministry is looking for Christ-centered music through songs rooted in the truths of Scripture, please feel free to reach out through our <Link href="/contact" style={{ color: "var(--color-amber)", textDecoration: "none", borderBottom: "1px solid rgba(212, 160, 65, 0.4)" }}>Contact page</Link> for more information about scheduling or upcoming opportunities to serve together.
            </p>
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
          <div style={{ marginBottom: "24px" }}>
            <Image
              src="/images/hands.jpeg"
              alt="Hands clasped together in fellowship"
              width={1600}
              height={1017}
              style={{
                width: "100%",
                maxWidth: "270px",
                height: "auto",
                display: "block",
                margin: "0 auto",
                borderRadius: "8px",
                border: "1px solid rgba(212, 160, 65, 0.15)",
              }}
            />
          </div>
          <Link
            href="/support"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.6vw, 2.52rem)",
              fontWeight: 400,
              color: "var(--color-amber)",
              lineHeight: 1.3,
              textDecoration: "none",
              borderBottom: "1px solid rgba(212, 160, 65, 0.4)",
              paddingBottom: "4px",
              transition: "border-color 0.3s ease",
            }}
          >
            Partner With Our Ministry
          </Link>
        </div>
      </section>
    </div>
  );
}
