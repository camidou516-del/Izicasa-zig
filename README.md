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

Pour l'authentification et les réservations, ajoutez aussi `DATABASE_URL` avec la chaîne PostgreSQL de Supabase, `AUTH_SECRET` avec une valeur aléatoire longue, puis les variables Resend. Les variables `TWILIO_*` activent les SMS de confirmation; sans elles, la réservation est tout de même enregistrée et seul l'envoi SMS est ignoré.

Après configuration de Supabase, appliquez le schéma :

```bash
npx prisma migrate dev --name add_users_and_reservations
```

Le premier compte est créé avec le rôle `USER`. Pour promouvoir un administrateur, mettez son rôle à `ADMIN` dans Supabase ou via Prisma. Le dashboard est disponible sur `/admin` et est protégé par le middleware.

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
