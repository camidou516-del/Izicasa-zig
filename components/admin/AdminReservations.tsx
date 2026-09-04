"use client";

import Image from "next/image";
import { Printer, Receipt, X } from "lucide-react";
import { useState } from "react";
import type { AdminUser } from "@/app/admin/actions";

const priceByOffer: Record<string, number> = {
  "Pack Basique": 25000,
  "Pack Standard": 60000,
  "Pack Bon Plan": 150000,
  "Pack Premium": 250000,
  "Pack Entreprise": 650000,
};

function formatAmount(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

function getInvoiceNumber(createdAt: string, reservationId: string) {
  const year = new Date(createdAt).getFullYear();
  return `FACT-${year}-${reservationId.slice(-6).toUpperCase()}`;
}

function getPaymentStatus(status: AdminUser["reservations"][number]["status"]) {
  return status === "CONFIRMED"
    ? { label: "Payé", className: "bg-emerald-100 text-emerald-800" }
    : { label: "En attente", className: "bg-amber-100 text-amber-800" };
}

export function AdminReservations({ users }: { users: AdminUser[] }) {
  const [selected, setSelected] = useState<{
    user: AdminUser;
    reservation: AdminUser["reservations"][number];
  } | null>(null);

  return (
    <>
      <section className="admin-dashboard overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Utilisateur</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Réservations</th>
              <th className="px-4 py-3">Inscrit le</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-100 align-top">
                <td className="px-4 py-4">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-slate-500">{user.email}</div>
                </td>
                <td className="px-4 py-4">{user.phone || "-"}</td>
                <td className="px-4 py-4">{user.role}</td>
                <td className="px-4 py-4">
                  {user.reservations.length ? (
                    <ul className="space-y-2">
                      {user.reservations.map((reservation) => (
                        <li key={reservation.id} className="flex items-center justify-between gap-4">
                          <span>
                            {reservation.formationTitle}{" "}
                            <span className="text-slate-400">({reservation.status})</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelected({ user, reservation })}
                            className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#004d3d] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#003328]"
                          >
                            <Receipt className="h-3.5 w-3.5" />
                            Facture
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-slate-400">Aucune</span>
                  )}
                </td>
                <td className="px-4 py-4">{new Date(user.createdAt).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selected && <InvoiceDialog data={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function InvoiceDialog({
  data,
  onClose,
}: {
  data: { user: AdminUser; reservation: AdminUser["reservations"][number] };
  onClose: () => void;
}) {
  const { user, reservation } = data;
  const amount = priceByOffer[reservation.formationTitle] ?? 0;
  const payment = getPaymentStatus(reservation.status);
  const invoiceNumber = getInvoiceNumber(reservation.createdAt, reservation.id);
  const issueDate = new Date(reservation.createdAt).toLocaleDateString("fr-FR");

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/60 p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="invoice-title">
      <div className="mx-auto max-w-3xl">
        <div className="admin-dashboard mb-4 flex justify-end gap-2 print:hidden">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-md bg-[#f1c40f] px-4 py-2 text-sm font-semibold text-[#004d3d]">
            <Printer className="h-4 w-4" /> Imprimer / PDF
          </button>
          <button type="button" onClick={onClose} aria-label="Fermer la facture" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <article className="invoice-print-area bg-white p-6 text-slate-900 shadow-xl sm:p-10">
          <header className="flex flex-col gap-6 border-b-2 border-[#004d3d] pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <Image src="/logo/izicasa-fond-transparent.png" alt="Izicasa Sénégal" width={150} height={45} className="h-12 w-auto object-contain" />
              <div>
                <h1 id="invoice-title" className="text-xl font-black uppercase text-[#004d3d]">Izicasa Sénégal</h1>
                <p className="text-sm text-slate-500">Communication, formation et transformation digitale</p>
              </div>
            </div>
            <div className="text-left text-sm sm:text-right">
              <p className="font-bold text-[#004d3d]">FACTURE</p>
              <p className="mt-1 font-semibold">{invoiceNumber}</p>
              <p className="text-slate-500">Émise le {issueDate}</p>
            </div>
          </header>

          <div className="grid gap-6 border-b border-slate-200 py-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Émetteur</h2>
              <p className="mt-2 font-semibold">Izicasa Sénégal</p>
              <p className="text-sm text-slate-600">Ziguinchor, Sénégal</p>
              <p className="text-sm text-slate-600">Contact : à renseigner</p>
              <p className="text-sm text-slate-600">NINEA / RC : à renseigner</p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Client</h2>
              <p className="mt-2 font-semibold">{user.name}</p>
              <p className="text-sm text-slate-600">{user.email}</p>
              <p className="text-sm text-slate-600">{user.phone || "Téléphone non renseigné"}</p>
            </div>
          </div>

          <div className="py-6">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-300 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr><th className="pb-3">Prestation</th><th className="pb-3 text-center">Qté</th><th className="pb-3 text-right">Prix unitaire</th><th className="pb-3 text-right">Total</th></tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-4 font-semibold">{reservation.formationTitle}</td><td className="py-4 text-center">1</td><td className="py-4 text-right">{amount ? `${formatAmount(amount)} FCFA` : "À confirmer"}</td><td className="py-4 text-right font-semibold">{amount ? `${formatAmount(amount)} FCFA` : "À confirmer"}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div><span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${payment.className}`}>{payment.label}</span><p className="mt-2 text-xs text-slate-500">Paiement selon les conditions convenues avec Izicasa Sénégal.</p></div>
            <div className="text-left sm:text-right"><p className="text-xs uppercase tracking-wider text-slate-500">Montant total</p><p className="text-2xl font-black text-[#004d3d]">{amount ? `${formatAmount(amount)} FCFA` : "À confirmer"}</p></div>
          </div>

          <footer className="mt-12 flex flex-col gap-8 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-end sm:justify-between">
            <p>Merci pour votre confiance. Facture générée par l&apos;administration Izicasa Sénégal.</p>
            <div className="min-w-36 text-center"><div className="mb-8 border-b border-slate-300" /><span>Signature / cachet</span></div>
          </footer>
        </article>
      </div>
    </div>
  );
}
