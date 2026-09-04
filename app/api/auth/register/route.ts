import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, SESSION_COOKIE } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Les informations saisies sont invalides." }, { status: 400 });

  const { name, email, phone, address, formationSubject, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ message: "Cette adresse email est déjà utilisée." }, { status: 409 });

  const user = await prisma.user.create({
    data: { name, email, phone, address, formationSubject, password: await bcrypt.hash(password, 12) },
  });
  const token = await createSession({ id: user.id, name: user.name, email: user.email, role: user.role });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
  return response;
}
