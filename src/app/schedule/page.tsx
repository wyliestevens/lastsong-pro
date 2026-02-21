import Link from "next/link";

export const metadata = {
  title: "Schedule | Last Song",
  description: "See where Last Song will be ministering next.",
};

export default function SchedulePage() {
  const upcomingEvents = [
    {
      date: "Coming Soon",
      title: "Schedule Updates",
      location: "Check back for upcoming events",
      description:
        "We are currently booking events for the upcoming season. Contact us if you would like Last Song to minister at your church or event.",
    },
  ];

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
          Where We&apos;ll Be
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
          Schedule
        </h1>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--color-amber)",
            margin: "0 auto",
          }}
        />
      </section>

      {/* Events */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {upcomingEvents.map((event, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "8px",
                padding: "40px",
                border: "1px solid var(--color-divider)",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "32px",
                  alignItems: "start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    background: "rgba(212, 160, 65, 0.1)",
                    borderRadius: "8px",
                    padding: "16px 24px",
                    textAlign: "center",
                    minWidth: "120px",
                    border: "1px solid rgba(212, 160, 65, 0.2)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--color-amber)",
                    }}
                  >
                    {event.date}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      color: "var(--color-cream)",
                      marginBottom: "8px",
                    }}
                  >
                    {event.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--color-amber)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      marginBottom: "12px",
                    }}
                  >
                    {event.location}
                  </p>
                  <p
                    style={{
                      color: "var(--color-cream-muted)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section
        className="section-spacing"
        style={{
          background: "var(--color-bg-warm)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
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
            Invite Us to Your Church
          </h2>
          <p
            style={{
              color: "var(--color-cream-muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "32px",
            }}
          >
            We would love to bring our music ministry to your church, revival,
            retreat, or special event. Reach out to us and let&apos;s connect.
          </p>
          <a href="mailto:contact@lastsong.pro" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
