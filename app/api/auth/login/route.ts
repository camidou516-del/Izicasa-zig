import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, SESSION_COOKIE } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Email ou mot de passe invalide." }, { status: 400 });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: "Email ou mot de passe incorrect." }, { status: 401 });
  }

  const token = await createSession({ id: user.id, name: user.name, email: user.email, role: user.role });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
  return response;
}
