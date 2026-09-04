import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage({ searchParams }: { searchParams: { reset?: string } }) {
  return <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16"><h1 className="mb-2 text-3xl font-bold text-[#004d3d]">Connexion</h1><p className="mb-6 text-slate-600">Retrouvez vos réservations Izicasa.</p>{searchParams.reset === "success" && <p role="status" className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-[#004d3d]">Votre mot de passe a été réinitialisé. Vous pouvez vous connecter.</p>}<AuthForm mode="login" /><p className="mt-5 text-center text-sm text-slate-600">Pas encore de compte ? <Link href="/register" className="font-semibold text-[#004d3d] underline decoration-[#f1c40f] decoration-2 underline-offset-4 hover:text-[#00382d]">S&apos;inscrire</Link></p></main>;
}
