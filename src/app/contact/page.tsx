"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    church: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Contact from Last Song Website");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nChurch/Organization: ${formData.church}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:dbstevens04@hotmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
            Get in Touch
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
            Contact Us
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

      {/* Contact Content */}
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
                href="mailto:dbstevens04@hotmail.com?subject=Inquiry%20-%20Last%20Song%20Ministry"
                style={{
                  color: "var(--color-cream)",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(212, 160, 65, 0.3)",
                  paddingBottom: "2px",
                  transition: "border-color 0.3s ease",
                }}
              >
                dbstevens04@hotmail.com
              </a>
            </div>

            <div style={{ borderRadius: "8px" }}>
              <Image
                src="/images/5M5A7470_new.jpeg"
                alt="Wylie and Dawna Stevens"
                width={600}
                height={800}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
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
              Fill out the form below and your email client will open with your message ready to send.
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
                  Your email client should have opened with your message. If it did not, please email us directly at dbstevens04@hotmail.com.
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

                <button
                  type="submit"
                  style={{
                    display: "inline-block",
                    padding: "16px 40px",
                    background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
                    color: "var(--color-bg-deep)",
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
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
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
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
            &ldquo;We would be honored to visit your church and share a time of worship and encouragement through music.&rdquo;
          </p>
          <p
            style={{
              color: "var(--color-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Wylie &amp; Dawna Stevens
          </p>
        </div>
      </section>
    </div>
  );
}
