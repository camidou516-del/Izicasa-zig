import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Globe2,
  Megaphone,
  PenTool,
  Radio,
  Share2,
} from "lucide-react";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Services | Izicasa Sénégal",
  description:
    "Découvrez les services Izicasa Sénégal : communication digitale, développement web, transformation numérique, audiovisuel et print à Ziguinchor.",
};

const servicePoles = [
  {
    number: "01",
    icon: Megaphone,
    title: "Communication & Marketing Digital",
    intro:
      "Construisez une marque claire, visible et cohérente sur les canaux qui comptent pour votre audience.",
    services: [
      "Community Management et animation éditoriale",
      "E-réputation, veille et gestion des conversations",
      "Stratégie digitale et plans de communication",
      "Branding et identité visuelle",
      "Journalisme, interviews et contenus éditoriaux",
    ],
    detail:
      "Nous définissons votre positionnement, vos messages, vos formats et votre calendrier avant de produire et publier des contenus mesurables.",
    entryPrice: "Dès 350 000 FCFA",
    className: "bg-[#004d3d] text-white",
    iconClassName: "bg-[#f7e052] text-[#004d3d]",
  },
  {
    number: "02",
    icon: Globe2,
    title: "Développement & Transformation Numérique",
    intro:
      "Transformez vos idées et vos processus en expériences numériques rapides, accessibles et utiles.",
    services: [
      "Sites vitrines et institutionnels dès 350 000 FCFA",
      "Sites e-commerce dès 500 000 FCFA",
      "Applications web et mobiles",
      "Logiciels et solutions sur mesure",
      "Web design, webmastering et digitalisation de processus",
    ],
    detail:
      "Du cadrage à la mise en ligne, nous concevons des interfaces responsive et des outils adaptés à vos utilisateurs et à votre organisation.",
    entryPrice: "Dès 350 000 FCFA",
    className: "bg-white text-slate-900",
    iconClassName: "bg-[#004d3d] text-[#f7e052]",
  },
  {
    number: "03",
    icon: Camera,
    title: "Production Audiovisuelle & Print",
    intro:
      "Donnez une forme forte à votre histoire avec des images, des vidéos et des supports prêts à diffuser.",
    services: [
      "Tournage et montage vidéo dès 80 000 FCFA",
      "Captures drone : 35 000 FCFA la demi-journée, 65 000 FCFA la journée",
      "Shooting photo à l'unité ou en packs",
      "Publi-reportages dès 100 000 FCFA",
      "Motion design, reportage, voix off, design graphique et impression",
    ],
    detail:
      "Nous préparons le brief, le conducteur, la production, la postproduction et les exports adaptés à vos réseaux, événements ou supports imprimés.",
    entryPrice: "Dès 80 000 FCFA",
    className: "bg-[#f7e052] text-[#004d3d]",
    iconClassName: "bg-[#004d3d] text-[#f7e052]",
  },
];

const highlights = [
  { icon: Share2, label: "Stratégie et visibilité" },
  { icon: PenTool, label: "Création et identité" },
  { icon: Radio, label: "Contenus et diffusion" },
];

export default async function ServicesPage() {
  const session = await getSession();
  const isAuthenticated = Boolean(session);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="w-full bg-[#004d3d] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#f7e052]">
              L&apos;expertise Izicasa Sénégal
            </p>
            <h1 className="font-heading text-4xl font-black leading-tight sm:text-6xl">
              Des solutions qui donnent de l&apos;élan à vos projets.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-emerald-100/80 sm:text-lg">
              Communication, technologie et création réunies dans un accompagnement pensé pour les réalités des entreprises et organisations du Sénégal.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-3 text-sm text-emerald-50">
                <Icon className="h-4 w-4 text-[#f7e052]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B6E4F]">Nos trois pôles</p>
          <h2 className="mt-3 font-heading text-3xl font-black text-[#004d3d] sm:text-4xl">
            Une équipe pour penser, produire et déployer.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {servicePoles.map(({ number, icon: Icon, title, intro, services, detail, entryPrice, className, iconClassName }) => (
            <article key={title} className={`flex flex-col p-7 shadow-sm ${className}`}>
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClassName}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-heading text-4xl font-black opacity-25">{number}</span>
              </div>
              <h3 className="mt-7 font-heading text-2xl font-black">{title}</h3>
              <p className={`mt-4 text-sm leading-relaxed ${className.includes("text-white") ? "text-emerald-50/80" : "text-slate-600"}`}>
                {intro}
              </p>
              <p className={`mt-6 text-base font-bold ${className.includes("text-white") ? "text-[#f7e052]" : "text-[#004d3d]"}`}>
                {entryPrice}
              </p>

              {!isAuthenticated ? (
                <>
                  <p className={`mt-5 text-sm leading-relaxed ${className.includes("text-white") ? "text-emerald-50/80" : "text-slate-600"}`}>
                    Connectez-vous pour débloquer le détail complet des prestations.
                  </p>
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent("/services")}`}
                    className="mt-8 inline-flex items-center justify-center gap-2 self-start bg-[#004d3d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#003328]"
                  >
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              ) : (
                <>
                  <ul className="mt-6 space-y-3 border-t border-current/15 pt-6 text-sm">
                    {services.map((service) => (
                      <li key={service} className="flex gap-3 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-6 border-t border-current/15 pt-5 text-xs leading-relaxed ${className.includes("text-white") ? "text-emerald-50/70" : "text-slate-500"}`}>
                    {detail}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center gap-2 self-start bg-[#004d3d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#003328]"
                  >
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-black text-[#004d3d]">Un besoin précis ?</h2>
          <p className="mt-2 text-sm text-slate-600">Parlons de votre objectif et construisons le bon périmètre.</p>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 self-start bg-[#004d3d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#003328]">
          Demander un devis <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
