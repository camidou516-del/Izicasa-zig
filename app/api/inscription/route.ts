import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialisation de Resend avec ta clé API
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, formation } = body;

    // Vérification basique des champs reçus
    if (!name || !email || !phone || !formation) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Envoi du mail via Resend vers ton adresse de réception
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Expéditeur de test par défaut fourni par Resend
      to: "hamidoucoulibaly576@gmail.com", // Ton adresse Gmail pour recevoir l'alerte
      subject: `✨ Nouvelle inscription : ${formation}`,
      html: `
        <h3>Détails du candidat :</h3>
        <p><strong>Nom complet :</strong> ${name}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Formation choisie :</strong> ${formation}</p>
      `,
    });

    return NextResponse.json(
      { message: "Inscription reçue et email envoyé avec succès !", data },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Erreur d'envoi Resend :", error);
    return NextResponse.json(
      { message: "Impossible d'envoyer la demande pour le moment." },
      { status: 500 }
    );
  }
}