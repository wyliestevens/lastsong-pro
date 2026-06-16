import { NextResponse } from "next/server";
import { listCommits, readFileAtCommit } from "@/lib/github";
import { ALL_CONTENT_FILES, ContentFile, contentPath } from "@/lib/content";

export const runtime = "nodejs";

function isAllowed(file: string): file is ContentFile {
  return (ALL_CONTENT_FILES as string[]).includes(file);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file") || "site";
  const sha = searchParams.get("sha");
  if (!isAllowed(file)) {
    return NextResponse.json({ error: "Unknown content file" }, { status: 400 });
  }
  const path = contentPath(file);
  if (sha) {
    const content = await readFileAtCommit(path, sha);
    return NextResponse.json({ sha, content: content ? JSON.parse(content) : null });
  }
  const history = await listCommits(path, 30);
  return NextResponse.json({ file, history });
}
