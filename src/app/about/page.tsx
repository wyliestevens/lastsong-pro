import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "Learn about Wylie and Dawna Stevens, the husband and wife worship duo behind Last Song Ministry. 48 years of music, sharing the Gospel through song in Kingman, AZ.",
};

export default function AboutPage() {
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
              "linear-gradient(to bottom, rgba(15,13,10,0.15) 0%, rgba(15,13,10,0.35) 50%, rgba(15,13,10,0.85) 100%)",
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
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
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
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
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
        </div>
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
                marginBottom: "24px",
              }}
            >
              Wylie&apos;s journey in music began 48 years ago, as a tender
              four-year-old singing next to his father in a bluegrass band made
              up of friends who played together every Friday night. At age
              sixteen, he committed to serving as a music minister, first at the
              church he grew up in and later at several other churches in
              northeast Texas and southern Arkansas. In his desire to share the
              gospel through song, he became lead singer of the gospel quartet
              Southern Grace in 2001, which toured the four-state area of Texas,
              Arkansas, Oklahoma, and Louisiana.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              Although Dawna&apos;s singing experience was little more than a
              &ldquo;hairbrush microphone&rdquo; singing with popular songs as a
              young girl and church choirs, after several years of Wylie trying
              to convince her to sing with him, she finally joined him eight
              years ago, and together they formed the dynamic duo,
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
                marginBottom: "24px",
              }}
            >
              Last Song serves their community by singing monthly at The Gardens
              Rehab and Care Center in Kingman, AZ, sharing light and love with
              the residents. In addition to their music, Wylie and Dawna are
              committed to spreading the good news, sharing the gospel through
              literature and friendship evangelism. In their ministry
              &ldquo;Wherever You Go&rdquo;, they hand out books, magazines,
              &amp; DVDs as they go about daily errands and when traveling,
              seeking the lost and downtrodden to tell them the good news of
              Jesus, encouraging and praying with them. They also lead individual
              and group Bible studies, in person and via Zoom, because, as Hosea
              warns, &ldquo;my people are destroyed for lack of
              knowledge.&rdquo; Hosea 4:6
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              With hearts full of faith and voices lifted in praise, Last Song
              invites you to join them in celebrating the timeless truths of the
              gospel, ever reminding the faithful that the best is yet to come.
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
              "/images/IMG_0986.jpeg",
              "/images/5M5A7470_new.jpeg",
              "/images/1000000279.jpeg",
              "/images/7790520840868875662.jpeg",
              "/images/IMG_1046.jpeg",
              "/images/1000000248.jpeg",
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
