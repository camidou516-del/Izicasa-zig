"use client";

import { useState, useMemo } from "react";
// Import de StaticImageData pour typer correctement les images locales
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";

// ==========================================
// 1. IMPORTATION DES IMAGES DE VOTRE DOSSIER blogimages
// ==========================================
import imgCadrage from "@/public/blogimages/cadrage et Montage.png"; 
import imgDev from "@/public/blogimages/Developpement Web.png";
import imgMarketing from "@/public/blogimages/Marketing Digital.png";

interface BlogPostSummary {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  // Correction du type ici pour accepter soit une URL textuelle, soit une image statique Next.js
  mainImage?: { asset?: { url?: string | StaticImageData } };
  categories?: string[];
}

// ----------------------------------------------------------------------
// DONNÉES DE SECOURS LOCALES (FALLBACK)
// ----------------------------------------------------------------------
const fallbackPosts: BlogPostSummary[] = [
  {
    _id: "fb1",
    title: "Comment réussir son premier cadrage vidéo avec un smartphone au Sénégal",
    slug: { current: "reussir-cadrage-video-smartphone" },
    excerpt: "Pas besoin d'un reflex à 1 million pour commencer ! Découvrez les 3 règles d'or de la lumière et de la stabilité.",
    publishedAt: "2026-07-10",
    categories: ["Cadrage & Montage"],
    mainImage: { asset: { url: imgCadrage } }, 
  },
  {
    _id: "fb2",
    title: "5 erreurs de débutant à éviter absolument sur Adobe Photoshop",
    slug: { current: "erreurs-debutant-photoshop" },
    excerpt: "Travailler sur un seul calque, abuser des filtres... Nos formateurs décryptent les mauvaises habitudes à bannir.",
    publishedAt: "2026-07-02",
    categories: ["Infographie"],
    mainImage: { asset: { url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200" } },
  },
  {
    _id: "fb3",
    title: "Pourquoi le No-code (WordPress) est l'avenir des PME à Dakar",
    slug: { current: "importance-nocode-pme-dakar" },
    excerpt: "Créer un site web n'a jamais été aussi rapide. Découvrez comment le CMS WordPress permet de lancer une boutique en CFA.",
    publishedAt: "2026-06-24",
    categories: ["Développement Web"],
    mainImage: { asset: { url: imgDev } }, 
  },
  {
    _id: "fb4",
    title: "Guide complet : Lancer sa première campagne publicitaire sur Meta Ads",
    slug: { current: "guide-publicite-meta-ads" },
    excerpt: "De la configuration de votre pixel de suivi à la création d'audiences ciblées au Sénégal. Rentabilisez votre budget publicitaire.",
    publishedAt: "2026-06-15",
    categories: ["Marketing Digital"],
    mainImage: { asset: { url: imgMarketing } }, 
  }
];

const CATEGORIES = [
  "Tout",
  "Cadrage & Montage",
  "Infographie",
  "Développement Web",
  "Marketing Digital"
];

function formatDate(value?: string) {
  if (!value) return "À venir";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = fallbackPosts;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Tout" ||
        post.categories?.includes(selectedCategory);

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories?.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <main className="w-full bg-slate-50/50 min-h-screen pb-20">
      
      {/* SECTION HERO */}
      <section className="w-full bg-[#004d3d] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f1c40f]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-950 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Notre <span className="text-[#f1c40f]">Blog</span> & Actualités
          </h1>
          <p className="text-emerald-100/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Découvrez nos articles exclusifs, tutoriels de pros et décryptages pour propulser vos compétences numériques et votre business au Sénégal.
          </p>

          {/* BARRE DE RECHERCHE */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center bg-white rounded-full shadow-lg overflow-hidden p-1 border border-emerald-800/20">
              <div className="pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un article, un outil, une astuce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-4 py-3 bg-transparent text-slate-800 placeholder-slate-400 outline-none text-sm md:text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU FILTRÉ */}
      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-12">

        {/* BOUTONS DES CATÉGORIES */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-2 border-b border-slate-100">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#004d3d] text-[#f1c40f] shadow-md shadow-emerald-900/10 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* GRILLE D'ARTICLES */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const imageUrl = post.mainImage?.asset?.url;
              
              return (
                <article 
                  key={post._id} 
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
                        Pas d&apos;image
                      </div>
                    )}
                    {post.categories && post.categories.length > 0 && (
                      <span className="absolute top-4 left-4 bg-[#004d3d] text-[#f1c40f] text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {post.categories[0]}
                      </span>
                    )}
                  </div>

                  {/* Textes */}
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#f1c40f]" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#004d3d]" />
                        {post.categories?.includes("Cadrage & Montage") ? "4 min" : "6 min"}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#004d3d] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#004d3d] group-hover:text-[#f1c40f] transition-all"
                      >
                        Lire l&apos;article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <p className="text-slate-400 text-lg">Aucun article ne correspond à votre recherche ou à vos critères.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("Tout"); }}
              className="px-4 py-2 bg-[#004d3d] text-[#f1c40f] text-sm font-bold rounded-full hover:bg-emerald-950 transition-all"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>
    </main>
  );
}