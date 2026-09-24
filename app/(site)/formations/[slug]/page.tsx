"use client";

import React from "react";
import { CheckCircle2, UserCheck, ShieldCheck, MessageCircle, Play } from "lucide-react";
import { FormationRegistrationForm } from "@/components/forms/FormationRegistrationForm";
import { ReserveButton } from "@/components/reservations/ReserveButton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Déclaration des interfaces
interface Testimonial {
  name: string;
  role: string;
  videoUrl: string;
  imgUrl: string;
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  priceComptant: string;
  priceOriginal?: string;
  priceEchelonne: string;
  duration: string;
  skills: string[];
  portfolioDeliverables: string[];
  testimonials: Testimonial[];
}

// Base de données des formations Izicasa Sénégal avec les vraies images de couverture YouTube
const coursesDatabase: Record<string, CourseDetail> = {
  "bureautique-avancee": {
    id: "1",
    title: "Bureautique Avancée & Excel Pro",
    description: "Maîtrisez Word, Excel, PowerPoint et les outils collaboratifs pour multiplier votre productivité par 10 en entreprise.",
    priceComptant: "20 000 F CFA",
    priceEchelonne: "10 000 F CFA",
    duration: "2 Mois",
    skills: [
      "Maîtrise complète d'Excel (formules complexes, TCD, graphiques dynamiques)",
      "Création de documents administratifs et rapports professionnels sous Word",
      "Conception de présentations PowerPoint percutantes pour vos réunions",
      "Utilisation des outils collaboratifs Google Workspace & OneDrive"
    ],
    portfolioDeliverables: [
      "Tableau de bord de gestion financière automatisé sur Excel",
      "Modèle de rapport d'activité d'entreprise normé sous Word",
      "Support de présentation de projet professionnel prêt pour soutenance"
    ],
    testimonials: [
      {
        name: "Ousmane Gabriel Diallo",
        role: "Renforcement de capacité professionnelle",
        imgUrl: "https://img.youtube.com/vi/h13lWUELP0c/maxresdefault.jpg", // Vrai aperçu de sa vidéo
        videoUrl: "https://youtube.com/shorts/h13lWUELP0c?si=SH8YRFpa83XLuPj1"
      }
    ]
  },
  "ia-generative": {
    id: "2",
    title: "Boostez votre Productivité avec l'IA Générative",
    description: "Apprenez à intégrer ChatGPT, Midjourney et Claude dans votre quotidien professionnel pour automatiser vos tâches.",
    priceComptant: "70 000 F CFA",
    priceOriginal: "80 000 F CFA",
    priceEchelonne: "40 000 F CFA",
    duration: "2 Mois",
    skills: [
      "Rédaction de prompts avancés (Prompt Engineering) pour ChatGPT et Claude",
      "Génération d'images et de visuels de qualité professionnelle avec Midjourney",
      "Automatisation de la création de contenus marketing et d'e-mails",
      "Analyse de données textuelles et de fichiers PDF volumineux grâce à l'IA"
    ],
    portfolioDeliverables: [
      "Guide de Prompt Engineering personnalisé pour votre secteur d'activité",
      "Campagne marketing complète rédigée et illustrée par IA",
      "Automatisation d'un flux de travail quotidien (gain de temps de 5h/semaine)"
    ],
    testimonials: [
      {
        name: "Ousmane Gabriel Diallo",
        role: "Productivité & Nouvelles Technologies",
        imgUrl: "https://img.youtube.com/vi/h13lWUELP0c/maxresdefault.jpg", // Vrai aperçu de sa vidéo
        videoUrl: "https://youtube.com/shorts/h13lWUELP0c?si=SH8YRFpa83XLuPj1"
      }
    ]
  },
  "montage-video-cadrage": {
    id: "3",
    title: "Montage Vidéo & Cadrage Professionnel",
    description: "Prise de vue, storytelling et montage sur Premiere Pro et CapCut pour réseaux sociaux et productions professionnelles.",
    priceComptant: "65 000 F CFA",
    priceOriginal: "80 000 F CFA",
    priceEchelonne: "35 000 F CFA",
    duration: "2 Mois",
    skills: [
      "Maîtrise des techniques de cadrage et de prise de vue (smartphone et caméra)",
      "Utilisation professionnelle d'Adobe Premiere Pro et CapCut (PC/Mobile)",
      "Création de vidéos courtes dynamiques pour TikTok, Reels et Shorts",
      "Techniques avancées de mixage audio, étalonnage des couleurs et effets spéciaux"
    ],
    portfolioDeliverables: [
      "Montage d'une interview dynamique multicaméra",
      "Création d'une vidéo publicitaire prête pour diffusion sur les réseaux",
      "Projet Final : Réalisation d'un mini-documentaire ou vlog scénarisé"
    ],
    testimonials: [
      {
        name: "Bourama Mané",
        role: "Formé en Cadrage & Montage Vidéo",
        imgUrl: "https://img.youtube.com/vi/yY8RGoRWCZA/maxresdefault.jpg", // Vrai aperçu de Bourama
        videoUrl: "https://youtube.com/shorts/yY8RGoRWCZA?si=8j9mA29y-1G9uLaj"
      },
      {
        name: "Session Pratique Cadrage",
        role: "Atelier pratique d'écriture et de tournage",
        imgUrl: "https://img.youtube.com/vi/Hw8372bBKek/hqdefault.jpg", // Vrai aperçu de la session pratique
        videoUrl: "https://youtube.com/shorts/Hw8372bBKek?si=2_Q5Gs-x4iOp5rCn"
      },
      {
        name: "Elbro NKL",
        role: "Passionné d'arts visuels transformé",
        imgUrl: "https://img.youtube.com/vi/na1R-vGY8lY/maxresdefault.jpg", // Vrai aperçu de Elbro
        videoUrl: "https://youtube.com/shorts/na1R-vGY8lY?si=l06SHocyj-iSt8DX"
      }
    ]
  },
  "infographie": {
    id: "4",
    title: "Infographie & Design Graphique",
    description: "Bâtissez des identités de marque et maîtrisez les logiciels phares Photoshop, Illustrator et Canva.",
    priceComptant: "50 000 F CFA",
    priceEchelonne: "25 000 F CFA",
    duration: "2 Mois",
    skills: [
      "Création d'identités visuelles complètes (Logos, chartes graphiques, typographies)",
      "Retouche photo et photomontage professionnel sur Adobe Photoshop",
      "Création de visuels vectoriels et d'illustrations sur Adobe Illustrator",
      "Conception rapide et efficace de supports marketing sur Canva"
    ],
    portfolioDeliverables: [
      "Charte graphique complète pour une entreprise locale",
      "Affiche publicitaire grand format conceptualisée sur Photoshop",
      "Kit de communication complet pour réseaux sociaux (Instagram, Facebook)"
    ],
    testimonials: [
      {
        name: "Abdoulaye Diédhiou",
        role: "Stagiaire & Infographe chez Kassumay TV",
        imgUrl: "https://img.youtube.com/vi/0Hk8ymac2jM/maxresdefault.jpg", // Vrai aperçu d'Abdoulaye
        videoUrl: "https://youtube.com/shorts/0Hk8ymac2jM?si=x_JVxteSxbzSE3U2"
      },
      {
        name: "Ramatoulaye Barry",
        role: "Étudiante en Communication Digitale",
        imgUrl: "https://img.youtube.com/vi/K4y1NqTKiKs/maxresdefault.jpg", // Vrai aperçu de Ramatoulaye
        videoUrl: "https://youtube.com/shorts/K4y1NqTKiKs?si=BzoCk_DnLzcPHTGC"
      },
    ]
  },
  "developpement-web-nocode": {
    id: "5",
    title: "Développement Web No-code (CMS)",
    description: "Créez des sites vitrines et e-commerce professionnels sans coder grâce à WordPress et Elementor.",
    priceComptant: "65 000 F CFA",
    priceEchelonne: "35 000 F CFA",
    duration: "2 Mois",
    skills: [
      "Installation, configuration et sécurisation d'un site WordPress",
      "Conception de maquettes interactives de pages avec Elementor Pro",
      "Création de boutiques en ligne complètes (produits, panier, passerelles d'achat)",
      "Optimisation de la vitesse du site et référencement naturel (SEO) de base"
    ],
    portfolioDeliverables: [
      "Site vitrine d'entreprise responsive et moderne",
      "Boutique e-commerce fonctionnelle avec intégration de moyens de paiement locaux"
    ],
    testimonials: [
      {
        name: "Ousmane Gabriel Diallo",
        role: "Renforcement de capacités Web",
        imgUrl: "https://img.youtube.com/vi/h13lWUELP0c/maxresdefault.jpg",
        videoUrl: "https://youtube.com/shorts/h13lWUELP0c?si=SH8YRFpa83XLuPj1"
      }
    ]
  },
  "marketing-digital": {
    id: "6",
    title: "Marketing Digital Complet",
    description: "Pilotez des stratégies publicitaires Meta & Google Ads, créez du contenu et convertissez vos prospects.",
    priceComptant: "50 000 F CFA",
    priceEchelonne: "25 000 F CFA",
    duration: "2 Mois",
    skills: [
      "Création et paramétrage de campagnes publicitaires professionnelles Meta Business Suite",
      "Optimisation du ciblage publicitaire et gestion des budgets publicitaires",
      "Planification éditoriale et rédaction de contenus engageants (Copywriting)",
      "Suivi et analyse des performances de vos campagnes avec les outils statistiques"
    ],
    portfolioDeliverables: [
      "Stratégie social media complète pour une marque partenaire",
      "Lancement d'une campagne publicitaire fictive (A/B testing, rapports d'audience)"
    ],
    testimonials: [
      {
        name: "Ramatoulaye Barry",
        role: "Licence en Communication Digitale",
        imgUrl: "https://img.youtube.com/vi/K4y1NqTKiKs/maxresdefault.jpg",
        videoUrl: "https://youtube.com/shorts/K4y1NqTKiKs?si=BzoCk_DnLzcPHTGC"
      },
      {
        name: "Ousmane Gabriel Diallo",
        role: "Renforcement de capacités Web",
        imgUrl: "https://img.youtube.com/vi/h13lWUELP0c/maxresdefault.jpg",
        videoUrl: "https://youtube.com/shorts/h13lWUELP0c?si=SH8YRFpa83XLuPj1"
      }
    ]
  }
};

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
  const currentSlug = params.slug;
  const course = coursesDatabase[currentSlug];

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Formation introuvable</h1>
        <p className="text-slate-600 mb-4">La formation que vous recherchez n&apos;existe pas.</p>
        <a href="/formations" className="text-[#004d3d] font-semibold hover:underline">Voir le catalogue</a>
      </div>
    );
  }

  const whatsappNumber = "221773679985";
  const whatsappMessage = encodeURIComponent(`Bonjour Izicasa, je souhaite avoir plus d'informations concernant la formation "${course.title}".`);

  return (
    <main className="w-full bg-slate-50/50 min-h-screen text-slate-900 pb-20">
      
      {/* SECTION HERO DYNAMIQUE */}
      <section className="w-full bg-[#004d3d] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Bloc de Gauche */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/10 text-[#f7e052] font-bold text-xs uppercase tracking-wider rounded-full">
                ★ +200 professionnels certifiés
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider rounded-full">
                Inscriptions Ouvertes
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Maîtrisez la formation {course.title}
            </h1>
            
            <p className="text-lg text-emerald-50 max-w-2xl">
              {course.description} Obtenez les compétences pratiques recherchées par les recruteurs et validez votre parcours par un certificat professionnel.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-800">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="text-xs text-emerald-300 font-medium">Durée flexible</h4>
                  <p className="text-sm font-semibold">Adapté à votre rythme ({course.duration})</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                
                <div>
                  <h4 className="text-xs text-emerald-300 font-medium">Certificat Pro</h4>
                  <p className="text-sm font-semibold">Reconnu par l&apos;État</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
               
                <div>
                  <h4 className="text-xs text-emerald-300 font-medium">Accompagnement</h4>
                  <p className="text-sm font-semibold">Insertion & Réseau</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bloc de Droite */}
          <div className="bg-white text-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 space-y-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 flex items-center gap-2">

              <p className="text-xs font-semibold text-emerald-800">-10% pour tout paiement au comptant</p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Option Comptant</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900">{course.priceComptant}</span>
                {course.priceOriginal && (
                  <span className="text-sm line-through text-slate-400">{course.priceOriginal}</span>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Option Échelonnée</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-900">{course.priceEchelonne}</span>
                <span className="text-xs text-slate-500">/ par tranche</span>
              </div>
            </div>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Accès complet à la plateforme à vie
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600">
                <UserCheck className="w-4 h-4 text-emerald-600" /> Suivi individuel par un mentor attitré
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Paiements locaux acceptés (Wave, OM)
              </li>
            </ul>

            <ReserveButton formationTitle={course.title} />
            <Sheet>
              <SheetTrigger className="w-full bg-[#004d3d] hover:bg-[#00362b] text-white py-4 rounded-xl font-bold transition-all shadow-md text-center block cursor-pointer">
                S&apos;inscrire
              </SheetTrigger>
              <SheetContent className="overflow-y-auto sm:max-w-[450px]">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-xl font-bold text-[#004d3d]">Inscription</SheetTitle>
                </SheetHeader>
                <FormationRegistrationForm selectedFormation={course.title} />
              </SheetContent>
            </Sheet>

            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> Discuter sur WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* SECTION COMPETENCES & PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Ce que vous allez maîtriser */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#004d3d] mb-6 flex items-center gap-2">
              Ce que vous allez maîtriser :
            </h2>
            <ul className="space-y-4">
              {course.skills.map((skill, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#004d3d] font-bold mt-0.5">✓</span>
                  <p className="text-slate-700 text-sm leading-relaxed">{skill}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Livrables Portfolio */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#004d3d] mb-6 flex items-center gap-2">
              Les livrables de votre portfolio :
            </h2>
            <ul className="space-y-4">
              {course.portfolioDeliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold mt-0.5">{index + 1}.</span>
                  <p className="text-slate-700 text-sm leading-relaxed">{deliverable}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* SECTION TÉMOIGNAGES VIDÉOS REDIRIGEABLES (AVEC VRAIES IMAGES COUVERTURE) */}
      <section className="bg-slate-100/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#f1c40f] uppercase tracking-wider">TÉMOIGNAGES VIDÉO</span>
            <h2 className="text-3xl font-black text-[#004d3d] mt-2">Ils l&apos;ont fait avant vous.</h2>
            <p className="text-sm text-slate-500 mt-2">Cliquez sur le bouton de lecture pour regarder leurs retours en vidéo.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {course.testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="relative bg-emerald-950 text-white rounded-[2rem] p-4 flex flex-col h-[480px] overflow-hidden group shadow-lg border-4 border-emerald-600"
              >
                {/* Image de fond (vrai aperçu vidéo YouTube) avec effet de zoom */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${testimonial.imgUrl})` }}
                />
                
                {/* Voile sombre dégradé pour garantir la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />

                {/* Badge "TEMOIGNAGE VIDEO" stylisé comme sur la page d'accueil */}
                <div className="relative z-10 self-start px-3 py-1 bg-emerald-500/90 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Témoignage Vidéo
                </div>

                {/* Bouton de Lecture */}
                <a 
                  href={testimonial.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex-1 flex items-center justify-center cursor-pointer group/play"
                  title="Regarder le témoignage sur YouTube"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f1c40f] text-slate-900 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/play:scale-110 group-hover/play:bg-yellow-300">
                    <Play className="w-6 h-6 fill-current text-[#004d3d] translate-x-0.5" />
                  </div>
                </a>

                {/* Pied de Carte contenant le nom de l'apprenant */}
                <div className="relative z-10 pt-4 border-t border-white/20 mt-auto">
                  <h3 className="font-bold text-lg leading-tight bg-slate-950/40 inline-block px-2 py-0.5 rounded">{testimonial.name}</h3>
                  <p className="text-xs text-emerald-200 mt-1 bg-slate-950/40 px-2 py-0.5 rounded inline-block">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}