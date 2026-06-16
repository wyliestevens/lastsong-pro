import { createHmac, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { readFile, writeFile } from "./github";

const COOKIE_NAME = "lastsong_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type AdminUser = {
  email: string;
  name: string;
  passwordHash: string;
  mustChangePassword: boolean;
  createdAt: string;
  passwordChangedAt?: string;
};

const USERS_PATH = "src/data/admin-users.json";

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
}

export async function loadAdminUsers(): Promise<{ users: AdminUser[]; sha: string | null }> {
  const file = await readFile(USERS_PATH);
  if (!file) return { users: [], sha: null };
  const parsed = JSON.parse(file.content) as AdminUser[];
  return { users: Array.isArray(parsed) ? parsed : [], sha: file.sha };
}

export async function saveAdminUsers(users: AdminUser[], message: string, sha: string | null) {
  const content = JSON.stringify(users, null, 2) + "\n";
  const b64 = Buffer.from(content, "utf8").toString("base64");
  return writeFile({
    path: USERS_PATH,
    contentBase64: b64,
    message,
    sha: sha ?? undefined,
  });
}

export async function findUser(email: string): Promise<AdminUser | null> {
  const { users } = await loadAdminUsers();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export async function verifyPassword(input: string, hash: string): Promise<boolean> {
  if (!input || !hash) return false;
  try {
    return await bcrypt.compare(input, hash);
  } catch {
    return false;
  }
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

// Session payload: <emailBase64>:<iat>:<sig>
export function signSession(email: string) {
  const iat = Math.floor(Date.now() / 1000);
  const emailB64 = Buffer.from(email, "utf8").toString("base64url");
  const payload = `${emailB64}:${iat}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

export function verifySession(value: string | undefined): { email: string; iat: number } | null {
  if (!value) return null;
  const parts = value.split(":");
  if (parts.length !== 3) return null;
  const [emailB64, iatStr, sig] = parts;
  const payload = `${emailB64}:${iatStr}`;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
  } catch {
    return null;
  }
  const iat = Number(iatStr);
  if (!Number.isFinite(iat)) return null;
  if (Date.now() / 1000 - iat > MAX_AGE_SECONDS) return null;
  let email = "";
  try {
    email = Buffer.from(emailB64, "base64url").toString("utf8");
  } catch {
    return null;
  }
  return { email, iat };
}

export const cookieConfig = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};

export async function updateUserPassword(email: string, newHash: string) {
  const { users, sha } = await loadAdminUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) throw new Error("User not found");
  const next = [...users];
  next[idx] = {
    ...next[idx],
    passwordHash: newHash,
    mustChangePassword: false,
    passwordChangedAt: new Date().toISOString(),
  };
  await saveAdminUsers(next, `admin: ${email} changed password`, sha);
}
