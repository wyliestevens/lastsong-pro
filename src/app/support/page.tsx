"use client";

import Image from "next/image";
import { useState } from "react";

export default function SupportPage() {
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const amount = customAmount || "0";
    window.location.href = `mailto:dbstevens04@hotmail.com?subject=Donation%20-%20$${amount}&body=I%20would%20like%20to%20make%20a%20donation%20of%20$${amount}%20to%20Last%20Song%20Ministry.%20Please%20send%20me%20instructions%20for%20completing%20my%20gift.`;
  };

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
                Your donation supports our mission to share the
                love of Christ through worship music.
              </p>

              {/* Custom Amount Input */}
              <div
                style={{
                  position: "relative",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-amber)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "18px 20px 18px 40px",
                    background: "rgba(212, 160, 65, 0.08)",
                    border: "1px solid rgba(212, 160, 65, 0.25)",
                    borderRadius: "8px",
                    color: "var(--color-cream)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    outline: "none",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-amber)";
                    e.currentTarget.style.background = "rgba(212, 160, 65, 0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212, 160, 65, 0.25)";
                    e.currentTarget.style.background = "rgba(212, 160, 65, 0.08)";
                  }}
                />
              </div>

              <button
                onClick={handleDonate}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", border: "none", cursor: "pointer" }}
              >
                Donate Now
              </button>

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
                src="/images/support-photo.jpeg"
                alt="Wylie and Dawna leading worship"
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

      {/* Current Ministry Need */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
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
            Current Need
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.3,
              marginBottom: "24px",
            }}
          >
            Help Us Stay on the Road
          </h2>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "16px",
              maxWidth: "650px",
              margin: "0 auto 16px",
            }}
          >
            As our ministry grows and we travel to more churches and events
            across the region, we need a camper shell for our truck to safely
            transport our instruments, sound equipment, and ministry materials.
            This will allow us to be better stewards of the resources God has
            provided and serve more effectively wherever He calls us.
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 500,
              color: "var(--color-amber)",
              marginBottom: "8px",
              marginTop: "32px",
            }}
          >
            $7,000
          </p>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "0.9rem",
              marginBottom: "32px",
            }}
          >
            Estimated cost for camper shell
          </p>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            If God places it on your heart to give toward this specific need,
            please mention &ldquo;camper shell&rdquo; when you reach out. Every
            dollar brings us closer to this goal, and we are grateful for your
            partnership in this ministry.
          </p>
          <a
            href="mailto:dbstevens04@hotmail.com?subject=Donation%20-%20Camper%20Shell%20Project"
            className="btn-primary"
          >
            Give Toward This Project
          </a>
        </div>
      </section>

      {/* Why We Are Not a 501(c)(3) */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-deep)",
        }}
      >
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 24px" }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.3,
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Why We Have Chosen Not to Be a 501(c)(3)
          </h3>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.9,
              marginBottom: "20px",
            }}
          >
            Last Song Ministry operates independently of 501(c)(3) tax-exempt
            status. This is a deliberate and prayerful decision. When an
            organization incorporates as a 501(c)(3), it becomes a
            government-recognized entity subject to state and federal oversight,
            including restrictions on speech, activities, and organizational
            governance. In effect, the organization becomes accountable to the
            state as a condition of its tax-exempt standing.
          </p>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.9,
              marginBottom: "20px",
            }}
          >
            We believe our ministry is called and commissioned by God, and we
            answer to His authority alone. After careful study and sustained
            prayer, we have chosen not to place our ministry under the
            regulatory authority of any government entity. We serve under the
            government of God, not the government of man, and we want to ensure
            that nothing hinders our ability to follow His leading without
            compromise.
          </p>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.9,
              marginBottom: "20px",
            }}
          >
            We hold no judgment toward other ministries that have chosen
            differently. Many faithful organizations operate effectively under
            501(c)(3) status, and we respect their decision to do so. This is
            simply the path God has laid on our hearts for Last Song Ministry.
          </p>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.9,
            }}
          >
            Because of this, donations to Last Song Ministry are not
            tax-deductible. We trust that those who give do so as an act of
            worship and obedience to God, and we are deeply grateful for every
            gift that helps us continue this work.
          </p>
        </div>
      </section>
    </div>
  );
}
