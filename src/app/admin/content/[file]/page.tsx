import { notFound } from "next/navigation";
import { ALL_CONTENT_FILES, ContentFile, loadContent } from "@/lib/content";
import JsonEditor from "./JsonEditor";

export const metadata = { title: "Edit", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ContentEditPage({
  params,
}: {
  params: Promise<{ file: string }>;
}) {
  const { file } = await params;
  if (!(ALL_CONTENT_FILES as string[]).includes(file)) notFound();
  const { content, sha } = await loadContent(file as ContentFile);
  return (
    <div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2rem",
          fontWeight: 500,
          color: "var(--color-cream)",
          marginBottom: "8px",
          textTransform: "capitalize",
        }}
      >
        {file}
      </h1>
      <p style={{ color: "var(--color-cream-muted)", marginBottom: "20px" }}>
        Edit the JSON below. Saving commits to GitHub and rebuilds the site (~60 seconds).
      </p>
      <JsonEditor file={file} initial={content} sha={sha} />
    </div>
  );
}
