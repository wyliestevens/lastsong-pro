"use client";

import { useState } from "react";

type Range = {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
};
type SpecialEvent = {
  title: string;
  location: string;
  dateText: string;
  description?: string;
  year: number;
  ranges: Range[];
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  background: "rgba(15, 13, 10, 0.6)",
  border: "1px solid var(--color-divider)",
  borderRadius: "6px",
  color: "var(--color-cream)",
  fontFamily: "'Quicksand', sans-serif",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Quicksand', sans-serif",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "var(--color-cream-muted)",
  marginBottom: "4px",
};

function emptyRange(year: number): Range {
  return { startMonth: 0, startDay: 1, endMonth: 0, endDay: 1 };
}

function emptyEvent(): SpecialEvent {
  const year = new Date().getFullYear();
  return {
    title: "",
    location: "",
    dateText: "",
    description: "",
    year,
    ranges: [emptyRange(year)],
  };
}

export default function ScheduleEditor({
  initial,
  sha,
}: {
  initial: any;
  sha: string | null;
}) {
  const [data, setData] = useState<any>(initial);
  const [state, setState] = useState<"idle" | "saving" | "error" | "saved">("idle");
  const [err, setErr] = useState("");

  function setEvents(events: SpecialEvent[]) {
    setData({ ...data, specialEvents: events });
  }

  function updateEvent(i: number, patch: Partial<SpecialEvent>) {
    const events = [...(data.specialEvents || [])];
    events[i] = { ...events[i], ...patch };
    setEvents(events);
  }

  function updateRange(eventIdx: number, rangeIdx: number, patch: Partial<Range>) {
    const events = [...(data.specialEvents || [])];
    const ranges = [...events[eventIdx].ranges];
    ranges[rangeIdx] = { ...ranges[rangeIdx], ...patch };
    events[eventIdx] = { ...events[eventIdx], ranges };
    setEvents(events);
  }

  function addRange(eventIdx: number) {
    const events = [...(data.specialEvents || [])];
    events[eventIdx] = {
      ...events[eventIdx],
      ranges: [...events[eventIdx].ranges, emptyRange(events[eventIdx].year)],
    };
    setEvents(events);
  }

  function removeRange(eventIdx: number, rangeIdx: number) {
    const events = [...(data.specialEvents || [])];
    const ranges = events[eventIdx].ranges.filter((_: Range, i: number) => i !== rangeIdx);
    events[eventIdx] = { ...events[eventIdx], ranges };
    setEvents(events);
  }

  function addEvent() {
    setEvents([...(data.specialEvents || []), emptyEvent()]);
  }

  function removeEvent(i: number) {
    setEvents((data.specialEvents || []).filter((_: SpecialEvent, idx: number) => idx !== i));
  }

  async function save() {
    setErr("");
    setState("saving");
    try {
      const res = await fetch("/api/admin/content/schedule", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: data, sha }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Save failed");
      setState("saved");
      setTimeout(() => setState("idle"), 2500);
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  const events: SpecialEvent[] = data.specialEvents || [];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {events.map((ev, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-divider)",
              borderLeft: "3px solid var(--color-amber)",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div>
                <label style={labelStyle}>Title</label>
                <input
                  style={inputStyle}
                  value={ev.title}
                  onChange={(e) => updateEvent(i, { title: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input
                  style={inputStyle}
                  value={ev.location}
                  onChange={(e) => updateEvent(i, { location: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Date Text (display)</label>
                <input
                  style={inputStyle}
                  value={ev.dateText}
                  onChange={(e) => updateEvent(i, { dateText: e.target.value })}
                  placeholder="e.g. July 29 – August 1, 2026"
                />
              </div>
              <div>
                <label style={labelStyle}>Year</label>
                <input
                  type="number"
                  style={inputStyle}
                  value={ev.year}
                  onChange={(e) => updateEvent(i, { year: Number(e.target.value) })}
                />
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>Description (optional)</label>
              <textarea
                style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }}
                rows={2}
                value={ev.description || ""}
                onChange={(e) => updateEvent(i, { description: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle}>Calendar Highlight Ranges</label>
              <p style={{ color: "var(--color-cream-muted)", fontSize: "0.75rem", marginBottom: "8px" }}>
                Multi-month events need one range per month. Months are 0-indexed (Jan=0, Dec=11).
              </p>
              {ev.ranges.map((r, ri) => (
                <div
                  key={ri}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 2fr 1fr auto",
                    gap: "8px",
                    marginBottom: "8px",
                    alignItems: "end",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Start month</label>
                    <select
                      style={inputStyle}
                      value={r.startMonth}
                      onChange={(e) => updateRange(i, ri, { startMonth: Number(e.target.value) })}
                    >
                      {MONTHS.map((m, idx) => (
                        <option key={idx} value={idx}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Day</label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      style={inputStyle}
                      value={r.startDay}
                      onChange={(e) => updateRange(i, ri, { startDay: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>End month</label>
                    <select
                      style={inputStyle}
                      value={r.endMonth}
                      onChange={(e) => updateRange(i, ri, { endMonth: Number(e.target.value) })}
                    >
                      {MONTHS.map((m, idx) => (
                        <option key={idx} value={idx}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Day</label>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      style={inputStyle}
                      value={r.endDay}
                      onChange={(e) => updateRange(i, ri, { endDay: Number(e.target.value) })}
                    />
                  </div>
                  <button
                    onClick={() => removeRange(i, ri)}
                    style={{
                      padding: "10px 12px",
                      background: "transparent",
                      border: "1px solid var(--color-divider)",
                      borderRadius: "6px",
                      color: "#f1b4b4",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addRange(i)}
                style={{
                  marginTop: "4px",
                  padding: "8px 12px",
                  background: "rgba(212, 160, 65, 0.1)",
                  border: "1px solid var(--color-divider)",
                  borderRadius: "6px",
                  color: "var(--color-amber)",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                }}
              >
                + Add range
              </button>
            </div>
            <div style={{ marginTop: "16px", borderTop: "1px solid var(--color-divider)", paddingTop: "12px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => removeEvent(i)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(200, 60, 60, 0.4)",
                  color: "#f1b4b4",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                Delete this event
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={addEvent}
          style={{
            padding: "10px 16px",
            background: "rgba(212, 160, 65, 0.12)",
            border: "1px solid var(--color-amber)",
            color: "var(--color-amber)",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          + Add Special Event
        </button>
        <button
          onClick={save}
          disabled={state === "saving"}
          style={{
            padding: "10px 20px",
            background:
              state === "saving"
                ? "rgba(212, 160, 65, 0.4)"
                : "linear-gradient(135deg, var(--color-amber), #c4922e)",
            color: "var(--color-bg-deep)",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "6px",
            cursor: state === "saving" ? "wait" : "pointer",
          }}
        >
          {state === "saving" ? "Saving…" : "Save Schedule"}
        </button>
        {state === "saved" && (
          <span style={{ color: "#9ad9a8", fontSize: "0.85rem" }}>
            Saved. Vercel rebuilding (~60s).
          </span>
        )}
        {state === "error" && (
          <span style={{ color: "#f1b4b4", fontSize: "0.85rem" }}>{err}</span>
        )}
      </div>
    </div>
  );
}
