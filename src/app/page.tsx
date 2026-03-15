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
              Our Story
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Wylie&apos;s journey in music began 48 years ago, as a tender four-year-old singing next to his father in a bluegrass band made up of friends who played together every Friday night. At age fourteen, he committed to serving as a music minister, first in the church he grew up in, and later in several other churches in northeast Texas and southern Arkansas. In his desire to share the gospel through song, he became the lead singer of the gospel group Southern Grace Quartet in 2001, and they toured the four-state area of Texas, Arkansas, Oklahoma, and Louisiana.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Although Dawna&apos;s early singing experience was little more than a &ldquo;hairbrush microphone&rdquo; singing with popular songs as a young girl and later in church choirs, singing is such an integral part of her life now that she can&apos;t imagine not singing! After several years of Wylie trying to convince her to sing with him, she finally joined him eight years ago, and together they formed the dynamic duo, &ldquo;Last Song&rdquo;, blending their voices with guitar to create a powerful music ministry. Sharing Christ in song as a couple is one of the greatest joys in their lives.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Through diligent study of the scriptures, mainly the prophecies of Daniel and Revelation, Wylie and Dawna were led to embrace the truths they discovered, which led them to the Seventh-day Adventist church in 2010. Wylie currently serves as an Elder, and Dawna as Music Leader, at the Needles, CA, Seventh-day Adventist church, just across the AZ border.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Through soulful harmonies and heartfelt lyrics, they tell the story of the great exchange made by Jesus on the cross&mdash;our sin for His love&mdash;encouraging listeners to watch, pray, and serve so they are ready for Christ&apos;s glorious return.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              With hearts full of faith and voices lifted in praise, Last Song invites you to join them in celebrating the timeless truths of the gospel.
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
