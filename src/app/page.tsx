import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
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
            className="animate-fade-in-up delay-200"
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
            Pointing Hearts to Christ Through Song
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

      {/* Called to Worship Together */}
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
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-cream)" }}>Last Song is the husband-and-wife duet of Wylie and</span> Dawna Stevens, sharing heartfelt Christian music that blends traditional hymns, scripture songs, and praise songs with simple accompaniment, including acoustic guitar. Their music reflects a deep love for God&apos;s Word and a desire to encourage believers through songs rich in truth, hope, and worship.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              At the heart of Last Song&apos;s ministry is a passion to proclaim the amazing love of God and the saving grace found in Jesus Christ. Through music and testimony, Wylie and Dawna remind listeners of the hope we have in Christ, the promises of Scripture, and the mission the church is called to in this exciting time in history.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              The name Last Song reflects the realization that we, the church, are truly singing our &ldquo;last songs&rdquo; as we finish the work in anticipation of the soon return of our Lord. Wylie and Dawna seek to use their time and talents to encourage others to join in sharing the Gospel and to hold fast to their faith. Each song&mdash;whether a familiar hymn, scripture set to music, or heartfelt praise and worship&mdash;is chosen with the purpose of pointing hearts back to God.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              Last Song has a special heart for ministering in churches, Christian gatherings, and outreach events where music is able to uplift, strengthen, and encourage the body of Christ. More than a performance, each opportunity to share music is viewed as ministry&mdash;serving the Lord, blessing His people, and sharing the message of the Gospel through song.
            </p>
            <Link href="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: "8px",
            }}
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

      {/* Ministering in Churches */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.2,
              marginBottom: "32px",
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
            }}
          >
            Last Song enjoys sharing music in churches, outreach events, camp meetings and other Christian gatherings. Our desire is simply to serve the Lord by encouraging believers through songs rooted in the truths of Scripture.
          </p>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.9,
              marginBottom: "20px",
            }}
          >
            If your church or ministry is looking for Christ-centered music that uplifts, encourages, and points hearts toward Jesus please feel free to reach out through our{" "}
            <Link href="/schedule" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>Contact</Link>{" "}
            page for more information about scheduling or upcoming opportunities to minister together.
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.3rem",
              fontStyle: "italic",
              color: "var(--color-cream)",
              lineHeight: 1.6,
              textAlign: "center",
              marginTop: "32px",
            }}
          >
            &ldquo;We would be honored to visit your church and share a time of worship and encouragement through music.&rdquo;
          </p>
        </div>
      </section>

      {/* Music Preview */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
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
          <div style={{ borderRadius: "8px" }}>
            <Image
              src="/images/IMG_1750.jpeg"
              alt="Wylie and Dawna Stevens in ministry"
              width={600}
              height={800}
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
            />
          </div>
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="section-spacing" style={{ background: "var(--color-bg-deep)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { src: "/images/1000000052.jpeg", alt: "Wylie and Dawna Stevens leading worship with guitar at a church service", w: 1431, h: 2592 },
              { src: "/images/IMG_1477.jpeg", alt: "Special Music at Elk City, Oklahoma Church", label: "Special Music at Elk City, Oklahoma Church", w: 2115, h: 2461 },
              { src: "/images/5M5A7532.jpeg", alt: "Wylie and Dawna Stevens singing together during a worship service", w: 2595, h: 3390 },
            ].map((photo, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: "6px",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.w}
                  height={photo.h}
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: "6px" }}
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
