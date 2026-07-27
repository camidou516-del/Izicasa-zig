import Link from "next/link";
import { ArrowRight, Lightbulb, GraduationCap, Settings } from "lucide-react";

export function BusinessSection() {
  return (
    <section className="bg-slate-950 text-white py-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* En-tête */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f7e052]">
            Izicasa Business
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Des entreprises et institutions nous font confiance
          </h2>
          <p className="text-slate-400 text-base max-w-2xl">
            PME, organisations régionales et institutions publiques forment leurs équipes et déploient des solutions numériques avec Izicasa Business. Un impact mesurable sur vos processus.
          </p>
        </div>

        {/* Grille de 3 services pro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bloc 1 */}
          <div className="bg-white text-slate-900 p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#004d3d] text-white flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#004d3d]/60 block">La Réflexion</span>
            <h3 className="text-xl font-bold text-[#004d3d]">Conseil & Stratégie</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous identifions les leviers digitaux prioritaires pour votre structure et traçons une feuille de route claire pour investir efficacement.
            </p>
          </div>

          {/* Bloc 2 */}
          <div className="bg-white text-slate-900 p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#004d3d] text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#004d3d]/60 block">Les Compétences</span>
            <h3 className="text-xl font-bold text-[#004d3d]">Formation des équipes</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nous rendons vos collaborateurs autonomes sur la création de contenus, les outils collaboratifs et le marketing digital avec des cas appliqués.
            </p>
          </div>

          {/* Bloc 3 */}
          <div className="bg-white text-slate-900 p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#004d3d] text-white flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#004d3d]/60 block">Les Solutions</span>
            <h3 className="text-xl font-bold text-[#004d3d]">Déploiement de systèmes</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mise en place de solutions sur-mesure : de la vitrine web aux automatisations internes pour libérer du temps à vos équipes.
            </p>
          </div>
        </div>

        {/* Barre de pied Business */}
        <div className="bg-[#004d3d]/30 border border-[#004d3d]/50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-emerald-100/90 font-medium">
            💡 <span className="text-[#f7e052]">Ils nous font confiance :</span> Acteurs du développement local, PME à Ziguinchor et projets communautaires.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm bg-[#f7e052] text-[#004d3d] hover:bg-[#e5cf42] transition-colors whitespace-nowrap shadow-md"
          >
            Découvrir Izicasa Business
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}