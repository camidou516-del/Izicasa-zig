import type { Metadata } from "next";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { FormationsPreviewSection } from "@/components/home/FormationsPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { buildMetadata } from "@/lib/seo";

// On force l'affichage du Header et du Footer sur la page d'accueil
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Accueil",
    description: "Agence communication digitale à Ziguinchor : formations, stratégie de contenu...",
    slug: "/",
  });
}

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="space-y-8 sm:space-y-10 lg:space-y-12">
        <HeroSection />
        <ServicesSection />
        <ReviewsSection />
        <FormationsPreviewSection />
        <FinalCTASection />
      </div>
      <Footer />
    </>
  );
}