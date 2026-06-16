// Thin wrapper around the GitHub REST API for reading/writing files in the
// repo. Used by /api/admin/* routes to persist content + images without a DB.

const OWNER = process.env.GITHUB_OWNER || "wyliestevens";
const REPO = process.env.GITHUB_REPO || "lastsong-pro";
const BRANCH = process.env.GITHUB_BRANCH || "main";

function token() {
  const t = process.env.GITHUB_TOKEN;
  if (!t) throw new Error("GITHUB_TOKEN is not set");
  return t;
}

const base = `https://api.github.com/repos/${OWNER}/${REPO}`;

async function gh(path: string, init: RequestInit = {}) {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await res.text();
  let body: unknown = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${path}: ${typeof body === "string" ? body : JSON.stringify(body)}`);
  }
  return body as any;
}

export type FileInfo = { content: string; sha: string };

export async function readFile(path: string): Promise<FileInfo | null> {
  try {
    const data = await gh(`/contents/${encodeURI(path)}?ref=${BRANCH}`);
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return { content, sha: data.sha };
  } catch (err) {
    if (String(err).includes("404")) return null;
    throw err;
  }
}

export async function writeFile(opts: {
  path: string;
  contentBase64: string;
  message: string;
  sha?: string;
}) {
  return gh(`/contents/${encodeURI(opts.path)}`, {
    method: "PUT",
    body: JSON.stringify({
      message: opts.message,
      content: opts.contentBase64,
      branch: BRANCH,
      ...(opts.sha ? { sha: opts.sha } : {}),
    }),
  });
}

export async function listCommits(path: string, limit = 20) {
  const data = await gh(
    `/commits?path=${encodeURIComponent(path)}&sha=${BRANCH}&per_page=${limit}`
  );
  return (data as any[]).map((c) => ({
    sha: c.sha,
    date: c.commit?.author?.date,
    message: c.commit?.message,
    author: c.commit?.author?.name,
  }));
}

export async function readFileAtCommit(path: string, sha: string): Promise<string | null> {
  try {
    const data = await gh(`/contents/${encodeURI(path)}?ref=${sha}`);
    return Buffer.from(data.content, "base64").toString("utf8");
  } catch (err) {
    if (String(err).includes("404")) return null;
    throw err;
  }
}

export type UploadedImage = {
  path: string;
  name: string;
  url: string;
  size: number;
  sha: string;
};

const UPLOADS_ROOT = "public/uploads";

export async function listUploads(): Promise<UploadedImage[]> {
  const out: UploadedImage[] = [];

  async function walk(path: string) {
    let entries: any[];
    try {
      entries = await gh(`/contents/${encodeURI(path)}?ref=${BRANCH}`);
    } catch (err) {
      if (String(err).includes("404")) return;
      throw err;
    }
    if (!Array.isArray(entries)) return;
    const dirJobs: Promise<void>[] = [];
    for (const entry of entries) {
      if (entry.type === "dir") {
        dirJobs.push(walk(entry.path));
      } else if (entry.type === "file") {
        out.push({
          path: entry.path,
          name: entry.name,
          size: Number(entry.size) || 0,
          sha: entry.sha,
          url: `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${entry.path}`,
        });
      }
    }
    await Promise.all(dirJobs);
  }

  await walk(UPLOADS_ROOT);
  return out;
}

export async function deleteFile(path: string, sha: string, message: string) {
  return gh(`/contents/${encodeURI(path)}`, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha,
      branch: BRANCH,
    }),
  });
}

export async function uploadImage(opts: { folder: string; filename: string; base64: string }) {
  const safeName = opts.filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `public/uploads/${opts.folder}/${safeName}`;
  const existing = await readFile(path);
  const result = await writeFile({
    path,
    contentBase64: opts.base64,
    message: `upload: ${path}`,
    sha: existing?.sha,
  });
  const commitSha: string | undefined = (result as any)?.commit?.sha;
  if (commitSha) {
    return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${commitSha}/${path}`;
  }
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
}

export const REPO_INFO = { OWNER, REPO, BRANCH };
