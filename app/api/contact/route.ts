import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body ?? {};

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim(),
        phone: String(phone).trim(),
        subject: String(subject).trim(),
        message: String(message).trim(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Votre message a bien été reçu. Nous vous recontacterons très bientôt.",
      data: quoteRequest,
    });
  } catch (error) {
    console.error("Erreur contact / devis :", error);
    return NextResponse.json({ error: "Impossible d’envoyer le message pour l’instant." }, { status: 500 });
  }
}
