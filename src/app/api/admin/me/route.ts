import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieConfig, findUser, verifySession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const jar = await cookies();
  const session = verifySession(jar.get(cookieConfig.name)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await findUser(session.email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({
    email: user.email,
    name: user.name,
    mustChangePassword: user.mustChangePassword === true,
  });
}
