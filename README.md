# Enfan de Palestine

Site e-commerce de la marque **Enfan de Palestine** — vêtements engagés et
solidaires : le vêtement comme moyen de sensibiliser, transmettre et agir en
faveur du peuple palestinien. Les bénéfices des ventes sont reversés à des
associations partenaires.

Stack : Next.js (App Router, TypeScript), Tailwind CSS v4, Supabase, Stripe.

Pour l'architecture détaillée et les décisions prises, voir
[docs/PROJET.md](docs/PROJET.md). Pour les règles de contribution (branches,
PR, commits), voir [CONTRIBUTING.md](CONTRIBUTING.md).

## Prérequis

- Node.js 24 (voir `.nvmrc` — avec [nvm](https://github.com/nvm-sh/nvm) :
  `nvm use`)
- npm (fourni avec Node)

## Installation

```bash
npm install
cp .env.local.example .env.local   # puis renseigner les variables, voir ci-dessous
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Chaque variable est documentée (usage + où la trouver) directement dans
[.env.local.example](.env.local.example). Résumé :

| Variable | Où la trouver |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard Supabase → Project Settings → API |
| `STRIPE_SECRET_KEY` | Dashboard Stripe → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Dashboard Stripe → Developers → API keys |

`.env.local` n'est jamais commité — chacun garde ses propres clés en local.

## Commandes

```bash
npm run dev         # serveur de développement
npm run build        # build de production
npm run start         # sert le build de production
npm run lint          # ESLint
npm run typecheck     # vérification TypeScript (tsc --noEmit)
```

Les trois dernières commandes (`build`, `lint`, `typecheck`) sont aussi
exécutées automatiquement sur chaque pull request (voir
`.github/workflows/`).

## Arborescence

```
app/                     routes (App Router), une page par dossier
  about/                 page About us (scroll épinglé)
  archives/               page Archives (sélecteur + visionneuse)
  checkout/                tunnel de commande
  donations/               historique des donations
  panier/                   page panier
  produits/                 liste produits + filtre par catégorie
    [slug]/                  fiche produit
  layout.tsx               layout racine (sidebar, footer, polices, CartProvider)
  page.tsx                   home

components/               composants UI réutilisables (un fichier = un composant)
  icons/                    icônes SVG (logo, ...)

lib/                     logique et données partagées, pas de JSX
  data/                    contenu éditorial statique (donations, archives, about)
                            — voir docs/PROJET.md pour le détail
  products.ts              catalogue produits (sera remplacé par Supabase)
  cart.ts, cart-context.tsx  état panier (Context + localStorage)
  stripe.ts, stripe-client.ts  clients Stripe serveur / client
  supabase/                 clients Supabase serveur / client

types/                    types TypeScript partagés entre composants
```
