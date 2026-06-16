import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieConfig, findUser, signSession, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_SESSION_SECRET is missing in env vars." },
      { status: 503 }
    );
  }
  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "GITHUB_TOKEN is missing in env vars." },
      { status: 503 }
    );
  }

  let email = "";
  let password = "";
  try {
    const body = await req.json();
    email = typeof body.email === "string" ? body.email.trim() : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 });
  }

  const user = await findUser(email);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
  }

  const token = signSession(user.email);
  const jar = await cookies();
  jar.set(cookieConfig.name, token, cookieConfig);

  return NextResponse.json({
    ok: true,
    email: user.email,
    name: user.name,
    mustChangePassword: user.mustChangePassword === true,
  });
}
