import Link from "next/link";
import { ArrowRight, Calendar, Award, CheckCircle2 } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  features: string[];
  slug: string;
}

const featuredCourses: Course[] = [
  {
    id: "1",
    title: "Infographie & Design Graphique",
    description: "Maîtrisez les outils professionnels pour créer des visuels percutants et bâtir des identités de marque fortes.",
    duration: "2 Mois",
    type: "Certifiante",
    features: ["Photoshop & Illustrator", "Charte graphique", "Projets réels & Portfolio"],
    slug: "/formations/infographie",
  },
  {
    id: "2",
    title: "Développement Web No-code (CMS)",
    description: "Apprenez à concevoir des sites web professionnels, vitrines et e-commerce complets sans coder grâce aux meilleurs outils du marché.",
    duration: "3 Mois",
    type: "Intensive",
    features: ["WordPress + WooCommerce", "Elementor Pro", "Wix & Hébergement"],
    slug: "/formations/developpement-web-nocode",
  },
  {
    id: "3",
    title: "Marketing Digital & IA",
    description: "Propulsez la visibilité des entreprises grâce aux réseaux sociaux, à la publicité en ligne et aux outils d'Intelligence Artificielle.",
    duration: "6 Semaines",
    type: "Pratique",
    features: ["Stratégie de contenu", "Publicité (Facebook, Google)", "Création automatisée avec l'IA"],
    slug: "/formations/marketing-digital",
  },
];

export function FormationsPreviewSection() {
  return (
    /* Le conteneur principal prend toute la largeur avec le fond vert d'Izicasa */
    <section className="w-full bg-[#004d3d] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* EN-TÊTE DE LA SECTION (ADAPTÉE SUR FOND VERT) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f7e052] bg-white/10 px-3 py-1 rounded-full">
              Izicasa Academy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
              Nos formations phares
            </h2>
            <p className="text-emerald-100/80">
              Des programmes d&apos;accompagnement intensifs, axés à 100% sur la pratique pour acquérir les compétences les plus recherchées au Sénégal.
            </p>
          </div>
          
          <Link 
            href="/formations" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#f7e052] hover:text-[#e5cf42] transition-colors group whitespace-nowrap"
          >
            Voir tous nos programmes 
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* GRILLE DES CARTES SUR FOND BLANC POUR UN CONTRASTE PARFAIT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white text-slate-900 border border-transparent rounded-3xl p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-6">
                {/* Métadonnées du cours (Durée & Type) */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <Calendar className="w-4 h-4 text-[#004d3d]" />
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#004d3d] text-sm bg-[#004d3d]/5 px-2.5 py-1 rounded-md">
                    <Award className="w-4 h-4 text-[#004d3d]" />
                    <span className="font-semibold text-xs">{course.type}</span>
                  </div>
                </div>

                {/* Titre & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-[#004d3d] tracking-tight min-h-[56px] flex items-center">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                {/* Liste des modules clés */}
                <ul className="space-y-2.5 pt-2">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#004d3d] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bouton d'action personnalisé */}
              <div className="pt-8">
                <Link 
                  href={course.slug}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-sm bg-[#004d3d] text-white hover:bg-[#003328] transition-all duration-200 shadow-md"
                >
                  En savoir plus
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}