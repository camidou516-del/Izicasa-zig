import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token || "";
  return <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16"><h1 className="mb-2 text-3xl font-bold text-[#004d3d]">Nouveau mot de passe</h1><p className="mb-6 text-slate-600">Choisissez un nouveau mot de passe pour sécuriser votre compte.</p>{token ? <ResetPasswordForm token={token} /> : <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Le lien de réinitialisation est manquant ou invalide.</p>}<p className="mt-5 text-center text-sm text-slate-600"><Link href="/login" className="font-semibold text-[#004d3d] hover:text-[#00382d]">Retour à la connexion</Link></p></main>;
}
