"use client";

import Image from "next/image";
import { useState } from "react";

function getFirstSaturday(year: number, month: number) {
  const date = new Date(year, month, 1);
  const day = date.getDay();
  const firstSat = day === 6 ? 1 : (6 - day + 1);
  return firstSat;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function SchedulePage() {
  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());

  const firstSat = getFirstSaturday(calYear, calMonth);
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const startDay = getStartDay(calYear, calMonth);
  const today = now.getDate();
  const isCurrentMonth = calMonth === now.getMonth() && calYear === now.getFullYear();

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

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
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Schedule
          </h1>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "var(--color-amber)",
              margin: "0 auto 32px",
            }}
          />
          <a
            href="mailto:dbstevens04@hotmail.com?subject=Booking%20Inquiry%20-%20Last%20Song%20Ministry"
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
              textDecoration: "none",
              borderRadius: "6px",
              textShadow: "none",
            }}
          >
            Invite Us to Your Church or Event
          </a>
        </div>
      </section>

      {/* Calendar + Event */}
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
          {/* Calendar */}
          <div
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "12px",
              padding: "32px",
              border: "1px solid rgba(212, 160, 65, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <button
                onClick={prevMonth}
                style={{
                  background: "rgba(212, 160, 65, 0.1)",
                  border: "1px solid rgba(212, 160, 65, 0.3)",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  color: "var(--color-amber)",
                  cursor: "pointer",
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Prev
              </button>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  color: "var(--color-cream)",
                }}
              >
                {MONTH_NAMES[calMonth]} {calYear}
              </h3>
              <button
                onClick={nextMonth}
                style={{
                  background: "rgba(212, 160, 65, 0.1)",
                  border: "1px solid rgba(212, 160, 65, 0.3)",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  color: "var(--color-amber)",
                  cursor: "pointer",
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Next
              </button>
            </div>

            {/* Day headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center",
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    color: "var(--color-cream-muted)",
                    padding: "8px 0",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "4px",
              }}
            >
              {days.map((day, i) => {
                const isFirstSat = day === firstSat;
                const isToday = isCurrentMonth && day === today;
                return (
                  <div
                    key={i}
                    style={{
                      textAlign: "center",
                      padding: "10px 4px",
                      borderRadius: "6px",
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: isFirstSat ? 700 : 400,
                      color: isFirstSat
                        ? "var(--color-bg-deep)"
                        : isToday
                        ? "var(--color-amber)"
                        : day
                        ? "var(--color-cream-muted)"
                        : "transparent",
                      background: isFirstSat
                        ? "linear-gradient(135deg, var(--color-amber), #c4922e)"
                        : isToday
                        ? "rgba(212, 160, 65, 0.15)"
                        : "transparent",
                      border: isToday && !isFirstSat
                        ? "1px solid rgba(212, 160, 65, 0.4)"
                        : "1px solid transparent",
                    }}
                  >
                    {day || ""}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "12px 16px",
                background: "rgba(212, 160, 65, 0.08)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  background: "linear-gradient(135deg, var(--color-amber), #c4922e)",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--color-cream-muted)",
                }}
              >
                Highlighted: Worship at The Gardens (1st Saturday)
              </p>
            </div>
          </div>

          {/* Event Card + Photo */}
          <div>
            <div
              style={{
                background: "var(--color-bg-card)",
                borderRadius: "8px",
                padding: "40px",
                border: "1px solid var(--color-divider)",
                marginBottom: "24px",
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
                  marginBottom: "12px",
                }}
              >
                Recurring Event
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--color-cream)",
                  marginBottom: "8px",
                }}
              >
                Worship at The Gardens
              </h3>
              <p
                style={{
                  color: "var(--color-amber)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                The Gardens, Kingman, AZ
              </p>
              <p
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  marginBottom: "16px",
                }}
              >
                1st Saturday of Every Month at 11:30 AM
              </p>
              <p
                style={{
                  color: "var(--color-cream-muted)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                Join us the first Saturday of every month at 11:30 AM as we lead
                worship at The Gardens in Kingman, Arizona. Come be part of a
                beautiful time of praise and fellowship.
              </p>
            </div>

            <div style={{ borderRadius: "8px", overflow: "hidden" }}>
              <Image
                src="/images/5M5A7520.jpeg"
                alt="Wylie and Dawna Stevens worship session"
                width={600}
                height={800}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>
          </div>
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
            Invite Us to Your Church or Event
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
          <a href="mailto:dbstevens04@hotmail.com?subject=Booking%20Inquiry%20-%20Last%20Song%20Ministry" className="btn-primary">
            Contact Us to Schedule
          </a>
        </div>
      </section>
    </div>
  );
}
