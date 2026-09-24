"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export function AuthForm({ mode, callbackUrl }: { mode: "login" | "register"; callbackUrl?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const serverMessage = typeof result?.error === "string" ? result.error : typeof result?.message === "string" ? result.message : "Une erreur est survenue.";
        setError(serverMessage);
        return;
      }

      const destination = typeof callbackUrl === "string" && callbackUrl.startsWith("/") ? callbackUrl : "/formations";
      router.refresh();
      router.push(destination);
    } catch {
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`grid grid-cols-1 gap-4 rounded-2xl border border-[#dce9e4] bg-white p-6 shadow-sm ${mode === "register" ? "md:grid-cols-2" : ""}`}>
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="name">Nom complet</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="name" name="name" required /></div>}
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="phone">Téléphone</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="phone" name="phone" type="tel" required /></div>}
      <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="email">Email</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="email" name="email" type="email" required /></div>
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="address">Adresse physique</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="address" name="address" placeholder="Ville / Quartier" required /></div>}
      {mode === "register" && <div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="formationSubject">Offre ou Service souhaité</label><select className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="formationSubject" name="formationSubject" defaultValue="" required><option value="" disabled>Sélectionnez une offre (Formation, Service ou Pack)</option><optgroup label="Formations"><option>Bureautique Avancée &amp; Excel Pro</option><option>IA Générative &amp; Automatisation</option><option>Montage Vidéo &amp; Cadrage</option><option>Infographie &amp; Design Graphique</option><option>Développement Web No-code / Fullstack</option><option>Marketing Digital &amp; Growth</option></optgroup><optgroup label="Services Sur Mesure"><option>Communication &amp; Marketing Digital</option><option>Développement &amp; Transformation Numérique (Site web / App)</option><option>Production Audiovisuelle &amp; Print (Tournage, Drones, Photos)</option></optgroup><optgroup label="Packs Digitaux Mensuels"><option>Pack Basique — 25 000 FCFA/mois</option><option>Pack Standard — 60 000 FCFA/mois</option><option>Pack Bon Plan — 150 000 FCFA/mois</option><option>Pack Premium — 250 000 FCFA/mois</option><option>Pack Entreprise — 650 000 FCFA/mois</option></optgroup></select></div>}
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
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                className="w-full rounded-md border border-slate-200 px-3 py-2 pr-10 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20"
              />
              <button
                type="button"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-[#004d3d]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </>
        ) : (
          <>
            <label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="password">Mot de passe</label>
            <div className="relative">
              <input
                className="h-11 w-full rounded-md border border-slate-200 px-3 pr-10 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                minLength={8}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-[#004d3d]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </>
        )}
      </div>
      {error && <p className={mode === "register" ? "text-sm text-red-600 md:col-span-2" : "text-sm text-red-600"}>{error}</p>}
      <button disabled={loading} className={`w-full rounded-md bg-[#004d3d] px-4 py-3 font-semibold text-white transition hover:bg-[#00382d] disabled:opacity-60 ${mode === "register" ? "md:col-span-2" : ""}`}>{loading ? "Veuillez patienter..." : mode === "login" ? "Se connecter" : "Créer mon compte"}</button>
    </form>
  );
}
