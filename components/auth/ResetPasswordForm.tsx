"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, token }) });
    const result = await response.json();
    if (!response.ok) { setError(result.message || "Impossible de réinitialiser le mot de passe."); setLoading(false); return; }
    router.push("/login?reset=success");
  }

  return <form onSubmit={submit} className="space-y-4 rounded-2xl border border-[#dce9e4] bg-white p-6 shadow-sm"><div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="password">Nouveau mot de passe</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="password" name="password" type="password" minLength={8} required /></div><div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="confirmPassword">Confirmation du mot de passe</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="confirmPassword" name="confirmPassword" type="password" minLength={8} required /></div>{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={loading} className="w-full rounded-md bg-[#004d3d] px-4 py-3 font-semibold text-white transition hover:bg-[#00382d] disabled:opacity-60">{loading ? "Mise à jour..." : "Réinitialiser le mot de passe"}</button></form>;
}
