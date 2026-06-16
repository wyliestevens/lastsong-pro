// Admin-editable JSON content files. Each lives at src/data/content/<name>.json
// in the repo. Reads/writes go through the GitHub Contents API so the admin UI +
// chat agent can mutate them and Vercel auto-rebuilds.

import { readFile, writeFile } from "./github";

export type ContentFile =
  | "site"
  | "home"
  | "about"
  | "mission"
  | "listen"
  | "schedule"
  | "support"
  | "contact"
  | "footer";

const FILE_PATHS: Record<ContentFile, string> = {
  site: "src/data/content/site.json",
  home: "src/data/content/home.json",
  about: "src/data/content/about.json",
  mission: "src/data/content/mission.json",
  listen: "src/data/content/listen.json",
  schedule: "src/data/content/schedule.json",
  support: "src/data/content/support.json",
  contact: "src/data/content/contact.json",
  footer: "src/data/content/footer.json",
};

export const ALL_CONTENT_FILES: ContentFile[] = Object.keys(FILE_PATHS) as ContentFile[];

export function contentPath(file: ContentFile) {
  return FILE_PATHS[file];
}

export async function loadContent<T = any>(
  file: ContentFile
): Promise<{ content: T; sha: string | null }> {
  const path = FILE_PATHS[file];
  const res = await readFile(path);
  if (!res) throw new Error(`Content file ${path} not found`);
  return { content: JSON.parse(res.content), sha: res.sha };
}

export async function saveContent<T = any>(
  file: ContentFile,
  content: T,
  sha: string | null,
  message: string
) {
  const path = FILE_PATHS[file];
  const b64 = Buffer.from(JSON.stringify(content, null, 2) + "\n", "utf8").toString("base64");
  return writeFile({
    path,
    contentBase64: b64,
    message,
    sha: sha ?? undefined,
  });
}

export function deepMerge(a: any, b: any): any {
  if (Array.isArray(b)) return b; // arrays replace wholesale
  if (b && typeof b === "object") {
    const out: any = { ...(a && typeof a === "object" ? a : {}) };
    for (const k of Object.keys(b)) {
      out[k] = deepMerge(a?.[k], b[k]);
    }
    return out;
  }
  return b === undefined ? a : b;
}
