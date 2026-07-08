import Image from "next/image";

export const metadata = {
  title: "Promotional Materials",
  description:
    "Download promotional posters and bulletin inserts for Last Song music ministry events.",
};

const materials = [
  {
    title: "Bulletin Insert — 2-Up",
    description:
      "Two inserts per page, ready to cut. Ideal for church bulletins and handouts.",
    file: "/LastSong_BulletinInsert_2up.pdf",
    size: "2-up on letter",
  },
  {
    title: "Event Poster — 8.5 x 11",
    description:
      "Portrait poster with space for date, time, and location. Perfect for printing on standard letter-size paper.",
    file: "/LastSong_Poster_Portrait_8.5x11.pdf",
    size: '8.5" x 11"',
  },
  {
    title: "Event Poster — 11 x 17",
    description:
      "Large format poster with space for date, time, and location. Great for bulletin boards and community postings.",
    file: "/LastSong_Poster_11x17.pdf",
    size: '11" x 17"',
  },
];

export default function PromotionalPage() {
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
            Downloads
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
            Promotional Materials
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

      {/* Intro */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              marginBottom: "48px",
            }}
          >
            Planning a Last Song event at your church or venue? Download these
            print-ready materials to help spread the word. Each file includes
            space for you to add the date, time, and location of your event.
          </p>
        </div>
      </section>

      {/* Download Cards */}
      <section style={{ paddingBottom: "80px" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
          }}
        >
          {materials.map((item, i) => (
            <div
              key={i}
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "8px",
                padding: "36px 28px",
                borderTop: "3px solid var(--color-amber)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--color-cream)",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {item.description}
              </p>
              <p
                style={{
                  color: "var(--color-amber)",
                  fontSize: "0.8rem",
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {item.size} &bull; PDF
              </p>
              <a
                href={item.file}
                download
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  padding: "12px 28px",
                  background: "var(--color-amber)",
                  color: "#0f0d0a",
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: "4px",
                  textAlign: "center",
                  transition: "background 0.3s ease",
                }}
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Scripture Quote */}
      <section
        className="section-spacing"
        style={{ background: "var(--color-bg-warm)" }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
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
              &ldquo;Sing to the LORD a new song; sing to the LORD, all the
              earth.&rdquo;
            </p>
            <p
              style={{
                color: "var(--color-amber)",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Psalm 96:1
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
