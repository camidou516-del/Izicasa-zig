"use client";

import { Star, Play } from "lucide-react";

interface TestimonialVideo {
  id: string;
  name: string;
  role: string;
  youtubeId: string;
}

const videoTestimonials: TestimonialVideo[] = [
  {
    id: "1",
    name: "Abdoulaye Diedhiou",
    role: "Formée en Infographie",
    youtubeId: "0Hk8ymac2jM",
  },
  {
    id: "2",
    name: "Ousmane Gabriel Diallo",
    role: "Formé en Audio-Visuel",
    youtubeId: "h13lWUELP0c",
  },
  {
    id: "3",
    name: "Ramatoulaye Barry",
    role: "Formée en Infographie et Cadrage & MontageVidéo",
    youtubeId: "K4y1NqTKiKs",
  },
];

export function ReviewsSection() {
  return (
    <section className="bg-white text-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* EN-TÊTE DE LA SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-1 text-[#f7e052]">
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm font-semibold text-slate-500 ml-2">4.9/5 sur Google</span>
          </div>
          
          <p className="text-sm font-bold uppercase tracking-wider text-[#004d3d]">
            Témoignages Vidéo
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#004d3d] font-heading">
            Ils l&apos;ont fait avant vous.
          </h2>
          <p className="text-slate-600">
            Découvrez les retours d&apos;expérience de nos apprenants particuliers formés aux métiers du numérique chez Izicasa Sénégal.
          </p>
        </div>

        {/* GRILLE DES VIDÉOS LINKÉES VERS YOUTUBE EXTERNE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoTestimonials.map((video) => (
            <a 
              key={video.id}
              href={`https://youtube.com/shorts/${video.youtubeId}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative bg-slate-950 border border-slate-200 rounded-3xl overflow-hidden shadow-lg aspect-[9/16] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Image miniature de la vidéo YouTube en arrière-plan */}
              <div className="absolute inset-0 w-full h-full z-0 bg-cover bg-center opacity-80 group-hover:opacity-70 transition-opacity"
                   style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg)` }} 
              />

              {/* Bouton Play central */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-full bg-[#f7e052] text-[#004d3d] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>

              {/* Tag vert en haut de la carte */}
              <div className="relative z-10 p-4">
                <span className="inline-block px-3 py-1 bg-[#004d3d] text-[#f7e052] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Témoignage vidéo
                </span>
              </div>

              {/* Infos de l'apprenant en bas */}
              <div className="relative z-10 p-6 bg-gradient-to-t from-black via-black/40 to-transparent pt-20">
                <h3 className="text-lg font-bold text-white group-hover:text-[#f7e052] transition-colors">
                  {video.name}
                </h3>
                <p className="text-sm text-slate-300">
                  {video.role}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}