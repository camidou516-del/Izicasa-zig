"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="w-full bg-[#f7e052] text-[#004d3d] py-16 flex items-center">
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
        <motion.div 
          className="shrink-0"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            asChild
            className="bg-[#004d3d] text-white hover:bg-[#003328] font-bold px-6 py-3 rounded-xl shadow-md transition-colors"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}