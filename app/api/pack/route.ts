import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, packName } = body ?? {};

    const finalPackName = String(packName || subject || "").trim();

    if (!name || !email || !phone || !finalPackName) {
      return NextResponse.json({ error: "Tous les champs requis pour le pack sont obligatoires." }, { status: 400 });
    }

    const packOrder = await prisma.packOrder.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim(),
        phone: String(phone).trim(),
        packName: finalPackName,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Votre demande de pack a bien été enregistrée.",
      data: packOrder,
    });
  } catch (error) {
    console.error("Erreur pack / souscription :", error);
    return NextResponse.json({ error: "Impossible d’enregistrer la souscription pour l’instant." }, { status: 500 });
  }
}
