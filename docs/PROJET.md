# Enfan de Palestine — notes de projet

## Architecture en bref

Site **Next.js 16** (App Router, TypeScript), rendu hybride (pages
statiques quand possible, dynamiques quand elles lisent une query string —
`/produits` et `/archives`). Styles en **Tailwind CSS v4**, configuré en CSS
(`app/globals.css`, pas de `tailwind.config.js` — Tailwind v4 n'en a pas
besoin).

- **Catalogue produits** : statique pour l'instant, dans `lib/products.ts`.
  Pensé pour être remplacé par des requêtes **Supabase** sans changer les
  composants qui le consomment (`ProductCard`, `ProductPanel`, la page
  `/produits`...). Les clients Supabase (`lib/supabase/client.ts` côté
  navigateur, `lib/supabase/server.ts` côté serveur) sont en place mais
  aucune table n'est encore branchée.
- **Paiement** : les clients Stripe (`lib/stripe.ts` serveur,
  `lib/stripe-client.ts` navigateur) sont prêts mais le tunnel de commande
  (`/checkout`) n'est pas encore relié à une vraie session de paiement —
  c'est un formulaire statique pour l'instant.
- **Panier** : état global via React Context (`lib/cart-context.tsx`),
  persisté en `localStorage`. Pas encore de synchronisation Supabase
  (utilisateur connecté, panier serveur, etc.).

> Note : un brief de mise en place reçu pour cette documentation mentionnait
> un site "branché sur Shopify via Storefront API". Ce n'est pas l'état
> réel du code — il n'y a aucune intégration Shopify dans ce dépôt, le
> catalogue est statique et Supabase/Stripe sont les briques prévues. À
> vérifier avec l'auteur du brief si Shopify est une direction voulue pour
> la suite ; en l'état, cette doc décrit ce qui existe réellement.

## Pages et routes

| Route | Contenu |
| --- | --- |
| `/` | Home : hero, citation, dernières sorties, "Notre but", historique des donations (aperçu), "Notre Histoire", FAQ |
| `/produits` | Liste des produits, filtrable par catégorie (`?categorie=...`) |
| `/produits/[slug]` | Fiche produit : galerie, sélecteur de taille, panier, accordéon détails |
| `/panier` | Contenu du panier, quantités, suppression |
| `/checkout` | Formulaire de livraison + récapitulatif de commande |
| `/donations` | Historique complet des dons, filtrable/dépliable, section "Comment ça marche" |
| `/archives` | Pièces archivées de la marque (sélecteur + visionneuse plein écran) |
| `/about` | Page de présentation (scroll épinglé) |

## Où vit chaque contenu

Le contenu éditorial qui change souvent (et n'a pas encore besoin d'une
base de données) vit dans `lib/data/`, séparé des composants qui l'affichent :

- `lib/data/donations.ts` — historique des dons (montant, date, organisation,
  description). Utilisé à la fois par l'aperçu sur la home et par `/donations`.
- `lib/data/archives.ts` — pièces archivées (titre, type, couleur, image,
  description, lien vers une collection).
- `lib/data/about.ts` — intro et items de la page `/about`.
- `lib/data/faq.ts` — questions/réponses de la FAQ sur la home.
- `lib/products.ts` — catalogue produits (à part des autres car plus
  structurant : prix, tailles, stock, catégories).
- `lib/cart.ts` — types et constantes liés au panier.

Objectif : modifier un texte ou ajouter une entrée ne demande jamais de
toucher à un composant React.

## Direction artistique

- **Typographie** : Inter (texte courant, interface) + Inter Tight (gros
  titres), chargées via `next/font/google` dans `app/layout.tsx`. Poids
  400 pour le texte, 500 pour les liens de nav, 600-700 pour les titres.
- **Couleurs** : noir/blanc dominant, aplats de couleur (taupe `#7A6666`,
  gris foncé `#4D4949`/`#3F3B38`, beiges `#B7ACA3`/`#C9C2B8`) en attendant
  les vraies photos produit.
- **Liens** : soulignés par défaut pour tout élément cliquable — convention
  tenue sur tout le site (nav, boutons texte, CTA secondaires).
- **"Enfan" sans d est volontaire** — ne pas corriger en "Enfant" dans le
  contenu, les composants ou les commits.

## Décisions prises

- **Pas de `tailwind.config.js`** : ce projet utilise la configuration CSS
  de Tailwind v4 (`@theme` dans `globals.css`). Les nouvelles couleurs/polices
  se déclarent là, pas dans un fichier JS.
- **Les accordéons à "une section ouverte à la fois"** (fiche produit,
  donations) sont contrôlés par le parent (état `openIndex`/`openSection`
  levé), pas par chaque item indépendamment — `AccordionItem` supporte un
  mode contrôlé (`isOpen`/`onToggle`) et un mode non-contrôlé par défaut.
- **Composants variant-based plutôt que dupliqués** : `ProductCard` et
  `DonationCard` ont une prop `variant` (`"compact"` / `"grid"` ou
  `"default"` / `"compact"`) pour servir plusieurs mises en page sans
  dupliquer le composant.
- **`/produits` et `/archives` sont dynamiques** (pas de génération statique)
  car ils lisent `searchParams` pour pré-filtrer leur contenu depuis l'URL.
