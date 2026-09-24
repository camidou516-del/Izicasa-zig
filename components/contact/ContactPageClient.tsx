"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const providedSubject = searchParams.get('subject') || searchParams.get('service') || '';
    const packName = searchParams.get('pack');
    const nextSubject = providedSubject || (packName ? `Demande de devis - ${packName}` : '');

    if (nextSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: nextSubject,
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const isPackFlow = Boolean(searchParams.get('pack') || searchParams.get('source') === 'pack');
      const endpoint = isPackFlow ? '/api/pack' : '/api/contact';
      const payload = isPackFlow
        ? {
            ...formData,
            packName: searchParams.get('pack') || formData.subject,
          }
        : {
            ...formData,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || result?.message || 'Une erreur est survenue.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-50/50 min-h-screen">
      {/* SECTION HERO */}
      <section className="w-full bg-[#004d31] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f1c40f]">
            Contactez-nous
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">
            Discutons de votre projet
          </h1>
          <p className="max-w-2xl mx-auto text-base text-gray-200">
            Décrivez vos besoins et nous vous recontacterons rapidement pour définir la meilleure piste d&apos;action.
          </p>
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* COLONNE DE GAUCHE : LE FORMULAIRE */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#004d31] mb-6 flex items-center gap-2">
              Envoie un message
            </h2>
            
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center space-y-3">
                <h3 className="text-lg font-bold">Message envoyé avec succès !</h3>
                <p className="text-sm text-emerald-700 max-w-md mx-auto">
                  Merci de nous avoir contactés. Notre équipe à Ziguinchor va étudier votre demande et vous répondra dans les plus brefs délais.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-[#004d31] font-semibold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="name">
                      Nom complet
                    </label>
                    <input 
                      id="name" 
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom" 
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d31]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="email">
                      Email
                    </label>
                    <input 
                      id="email" 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vous@example.com" 
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d31]" 
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="phone">
                      Téléphone
                    </label>
                    <input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+221 77 367 99 85" 
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d31]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="subject">
                      Sujet
                    </label>
                    <input 
                      id="subject" 
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Ex: Demande de devis / Prise de contact" 
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d31]" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="message">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre besoin en détail..." 
                    rows={6} 
                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d31] resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#004d31] hover:bg-[#003622] text-white py-4 text-base font-semibold rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>

          {/* COLONNE DE DROITE : COORDONNÉES & GOOGLE MAPS */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#004d31]">Nos coordonnées</h3>
              <p className="text-sm text-slate-500">Un échange simple, rapide et local.</p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Adresse</h4>
                    <p className="text-sm text-slate-600">Château d&apos;Eau, Ziguinchor 27000, Sénégal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Téléphone</h4>
                    <p className="text-sm text-slate-600">+221 77 367 99 85</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Horaires</h4>
                    <p className="text-sm text-slate-600">Lundi - Vendredi : 8h30 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GOOGLE MAPS */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-2 shadow-sm overflow-hidden">
              <iframe
                title="Carte Google Maps Izicasa"
                src="https://www.google.com/maps?q=Ch%C3%A2teau%20d'Eau%20Ziguinchor%20S%C3%A9n%C3%A9gal&z=14&output=embed"
                className="h-[280px] w-full rounded-[1.75rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}