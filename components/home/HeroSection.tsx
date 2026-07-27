import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-[#004d3d] text-white overflow-hidden py-20 lg:py-32">
      {/* Effet de dégradé subtil pour donner du relief au vert */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003328] via-[#004d3d] to-[#006652] opacity-50" />
      
      {/* Halo jaune/vert clair en arrière-plan inspiré du logo */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#f7e052]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* TEXTE À GAUCHE */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 bg-[#f7e052]/20 text-[#f7e052] font-medium text-sm rounded-full border border-[#f7e052]/30">
            La technologie dans votre langue
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-none text-white">
            VOTRE PRÉSENCE <br />
            Digitale, <span className="text-[#f7e052]">amplifiée</span>. Pensée pour <span className="text-[#f7e052]">l'Afrique</span>.
          </h1>
          
          <p className="text-emerald-100/80 text-lg max-w-xl mx-auto lg:mx-0">
            Izicasa Sénégal accompagne les organisations et forme les talents de demain avec des formations pratiques, des partenariats solides et des solutions digitales modernes.
          </p>

          {/* BOUTONS D'ACTION */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Link 
              href="/formations" 
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold bg-[#f7e052] text-[#004d3d] hover:bg-[#e5cf42] transition-colors shadow-lg"
            >
              Découvrir nos formations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold border border-emerald-400/40 bg-emerald-900/30 text-white hover:bg-emerald-900/50 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        {/* LOGO À DROITE */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-white/5 p-6 rounded-full border border-white/10 shadow-2xl backdrop-blur-sm flex items-center justify-center">
            <Image
              src="/logo/izicasa-fond-transparent.png"
              alt="Logo Izicasa"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}