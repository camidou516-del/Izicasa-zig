import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16"><h1 className="mb-2 text-3xl font-bold text-[#004d3d]">Mot de passe oublié ?</h1><p className="mb-6 text-slate-600">Saisissez votre email pour recevoir un lien sécurisé de réinitialisation.</p><ForgotPasswordForm /><p className="mt-5 text-center text-sm text-slate-600"><Link href="/login" className="font-semibold text-[#004d3d] hover:text-[#00382d]">Retour à la connexion</Link></p></main>;
}
