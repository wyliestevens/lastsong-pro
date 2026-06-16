import { NextResponse } from "next/server";
import {
  ALL_CONTENT_FILES,
  ContentFile,
  deepMerge,
  loadContent,
  saveContent,
} from "@/lib/content";

export const runtime = "nodejs";

function isAllowed(file: string): file is ContentFile {
  return (ALL_CONTENT_FILES as string[]).includes(file);
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ file: string }> }
) {
  const { file } = await ctx.params;
  if (!isAllowed(file)) {
    return NextResponse.json({ error: "Unknown content file" }, { status: 400 });
  }
  const { content, sha } = await loadContent(file);
  return NextResponse.json({ content, sha });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ file: string }> }
) {
  const { file } = await ctx.params;
  if (!isAllowed(file)) {
    return NextResponse.json({ error: "Unknown content file" }, { status: 400 });
  }
  const body = await req.json().catch(() => ({}));
  const content = body.content;
  const sha = typeof body.sha === "string" ? body.sha : null;
  if (content === undefined || content === null) {
    return NextResponse.json({ error: "content required" }, { status: 400 });
  }
  await saveContent(file, content, sha, `admin: update ${file}`);
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ file: string }> }
) {
  const { file } = await ctx.params;
  if (!isAllowed(file)) {
    return NextResponse.json({ error: "Unknown content file" }, { status: 400 });
  }
  const body = await req.json().catch(() => ({}));
  const patch = body.patch ?? body.content;
  if (patch === undefined || patch === null) {
    return NextResponse.json({ error: "patch required" }, { status: 400 });
  }
  const current = await loadContent(file);
  const next = Array.isArray(patch) ? patch : deepMerge(current.content, patch);
  await saveContent(file, next, current.sha, `admin: update ${file}`);
  return NextResponse.json({ ok: true, content: next });
}
