import HistoryList from "./HistoryList";

export const metadata = { title: "History", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function HistoryPage() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2rem",
          fontWeight: 500,
          color: "var(--color-cream)",
          marginBottom: "8px",
        }}
      >
        Version History
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "24px", maxWidth: "700px" }}>
        Every save commits to GitHub. Pick a file to see its history, or restore the whole repo to a previous state.
      </p>
      <HistoryList />
    </div>
  );
}
