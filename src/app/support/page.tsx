"use client";

import Image from "next/image";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function OneTimeDonation() {
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleDonate = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum < 1) {
      setMessage("Please enter an amount of at least $1.00");
      return;
    }
    setProcessing(true);
    setMessage("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountNum, mode: "payment" }),
      });
      const data = await res.json();
      if (data.error) {
        setMessage(data.error);
        setProcessing(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setMessage("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div>
      <div style={{ position: "relative", marginBottom: "12px" }}>
        <span
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-amber)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.3rem",
            fontWeight: 500,
          }}
        >
          $
        </span>
        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px 10px 28px",
            background: "rgba(212, 160, 65, 0.08)",
            border: "1px solid rgba(212, 160, 65, 0.25)",
            borderRadius: "8px",
            color: "var(--color-cream)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.85rem",
            outline: "none",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        />
      </div>
      <button
        onClick={handleDonate}
        disabled={processing}
        style={{
          width: "100%",
          padding: "10px",
          background: processing
            ? "rgba(212, 160, 65, 0.5)"
            : "linear-gradient(135deg, var(--color-amber), #c4922e)",
          color: "var(--color-bg-deep)",
          fontFamily: "'Quicksand', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          border: "none",
          borderRadius: "4px",
          cursor: processing ? "wait" : "pointer",
        }}
      >
        {processing ? "Redirecting..." : "Donate Now"}
      </button>
      {message && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "0.8rem",
            color: "#e87c7c",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

function PartnerTierButton({
  amount,
  label,
}: {
  amount: number;
  label: string;
}) {
  const [processing, setProcessing] = useState(false);

  const handleSubscribe = async () => {
    setProcessing(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, mode: "subscription" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setProcessing(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={processing}
      style={{
        padding: "8px 18px",
        background: processing
          ? "rgba(212, 160, 65, 0.5)"
          : "linear-gradient(135deg, var(--color-amber), #c4922e)",
        color: "var(--color-bg-deep)",
        fontFamily: "'Quicksand', sans-serif",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "1px",
        textTransform: "uppercase",
        border: "none",
        borderRadius: "4px",
        cursor: processing ? "wait" : "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {processing ? "..." : label}
    </button>
  );
}

function CustomMonthlyDonation() {
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum < 1) {
      setMessage("Please enter an amount of at least $1.00");
      return;
    }
    setProcessing(true);
    setMessage("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountNum, mode: "subscription" }),
      });
      const data = await res.json();
      if (data.error) {
        setMessage(data.error);
        setProcessing(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setMessage("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px 24px",
        background: "var(--color-bg-card)",
        borderRadius: "8px",
        borderLeft: "3px solid var(--color-amber)",
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "var(--color-cream)",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        Choose Your Own Monthly Amount
      </p>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-amber)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              fontWeight: 500,
            }}
          >
            $
          </span>
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px 8px 24px",
              background: "rgba(212, 160, 65, 0.08)",
              border: "1px solid rgba(212, 160, 65, 0.25)",
              borderRadius: "6px",
              color: "var(--color-cream)",
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.85rem",
              outline: "none",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          onClick={handleSubscribe}
          disabled={processing}
          style={{
            padding: "8px 18px",
            background: processing
              ? "rgba(212, 160, 65, 0.5)"
              : "linear-gradient(135deg, var(--color-amber), #c4922e)",
            color: "var(--color-bg-deep)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "4px",
            cursor: processing ? "wait" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {processing ? "..." : "Partner Monthly"}
        </button>
      </div>
      {message && (
        <p
          style={{
            marginTop: "8px",
            fontSize: "0.8rem",
            color: "#e87c7c",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

function PaymentCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--color-bg-card)",
        borderRadius: "8px",
        padding: "16px 12px",
        border: "1px solid rgba(212, 160, 65, 0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem",
          fontWeight: 500,
          color: "var(--color-cream)",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function SupportPage() {
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
            Support Our Ministry
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
            Partner with us
          </p>
        </div>
      </section>

      {/* Scripture */}
      <section
        style={{
          background: "var(--color-bg-warm)",
          padding: "16px 24px 12px",
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
            &ldquo;Whoever brings blessings will be enriched, and one who waters will himself be watered.&rdquo;
          </p>
          <p
            style={{
              color: "var(--color-amber)",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Proverbs 11:25
          </p>
        </div>
      </section>

      {/* Gratitude Quote */}
      <section
        style={{
          padding: "12px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.9,
            }}
          >
            &ldquo;We are so grateful for all who support our music ministry and the zeal God has placed in our hearts to share the gospel. Your generosity through prayer, encouragement, and financial partnership allows us to press on in Jesus&apos; name to advance the Kingdom of Heaven!&rdquo;
          </p>
        </div>
      </section>

      {/* How Your Gift Helps */}
      <section style={{ padding: "12px 0 80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div
            className="grid-2-col mobile-gap-sm"
            style={{
              gap: "60px",
              alignItems: "start",
            }}
          >
            {/* Left side: photos in a 2-column grid (rows of 2) */}
            <div className="grid-2-col" style={{ gap: "12px" }}>
              {[
                { src: "/images/needles_church.jpeg", alt: "Wylie and Dawna leading worship at Needles SDA Church", w: 400, h: 503, caption: "Needles, CA SDA Church" },
                { src: "/images/support_new_3.jpeg", alt: "Wylie and Dawna leading worship at Espanola Valley SDA Church", w: 400, h: 503, caption: "Espanola Valley SDA Church, NM" },
                { src: "/images/support_new_2.jpeg", alt: "Fellowship with the congregation at Springdale SDA Church", w: 400, h: 503, caption: "Springdale, AR SDA Church" },
                { src: "/images/support_new_4.jpeg", alt: "Wylie and Dawna with the congregation at Elk City SDA Church", w: 400, h: 503, caption: "Elk City, OK SDA Church" },
                { src: "/images/support_new_5.jpeg", alt: "Worship service at Searcy SDA Church", w: 400, h: 503, caption: "Searcy, AR SDA Church" },
                { src: "/images/gardens_care.jpeg", alt: "Wylie and Dawna leading worship at Gardens Care Center", w: 400, h: 503, caption: "Gardens Care Center, Kingman, AZ" },
                { src: "/images/castle_valley.jpeg", alt: "Fellowship at Castle Valley Academy", w: 400, h: 503, caption: "Castle Valley Academy, UT" },
              ].map((photo, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px", border: "1px solid rgba(212, 160, 65, 0.15)" }}
                  />
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", fontStyle: "italic", color: "var(--color-cream-muted)", marginTop: "6px" }}>{photo.caption}</p>
                </div>
              ))}
            </div>

            {/* Right side: heading + info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 400,
                  color: "var(--color-cream)",
                  lineHeight: 1.3,
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                How Your Gift Helps
              </h2>
              {[
                { title: "Travel Expenses", desc: "Fuel, lodging, and meals as we travel to churches and events." },
                { title: "Equipment & Music", desc: "Maintaining instruments, sound equipment, and recording resources." },
                { title: "Ministry Outreach", desc: "Reaching more churches and communities with worship and the Gospel message." },
                { title: "Recording Projects", desc: "Producing worship recordings to share our music with a wider audience." },
                { title: "Camper Shell", desc: "To outfit truck for secure transport of audio equipment. Cost: $3400" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px",
                    background: "var(--color-bg-card)",
                    borderRadius: "8px",
                    borderLeft: "3px solid var(--color-amber)",
                  }}
                >
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, color: "var(--color-amber)", marginBottom: "6px" }}>{item.title}</h4>
                  <p style={{ color: "var(--color-cream-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}

              {/* Special Thanks */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    color: "var(--color-amber)",
                    lineHeight: 1.3,
                    marginBottom: "16px",
                    textAlign: "center",
                  }}
                >
                  Special Thanks
                </h3>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                  }}
                >
                  With deepest gratitude, we recognize those whose extraordinary support has quietly and powerfully shaped this ministry.
                </p>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    marginBottom: "0",
                  }}
                >
                  <span style={{ color: "var(--color-cream)", fontWeight: 600 }}>Valued Friends</span> &mdash; Old and new, who see the vision God has given us, who have encouraged us by attending our events, inviting us to sing, worshipping and singing alongside us, eagerly awaiting the advancement of our ministry, and faithfully praying for us, you are a blessing!
                </p>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    marginBottom: "0",
                    marginTop: "16px",
                  }}
                >
                  <span style={{ color: "var(--color-cream)", fontWeight: 600 }}>Needles SDA Church</span> &mdash; Your constant love, prayerful support, valued input in song choices, and the arena to strengthen and refine our music skills bless us beyond measure! It&apos;s an honor to serve alongside you as music leader and elder.
                </p>
                <p
                  style={{
                    color: "var(--color-cream-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    marginBottom: "0",
                    marginTop: "16px",
                  }}
                >
                  <span style={{ color: "var(--color-cream)", fontWeight: 600 }}>Allen Howard</span> &mdash; The Candle Studio, Needles, CA. Producer and sound engineer of our music project, &ldquo;In The Beginning.&rdquo; Your belief in us and our God-given mission has never wavered. Your friendship, guidance, well-honed ear, audio skills and the &lsquo;patience of the saints&rsquo; has brought our first music project to life.
                </p>

                {/* Studio photos */}
                <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      src="/images/studio_all_of_us.jpeg"
                      alt="Wylie, Dawna, and Allen Howard at The Candle Studio"
                      width={3348}
                      height={2442}
                      style={{
                        width: "75%",
                        height: "auto",
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "8px",
                        border: "1px solid rgba(212, 160, 65, 0.15)",
                      }}
                    />
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", fontStyle: "italic", color: "var(--color-cream-muted)", marginTop: "6px" }}>
                      Wylie, Dawna, Allen, The Candle Studio
                    </p>
                  </div>

                  <div className="grid-3-col" style={{ gap: "10px" }}>
                    {[
                      { src: "/images/studio_allen.jpeg", alt: "Allen Howard, Sound Engineer at The Candle Studio", w: 1900, h: 2288, caption: "Allen Howard, Sound Engineer" },
                      { src: "/images/studio_dawna.jpeg", alt: "Dawna, Vocals at The Candle Studio", w: 1850, h: 3024, caption: "Dawna, Vocals" },
                      { src: "/images/studio_wylie.jpeg", alt: "Wylie, Guitar and Vocals at The Candle Studio", w: 3024, h: 4032, caption: "Wylie, Guitar/Vocals" },
                    ].map((photo, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            width: "100%",
                            aspectRatio: "3 / 4",
                            position: "relative",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid rgba(212, 160, 65, 0.15)",
                            background: "var(--color-bg-warm)",
                          }}
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                          />
                        </div>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", fontStyle: "italic", color: "var(--color-cream-muted)", marginTop: "6px" }}>
                          {photo.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Give Online + Become a Partner */}
      <section className="section-spacing" style={{ background: "var(--color-bg-warm)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div
            className="grid-2-col mobile-gap-sm"
            style={{
              gap: "60px",
              alignItems: "start",
            }}
          >
            {/* Left: Give Online */}
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "var(--color-cream)",
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                Give Online
              </h2>
              {/* Credit / Debit Card - full width */}
              <div style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 500,
                    color: "var(--color-amber)",
                    textAlign: "center",
                    margin: "0 0 10px",
                    letterSpacing: "0.5px",
                  }}
                >
                  One-Time Gift
                </h3>
                <PaymentCard title="Credit / Debit Card">
                  <OneTimeDonation />
                </PaymentCard>
              </div>

              <div
                className="grid-2-col-payment"
                style={{
                  gap: "20px",
                }}
              >
                {/* PayPal */}
                <PaymentCard title="PayPal">
                  <div style={{ background: "#fff", padding: "8px", borderRadius: "6px" }}>
                    <QRCodeSVG
                      value="https://www.paypal.com/donate/?hosted_button_id=YRKKLNKAQX3JL"
                      size={130}
                    />
                  </div>
                  <p style={{ color: "var(--color-cream-muted)", fontSize: "0.7rem" }}>
                    PayPal Donations
                  </p>
                  <a
                    href="https://www.paypal.com/donate/?hosted_button_id=YRKKLNKAQX3JL"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
                      color: "var(--color-bg-deep)",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Donate via PayPal
                  </a>
                </PaymentCard>

                {/* Venmo */}
                <PaymentCard title="Venmo">
                  <div style={{ background: "#fff", padding: "8px", borderRadius: "6px" }}>
                    <QRCodeSVG
                      value="https://venmo.com/u/Wylie-Stevens"
                      size={130}
                    />
                  </div>
                  <p style={{ color: "var(--color-cream-muted)", fontSize: "0.7rem" }}>
                    @Wylie-Stevens
                  </p>
                  <a
                    href="https://venmo.com/u/Wylie-Stevens"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
                      color: "var(--color-bg-deep)",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Send via Venmo
                  </a>
                </PaymentCard>

                {/* Cash App */}
                <PaymentCard title="Cash App">
                  <div style={{ background: "#fff", padding: "8px", borderRadius: "6px" }}>
                    <QRCodeSVG
                      value="https://cash.app/$WylieStevens"
                      size={130}
                    />
                  </div>
                  <p style={{ color: "var(--color-cream-muted)", fontSize: "0.7rem" }}>
                    $WylieStevens
                  </p>
                  <a
                    href="https://cash.app/$WylieStevens"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
                      color: "var(--color-bg-deep)",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Send via Cash App
                  </a>
                </PaymentCard>

                {/* Zelle */}
                <PaymentCard title="Zelle">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--color-amber)",
                    }}
                  >
                    903-556-3596
                  </p>
                  <p style={{ color: "var(--color-cream-muted)", fontSize: "0.7rem", lineHeight: 1.6 }}>
                    Open your bank app and search Zelle to send to this number.
                  </p>
                  <div style={{ background: "#fff", padding: "8px", borderRadius: "6px" }}>
                    <QRCodeSVG
                      value="tel:9035563596"
                      size={130}
                    />
                  </div>
                </PaymentCard>
              </div>
            </div>

            {/* Right: Become a Partner */}
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "var(--color-cream)",
                  lineHeight: 1.3,
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                Become a Partner
              </h3>
              <p
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                We can&apos;t do this alone, and we were never meant to. If you feel connected to this ministry and what it represents, we invite you to become a monthly partner. Your support helps us continue showing up, pouring out, and reaching others with consistency and care. You&apos;re not just giving, you&apos;re joining the mission.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { amount: 10, label: "$10", perMonth: "per month", tier: "Harvest Worker (Luke 10:2)" },
                  { amount: 25, label: "$25", perMonth: "per month", tier: "Light Bearer (Matt. 5:14-16)" },
                  { amount: 50, label: "$50", perMonth: "per month", tier: "Kingdom Ambassador (2 Cor. 5:20)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="partner-tier"
                    style={{
                      padding: "20px 24px",
                      background: "var(--color-bg-card)",
                      borderRadius: "8px",
                      borderLeft: "3px solid var(--color-amber)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: "var(--color-amber)",
                          marginBottom: "2px",
                        }}
                      >
                        {item.label}{" "}
                        <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "var(--color-cream-muted)" }}>
                          {item.perMonth}
                        </span>
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "0.95rem",
                          fontStyle: "italic",
                          color: "var(--color-cream)",
                          fontWeight: 500,
                        }}
                      >
                        {item.tier}
                      </p>
                    </div>
                    <PartnerTierButton amount={item.amount} label="Partner Now" />
                  </div>
                ))}

                {/* Custom Monthly Amount */}
                <CustomMonthlyDonation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 501(c)(3) Fine Print */}
      <section
        style={{
          padding: "16px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h4
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--color-warm-gray)",
              marginBottom: "12px",
            }}
          >
            501(c)(3) Statement
          </h4>
          <p
            style={{
              color: "var(--color-warm-gray)",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              marginBottom: "10px",
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
              color: "var(--color-warm-gray)",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              marginBottom: "10px",
            }}
          >
            We believe our ministry is called and commissioned by God, and we
            answer to His authority alone. After careful study and
            prayer, we have chosen not to place our ministry under the
            regulatory authority of any government entity. We serve under the
            government of God, not the government of man, and we want to ensure
            that nothing hinders our ability to follow His leading without
            compromise.
          </p>
          <p
            style={{
              color: "var(--color-warm-gray)",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              marginBottom: "10px",
            }}
          >
            We hold no judgment toward other ministries that have chosen
            differently. Many faithful organizations operate effectively under
            501(c)(3) status, and we respect their decision to do so. This is
            simply the path God has laid on our hearts for Last Song Ministry.
          </p>
          <p
            style={{
              color: "var(--color-warm-gray)",
              fontSize: "0.85rem",
              lineHeight: 1.8,
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
