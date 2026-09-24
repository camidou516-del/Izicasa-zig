import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Nos packs | Izicasa Sénégal",
  description:
    "Comparez les packs mensuels Izicasa Sénégal pour votre communication digitale : Basique, Standard, Bon Plan, Premium et Entreprise.",
};

const packs = [
  {
    name: "Pack Basique",
    price: "25 000",
    target: "TPE & Entrepreneurs",
    description: "Les fondamentaux pour installer une présence digitale professionnelle.",
    features: [
      "Profils Facebook, Instagram et TikTok créés ou personnalisés",
      "WhatsApp Business : catalogue et synchronisation",
      "2 publications visuelles par semaine",
      "Rédaction et publication",
      "Optimisation SEO de base",
    ],
    className: "border-slate-200 bg-white",
    priceClassName: "text-[#004d3d]",
  },
  {
    name: "Pack Standard",
    price: "60 000",
    target: "Petites entreprises",
    description: "Une animation régulière pour professionnaliser votre présence et votre communauté.",
    features: [
      "Facebook, Instagram, LinkedIn, TikTok et WhatsApp Business complet",
      "3 publications visuelles par semaine",
      "1 boostage Meta mensuel, environ 1 500 personnes touchées",
      "1 000 abonnés offerts sur Facebook",
      "Community Management : commentaires et modération",
      "Design de flyers, badges, catalogues et roll up",
      "1 publi-reportage tous les 6 mois",
    ],
    className: "border-[#004d3d]/20 bg-white",
    priceClassName: "text-[#004d3d]",
  },
  {
    name: "Pack Bon Plan",
    price: "150 000",
    target: "PME & Startups",
    description: "Un dispositif multi-plateformes pour accélérer visibilité et acquisition.",
    features: [
      "Facebook, Instagram, YouTube, X, LinkedIn, TikTok et Snapchat",
      "4 publications visuelles et écrites par semaine",
      "Campagnes Google Ads, Facebook Ads et TikTok Ads",
      "1 boostage Meta + Google, environ 5 000 personnes touchées",
      "1 000 abonnés Facebook + Instagram",
      "Community Management poussé : quiz, concours et gestion de crise",
      "1 émission FM/Digital par an et 3 publi-reportages par an",
      "Captures drone et Live Streaming, maximum 2 par an",
      "Branding complet : logo, print, enseigne, stylos et véhicule",
    ],
    className: "border-[#f7e052] bg-[#f7e052]",
    priceClassName: "text-[#004d3d]",
    featured: true,
  },
  {
    name: "Pack Premium",
    price: "250 000",
    target: "PME en croissance",
    description: "Un accompagnement renforcé pour structurer la croissance et la réputation.",
    features: [
      "Profils optimisés sur toutes les plateformes pertinentes",
      "5 publications visuelles et écrites par semaine",
      "2 boostages mensuels Meta + Google + TikTok, environ 8 000 personnes touchées",
      "2 000 abonnés sur Facebook, Instagram et TikTok",
      "Community Management complet et stratégie de réputation",
      "5 publi-reportages par an et 1 émission FM interactive d'une heure tous les 6 mois",
      "Drones et Live Streaming, maximum 3 par an",
      "1 grand reportage de 25 minutes par an",
      "Identité visuelle complète et branding",
    ],
    className: "border-[#004d3d] bg-[#004d3d] text-white",
    priceClassName: "text-[#f7e052]",
  },
  {
    name: "Pack Entreprise",
    price: "650 000",
    target: "Grandes entreprises & Institutions",
    description: "Un pilotage digital global pour les organisations aux enjeux multiples.",
    features: [
      "Gestion intégrale des profils",
      "Gestion et maintenance annuelle du site web",
      "7 publications visuelles et écrites par semaine minimum",
      "3 boostages mensuels multi-plateformes, environ 10 000 personnes touchées",
      "4 000 abonnés sur Facebook, Instagram, YouTube et TikTok",
      "Community Management, marketing d'influence et gestion de crise",
      "10 publi-reportages par an et 1 émission FM interactive tous les 6 mois",
      "Drones en accès total et Live Streaming de toutes les activités",
      "1 grand reportage par an",
      "Rapport mensuel, analyse concurrentielle et stratégie globale",
      "Charte graphique complète et protection d'image",
    ],
    className: "border-slate-800 bg-[#003328] text-white",
    priceClassName: "text-[#f7e052]",
  },
];

export default async function PacksPage() {
  const session = await getSession();
  const isAuthenticated = Boolean(session);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="w-full bg-[#004d3d] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f7e052]">
              <Sparkles className="h-4 w-4" /> Accompagnement mensuel
            </p>
            <h1 className="font-heading text-4xl font-black leading-tight sm:text-6xl">
              Le bon rythme pour faire grandir votre présence digitale.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-emerald-100/90 sm:text-lg">
              Choisissez une formule claire, adaptée à votre niveau de développement. Chaque pack combine stratégie, contenus, animation et visibilité.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6E4F]">5 formules 2026</p>
          <h2 className="mt-3 font-heading text-3xl font-black text-[#004d3d] sm:text-4xl">Comparez ce qui est inclus.</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Les budgets publicitaires et frais externes sont confirmés dans le devis selon le périmètre de la mission.</p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {packs.map((pack) => (
            <article key={pack.name} className={`relative flex h-full flex-col border p-6 shadow-sm sm:p-7 ${pack.className}`}>
              {pack.featured && (
                <span className="absolute right-5 top-5 bg-[#004d3d] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#f7e052]">Le plus choisi</span>
              )}
              <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-65">{pack.target}</p>
              <h3 className="mt-3 font-heading text-2xl font-black">{pack.name}</h3>
              <p className="mt-4 min-h-12 text-sm leading-relaxed opacity-75">{pack.description}</p>
              <div className="mt-7 border-y border-current/15 py-5">
                <span className={`font-heading text-3xl font-black ${pack.priceClassName}`}>{pack.price}</span>
                <span className="ml-2 text-sm font-semibold opacity-70">FCFA / mois</span>
              </div>

              {!isAuthenticated ? (
                <>
                  <p className="mt-6 text-sm leading-relaxed opacity-80">
                    Connectez-vous pour débloquer le détail complet des avantages inclus.
                  </p>
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent("/packs")}`}
                    className="mt-8 inline-flex items-center justify-center gap-2 border border-current/25 px-4 py-3 text-sm font-bold transition hover:bg-current/10"
                  >
                    Choisir ce pack <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              ) : (
                <>
                  <ul className="mt-6 flex-1 space-y-3">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-relaxed opacity-90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0B6E4F]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?pack=${encodeURIComponent(pack.name)}&subject=${encodeURIComponent(pack.name)}`}
                    className="mt-8 inline-flex items-center justify-center gap-2 border border-current/25 px-4 py-3 text-sm font-bold transition hover:bg-current/10"
                  >
                    Choisir ce pack <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-black text-[#004d3d]">Besoin d&apos;une formule personnalisée ?</h2>
          <p className="mt-2 text-sm text-slate-600">Nous adaptons le périmètre, les plateformes et le rythme à vos objectifs.</p>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 self-start bg-[#004d3d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#003328]">
          <MessageCircle className="h-4 w-4" /> Échanger avec Izicasa
        </Link>
      </section>
    </main>
  );
}
