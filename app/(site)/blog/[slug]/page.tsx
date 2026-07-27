import type { Metadata } from "next";
// Ajout de StaticImageData pour typer proprement les images importées
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { ReactNode } from "react";

// Import des icônes et des composants UI
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CalendarDays, UserCircle2 } from "lucide-react";

// Imports locaux (Sanity et SEO)
import { getPostBySlug, getPosts, getSimilarPosts } from "@/lib/sanity/client";
import { buildMetadata } from "@/lib/seo";

// ======================================================================
// 1. IMPORTATION DES VRAIES IMAGES DEPUIS public/blogimages
// ======================================================================
import imgCadrage from "@/public/blogimages/cadrage et Montage.png"; 
import imgDev from "@/public/blogimages/Developpement Web.png";
import imgMarketing from "@/public/blogimages/Marketing Digital.png";

// Image Unsplash de haute qualité pour Photoshop
const imgInfographie = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200";

interface BlogPostSummary {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  // Correction du type strict ici pour éviter l'erreur d'inattendu "any"
  mainImage?: { asset?: { url?: string | StaticImageData } }; 
  categories?: string[];
}

interface BlogPostDetail extends BlogPostSummary {
  body?: unknown[];
  author?: { name?: string };
}

// ======================================================================
// 2. BASE DE DONNÉES ENRICHIE (FALLBACK LOCAL)
// ======================================================================
const fallbackDatabase: Record<string, BlogPostDetail> = {
  "reussir-cadrage-video-smartphone": {
    _id: "fb1",
    title: "Comment réussir son premier cadrage vidéo avec un smartphone au Sénégal",
    slug: { current: "reussir-cadrage-video-smartphone" },
    excerpt: "Pas besoin d'un reflex à 1 million pour commencer ! Découvrez les règles d'or de la lumière équatoriale, de la stabilité et du cadrage pour captiver votre audience africaine.",
    publishedAt: "2026-07-10",
    categories: ["Cadrage & Montage"],
    author: { name: "Abdoulaye Diallo - Formateur Izicasa" },
    mainImage: { asset: { url: imgCadrage } },
  },
  "erreurs-debutant-photoshop": {
    _id: "fb2",
    title: "5 erreurs de débutant à éviter absolument sur Adobe Photoshop",
    slug: { current: "erreurs-debutant-photoshop" },
    excerpt: "Travailler sur un seul calque, ignorer les masques de fusion, saturer excessivement les teintes de peau... Nos experts en infographie décryptent les mauvaises habitudes à bannir.",
    publishedAt: "2026-07-02",
    categories: ["Infographie"],
    author: { name: "Mariama Sarr - Lead Designer" },
    mainImage: { asset: { url: imgInfographie } },
  },
  "importance-nocode-pme-dakar": {
    _id: "fb3",
    title: "Pourquoi le No-code (WordPress) est l'avenir des PME à Dakar",
    slug: { current: "importance-nocode-pme-dakar" },
    excerpt: "Créer un site web n'a jamais été aussi rapide et accessible. Découvrez comment les outils No-code permettent aux entrepreneurs sénégalais de lancer leur activité à moindre coût.",
    publishedAt: "2026-06-24",
    categories: ["Développement Web"],
    author: { name: "Moustapha Diop - Dev Izicasa" },
    mainImage: { asset: { url: imgDev } },
  },
  "guide-publicite-meta-ads": {
    _id: "fb4",
    title: "Guide complet : Lancer sa première campagne publicitaire sur Meta Ads au Sénégal",
    slug: { current: "guide-publicite-meta-ads" },
    excerpt: "De la configuration de votre Pixel de suivi à la création d'audiences ciblées à Dakar, Thiès et Saint-Louis. Rentabilisez chaque Franc CFA investi.",
    publishedAt: "2026-06-15",
    categories: ["Marketing Digital"],
    author: { name: "Awa Ndiaye - Consultante Ads" },
    mainImage: { asset: { url: imgMarketing } },
  }
};

function formatDate(value?: string) {
  if (!value) return "À venir";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: ReactNode }) => <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900">{children}</h1>,
    h2: ({ children }: { children?: ReactNode }) => <h2 className="mt-8 text-2xl font-semibold tracking-tight text-slate-800">{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3 className="mt-6 text-xl font-medium text-slate-700">{children}</h3>,
    normal: ({ children }: { children?: ReactNode }) => <p className="mt-4 text-base leading-8 text-slate-600">{children}</p>,
  },
};

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post: BlogPostSummary) => ({ slug: post.slug.current }));
  } catch {
    return Object.keys(fallbackDatabase).map((key) => ({ slug: key }));
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  let post: BlogPostDetail | null = null;

  try {
    post = (await getPostBySlug(resolvedParams.slug)) as BlogPostDetail | null;
  } catch {
    post = null;
  }

  if (!post) {
    post = fallbackDatabase[resolvedParams.slug] || null;
  }

  if (!post) {
    return buildMetadata({ 
      title: "Article", 
      description: "Article du blog Izicasa Sénégal", 
      slug: "/blog" 
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt || "Article du blog Izicasa Sénégal",
    slug: `/blog/${post.slug.current}`,
  });
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  let post: BlogPostDetail | null = null;

  try {
    post = (await getPostBySlug(resolvedParams.slug)) as BlogPostDetail | null;
  } catch {
    post = null;
  }

  if (!post) {
    post = fallbackDatabase[resolvedParams.slug] || null;
  }

  if (!post) {
    notFound();
  }

  let similarPosts: BlogPostSummary[] = [];
  try {
    similarPosts = (await getSimilarPosts(resolvedParams.slug)) as BlogPostSummary[];
  } catch {
    similarPosts = Object.values(fallbackDatabase).filter(p => p.slug.current !== resolvedParams.slug);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* BOUTON RETOUR */}
      <nav className="flex items-center gap-2 text-sm pt-4">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1.5 font-semibold text-[#004d3d] hover:text-[#004d3d]/80 transition-colors bg-slate-100 px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux articles
        </Link>
      </nav>

      {/* ARTICLE PRINCIPAL */}
      <article className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.categories?.map((category: string) => (
              <Badge key={category} className="bg-[#004d3d] text-[#f1c40f] hover:bg-[#004d3d] px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl border-l-2 border-[#f1c40f] pl-4 italic">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pt-2 border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <UserCircle2 className="w-4 h-4 text-[#004d3d]" /> {post.author?.name || "L'équipe Izicasa"}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-[#f1c40f]" /> {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>

        {/* AFFICHAGE DE LA VRAIE IMAGE PRINCIPALE */}
        {post.mainImage?.asset?.url ? (
          <div className="relative overflow-hidden rounded-3xl shadow-md border border-slate-100">
            <Image 
              src={post.mainImage.asset.url} 
              alt={post.title} 
              width={1400} 
              height={700} 
              sizes="(max-width: 768px) 100vw, 75vw" 
              className="h-[320px] w-full object-cover md:h-[480px]" 
              priority
            />
          </div>
        ) : null}

        {/* CORPS DE L'ARTICLE */}
        <div className="prose prose-slate max-w-none pt-4">
          {post.body ? (
            <PortableText value={post.body as never} components={portableTextComponents} />
          ) : (
            <div className="space-y-8 text-slate-700 leading-relaxed text-base md:text-lg">
              
              {/* --- CAS 1 : CADRAGE VIDEO SMARTPHONE --- */}
              {post.slug.current === "reussir-cadrage-video-smartphone" && (
                <>
                  <p className="text-slate-600">
                    Avec l’avènement des réseaux sociaux à Dakar et partout au Sénégal, la vidéo est devenue le moyen le plus puissant pour faire connaître sa marque, ses produits ou ses formations. Heureusement, vous n&apos;avez plus besoin d&apos;investir des millions dans du matériel de cinéma lourd. Votre smartphone est une véritable caméra professionnelle de poche !
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    1. Dompter la lumière du soleil sénégalais
                  </h2>
                  <p>
                    Filmer à Dakar ou dans les régions demande de composer avec une luminosité intense. Évitez absolument le soleil de midi qui crée des ombres dures sur les visages. Privilégiez la &quot;Golden Hour&quot; (juste avant le coucher du soleil) pour obtenir un rendu chaud, professionnel et flatteur sans aucun équipement coûteux.
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    2. La règle des tiers pour structurer vos plans
                  </h2>
                  <p>
                    Activez la grille sur l&apos;appareil photo de votre smartphone. Placez votre sujet ou vos yeux sur les lignes de force (les intersections de la grille). Si vous parlez directement face caméra, centrez-vous légèrement tout en gardant l&apos;objectif à hauteur d&apos;yeux pour éviter les effets de plongée ou de contre-plongée écrasants.
                  </p>
                </>
              )}

              {/* --- CAS 2 : ADOBE PHOTOSHOP --- */}
              {post.slug.current === "erreurs-debutant-photoshop" && (
                <>
                  <p className="text-slate-600">
                    Le graphisme et l&apos;infographie sont des piliers incontournables de la communication visuelle. Adobe Photoshop reste la référence absolue du secteur. Cependant, sa prise en main cache de nombreux pièges qui peuvent freiner votre productivité et gâcher la qualité de vos créations.
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    1. Ne pas nommer et organiser ses calques
                  </h2>
                  <p>
                    C&apos;est le piège classique. Après deux heures de création, se retrouver avec 50 calques nommés &quot;Calque 1&quot;, &quot;Calque 2 copy&quot; rend toute modification ultérieure impossible. Prenez le réflexe de créer des groupes dès le départ.
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    2. Travailler directement sur l&apos;image originale (Mode Destructif)
                  </h2>
                  <p>
                    Gommer ou appliquer un filtre directement sur votre photo d&apos;arrière-plan est une erreur fatale. Utilisez impérativement les masques de fusion et les objets dynamiques pour pouvoir modifier vos éléments sans altérer les pixels originaux.
                  </p>
                </>
              )}

              {/* --- CAS 3 : NO CODE / WORDPRESS --- */}
              {post.slug.current === "importance-nocode-pme-dakar" && (
                <>
                  <p className="text-slate-600">
                    Pour une petite ou moyenne entreprise au Sénégal, attendre des mois et dépenser des millions pour un site web sur-mesure n&apos;est plus une fatalité. Les solutions No-code comme WordPress associées à Elementor permettent de concevoir des vitrines professionnelles ultra rapidement.
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Une transformation digitale accélérée pour le marché local
                  </h2>
                  <p>
                    Le No-code permet de tester votre marché en quelques jours. Vous pouvez créer un site e-commerce fonctionnel, présenter vos services ou lancer un blog sans écrire une seule ligne de code.
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Intégration des moyens de paiement locaux
                  </h2>
                  <p>
                    Aujourd&apos;hui, l&apos;écosystème WordPress permet d&apos;interfacer facilement des modules WooCommerce avec des solutions de paiement mobiles indispensables pour capter la clientèle à Dakar et partout au Sénégal.
                  </p>
                </>
              )}

              {/* --- CAS 4 : MARKETING DIGITAL ADS --- */}
              {post.slug.current === "guide-publicite-meta-ads" && (
                <>
                  <p>Sponsoriser une publication directement depuis l&apos;application est l&apos;erreur commise par 90% des entrepreneurs au Sénégal. Pour obtenir de réels clients qualifiés, vous devez passer par la plateforme professionnelle Meta Business Suite.</p>
                  
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">Ciblage géographique fin au Sénégal</h2>
                  <p>Ciblez des zones géographiques précises selon votre activité : les quartiers résidentiels comme les Almadies ou Fann pour des services haut de gamme, ou des pôles économiques précis comme le Plateau ou la ville nouvelle de Diamniadio.</p>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">Créer un visuel qui accroche le regard (Le Scroll-stopper)</h2>
                  <p>Utilisez de vraies photos d&apos;humains au teint radieux, souriant, ou montrant une vraie problématique quotidienne à Dakar (les embouteillages, la chaleur). Ajoutez de gros textes lisibles pour arrêter le défilement de l&apos;écran.</p>
                </>
              )}

            </div>
          )}
        </div>
      </article>

      {/* ARTICLES SIMILAIRES */}
      {similarPosts.length > 0 ? (
        <section className="space-y-6 border-t border-slate-150 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-[#004d3d]">Articles similaires</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {similarPosts.slice(0, 3).map((similarPost) => (
              <Card key={similarPost._id} className="border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden flex flex-col justify-between">
                <CardHeader className="space-y-2 p-5">
                  <div className="text-[10px] font-bold text-[#004d3d] uppercase tracking-wider">
                    {similarPost.categories?.[0] || "Blog"}
                  </div>
                  <CardTitle className="text-base font-bold text-slate-800 line-clamp-2">
                    {similarPost.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-5 pt-0">
                  <p className="line-clamp-3 text-xs leading-5 text-slate-500">{similarPost.excerpt}</p>
                  <Link 
                    href={`/blog/${similarPost.slug.current}`} 
                    className="text-xs font-bold text-[#004d3d] hover:text-[#004d3d]/80 inline-flex items-center gap-1.5"
                  >
                    Lire l&apos;article →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}