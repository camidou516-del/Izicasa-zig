"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Award } from "lucide-react";

interface CourseCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  badge?: string; // ex: "ESSENTIEL", "POPULAIRE"
  level: string; // ex: "Formation Pratique", "Formation Intensive"
  price: string;
  imageUrl: string; // Image d'illustration
}

const coursesList: CourseCard[] = [
  {
    id: "1",
    slug: "bureautique-avancee",
    title: "Bureautique Avancée & Excel Pro",
    description: "Maîtrisez Word, Excel, PowerPoint et les outils collaboratifs pour multiplier votre productivité par 10 en entreprise.",
    category: "Bureautique & Productivité",
    duration: "2 Mois",
    badge: "ESSENTIEL",
    level: "Formation Pratique",
    price: "20 000 F CFA",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "2",
    slug: "ia-generative",
    title: "Boostez votre Productivité avec l'IA Générative",
    description: "Apprenez à intégrer ChatGPT, Midjourney et Claude dans votre quotidien professionnel pour automatiser vos tâches.",
    category: "Data et IA",
    duration: "2 Mois",
    badge: "POPULAIRE",
    level: "Formation Intensive",
    price: "70 000 F CFA",
    // Nouvelle image IA plus fiable et percutante
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "3",
    slug: "montage-video-cadrage",
    title: "Montage Vidéo & Cadrage Professionnel",
    description: "Prise de vue, storytelling et montage sur Premiere Pro et CapCut pour réseaux sociaux et productions pro.",
    category: "Marketing et Communication",
    duration: "2 Mois",
    level: "Formation Certifiante",
    price: "65 000 F CFA",
    imageUrl: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "4",
    slug: "infographie",
    title: "Infographie & Design Graphique",
    description: "Bâtissez des identités de marque et maîtrisez les logiciels phares Photoshop, Illustrator et Canva.",
    category: "Design Graphique et UI/UX",
    duration: "2 Mois",
    level: "Formation Certifiante",
    price: "50 000 F CFA",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "5",
    slug: "developpement-web-nocode",
    title: "Développement Web No-code (CMS)",
    description: "Créez des sites vitrines et e-commerce professionnels sans coder grâce à WordPress et Elementor.",
    category: "Développement Web",
    duration: "2 Mois",
    level: "Formation Intensive",
    price: "65 000 F CFA",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "6",
    slug: "marketing-digital",
    title: "Marketing Digital Complet",
    description: "Pilotez des stratégies publicitaires Meta & Google Ads, créez du contenu et convertissez vos prospects.",
    category: "Marketing et Communication",
    duration: "2 Mois",
    level: "Formation Pratique",
    price: "50 000 F CFA",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
  }
];

export default function FormationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  const categories = [
    "Tout",
    "Bureautique & Productivité",
    "Data et IA",
    "Design Graphique et UI/UX",
    "Développement Web",
    "Marketing et Communication"
  ];

  const filteredCourses = selectedCategory === "Tout"
    ? coursesList
    : coursesList.filter(course => course.category === selectedCategory);

  return (
    <main className="w-full bg-slate-50/50 min-h-screen pb-20">
      
      {/* 1. HERO SECTION (RÉINTÉGRÉE ET PARFAITE) */}
      <section className="w-full bg-[#004d3d] text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Des formations concrètes,<br />orientées usage.
          </h1>
          <p className="text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Chaque programme est pensé pour être immédiatement applicable sur le marché sénégalais, combinant cas pratiques, mentorat et projets.
          </p>
        </div>
      </section>

      {/* 2. SECTION FILTRES */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap gap-2 justify-start md:justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? "bg-[#004d3d] text-white border-[#004d3d] shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. GRILLE DES CARTES DE FORMATIONS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              
              {/* IMAGE DE COUVERTURE */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Badges superposés */}
                {course.badge && (
                  <span className="absolute top-4 right-4 bg-[#f1c40f] text-slate-900 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    ✨ {course.badge}
                  </span>
                )}
                
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white font-bold text-xs px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#f1c40f]" />
                  {course.duration}
                </span>
              </div>

              {/* CONTENU DE LA CARTE */}
              <div className="p-6 flex flex-col flex-grow">
                
                {/* Catégorie & Niveau */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {course.level}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="font-bold text-xl text-slate-900 leading-snug group-hover:text-[#004d3d] transition-colors mb-2 min-h-[56px] flex items-start">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {course.description}
                </p>

                {/* Pied de Carte : Prix & Bouton */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Tarif unique
                    </span>
                    <span className="text-lg font-black text-[#004d3d]">
                      {course.price}
                    </span>
                  </div>

                  <a 
                    href={`/formations/${course.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 group-hover:bg-[#004d3d] text-slate-700 group-hover:text-white px-5 py-3 rounded-xl text-xs font-bold transition-all"
                  >
                    En savoir plus 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

    </main>
  );
}