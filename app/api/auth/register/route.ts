import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, formation, address, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    // 1. Création dans la table Inscription (si existante)
    if (prisma.inscription) {
      await prisma.inscription.create({
        data: {
          name: name || '',
          email: email,
          phone: phone || '',
          formation: formation || '',
        },
      });
    }

    // 2. Hashage du mot de passe et création dans la table User
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name || '',
        email: email,
        password: hashedPassword,
        phone: phone || '',
        address: address || '',
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: unknown) {
    const errorCode = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code?: unknown }).code) : '';
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la création du compte';
    const isDuplicateEmail = errorCode === 'P2002' || errorMessage.includes('Unique constraint failed') || errorMessage.includes('Unique constraint failed on the fields: (`email`)');

    console.error("=== ERREUR INSCRIPTION ===", error);

    if (isDuplicateEmail) {
      return NextResponse.json(
        { error: 'Cette adresse email est déjà associée à un compte. Veuillez vous connecter ou utiliser une autre adresse.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

