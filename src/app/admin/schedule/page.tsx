import { loadContent } from "@/lib/content";
import ScheduleEditor from "./ScheduleEditor";

export const metadata = { title: "Schedule Editor", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ScheduleAdminPage() {
  const { content, sha } = await loadContent("schedule");
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
        Schedule
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "20px", maxWidth: "700px" }}>
        Add or edit special events. Each event automatically highlights its date range on the calendar.
      </p>
      <ScheduleEditor initial={content} sha={sha} />
    </div>
  );
}
