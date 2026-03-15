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

      {/* Ministry Scripture */}
      <section
        style={{
          background: "var(--color-bg-warm)",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "var(--color-cream)",
              lineHeight: 1.7,
              marginBottom: "16px",
            }}
          >
            &ldquo;Let the word of Christ dwell in you richly in all wisdom, teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord.&rdquo;
          </p>
          <p
            style={{
              color: "var(--color-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Colossians 3:16 NKJV
          </p>
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
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--color-cream)" }}>Last Song</span> is the husband-and-wife duet of Wylie and Dawna Stevens, sharing heartfelt Christian music that blends traditional hymns, scripture songs, and praise songs with simple accompaniment, including acoustic guitar. Their music reflects a deep love for God&apos;s Word and a desire to encourage believers through songs rich in truth, hope, and worship.
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
                marginBottom: "20px",
              }}
            >
              Last Song has a special heart for ministering in churches, Christian gatherings, and outreach events where music can uplift, strengthen, and encourage the body of Christ. More than a performance, each opportunity to share music is viewed as ministry&mdash;serving the Lord, blessing His people, and sharing the message of the Gospel through song.
            </p>
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

      {/* Our Mission */}
      <section className="section-spacing" style={{ background: "var(--color-bg-warm)" }}>
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
              Our Mission
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Last Song serves in their community once a month at The Gardens Care Center, in Kingman, AZ, sharing light and love through singing, prayer, and bible studies with the residents there. In addition to their music, Wylie and Dawna are committed to sharing the gospel through literature and friendship evangelism. In their ministry &ldquo;Wherever You Go&rdquo;, they hand out books, magazines, &amp; DVDs as they go about daily errands and when traveling, seeking the lost and downtrodden to tell them the good news of Jesus, encouraging and praying with them. They also lead several individual and group bible studies, in-home and via Zoom, because as Hosea warns, &ldquo;my people perish for lack of knowledge.&rdquo; Hos 4:6
            </p>
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <Image
              src="/images/IMG_1046.jpeg"
              alt="Wylie and Dawna holding ministry literature"
              width={600}
              height={1034}
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

      {/* CTA */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <Link
            href="/support"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
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
