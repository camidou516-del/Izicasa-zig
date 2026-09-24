"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormationRegistrationFormProps {
  selectedFormation: string;
}

export function FormationRegistrationForm({ selectedFormation }: FormationRegistrationFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    // CORRECTION CLÉ : On capture le formulaire immédiatement ici
    const formElement = event.currentTarget; 
    const formData = new FormData(formElement);

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          formation: formData.get("formation") || selectedFormation,
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue. Veuillez réessayer.");
      }

      // Le message de succès qui s'affichera en vert
      setStatus("Votre demande a bien été enregistrée. Nous vous recontacterons bientôt.");
      
      // On utilise la référence capturée en haut pour vider les champs sans bug
      if (formElement) {
        formElement.reset();
      }
   } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue.";
    setStatus(errorMessage);
  } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="name">
          Nom complet
        </label>
        <Input id="name" name="name" placeholder="Votre nom" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="phone">
          Téléphone
        </label>
        <Input id="phone" name="phone" type="tel" placeholder="Votre numéro" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="formation">
          Formation choisie
        </label>
        <select
          id="formation"
          name="formation"
          defaultValue={selectedFormation}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900"
        >
          <option value="Bureautique Avancée & Excel Pro">Bureautique Avancée & Excel Pro</option>
          <option value="Boostez votre Productivité avec l'IA Générative">Boostez votre Productivité avec IA Générative</option>
          <option value="Montage Vidéo & Cadrage Professionnel">Montage Vidéo & Cadrage Professionnel</option>
          <option value="Infographie & Design Graphique">Infographie & Design Graphique</option>
          <option value="Développement Web No-code (CMS)">Développement Web No-code (CMS)</option>
          <option value="Marketing Digital Complet">Marketing Digital Complet</option>
        </select>
      </div>

      <Button type="submit" className="w-full bg-[#004d3d] text-white hover:bg-[#003328]" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "S'inscrire"}
      </Button>

      {status && (
        <p className={`text-sm mt-2 font-medium ${status.includes("erreur") ? "text-red-600" : "text-emerald-600"}`}>
          {status}
        </p>
      )}
    </form>
  );
}