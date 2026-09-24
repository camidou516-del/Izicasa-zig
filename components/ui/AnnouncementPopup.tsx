"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
  // Récupère le nombre d'affichages déjà effectués
  const showCount = parseInt(localStorage.getItem("announcement_show_count") || "0", 10);

  // Si la pop-up s'est déjà affichée 2 fois ou plus, on ne fait rien
  if (showCount >= 2) return;

  // Déclenche l'affichage après 1 min 30 s (90 000 ms)
  const timer = setTimeout(() => {
    setIsOpen(true);
    // Incrémente et sauvegarde le compteur d'affichages
    localStorage.setItem("announcement_show_count", (showCount + 1).toString());
  }, 90000);

  return () => clearTimeout(timer);
}, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("announcement_session_closed", "true");
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
    
    // Redirige directement vers ta page ou section d'inscription
    // Si ton formulaire est sur la même page, tu peux changer par : window.location.href = "#inscription"
    router.push("/contact"); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-2xl shadow-2xl border-2 border-[#004d31]">
        
        {/* Badge Jaune Izicasa */}
        <div className="absolute -top-3 left-6 px-3 py-1 bg-[#f1c40f] text-[#004d31] font-bold text-xs uppercase tracking-wider rounded-full shadow">
          Nouvelle Session
        </div>

        {/* Bouton Fermer (X) */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* Contenu */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#004d31]/10 text-[#004d31] text-2xl mb-3">
            🎓
          </div>
          
          <h3 className="text-xl font-bold text-[#004d31] mb-1">
            Inscriptions Ouvertes !
          </h3>
          
          <div className="my-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
            Formations du moment :
          </p>
          <p className="text-xs text-[#004d31] font-bold mt-1 bg-[#004d31]/10 inline-block px-2 py-0.5 rounded">
            Durée : 2 mois
          </p>
          
          <p className="text-base font-bold text-gray-800 mt-2">Audio-visuel</p>
          <p className="text-base font-bold text-gray-800 mt-1">Marketing Digital</p>
        </div>
            
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Rejoignez nos programmes intensifs et maîtrisez des compétences pratiques en quelques semaines.
          </p>

          {/* Bouton d'action corrigé */}
          <button
            onClick={handleActionClick}
            className="block w-full py-3 px-4 bg-[#004d31] hover:bg-[#003622] text-white font-semibold text-center rounded-xl transition-all shadow-md cursor-pointer"
          >
            S&apos;inscrire au programme complet
          </button>
        </div>

      </div>
    </div>
  );
}