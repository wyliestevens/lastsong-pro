import { NextRequest, NextResponse } from "next/server";

// Edge-safe session verification (HMAC-SHA256). lib/auth uses node:crypto which
// isn't available in the edge runtime, so the verify is inlined here.
async function verifyEdge(value: string | undefined, secret: string) {
  if (!value || !secret) return null;
  const parts = value.split(":");
  if (parts.length !== 3) return null;
  const [emailB64, iatStr, sig] = parts;
  const payload = `${emailB64}:${iatStr}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const sigBytes = new Uint8Array((sig.match(/.{2}/g) || []).map((h) => parseInt(h, 16)));
  const ok = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(payload));
  if (!ok) return null;
  const iat = Number(iatStr);
  if (!Number.isFinite(iat)) return null;
  const maxAge = 60 * 60 * 24 * 7;
  if (Date.now() / 1000 - iat > maxAge) return null;
  let email = "";
  try {
    email = atob(emailB64.replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    return null;
  }
  return { email, iat };
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always-allowed admin endpoints (login, logout, change-password page+API).
  const PUBLIC_PATHS = new Set<string>([
    "/admin/login",
    "/api/admin/login",
    "/api/admin/logout",
  ]);
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("lastsong_admin")?.value;
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  const session = await verifyEdge(cookie, secret);

  if (!session) {
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // mustChangePassword check is handled inside the page/API handlers (they can
  // hit GitHub from the node runtime). The middleware only enforces "must be
  // logged in"; the change-password page lives at /admin/change-password and is
  // permitted under a valid session even when mustChangePassword is true.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
