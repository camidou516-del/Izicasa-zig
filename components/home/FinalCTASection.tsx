"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    /* 1. w-full pour prendre tout l'écran, bg-[#f7e052] pour le jaune, et py-16 pour créer l'espace en haut et en bas */
    <section className="w-full bg-[#f7e052] text-[#004d3d] py-16 flex items-center">
      
      {/* 2. Ce conteneur interne centre les éléments et s'aligne sur le reste du site */}
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* TEXTES */}
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-[#004d3d]/80">
            Prêt à agir ?
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
            Prêt à lancer votre projet digital ?
          </h2>
          <p className="text-[#004d3d]/90 text-sm leading-relaxed">
            Discutons de vos objectifs, de votre message et des meilleures actions à mettre en place pour avancer avec impact.
          </p>
        </div>

        {/* BOUTON NOUS CONTACTER */}
        <div className="shrink-0">
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm bg-[#004d3d] text-white hover:bg-[#003328] transition-colors shadow-md"
          >
            Nous contacter →
          </a>
        </div>

      </div>
    </section>
  );
}
