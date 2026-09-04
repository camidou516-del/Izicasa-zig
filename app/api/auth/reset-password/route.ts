import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = resetPasswordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Le lien est invalide ou les mots de passe ne correspondent pas." }, { status: 400 });

  const resetToken = createHash("sha256").update(parsed.data.token).digest("hex");
  const user = await prisma.user.findFirst({ where: { resetToken, resetTokenExpiry: { gt: new Date() } } });
  if (!user) return NextResponse.json({ message: "Ce lien est invalide ou expiré." }, { status: 400 });

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await bcrypt.hash(parsed.data.password, 12), resetToken: null, resetTokenExpiry: null },
  });
  return NextResponse.json({ message: "Mot de passe réinitialisé avec succès." });
}
