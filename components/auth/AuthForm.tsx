"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) setError(result.message || "Une erreur est survenue.");
    else router.push("/formations");
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className={`grid grid-cols-1 gap-4 rounded-2xl border border-[#dce9e4] bg-white p-6 shadow-sm ${mode === "register" ? "md:grid-cols-2" : ""}`}>
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="name">Nom complet</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="name" name="name" required /></div>}
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="phone">Téléphone</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="phone" name="phone" type="tel" required /></div>}
      <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="email">Email</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="email" name="email" type="email" required /></div>
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="address">Adresse physique</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="address" name="address" placeholder="Ville / Quartier" required /></div>}
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="formationSubject">Sujet de formation souhaité</label><select className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="formationSubject" name="formationSubject" defaultValue="" required><option value="" disabled>Choisir une formation</option><option>Bureautique Avancée &amp; Excel Pro</option><option>IA Générative</option><option>Montage Vidéo &amp; Cadrage</option><option>Infographie &amp; Design Graphique</option><option>Développement Web No-code</option><option>Marketing Digital</option></select></div>}
      <div className={mode === "register" ? "md:col-span-2" : "space-y-2"}>
        {mode === "login" ? (
          <>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-[#004d3d]">
                Mot de passe
              </label>
              <Link href="/forgot-password" className="text-xs font-medium text-[#004d3d] hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20"
            />
          </>
        ) : (
          <>
            <label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="password">Mot de passe</label>
            <input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="password" name="password" type="password" minLength={8} required />
          </>
        )}
      </div>
      {error && <p className={mode === "register" ? "text-sm text-red-600 md:col-span-2" : "text-sm text-red-600"}>{error}</p>}
      <button disabled={loading} className={`w-full rounded-md bg-[#004d3d] px-4 py-3 font-semibold text-white transition hover:bg-[#00382d] disabled:opacity-60 ${mode === "register" ? "md:col-span-2" : ""}`}>{loading ? "Veuillez patienter..." : mode === "login" ? "Se connecter" : "Créer mon compte"}</button>
    </form>
  );
}
