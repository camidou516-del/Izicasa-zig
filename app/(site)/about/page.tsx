import React from 'react';
import Image from 'next/image';
import { Users, Target, Shield, Award } from 'lucide-react';

const team = [
  {
    name: "Samsidine SANÉ",
    role: "Fondateur & CEO",
    image: "/equipe/sam.png",
  },
  {
    name: "Lamine Badji",
    role: "Responsable Pédagogique",
    image: "/equipe/sam.png",
  },
  {
    name: "Fadji SANÉ",
    role: "Assistant Formateur",
    image: "/equipe/fadj.png",
  },
];

const stats = [
  { value: "200+", label: "Étudiants formés" },
  { value: "95%", label: "Taux de satisfaction" },
  { value: "5+", label: "Partenariats solides" },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* 1. SECTION HERO PLEINE LARGEUR */}
      <section className="w-full bg-[#004d31] text-white pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#f1c40f] text-[#004d31] font-bold text-xs uppercase tracking-wider rounded-full mb-4">
            Propulser l&apos;avenir numérique
          </span>
          <h1 className="text-4xl font-bold mb-4">À propos d&apos;Izicasa Sénégal</h1>
          <p className="max-w-2xl mx-auto text-base text-gray-200">
            La technologie dans votre langue. Pensée pour l&apos;Afrique, bâtie pour l&apos;excellence et l&apos;saccessibilité.
          </p>
        </div>
      </section>

      {/* CONTENEUR GLOBAL CENTRÉ POUR LE RESTE DU SITE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 2. SECTION STATS CHIFFRES */}
        <section className="max-w-6xl mx-auto px-4 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1 py-4 md:py-0 md:border-r last:border-0 border-slate-100 text-center">
                <div className="text-4xl font-black text-[#044c2c]">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SECTION NOTRE MISSION & VALEURS */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-[#044c2c] uppercase tracking-wider block mb-2">Notre Vision</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Briser les barrières linguistiques et techniques</h2>
              <p className="text-slate-600 mb-4">
                Izicasa Sénégal accompagne les organisations et forme les talents de demain avec des parcours pratiques et des solutions digitales modernes. Nous croyons fermement que l&apos;apprentissage des technologies doit s'adapter aux réalités et aux langues locales pour un impact durable.
              </p>
              <p className="text-slate-600">
                Que vous soyez une entreprise en pleine transformation numérique ou un étudiant ambitieux, notre écosystème est conçu pour vous donner les clés de la réussite.
              </p>
            </div>

            {/* BLOC DES VALEURS UTILISANT LES ICÔNES LUCIDE */}
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl bg-slate-50">
                <div className="p-3 bg-[#044c2c] text-white rounded-lg h-fit">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Objectif Clarté</h3>
                  <p className="text-sm text-slate-600">Vulgariser le jargon technique pour le rendre accessible à tous.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-50">
                <div className="p-3 bg-[#044c2c] text-white rounded-lg h-fit">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Fiabilité & Proximité</h3>
                  <p className="text-sm text-slate-600">Un ancrage local fort au Sénégal pour répondre aux besoins réels.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-50">
                <div className="p-3 bg-[#044c2c] text-white rounded-lg h-fit">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Excellence</h3>
                  <p className="text-sm text-slate-600">Des formations certifiantes et un accompagnement de haut niveau.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECTION NOTRE ÉQUIPE (TEAM CARDS REBRANCHÉES) */}
        <section className="bg-slate-50 py-16 px-6 rounded-2xl border border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-2 text-[#044c2c]">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-[#044c2c] uppercase tracking-wider">L&apos;Équipe</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">Les visages derrière Izicasa</h2>
              <p className="text-slate-500 mt-2 max-w-xl mx-auto">Une équipe passionnée dédiée à la réussite de vos projets.</p>
            </div>

            {/* GRILLE DYNAMIQUE GENERÉE DEPUIS TON TABLEAU "TEAM" */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 text-center hover:shadow-md transition-shadow">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}