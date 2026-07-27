import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.phone || !body?.subject || !body?.message) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    // TODO: brancher Resend ou un webhook ici.
    console.log("Nouvelle demande de contact", body);

    return NextResponse.json({
      success: true,
      message: "Votre message a bien été reçu. Nous vous recontacterons très bientôt.",
    });
  } catch {
    return NextResponse.json({ error: "Impossible d’envoyer le message pour l’instant." }, { status: 500 });
  }
}
