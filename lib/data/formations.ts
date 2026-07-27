export interface Formation {
  slug: string;
  title: string;
  duration: string;
  summary: string;
  description: string;
  program: string[];
  prerequisites: string[];
  price: string;
  badge: string;
}

// TODO: remplacer par les vraies données de formations d'Izicasa
export const formations: Formation[] = [
  {
    slug: "marketing-digital",
    title: "Marketing Digital",
    duration: "2 mois",
    summary: "Réseaux sociaux, publicité en ligne, stratégie de contenu",
    description:
      "Un programme pratique pour apprendre à construire une présence digitale cohérente, créer du contenu et piloter des actions de visibilité plus efficaces.",
    program: [
      "Audit de présence digitale et positionnement",
      "Stratégie de contenu et storytelling",
      "Publicité en ligne et gestion de campagne",
      "Analyse de performance et optimisation",
    ],
    prerequisites: [
      "Avoir un projet, une activité ou une page à développer",
      "Être à l’aise avec un smartphone ou un ordinateur",
    ],
    price: "Sur devis",
    badge: "Certifiante",
  },
  {
    slug: "montage-video-cadrage",
    title: "Montage vidéo & Cadrage",
    duration: "2 mois",
    summary: "Prise de vue, montage professionnel, narration visuelle",
    description:
      "Une formation orientée production vidéo pour apprendre à raconter une histoire visuelle, cadrer correctement et monter des contenus professionnels.",
    program: [
      "Techniques de cadrage et prise de vue",
      "Narration visuelle et structure de récit",
      "Montage vidéo avec outils professionnels",
      "Préparation et diffusion de contenus",
    ],
    prerequisites: [
      "Un téléphone ou un appareil photo simple",
      "Un ordinateur pour le montage",
    ],
    price: "Sur devis",
    badge: "Certifiante",
  },
  {
    slug: "developpement-web",
    title: "Développement Web",
    duration: "3 mois",
    summary: "HTML/CSS/JS, création de sites vitrines",
    description:
      "Découvrez les bases du développement web pour créer des sites vitrines modernes, simples à maintenir et adaptés à vos besoins.",
    program: [
      "HTML, CSS et structure de page",
      "JavaScript pour l’interactivité",
      "Création de sites vitrines responsive",
      "Bonnes pratiques de publication",
    ],
    prerequisites: [
      "Avoir un ordinateur et un navigateur web",
      "Avoir envie d’apprendre pas à pas",
    ],
    price: "Sur devis",
    badge: "Certifiante",
  },
  {
    slug: "infographie-design-graphique",
    title: "Infographie & Design graphique",
    duration: "6 semaines",
    summary: "Identité visuelle, Canva/Photoshop, supports de communication",
    description:
      "Apprenez à créer des visuels cohérents pour vos supports de communication, vos réseaux sociaux et votre image de marque.",
    program: [
      "Principes de base du design",
      "Création d’une identité visuelle simple",
      "Canva et Photoshop pour les supports",
      "Rendu de supports de communication",
    ],
    prerequisites: [
      "Avoir un ordinateur",
      "Quelques notions de base en bureautique sont utiles",
    ],
    price: "Sur devis",
    badge: "Certifiante",
  },
];

export function getFormationBySlug(slug: string) {
  return formations.find((formation) => formation.slug === slug);
}
