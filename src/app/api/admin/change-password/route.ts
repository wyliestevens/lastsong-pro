import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  cookieConfig,
  findUser,
  hashPassword,
  updateUserPassword,
  verifyPassword,
  verifySession,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const jar = await cookies();
  const session = verifySession(jar.get(cookieConfig.name)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let currentPassword = "";
  let newPassword = "";
  try {
    const body = await req.json();
    currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
    newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    );
  }
  if (newPassword === currentPassword) {
    return NextResponse.json(
      { error: "New password must be different from current password" },
      { status: 400 }
    );
  }

  const user = await findUser(session.email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const ok = await verifyPassword(currentPassword, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  const newHash = await hashPassword(newPassword);
  await updateUserPassword(user.email, newHash);

  return NextResponse.json({ ok: true });
}
