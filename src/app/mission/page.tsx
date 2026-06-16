import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Our Mission",
  description: "Learn about the mission of Last Song Ministry - sharing the Gospel through music, Bible studies, literature evangelism, and Christian counseling.",
};

export default function MissionPage() {
  return (
    <div>
      {/* Hero with Background Image */}
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
          alt=""
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
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#ffffff",
              marginBottom: "8px",
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)",
            }}
          >
            Our Mission
          </h1>
          <p
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
              fontWeight: 600,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)",
            }}
          >
            Sharing the Gospel
          </p>
        </div>
      </section>

      {/* Scripture */}
      <section
        style={{
          background: "var(--color-bg-warm)",
          padding: "16px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
            &ldquo;Sing praises to the Lord, for He has done gloriously; let this be made known in all the Earth.&rdquo;
          </p>
          <p
            style={{
              color: "var(--color-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Isaiah 12:5
          </p>
        </div>
      </section>

      {/* Mission Content */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div
          className="grid-2-col mobile-gap-sm"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            gap: "60px",
            alignItems: "start",
            direction: "rtl",
          }}
        >
          <div style={{ direction: "ltr" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: 400,
                color: "var(--color-cream)",
                lineHeight: 1.3,
                marginBottom: "24px",
                marginTop: 0,
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
              In addition to their music, Wylie and Dawna are committed to sharing the gospel through friendship evangelism. They pray for opportunities to study the Word of God with others and currently have four active weekly Bible studies via Zoom and in-person. One of their greatest joys is to share the Bible truths that are making such an impact in their own lives.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Wylie uses social media to &lsquo;exhort and encourage the brethren&rsquo; (1 Thess. 5:11) by posting his video series &ldquo;A Year of Knowing God&rdquo; &mdash; a 365-day devotional journey written for real people walking through real life; honest, scripture-grounded truth, delivered in a voice that meets you exactly where you are. (
              <a href="https://www.youtube.com/@practicalrighteousness9387" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>YouTube</a>
              ,{" "}
              <a href="https://www.facebook.com/wylie.stevens.2025" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>Facebook</a>
              ,{" "}
              <a href="https://www.tiktok.com/@aipeakbiz" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>TikTok</a>
              ,{" "}
              <a href="https://www.linkedin.com/in/aipeakbiz/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>LinkedIn</a>
              ,{" "}
              <a href="https://www.instagram.com/wylie.stevens/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-amber)", textDecoration: "underline" }}>Instagram</a>
              )
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Last Song also serves in their community once a month at The Gardens Care Center, in Kingman, AZ, sharing light and love through singing, prayer, and bible studies with the residents there.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              In their ministry &ldquo;Wherever You Go&rdquo;, they hand out books, magazines, and DVDs as they travel for music engagements and as they go about daily errands, seeking the lost and downtrodden to tell them the good news of Jesus, encouraging and praying with them.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Wylie is also a regular speaker at their home church in Needles, CA. One of his favorite sermons to give is entitled &ldquo;Standard Operating Equipment&rdquo; where he teaches and reminds that all in the family of God are called to fulfill the Great Commission to &ldquo;go and make disciples&rdquo; (Matthew 28:16-20). He and Dawna organize the assembly of literature bags filled with various Bible-based books, magazines, Glow tracks, and other materials, and invite church members in an altar call at the close of service to take the literature bags to keep in their vehicles and hand out as they go about their daily activities. He then leads a prayer of blessing over the congregants as they commit to giving out the materials to share Jesus with others.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Dawna is a licensed therapist and provides a free Christian counseling ministry to members of their church. She comes alongside them to facilitate healing from &ldquo;hurts, habits, and hang-ups&rdquo; using Biblical principles, our identity in Christ and His overcoming power, along with her professional training.
            </p>
          </div>
          <div
            style={{
              borderRadius: "8px",
              direction: "ltr",
            }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <Image
                  src="/images/IMG_1046.jpeg"
                  alt="Wylie and Dawna holding ministry literature"
                  width={800}
                  height={1157}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "var(--color-cream-muted)",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  Literature Ministry
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <Image
                  src="/images/wylie_speaking.jpeg"
                  alt="Wylie preaching from the pulpit"
                  width={951}
                  height={1375}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "var(--color-cream-muted)",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  Wylie Speaking
                </p>
              </div>
            </div>
            <div style={{ marginTop: "20px", width: "85%", marginLeft: "auto", marginRight: "auto" }}>
              <Image
                src="/images/bible_study.jpeg"
                alt="Wylie and Dawna leading a Bible study"
                width={1600}
                height={764}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "var(--color-cream-muted)",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Bible Study
              </p>
            </div>
            <div style={{ marginTop: "20px", width: "85%", marginLeft: "auto", marginRight: "auto" }}>
              <Image
                src="/images/bible_study_gardens.jpeg"
                alt="Bible study at The Gardens"
                width={1600}
                height={1145}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "var(--color-cream-muted)",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Bible Study at the Gardens
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
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
