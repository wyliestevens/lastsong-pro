"use client";

import Image from "next/image";

export default function SupportPage() {
  return (
    <div style={{ paddingTop: "100px" }}>
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 24px 40px",
          maxWidth: "800px",
          margin: "0 auto",
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
          Give
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
          Support Our Ministry
        </h1>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--color-amber)",
            margin: "0 auto 24px",
          }}
        />
        <p
          style={{
            color: "var(--color-cream-muted)",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Your generosity helps us continue sharing the Gospel through music.
          Every gift, no matter the size, fuels our ministry and reaches more
          hearts.
        </p>
      </section>

      {/* Donation Section */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* Left - Info */}
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
              How Your Gift Helps
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  title: "Travel Expenses",
                  desc: "Fuel, lodging, and meals as we travel to churches and events across the region.",
                },
                {
                  title: "Equipment & Music",
                  desc: "Maintaining instruments, sound equipment, and recording resources.",
                },
                {
                  title: "Ministry Outreach",
                  desc: "Reaching more churches and communities with worship and the Gospel message.",
                },
                {
                  title: "Recording Projects",
                  desc: "Producing worship recordings to share our music with a wider audience.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 24px",
                    background: "var(--color-bg-card)",
                    borderRadius: "8px",
                    borderLeft: "3px solid var(--color-amber)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--color-amber)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      color: "var(--color-cream-muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "32px",
                padding: "24px",
                borderTop: "1px solid var(--color-divider)",
                borderBottom: "1px solid var(--color-divider)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  color: "var(--color-cream)",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                &ldquo;Each one must give as he has decided in his heart, not
                reluctantly or under compulsion, for God loves a cheerful
                giver.&rdquo;
              </p>
              <p
                style={{
                  color: "var(--color-amber)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                2 Corinthians 9:7 NKJV
              </p>
            </div>
          </div>

          {/* Right - Donate Card */}
          <div>
            <div
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "12px",
                padding: "40px",
                border: "1px solid rgba(212, 160, 65, 0.2)",
                textAlign: "center",
                position: "sticky",
                top: "120px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(212, 160, 65, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  border: "1px solid rgba(212, 160, 65, 0.2)",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-amber)"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: 500,
                  color: "var(--color-cream)",
                  marginBottom: "12px",
                }}
              >
                Make a Donation
              </h3>
              <p
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                Your tax-deductible donation supports our mission to share the
                love of Christ through worship music.
              </p>

              {/* Donation buttons - placeholder amounts */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {["$25", "$50", "$100", "$250"].map((amount) => (
                  <button
                    key={amount}
                    style={{
                      padding: "14px",
                      background: "rgba(212, 160, 65, 0.08)",
                      border: "1px solid rgba(212, 160, 65, 0.25)",
                      borderRadius: "8px",
                      color: "var(--color-cream)",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(212, 160, 65, 0.15)";
                      e.currentTarget.style.borderColor = "var(--color-amber)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(212, 160, 65, 0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(212, 160, 65, 0.25)";
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <a
                href="mailto:contact@lastsong.pro?subject=Donation%20Inquiry"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Donate Now
              </a>

              <p
                style={{
                  color: "var(--color-warm-gray)",
                  fontSize: "0.8rem",
                  marginTop: "20px",
                  lineHeight: 1.6,
                }}
              >
                Contact us directly to arrange your donation via check, Zelle,
                or other methods.
              </p>
            </div>

            {/* Photo */}
            <div
              style={{
                marginTop: "24px",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/images/IMG_1750.jpeg"
                alt="Wylie and Dawna at church"
                width={500}
                height={375}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
