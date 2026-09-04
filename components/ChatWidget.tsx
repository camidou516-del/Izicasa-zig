"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import { X, Send, User, Sparkles } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  // Version AI SDK v5
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* 1. BOUTON FLOTTANT : MASCOTTE FADJIA SANÉ */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-[#004d3d] text-white p-2 pr-5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#f1c40f] cursor-pointer"
          aria-label="Discuter avec Fadjia SANÉ"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#f1c40f] shrink-0 bg-amber-100">
            <Image
              src="/mascotte/avatar.jpg"
              alt="Fadjia SANÉ"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10" />
          </div>

          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs font-bold text-[#f1c40f] flex items-center gap-1">
              Fadjia SANÉ
              <Sparkles className="w-3 h-3 text-[#f1c40f]" />
            </p>
            <p className="text-[11px] text-slate-100 opacity-90">Conseillère Izicasa</p>
          </div>
        </button>
      )}

      {/* 2. FENÊTRE DU CHAT */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Entête */}
          <div className="bg-[#004d3d] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#f1c40f] shrink-0">
                <Image
                  src="/mascotte/avatar.jpg"
                  alt="Fadjia SANÉ"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#f1c40f]">Fadjia SANÉ</h3>
                <p className="text-[11px] text-gray-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  En ligne • Conseillère Izicasa
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer la discussion"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.length === 0 && (
              <div className="text-center my-6 space-y-3">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#f1c40f] shadow-md">
                  <Image
                    src="/mascotte/avatar.jpg"
                    alt="Fadjia SANÉ"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    Bonjour ! Je suis Fadjia SANÉ 
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-[240px] mx-auto mt-1">
                    Comment puis-je vous aider concernant nos formations et services Izicasa ?
                  </p>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role !== "user" && (
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#f1c40f]">
                    <Image
                      src="/mascotte/avatar.jpg"
                      alt="Fadjia SANÉ"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#004d3d] text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
                  }`}
                >
                  {/* Extraction du texte depuis parts (spécifique SDK v5) */}
                  {m.parts
                    ?.filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("")}
                </div>

                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#f1c40f]">
                  <Image
                    src="/mascotte/avatar.jpg"
                    alt="Fadjia SANÉ"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-2 text-xs text-slate-400 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Formulaire de saisie */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message à Fadjia..."
              className="flex-1 bg-slate-100 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#004d3d]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#004d3d] text-[#f1c40f] p-2.5 rounded-xl hover:bg-[#00382d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}