"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReserveButton({ formationTitle }: { formationTitle: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function openConfirmation() {
    const response = await fetch("/api/auth/session");
    if (response.status === 401) { router.push(`/register?callbackUrl=${encodeURIComponent(`/formations`)}`); return; }
    setOpen(true);
  }

  async function reserve() {
    setLoading(true);
    const response = await fetch("/api/reservations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formationTitle }) });
    const result = await response.json();
    setMessage(response.ok ? "Réservation confirmée. Un email et un SMS vous seront envoyés si les services sont configurés." : result.message);
    setLoading(false);
    if (response.ok) setOpen(false);
  }

  return <>
    <button onClick={openConfirmation} className="w-full rounded-xl bg-[#f1c40f] px-4 py-4 font-bold text-[#004d3d] shadow-md transition hover:bg-[#e5b90a]">Réserver une formation</button>
    {open && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="reservation-title"><div className="w-full max-w-md rounded-2xl bg-white p-6 text-slate-900 shadow-xl"><h2 id="reservation-title" className="text-xl font-bold text-[#004d3d]">Confirmer votre réservation</h2><p className="mt-3 text-sm text-slate-600">Formation: <strong>{formationTitle}</strong></p><p className="mt-2 text-sm text-slate-600">Cette formation est gratuite à la réservation. Vos coordonnées seront utilisées pour la confirmation.</p><div className="mt-6 flex gap-3"><button onClick={() => setOpen(false)} className="flex-1 rounded-md border px-4 py-3 font-semibold">Annuler</button><button onClick={reserve} disabled={loading} className="flex-1 rounded-md bg-[#004d3d] px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Confirmation..." : "Confirmer"}</button></div></div></div>}
    {message && <p className="mt-3 text-center text-sm font-medium text-emerald-700">{message}</p>}
  </>;
}
