# Izicasa Sénégal

Site Next.js pour Izicasa Sénégal, avec pages de présentation, formations, partenariats, blog et Studio Sanity intégré.

## Prérequis

- Node.js 18+
- pnpm
- Un projet Sanity avec project ID et dataset

## Installation

```bash
pnpm install
```

## Variables d'environnement

Copiez le fichier d'exemple et renseignez les valeurs Sanity :

```bash
cp .env.example .env.local
```

Ajoutez ensuite :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Développement local

```bash
pnpm dev
```

Le site sera disponible sur http://localhost:3000 et le Studio Sanity sur http://localhost:3000/studio.

## Déploiement Vercel

1. Connectez le dépôt à Vercel.
2. Définissez les variables d'environnement Sanity dans les paramètres du projet Vercel.
3. Déployez avec :

```bash
vercel
```

Pour un déploiement de production :

```bash
vercel --prod
```

## Déploiement du Studio Sanity

Si vous souhaitez donner un accès dédié à l'équipe éditoriale, déployez le Studio Sanity séparément :

```bash
pnpm deploy:studio
```

Cela exécute la commande `sanity deploy` pour publier le Studio sur un domaine dédié.
