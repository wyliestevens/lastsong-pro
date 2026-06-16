"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    church: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          church: formData.church || "N/A",
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to send. Please email admin@lastsong.pro directly.";
      setError(msg);
    } finally {
      setSending(false);
    }
  };

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
              "linear-gradient(to bottom, rgba(15,13,10,0.15) 0%, rgba(15,13,10,0.35) 50%, rgba(15,13,10,0.85) 100%)",
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
            Contact Us
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
            Get in Touch
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div
          className="grid-2-col mobile-gap-sm"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* Left: Info */}
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
              We Would Love to Hear From You
            </h2>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              Whether you are interested in having Last Song minister at your church, revival, retreat, or special event, or you would like to connect with us about our music ministry, please reach out. We look forward to hearing from you.
            </p>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "1rem",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              You are welcome to use the contact form or email us directly at the address below.
            </p>

            <div
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "8px",
                padding: "32px",
                border: "1px solid var(--color-divider)",
                marginBottom: "32px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--color-amber)",
                  marginBottom: "16px",
                }}
              >
                Email
              </p>
              <a
                href="mailto:admin@lastsong.pro?subject=Inquiry%20-%20Last%20Song%20Ministry"
                style={{
                  color: "var(--color-cream)",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(212, 160, 65, 0.3)",
                  paddingBottom: "2px",
                  transition: "border-color 0.3s ease",
                }}
              >
                admin@lastsong.pro
              </a>
            </div>

            <div style={{ borderRadius: "8px" }}>
              <Image
                src="/images/contact_photo.jpeg"
                alt="Wylie and Dawna Stevens"
                width={1140}
                height={1600}
                style={{
                  width: "50%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                  margin: "0 auto",
                }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontStyle: "italic",
                  color: "var(--color-cream)",
                  lineHeight: 1.6,
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                &ldquo;We would be honored to visit your church and share a time of worship and encouragement through music.&rdquo;
              </p>
              <p
                style={{
                  color: "var(--color-amber)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                Wylie &amp; Dawna Stevens
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "12px",
              padding: "40px",
              border: "1px solid rgba(212, 160, 65, 0.2)",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "var(--color-cream)",
                marginBottom: "8px",
              }}
            >
              Send Us a Message
            </h3>
            <p
              style={{
                color: "var(--color-cream-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                marginBottom: "32px",
              }}
            >
              Fill out the form below and we will get back to you as soon as possible.
            </p>

            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    color: "var(--color-cream)",
                    marginBottom: "16px",
                  }}
                >
                  Thank You
                </p>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  Your message has been sent. We will be in touch soon. If you prefer, you can also email us directly at admin@lastsong.pro.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", church: "", message: "" });
                  }}
                  style={{
                    background: "rgba(212, 160, 65, 0.1)",
                    border: "1px solid rgba(212, 160, 65, 0.3)",
                    borderRadius: "6px",
                    padding: "12px 24px",
                    color: "var(--color-amber)",
                    cursor: "pointer",
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "var(--color-cream-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(15, 13, 10, 0.6)",
                      border: "1px solid var(--color-divider)",
                      borderRadius: "6px",
                      color: "var(--color-cream)",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "var(--color-cream-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(15, 13, 10, 0.6)",
                      border: "1px solid var(--color-divider)",
                      borderRadius: "6px",
                      color: "var(--color-cream)",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="church"
                    style={{
                      display: "block",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "var(--color-cream-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    Church / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="church"
                    name="church"
                    value={formData.church}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(15, 13, 10, 0.6)",
                      border: "1px solid var(--color-divider)",
                      borderRadius: "6px",
                      color: "var(--color-cream)",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "var(--color-cream-muted)",
                      marginBottom: "8px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(15, 13, 10, 0.6)",
                      border: "1px solid var(--color-divider)",
                      borderRadius: "6px",
                      color: "var(--color-cream)",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.3s ease",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      marginBottom: "16px",
                      padding: "12px 16px",
                      background: "rgba(200, 60, 60, 0.12)",
                      border: "1px solid rgba(200, 60, 60, 0.4)",
                      borderRadius: "6px",
                      color: "#f1b4b4",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    display: "inline-block",
                    padding: "16px 40px",
                    background: sending
                      ? "rgba(212, 160, 65, 0.4)"
                      : "linear-gradient(135deg, var(--color-amber), #c4922e)",
                    color: "var(--color-bg-deep)",
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "6px",
                    cursor: sending ? "not-allowed" : "pointer",
                    width: "100%",
                  }}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-deep)",
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
