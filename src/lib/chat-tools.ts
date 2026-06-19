import {
  ALL_CONTENT_FILES,
  ContentFile,
  deepMerge,
  loadContent,
  saveContent,
} from "./content";
import { deleteFile, listUploads, readFile, writeFile } from "./github";

// Files the chat agent must NOT touch. These hold credentials, session keys,
// or build/config that a free-form edit could break in a way the user can't
// easily recover from via the dashboard.
const PROTECTED_PATHS = [
  "src/data/admin-users.json",
  "src/lib/auth.ts",
  "src/app/api/admin/login/route.ts",
  "src/app/api/admin/logout/route.ts",
  "src/app/api/admin/change-password/route.ts",
  "src/app/api/admin/me/route.ts",
  "middleware.ts",
  ".gitignore",
  ".env",
  ".env.local",
  ".env.production",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "next.config.ts",
];

function isProtected(path: string): boolean {
  return PROTECTED_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
}

export const toolSchemas = [
  {
    name: "list_content_files",
    description:
      "List all editable content files on the Last Song site. Each entry maps to a JSON file in the repo that controls a page or shared section. Use the returned `file` values with get_content and update_content.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "get_content",
    description:
      "Read the current JSON for a content file. Always call this first before update_content so your patch preserves existing structure.",
    input_schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          enum: ALL_CONTENT_FILES,
          description: "Which content file to read.",
        },
      },
      required: ["file"],
    },
  },
  {
    name: "update_content",
    description:
      "Update a content file. Pass `patch` as an object (deep-merges into existing JSON, keeping unchanged keys) OR as an array (replaces wholesale, e.g. schedule.specialEvents). Arrays inside an object patch are also replaced wholesale — supply the full array when reordering/adding/removing elements.",
    input_schema: {
      type: "object",
      properties: {
        file: { type: "string", enum: ALL_CONTENT_FILES },
        patch: {
          description: "Object (deep-merge) or array (replace top-level).",
        },
        commitMessage: {
          type: "string",
          description:
            "Short summary for the git commit log (e.g. 'add ASI Musicians event'). Will be prefixed with 'chat:'.",
        },
      },
      required: ["file", "patch"],
    },
  },
  {
    name: "add_special_event",
    description:
      "Add a new entry to schedule.specialEvents. Convenience tool — internally calls get_content('schedule') + update_content. Use this when the user describes a one-off event with a date range and location.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Event name (e.g. 'ASI Musicians (Adventist Laymen's Services & Industries)')." },
        location: { type: "string", description: "City + state (e.g. 'Phoenix, AZ')." },
        dateText: { type: "string", description: "Human-readable date range (e.g. 'July 29 – August 1, 2026')." },
        description: { type: "string", description: "Optional. Blank means no description card body." },
        year: { type: "number" },
        ranges: {
          type: "array",
          description:
            "Calendar highlight ranges as 0-indexed months. Multi-month events need one entry per month (e.g. Jul 29-Aug 1 = [{startMonth:6, startDay:29, endMonth:6, endDay:31}, {startMonth:7, startDay:1, endMonth:7, endDay:1}]).",
          items: {
            type: "object",
            properties: {
              startMonth: { type: "number" },
              startDay: { type: "number" },
              endMonth: { type: "number" },
              endDay: { type: "number" },
            },
            required: ["startMonth", "startDay", "endMonth", "endDay"],
          },
        },
      },
      required: ["title", "location", "dateText", "year", "ranges"],
    },
  },
  {
    name: "remove_special_event",
    description:
      "Delete a special event from the schedule by case-insensitive title match.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Event title (or unique substring of it)." },
      },
      required: ["title"],
    },
  },
  {
    name: "read_file",
    description:
      "Read any file in the repo (TypeScript, JSON, CSS, markdown, anything). Use this BEFORE edit_file so your patch lands in the right place. Returns the full file content. Pass the repo-relative path.",
    input_schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description:
            "Repo-relative path, e.g. 'src/app/page.tsx', 'src/components/Footer.tsx', 'src/app/globals.css'.",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "edit_file",
    description:
      "Edit a file by exact string replacement. Use this for code/styling changes that aren't in the JSON content files (e.g. font sizes, layout tweaks, component logic, CSS variables). The replacement is exact-match — the oldText must appear EXACTLY ONCE in the file. Include enough surrounding context to make the match unique. Always read_file first to get the exact current text. Commits to GitHub; site rebuilds in ~60s. Protected files (auth, session, env, build config) are refused.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Repo-relative path." },
        oldText: {
          type: "string",
          description:
            "Exact substring to replace. Must occur exactly once in the file. Include surrounding context (whole lines, indentation) to disambiguate.",
        },
        newText: { type: "string", description: "Replacement text." },
        commitMessage: {
          type: "string",
          description: "Short summary for the git commit log.",
        },
      },
      required: ["path", "oldText", "newText"],
    },
  },
  {
    name: "write_file",
    description:
      "Create a new file or completely overwrite an existing one. Prefer edit_file for surgical changes; use write_file only when creating new files or doing a full rewrite. Protected files are refused.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string", description: "Full file content." },
        commitMessage: { type: "string" },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "list_images",
    description:
      "List all uploaded images in public/uploads/. Returns name, path, url, size, sha. Used to find existing images to reference.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "delete_image",
    description:
      "Delete an uploaded image. Only paths under public/uploads/ are allowed.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string" },
        sha: { type: "string" },
      },
      required: ["path", "sha"],
    },
  },
];

type ToolCtx = { siteBaseUrl: string; anthropicKey: string };

export const toolExecutors: Record<string, (input: any, ctx: ToolCtx) => Promise<any>> = {
  async list_content_files() {
    return {
      files: ALL_CONTENT_FILES.map((f) => ({
        file: f,
        description: contentDescription(f),
      })),
    };
  },

  async get_content(input) {
    const file = input.file as ContentFile;
    if (!ALL_CONTENT_FILES.includes(file)) return { error: "unknown file", file };
    const { content } = await loadContent(file);
    return content;
  },

  async update_content(input) {
    const file = input.file as ContentFile;
    if (!ALL_CONTENT_FILES.includes(file)) return { error: "unknown file", file };
    const { content, sha } = await loadContent(file);
    const next = Array.isArray(input.patch)
      ? input.patch
      : deepMerge(content, input.patch);
    const summary = input.commitMessage
      ? `chat: ${input.commitMessage}`
      : `chat: update ${file}`;
    await saveContent(file, next, sha, summary);
    return { ok: true, file };
  },

  async add_special_event(input) {
    const { content, sha } = await loadContent("schedule");
    const events = Array.isArray((content as any).specialEvents)
      ? [...(content as any).specialEvents]
      : [];
    const newEntry = {
      title: input.title,
      location: input.location,
      dateText: input.dateText,
      description: input.description || "",
      year: input.year,
      ranges: input.ranges,
    };
    events.push(newEntry);
    const next = { ...(content as any), specialEvents: events };
    await saveContent("schedule", next, sha, `chat: add event ${input.title}`);
    return { ok: true, title: input.title };
  },

  async remove_special_event(input) {
    const { content, sha } = await loadContent("schedule");
    const needle = (input.title as string).toLowerCase();
    const events = Array.isArray((content as any).specialEvents)
      ? (content as any).specialEvents
      : [];
    const next = events.filter(
      (e: any) => !String(e.title || "").toLowerCase().includes(needle)
    );
    if (next.length === events.length) {
      return { ok: false, error: "no matching event", title: input.title };
    }
    await saveContent(
      "schedule",
      { ...(content as any), specialEvents: next },
      sha,
      `chat: remove event ${input.title}`
    );
    return { ok: true, removed: events.length - next.length };
  },

  async read_file(input) {
    const path = String(input.path || "");
    if (!path) return { error: "path required" };
    const f = await readFile(path);
    if (!f) return { error: "file not found", path };
    return { path, content: f.content, sha: f.sha };
  },

  async edit_file(input) {
    const path = String(input.path || "");
    if (!path) return { error: "path required" };
    if (isProtected(path)) {
      return { error: `Refused: ${path} is protected (auth/session/config).` };
    }
    const oldText = String(input.oldText ?? "");
    const newText = String(input.newText ?? "");
    if (!oldText) return { error: "oldText required" };
    const f = await readFile(path);
    if (!f) return { error: "file not found", path };
    const occurrences = f.content.split(oldText).length - 1;
    if (occurrences === 0) {
      return {
        error: `oldText not found in ${path}. Use read_file to inspect exact contents.`,
      };
    }
    if (occurrences > 1) {
      return {
        error: `oldText matches ${occurrences} times in ${path}. Include more surrounding context so the match is unique.`,
      };
    }
    const next = f.content.replace(oldText, newText);
    const msg = input.commitMessage
      ? `chat: ${input.commitMessage}`
      : `chat: edit ${path}`;
    const b64 = Buffer.from(next, "utf8").toString("base64");
    await writeFile({ path, contentBase64: b64, message: msg, sha: f.sha });
    return { ok: true, path, bytesBefore: f.content.length, bytesAfter: next.length };
  },

  async write_file(input) {
    const path = String(input.path || "");
    if (!path) return { error: "path required" };
    if (isProtected(path)) {
      return { error: `Refused: ${path} is protected.` };
    }
    const content = String(input.content ?? "");
    const existing = await readFile(path);
    const msg = input.commitMessage
      ? `chat: ${input.commitMessage}`
      : `chat: write ${path}`;
    const b64 = Buffer.from(content, "utf8").toString("base64");
    await writeFile({
      path,
      contentBase64: b64,
      message: msg,
      sha: existing?.sha,
    });
    return { ok: true, path, bytes: content.length, created: !existing };
  },

  async list_images() {
    const images = await listUploads();
    return images.map((i) => ({
      name: i.name,
      path: i.path,
      url: i.url,
      sizeKB: Math.round(i.size / 1024),
      sha: i.sha,
    }));
  },

  async delete_image(input) {
    const { path, sha } = input as { path: string; sha: string };
    if (!path.startsWith("public/uploads/")) {
      return { error: "Only public/uploads/ paths allowed" };
    }
    await deleteFile(path, sha, `chat: delete ${path}`);
    return { ok: true, path };
  },
};

function contentDescription(file: ContentFile): string {
  switch (file) {
    case "site": return "Site-wide settings: name, tagline, phone, email, address, nav menu.";
    case "footer": return "Footer content: brand name, tagline, connect lines, copyright, credit line.";
    case "home": return "Home page: hero, scripture, 'Our Story' paragraphs, ministering card, CTA.";
    case "about": return "About page: hero, scripture, bio paragraphs, bio photo, 17-photo reel, CTA.";
    case "mission": return "Mission page: hero, scripture, 6 paragraphs, 4 ministry photos with captions, CTA.";
    case "listen": return "Listen page: hero, scripture, 8 audio tracks, video clips, 28-photo nature reel, CTA.";
    case "schedule": return "Schedule page: hero, scripture, recurring events, special events + calendar ranges, invite card.";
    case "support": return "Support page: hero, scripture, venue photos, 'How Your Gift Helps' cards, Special Thanks, giving options, partner tiers, 501(c)(3) statement.";
    case "contact": return "Contact page: hero, info paragraphs, contact photo + quote, form labels.";
  }
}

export const CHAT_SYSTEM_PROMPT = `You are Wylie and Dawna Stevens' AI assistant for the Last Song Ministry website at lastsong.pro, embedded in their admin dashboard.

## What you can do

You can edit ANYTHING in the repo — page copy, photos, calendar events, font sizes, colors, layout, component logic. There are two editing surfaces:

1. **Content JSON files** (site, footer, home, about, mission, listen, schedule, support, contact). Use get_content / update_content / add_special_event / remove_special_event for these. They hold copy + image paths.
2. **Source code** (.tsx, .ts, .css, .json, .md, anywhere in the repo). Use read_file + edit_file (or write_file for whole-file rewrites). Use this for font sizes, colors, layout tweaks, component logic — anything that isn't in a content JSON.

Every save commits to GitHub and triggers a Vercel rebuild (~60s to live).

**Workflow for code edits:** ALWAYS read_file first to see the exact current text, then edit_file with enough surrounding context to make the oldText match uniquely. Protected files (auth, sessions, env, build config) are refused — surface that politely if it happens.

**Workflow for content edits:** prefer the content tools over edit_file. They're safer and self-documenting.

## How to behave

**Workflow**
- Before editing anything, call get_content(file) so your patch preserves existing structure. Don't guess at the JSON shape.
- update_content uses deep-merge for objects (unchanged keys are preserved) and wholesale replacement for arrays. If reordering/adding/removing array items, fetch the full array, modify in place, then send it back.
- For schedule edits, prefer add_special_event and remove_special_event over raw update_content. They handle the array bookkeeping and the calendar-range coordinates correctly.
- For listen page tracks, ranges are 0-indexed months: Jan=0, Feb=1, ... Jul=6, Aug=7. Multi-month events need one entry per month covered.
- Always confirm what you changed in one short sentence. Mention that Vercel is rebuilding (~60s to live).

**Tone**
Warm and concise. Pastor's friend, not a corporate copilot. No fluff, no bullet-point walls, no "I'd love to help you with that!"

**Voice match**
The site's existing copy reads scripture-grounded, sincere, plain-language Christian. When generating new copy, match that tone. Avoid marketing-speak ("transform", "elevate", "experience"). Avoid excessive exclamation points.

**Image handling**
The owner often drops or pastes a screenshot showing the part of the site they want changed. When that happens: identify what's pictured (which page, which section, which paragraph or photo), then ask one quick clarifying question if needed, then make the edit. The screenshot is reference for *where* the change goes — you do NOT save the screenshot anywhere; it stays in the chat for context only.
If the owner asks to swap a PHOTO on the site (not a screenshot for reference): ask which slot, then either (a) accept a URL they paste, (b) accept a relative path under /images/ they reference, or (c) ask them to upload via /admin/images. Don't fabricate file paths.

**Safety**
- Never touch /admin/* or /api/admin/* paths via update_content. Those files aren't in the editable content list.
- Don't change passwords, user accounts, or admin-users.json. The dashboard has a dedicated change-password flow.
- Be conservative with 501(c)(3) and Special Thanks text. Those have legal/relational weight — confirm before rewriting.

When in doubt, ask one focused clarifying question. Better one short question than a wrong save.`;
