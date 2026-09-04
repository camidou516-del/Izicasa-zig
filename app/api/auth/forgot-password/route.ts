import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validation";

const confirmationMessage = "Si un compte correspond à cette adresse, un lien de réinitialisation vient d’être envoyé.";

export async function POST(request: Request) {
  const parsed = forgotPasswordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: confirmationMessage });

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return NextResponse.json({ message: confirmationMessage });

  const token = randomBytes(32).toString("hex");
  const resetToken = createHash("sha256").update(token).digest("hex");
  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
  await prisma.user.update({ where: { id: user.id }, data: { resetToken, resetTokenExpiry } });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  if (process.env.RESEND_API_KEY) {
    try {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: user.email,
        subject: "Réinitialisation de votre mot de passe Izicasa",
        html: `<p>Bonjour ${user.name},</p><p>Un changement de mot de passe a été demandé pour votre compte Izicasa.</p><p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p><p>Ce lien expire dans une heure. Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</p>`,
      });
    } catch (error) {
      console.error("Erreur d’envoi de l’email de réinitialisation", error);
    }
  } else {
    console.warn("RESEND_API_KEY absent: lien de réinitialisation non envoyé", resetUrl);
  }

  return NextResponse.json({ message: confirmationMessage });
}
