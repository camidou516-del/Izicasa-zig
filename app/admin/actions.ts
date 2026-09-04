"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AdminReservation = {
  id: string;
  formationTitle: string;
  status: "CONFIRMED" | "CANCELLED";
  createdAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  reservations: AdminReservation[];
};

export async function getAdminData(): Promise<AdminUser[]> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Accès administrateur requis.");
  }

  const users = await prisma.user.findMany({
    include: { reservations: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    reservations: user.reservations.map((reservation) => ({
      id: reservation.id,
      formationTitle: reservation.formationTitle,
      status: reservation.status,
      createdAt: reservation.createdAt.toISOString(),
    })),
  }));
}
