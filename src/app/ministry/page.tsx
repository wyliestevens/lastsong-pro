import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Ministry",
  description: "Last Song Ministry serves through church worship, special events, and community outreach. Wylie and Dawna Stevens bring heartfelt gospel music to congregations and gatherings.",
};

export default function MinistryPage() {
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
              "linear-gradient(to bottom, rgba(15,13,10,0.6) 0%, rgba(15,13,10,0.85) 60%, rgba(15,13,10,1) 100%)",
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
            }}
          >
            What We Do
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
            Our Ministry
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

      {/* Ministry Areas */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              marginBottom: "80px",
            }}
          >
            {[
              {
                title: "Church Worship",
                description:
                  "We lead worship and provide special music for church services, revivals, and special events. We bring heartfelt worship to your congregation.",
                icon: "🎵",
              },
              {
                title: "Special Events",
                description:
                  "From conferences to community gatherings, we bring music that sets the tone for meaningful connection and spiritual renewal.",
                icon: "🎶",
              },
              {
                title: "Revivals & Retreats",
                description:
                  "Extended worship sets for revivals, retreats, and multi-day events where sustained worship creates space for deeper spiritual encounters.",
                icon: "🎸",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: "var(--color-bg-card)",
                  borderRadius: "8px",
                  padding: "40px 32px",
                  border: "1px solid var(--color-divider)",
                }}
              >
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "20px" }}>
                  {item.icon}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--color-cream)",
                    marginBottom: "16px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Photo + Text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
              }}
              className="image-shine"
            >
              <Image
                src="/images/7790520840868875662.jpeg"
                alt="Wylie and Dawna Stevens leading worship with cross and flags"
                width={600}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 400,
                  color: "var(--color-cream)",
                  lineHeight: 1.3,
                  marginBottom: "24px",
                }}
              >
                Bringing Music to Your Church
              </h2>
              <p
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "1rem",
                  lineHeight: 1.9,
                  marginBottom: "24px",
                }}
              >
                We serve churches of all sizes. Our goal is to partner with your
                existing worship ministry and supplement your services with music
                that glorifies God and encourages your congregation.
              </p>
              <p
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "1rem",
                  lineHeight: 1.9,
                  marginBottom: "32px",
                }}
              >
                If you are interested in having Last Song minister at your
                church or event, we would love to hear from you.
              </p>
              <Link href="/schedule" className="btn-primary">
                View Our Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              padding: "48px 32px",
              borderTop: "1px solid var(--color-divider)",
              borderBottom: "1px solid var(--color-divider)",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontStyle: "italic",
                color: "var(--color-cream)",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              &ldquo;Make a joyful shout to the Lord, all you lands! Serve the
              Lord with gladness; come before His presence with singing.&rdquo;
            </p>
            <p
              style={{
                color: "var(--color-amber)",
                fontSize: "0.95rem",
                fontWeight: 500,
              }}
            >
              Psalm 100:1-2 NKJV
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
