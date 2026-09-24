"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AdminReservation = {
  id: string;
  formationTitle: string;
  status: "CONFIRMED" | "CANCELLED";
  createdAt: string;
};

const PACK_PRICES: Record<string, number> = {
  "Pack Basique": 25000,
  "Pack Standard": 60000,
  "Pack Bon Plan": 150000,
  "Pack Premium": 250000,
  "Pack Entreprise": 650000,
};

const FORMATION_PRICES: Record<string, number> = {
  "Marketing Digital Complet": 50000,
  "Infographie & Design Graphique": 50000,
  "Développement Web": 60000,
  "Montage Vidéo & Cadrage Professionnel": 65000,
  "Bureautique Avancée & Excel Pro": 90000,
  "Boostez votre Productivité avec l'IA Générative": 50000,
};

const SERVICES_PRICES: Record<string, number> = {
  "Communication & Marketing Digital": 350000,
  "Développement & Transformation Numérique": 350000,
  "Production Audiovisuelle & Print": 80000,
};

function inferPriceFromPackName(packName?: string | null): number | undefined {
  if (!packName) return undefined;

  const normalized = packName.trim();
  if (!normalized) return undefined;

  const direct = PACK_PRICES[normalized];
  if (direct) return direct;

  const lower = normalized.toLowerCase();
  for (const [label, value] of Object.entries(PACK_PRICES)) {
    if (lower.includes(label.toLowerCase())) {
      return value;
    }
  }

  return undefined;
}

function inferPriceFromFormationName(formation?: string | null): number | undefined {
  if (!formation) return undefined;

  const direct = FORMATION_PRICES[formation.trim()];
  if (direct) return direct;

  const lower = formation.toLowerCase();
  for (const [label, value] of Object.entries(FORMATION_PRICES)) {
    if (lower.includes(label.toLowerCase())) {
      return value;
    }
  }

  return undefined;
}

function inferPriceFromSubject(subject?: string | null): number | undefined {
  if (!subject) return 150000;

  const normalized = subject.trim();
  if (!normalized) return 150000;

  const lower = normalized.toLowerCase();

  if (lower.includes("audiovisuelle") || lower.includes("print")) {
    return 80000;
  }

  if (lower.includes("communication") || lower.includes("marketing")) {
    return 350000;
  }

  if (lower.includes("développement") || lower.includes("transformation")) {
    return 350000;
  }

  for (const [label, value] of Object.entries(SERVICES_PRICES)) {
    if (lower.includes(label.toLowerCase())) {
      return value;
    }
  }

  const directPack = inferPriceFromPackName(subject);
  if (directPack) return directPack;

  if (lower.includes("marketing") || lower.includes("design") || lower.includes("web") || lower.includes("ia") || lower.includes("excel")) {
    return inferPriceFromFormationName(subject);
  }

  return 150000;
}

export type AdminInscription = {
  id: string;
  name: string;
  email: string;
  phone: string;
  formation: string | null;
  price?: number;
  status: "PENDING" | "CONFIRMED";
  createdAt: string;
};

export type AdminQuoteRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  price?: number;
  createdAt: string;
};

export type AdminPackOrder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  packName: string;
  price?: number;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  reservations: AdminReservation[];
};

export async function getAdminData(): Promise<{
  users: AdminUser[];
  inscriptions: AdminInscription[];
  quoteRequests: AdminQuoteRequest[];
  packOrders: AdminPackOrder[];
}> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Accès administrateur requis.");
  }

  const [usersData, inscriptionsData, quoteRequestsData, packOrdersData] = await Promise.all([
    prisma.user.findMany({
      include: { reservations: { orderBy: { createdAt: "desc" } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.inscription.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.packOrder.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const users: AdminUser[] = usersData.map((user: (typeof usersData)[number]) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    reservations: user.reservations.map((reservation: (typeof user.reservations)[number]) => ({
      id: reservation.id,
      formationTitle: reservation.formationTitle,
      status: reservation.status,
      createdAt: reservation.createdAt.toISOString(),
    })),
  }));

  const inscriptions: AdminInscription[] = inscriptionsData.map((item: (typeof inscriptionsData)[number]) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    formation: item.formation || null,
    price: inferPriceFromFormationName(item.formation),
    status: item.status,
    createdAt: item.createdAt.toISOString(),
  }));

  const quoteRequests: AdminQuoteRequest[] = quoteRequestsData.map((item: (typeof quoteRequestsData)[number]) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    subject: item.subject,
    message: item.message,
    price: inferPriceFromSubject(item.subject) ?? 0,
    createdAt: item.createdAt.toISOString(),
  }));

  const packOrders: AdminPackOrder[] = packOrdersData.map((item: (typeof packOrdersData)[number]) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    packName: item.packName,
    price: inferPriceFromPackName(item.packName),
    createdAt: item.createdAt.toISOString(),
  }));

  return { users, inscriptions, quoteRequests, packOrders };
}

export async function deleteInscription(id: string) {
  await prisma.inscription.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function deleteQuoteRequest(id: string) {
  await prisma.quoteRequest.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function deletePackOrder(id: string) {
  await prisma.packOrder.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function updateInscription(
  id: string,
  data: { name: string; email: string; phone: string; formation: string }
) {
  const payload = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    formation: data.formation.trim(),
  };

  await prisma.inscription.update({
    where: { id },
    data: payload,
  });

  revalidatePath("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}