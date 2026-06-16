"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import schedule from "@/data/content/schedule.json";

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

type Range = { startMonth: number; startDay: number; endMonth: number; endDay: number };
type SpecialEvent = {
  title: string;
  location: string;
  dateText: string;
  description?: string;
  year: number;
  ranges: Range[];
};

export default function SchedulePage() {
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const checkMonth = () => {
      const now = new Date();
      setCalMonth(now.getMonth());
      setCalYear(now.getFullYear());
    };
    const interval = setInterval(checkMonth, 60000);
    return () => clearInterval(interval);
  }, []);

  const firstSat = getFirstSaturday(calYear, calMonth);
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const startDay = getStartDay(calYear, calMonth);
  const now = new Date();
  const today = now.getDate();
  const isCurrentMonth = calMonth === now.getMonth() && calYear === now.getFullYear();

  const specialEvents: SpecialEvent[] = (schedule.specialEvents as SpecialEvent[]) || [];

  const isSpecialEvent = (day: number | null) => {
    if (!day) return false;
    return specialEvents.some((e) =>
      calYear === e.year &&
      (e.ranges || []).some(
        (r) => calMonth === r.startMonth && day >= r.startDay && day <= r.endDay
      )
    );
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div>
      {/* Hero */}
      <section
        className="hero-section"
        style={{ position: "relative", height: "85vh", minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        <Image src={schedule.hero.image} alt="" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,13,10,0.15) 0%, rgba(15,13,10,0.3) 50%, rgba(15,13,10,0.85) 100%)" }} />
        <div className="hero-text-mobile" style={{ position: "absolute", top: "15%", right: "15%", zIndex: 2, textAlign: "center", padding: "0", maxWidth: "600px" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.2, color: "#ffffff", marginBottom: "8px", textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)" }}>
            {schedule.hero.title}
          </h1>
          <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "clamp(1rem, 2.2vw, 1.4rem)", fontWeight: 600, letterSpacing: "4px", textTransform: "uppercase", color: "#ffffff", marginBottom: "20px", textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.5)" }}>
            {schedule.hero.subtitle}
          </p>
          <a href={schedule.hero.ctaHref} style={{ display: "inline-block", padding: "16px 40px", background: "linear-gradient(135deg, var(--color-amber), #c4922e)", color: "var(--color-bg-deep)", fontFamily: "'Quicksand', sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", borderRadius: "6px", textShadow: "none" }}>
            {schedule.hero.ctaText}
          </a>
        </div>
      </section>

      {/* Scripture */}
      <section style={{ background: "var(--color-bg-warm)", padding: "16px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: "var(--color-cream)", lineHeight: 1.7, marginBottom: "16px" }}>
            &ldquo;{schedule.scripture.text}&rdquo;
          </p>
          <p style={{ color: "var(--color-amber)", fontSize: "0.95rem", fontWeight: 500 }}>{schedule.scripture.reference}</p>
        </div>
      </section>

      {/* Calendar + Events */}
      <section className="section-spacing" style={{ paddingTop: "40px" }}>
        <div className="grid-2-col mobile-gap-sm" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", gap: "60px", alignItems: "start" }}>
          {/* Calendar */}
          <div style={{ background: "var(--color-bg-card)", borderRadius: "12px", padding: "32px", border: "1px solid rgba(212, 160, 65, 0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <button onClick={prevMonth} style={{ background: "rgba(212, 160, 65, 0.1)", border: "1px solid rgba(212, 160, 65, 0.3)", borderRadius: "6px", padding: "8px 16px", color: "var(--color-amber)", cursor: "pointer", fontFamily: "'Quicksand', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}>Prev</button>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, color: "var(--color-cream)" }}>
                {MONTH_NAMES[calMonth]} {calYear}
              </h3>
              <button onClick={nextMonth} style={{ background: "rgba(212, 160, 65, 0.1)", border: "1px solid rgba(212, 160, 65, 0.3)", borderRadius: "6px", padding: "8px 16px", color: "var(--color-amber)", cursor: "pointer", fontFamily: "'Quicksand', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}>Next</button>
            </div>

            <div className="grid-7-col" style={{ gap: "4px", marginBottom: "8px" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} style={{ textAlign: "center", fontFamily: "'Quicksand', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1px", color: "var(--color-cream-muted)", padding: "8px 0" }}>{d}</div>
              ))}
            </div>

            <div className="grid-7-col" style={{ gap: "4px" }}>
              {days.map((day, i) => {
                const isFirstSat = day === firstSat;
                const isToday = isCurrentMonth && day === today;
                const isEvent = isSpecialEvent(day);
                return (
                  <div key={i} style={{
                    textAlign: "center", padding: "10px 4px", borderRadius: "6px",
                    fontFamily: "'Quicksand', sans-serif", fontSize: "0.9rem",
                    fontWeight: isFirstSat || isEvent ? 700 : 400,
                    color: isFirstSat ? "var(--color-bg-deep)" : isEvent ? "#fff" : isToday ? "var(--color-amber)" : day ? "var(--color-cream-muted)" : "transparent",
                    background: isFirstSat ? "linear-gradient(135deg, var(--color-amber), #c4922e)" : isEvent ? "rgba(120, 80, 200, 0.7)" : isToday ? "rgba(212, 160, 65, 0.15)" : "transparent",
                    border: isToday && !isFirstSat && !isEvent ? "1px solid rgba(212, 160, 65, 0.4)" : "1px solid transparent",
                  }}>{day || ""}</div>
                );
              })}
            </div>

            <div style={{ marginTop: "20px", padding: "12px 16px", background: "rgba(212, 160, 65, 0.08)", borderRadius: "6px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "linear-gradient(135deg, var(--color-amber), #c4922e)", flexShrink: 0 }} />
              <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "0.8rem", color: "var(--color-cream-muted)" }}>
                Highlighted: Worship at The Gardens (1st Saturday)
              </p>
            </div>
            {specialEvents.length > 0 && (
              <div style={{ marginTop: "8px", padding: "12px 16px", background: "rgba(120, 80, 200, 0.08)", borderRadius: "6px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "rgba(120, 80, 200, 0.7)", flexShrink: 0 }} />
                <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "0.8rem", color: "var(--color-cream-muted)" }}>Special Events</p>
              </div>
            )}
          </div>

          {/* Event Cards + Photo */}
          <div>
            {(schedule.recurring || []).map((ev: any, i: number) => (
              <div key={i} style={{ background: "var(--color-bg-card)", borderRadius: "8px", padding: "40px", border: "1px solid var(--color-divider)", marginBottom: "24px" }}>
                <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-amber)", marginBottom: "12px" }}>Recurring Event</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--color-cream)", marginBottom: "8px" }}>{ev.title}</h3>
                <p style={{ color: "var(--color-amber)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "4px" }}>{ev.location}</p>
                <p style={{ color: "var(--color-cream-muted)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "16px" }}>{ev.schedule}</p>
                {ev.description && (
                  <p style={{ color: "var(--color-cream-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>{ev.description}</p>
                )}
              </div>
            ))}

            {specialEvents.map((ev, i) => (
              <div key={i} style={{ background: "var(--color-bg-card)", borderRadius: "8px", padding: "40px", border: "1px solid rgba(120, 80, 200, 0.3)", marginBottom: "24px" }}>
                <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(160, 130, 220, 1)", marginBottom: "12px" }}>Special Event</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--color-cream)", marginBottom: "8px" }}>{ev.title}</h3>
                <p style={{ color: "rgba(160, 130, 220, 1)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "4px" }}>{ev.location}</p>
                <p style={{ color: "var(--color-cream-muted)", fontSize: "0.9rem", fontWeight: 500, marginBottom: ev.description ? "16px" : "0" }}>{ev.dateText}</p>
                {ev.description && (
                  <p style={{ color: "var(--color-cream-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>{ev.description}</p>
                )}
              </div>
            ))}

            <div className="invite-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "stretch" }}>
              <div style={{ background: "var(--color-bg-card)", borderRadius: "8px", padding: "32px 24px", border: "1px solid rgba(212, 160, 65, 0.2)", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--color-cream)", lineHeight: 1.3, marginBottom: "16px" }}>{schedule.inviteBox.heading}</h3>
                <p style={{ color: "var(--color-cream-muted)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "20px" }}>{schedule.inviteBox.body}</p>
                <a href={schedule.inviteBox.buttonHref} style={{ display: "inline-block", padding: "14px 24px", background: "linear-gradient(135deg, var(--color-amber), #c4922e)", color: "var(--color-bg-deep)", fontFamily: "'Quicksand', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", borderRadius: "6px" }}>{schedule.inviteBox.buttonText}</a>
              </div>
              <div style={{ borderRadius: "8px", overflow: "hidden", height: "100%" }}>
                <Image
                  src={schedule.invitePhoto.src}
                  alt={schedule.invitePhoto.alt}
                  width={schedule.invitePhoto.w}
                  height={schedule.invitePhoto.h}
                  style={{ width: "100%", height: "100%", display: "block", borderRadius: "8px", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="section-spacing" style={{ background: "var(--color-bg-deep)", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <Image src="/images/hands.jpeg" alt="Hands clasped together in fellowship" width={1600} height={1017} style={{ width: "100%", maxWidth: "270px", height: "auto", display: "block", margin: "0 auto", borderRadius: "8px", border: "1px solid rgba(212, 160, 65, 0.15)" }} />
          </div>
          <Link href="/support" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.6vw, 2.52rem)", fontWeight: 400, color: "var(--color-amber)", lineHeight: 1.3, textDecoration: "none", borderBottom: "1px solid rgba(212, 160, 65, 0.4)", paddingBottom: "4px", transition: "border-color 0.3s ease" }}>
            Partner With Our Ministry
          </Link>
        </div>
      </section>
    </div>
  );
}
