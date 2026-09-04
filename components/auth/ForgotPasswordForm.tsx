"use client";

import { FormEvent, useState } from "react";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const email = new FormData(event.currentTarget).get("email");
    const response = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const result = await response.json();
    setMessage(result.message || "Consultez votre boîte email.");
    setLoading(false);
  }

  return <form onSubmit={submit} className="space-y-4 rounded-2xl border border-[#dce9e4] bg-white p-6 shadow-sm"><div><label className="mb-1 block text-sm font-semibold text-[#004d3d]" htmlFor="email">Adresse email</label><input className="h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-[#004d3d] focus:ring-2 focus:ring-[#004d3d]/20" id="email" name="email" type="email" required /></div><button disabled={loading} className="w-full rounded-md bg-[#004d3d] px-4 py-3 font-semibold text-white transition hover:bg-[#00382d] disabled:opacity-60">{loading ? "Envoi en cours..." : "Envoyer le lien"}</button>{message && <p role="status" className="text-sm font-medium text-[#004d3d]">{message}</p>}</form>;
}
