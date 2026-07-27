import Link from "next/link";
import { ArrowRight, BookOpen, Users, Smartphone, GraduationCap, Briefcase } from "lucide-react";

export function ServicesSection() {
  return (
    <div className="space-y-20 bg-white py-16">
      
      {/* SECTION : POURQUOI IZICASA ? */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-[#004d3d] text-center mb-12 font-heading">
          Pourquoi Izicasa ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Carte 1 */}
          <div className="bg-[#004d3d]/5 p-8 rounded-3xl border border-[#004d3d]/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#004d3d] text-[#f7e052] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#004d3d]">100% pratique, 100% local</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Pas de théorie superflue. Des cas concrets adaptés aux réalités du marché sénégalais et africain pour être opérationnel immédiatement.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="bg-[#004d3d]/5 p-8 rounded-3xl border border-[#004d3d]/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#004d3d] text-[#f7e052] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#004d3d]">Un mentorat de proximité</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Vous construisez de vrais projets numériques tout en étant suivi par un expert disponible pour débloquer vos compétences et propulser votre carrière.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="bg-[#004d3d]/5 p-8 rounded-3xl border border-[#004d3d]/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#004d3d] text-[#f7e052] flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#004d3d]">Se former en toute flexibilité</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Des parcours accessibles et des modalités flexibles pensés pour s'adapter à votre rythme, que vous soyez étudiant ou déjà en activité.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION : PAR OÙ COMMENCER ? */}
      <section className="w-full bg-[#004d3d] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-12 max-w-2xl mx-auto">
            Vous êtes au bon endroit. Par où commencer ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            
            {/* Bloc Particuliers */}
            <div className="bg-white text-slate-900 p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f7e052]/20 text-[#004d3d] font-bold text-xs uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5" /> Particuliers
                </div>
                <h3 className="text-2xl font-extrabold text-[#004d3d]">Izicasa Academy</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Vous voulez décrocher un emploi tech, lancer votre activité ou monter en compétences ? Découvrez nos formations certifiantes en développement, design et marketing.
                </p>
              </div>
              <Link href="/formations" className="inline-flex items-center text-sm font-bold text-[#004d3d] hover:underline pt-4">
                Découvrir les formations <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Bloc Entreprises */}
            <div className="bg-[#003328] text-white p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-xl border border-white/10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#f7e052] font-bold text-xs uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" /> Entreprises
                </div>
                <h3 className="text-2xl font-extrabold text-[#f7e052]">Izicasa Business</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  Vous dirigez une équipe ? Formez-la aux outils numériques et à l'IA pour un gain de productivité immédiat. Tout démarre par un diagnostic gratuit de vos besoins.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center text-sm font-bold text-[#f7e052] hover:underline pt-4">
                Réserver un diagnostic gratuit <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}