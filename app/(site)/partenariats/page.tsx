import React from 'react';
import { Metadata } from 'next';
import { GraduationCap, Globe2, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

const partnershipTypes = [
  {
    icon: GraduationCap,
    title: "Partenariat formation",
    description: "Écoles, centres de formation et institutions souhaitant proposer des contenus pratiques et certifiants.",
  },
  {
    icon: Globe2,
    title: "Partenariat média",
    description: "Médias, influenceurs et acteurs locaux pour multiplier la visibilité et créer des contenus de qualité.",
  },
  {
    icon: Building2,
    title: "Partenariat corporate",
    description: "Entreprises et projets digitaux qui veulent renforcer leur communication et leur impact local.",
  },
];

const partnerLogos = ["Partenaire 1", "Partenaire 2", "Partenaire 3", "Partenaire 4"];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Partenariats",
    description: "Trouvez des formats de partenariat pour renforcer votre visibilité et vos actions de communication digitale à Ziguinchor.",
    slug: "/partenariats",
  });
}

export default function PartenariatsPage() {
  return (
    <div className="w-full">
      {/* 1. SECTION HERO PLEINE LARGEUR */}
      <section className="w-full bg-[#004d31] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f1c40f]">
            Partenariats
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">
            Pourquoi devenir partenaire d&apos;Izicasa ?
          </h1>
          <p className="max-w-3xl mx-auto text-base text-gray-200">
            Nous créons des collaborations utiles, visibles et durables autour de la communication digitale, de la formation et de la diffusion de contenus au bénéfice du tissu économique et associatif de Ziguinchor et du Sénégal.
          </p>
        </div>
      </section>

      {/* 2. CONTENEUR GLOBAL CENTRÉ POUR LE RESTE DU CONTENU */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* SECTION FORMATS DE COLLABORATION */}
        <section className="space-y-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Types de partenariats
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Des formats de collaboration adaptés à chaque acteur
            </h2>
          </div>
        </section>

        {/* GRILLE DYNAMIQUE DES PARTENARIATS */}
        <div className="grid gap-6 lg:grid-cols-3 mt-8">
          {partnershipTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="border border-border/70 bg-card/80 shadow-sm transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* SECTION LOGOS DES PARTENAIRES */}
        <section className="space-y-6 rounded-[2rem] border border-border/70 bg-background/80 p-8 shadow-sm sm:p-10 mt-12">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Ils nous font confiance
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Logos partenaires
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Ces espaces sont prêts à accueillir les vrais logos de vos partenaires dès que vous les aurez.
            </p>
          </div>

          {/* GRILLE DES LOGOS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {partnerLogos.map((logo) => (
              <div key={logo} className="flex h-28 items-center justify-center rounded-2xl border border-border/70 bg-gray-100 font-medium text-slate-400">
                {logo}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION FORMULAIRE DE CANDIDATURE */}
        <section className="rounded-[2rem] border border-primary/10 bg-[#f1c40f] p-8 shadow-lg sm:p-10 mt-12 text-[#004d31]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] opacity-80">
                Demande de partenariat
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#004d31]">
                Déposez votre candidature de partenariat
              </h2>
              <p className="text-lg opacity-90">
                Dites-nous qui vous êtes, dans quel secteur vous évoluez et quel type de collaboration vous intéresse.
              </p>
            </div>

            {/* LE FORMULAIRE */}
            <form className="space-y-4 rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm text-slate-900">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="structure">
                    Nom de la structure
                  </label>
                  <Input id="structure" placeholder="Ex: Ma Structure" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Adresse email
                  </label>
                  <Input id="email" type="email" placeholder="Ex: contact@structure.com" className="w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="message">
                  Votre message / proposition
                </label>
                <Textarea id="message" placeholder="Décrivez votre projet de partenariat..." rows={4} className="w-full" />
              </div>
              <Button type="submit" className="w-full bg-[#004d31] hover:bg-[#003622] text-white">
                Envoyer ma demande
              </Button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}