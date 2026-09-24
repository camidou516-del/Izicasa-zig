import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage({ searchParams }: { searchParams?: { callbackUrl?: string } }) {
  const callbackUrl = typeof searchParams?.callbackUrl === "string" && searchParams.callbackUrl.startsWith("/") ? searchParams.callbackUrl : undefined;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#004d3d]">Créer un compte</h1>
      <p className="mb-6 text-slate-600">Réservez vos formations et recevez les confirmations.</p>
      <AuthForm mode="register" callbackUrl={callbackUrl} />
      <p className="mt-5 text-center text-sm text-slate-600">
        Déjà inscrit ?{" "}
        <Link
          href={callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/login"}
          className="font-semibold text-[#004d3d] hover:text-[#00382d]"
        >
          Connexion
        </Link>
      </p>
    </main>
  );
}
