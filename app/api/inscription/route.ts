import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "re_dummy_key_for_build";
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, formation } = body;

    if (!name || !email || !phone || !formation) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const inscription = await prisma.inscription.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim(),
        phone: String(phone).trim(),
        formation: String(formation).trim(),
        status: "PENDING",
      },
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "hamidoucoulibaly576@gmail.com",
      subject: `✨ Nouvelle inscription : ${inscription.formation}`,
      html: `
        <h3>Détails du candidat :</h3>
        <p><strong>Nom complet :</strong> ${inscription.name}</p>
        <p><strong>Téléphone :</strong> ${inscription.phone}</p>
        <p><strong>Email :</strong> ${inscription.email}</p>
        <p><strong>Formation choisie :</strong> ${inscription.formation}</p>
      `,
    });

    return NextResponse.json(
      { message: "Inscription enregistrée avec succès.", data: inscription },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Erreur inscription :", error);
    return NextResponse.json(
      { message: "Impossible d'enregistrer la demande pour le moment." },
      { status: 500 }
    );
  }
}