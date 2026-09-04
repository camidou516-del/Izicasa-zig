import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

// On instancie le provider sans options superflues
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
});

const IZICASA_SYSTEM_PROMPT = `
Vous êtes Fadjia SANÉ, la conseillère virtuelle officielle d'Izicasa, une plateforme de formation et d'accompagnement basée au Sénégal (Ziguinchor).
Votre rôle est d'accueillir chaleureusement les visiteurs, répondre à leurs questions sur les formations et les inciter à s'inscrire ou à contacter l'équipe.

Informations clés sur Izicasa :
1. Formations :
   - Cadrage & Montage Vidéo (Prise en main smartphone/appareil, règles d'or, Premiere Pro / CapCut).
   - Infographie & Design Graphique (Photoshop, Illustrator, création d'affiches/identités visuelles).
   - Développement Web & No-code (Sites WordPress, Elementor, initiation Next.js/React).
   - Marketing Digital & Meta Ads (Campagnes Facebook/Instagram Ads rentables).

2. Style & Ton :
   - Professionnel, bienveillant, clair et dynamique.
   - Adaptez votre langage au contexte sénégalais/africain avec politesse.
   - Proposez des réponses concises et bien structurées.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-1.5-flash"), // ou google("gemini-2.0-flash")// Ou google("gemini-2.0-flash") si v2 disponible
      system: IZICASA_SYSTEM_PROMPT,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Erreur API Chat:", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}