import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validation";

async function sendSms(phone: string, message: string) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) return;
  const body = new URLSearchParams({ To: phone, From: TWILIO_FROM_NUMBER, Body: message });
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error(`Twilio error ${response.status}`);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Connectez-vous pour réserver une formation." }, { status: 401 });
  const parsed = reservationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Formation invalide." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 401 });
  const reservation = await prisma.reservation.create({ data: { userId: user.id, formationTitle: parsed.data.formationTitle } });

  const notifications = [];
  if (process.env.RESEND_API_KEY) {
    notifications.push(new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: user.email,
      subject: `Confirmation de réservation - ${reservation.formationTitle}`,
      html: `<p>Bonjour ${user.name},</p><p>Votre réservation pour <strong>${reservation.formationTitle}</strong> est confirmée.</p>`,
    }));
  }
  if (user.phone) notifications.push(sendSms(user.phone, `Izicasa: votre réservation pour ${reservation.formationTitle} est confirmée.`));
  const results = await Promise.allSettled(notifications);
  results.filter((result) => result.status === "rejected").forEach((result) => console.error("Notification reservation échouée", result.reason));

  return NextResponse.json({ reservation }, { status: 201 });
}
