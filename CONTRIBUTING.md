# Contribuer

Règles courtes pour travailler à deux sur ce dépôt sans se marcher dessus.

## Branches

- `main` est **protégée** : jamais de commit direct dessus, jamais de push
  forcé.
- Tout travail se fait dans une branche dédiée, créée depuis `main` à jour :
  - `feature/nom-court` pour une nouvelle fonctionnalité
  - `fix/nom-court` pour une correction

```bash
git checkout main
git pull
git checkout -b feature/page-faq
```

## Commits

- **Un commit = une idée.** Si la description a besoin de "et" pour tout
  lister, c'est probablement deux commits.
- Message court, à l'impératif, en français : `Ajoute le filtre par
  catégorie`, `Corrige l'espacement du hero`, pas "ajouté" ni "ajout de".
- Jamais de secret dans un commit (clé, jeton, `.env.local`). En cas de
  doute avant de commit, relire `git diff --staged`.

## Pull requests

- **Obligatoire** pour tout ce qui part sur `main` — pas d'exception, même
  pour un changement d'une ligne.
- Relecture par l'autre avant merge. On ne merge pas sa propre PR.
- La PR doit rester petite et porter un seul sujet, dans la continuité des
  commits qu'elle contient.
- Le modèle de PR (`.github/pull_request_template.md`) liste la checklist
  à cocher avant de demander la relecture : testé sur mobile, pas de
  secret, capture d'écran avant/après.
- Les checks CI (lint, typecheck, build) doivent passer avant merge.

## Mettre à jour sa branche

Pour récupérer les derniers changements de `main` pendant que vous
travaillez sur votre branche :

```bash
git checkout main
git pull
git checkout feature/page-faq
git merge main
```

En cas de conflit, le résoudre localement, vérifier que `npm run lint`,
`npm run typecheck` et `npm run build` passent toujours, puis commit et
push.

## Avant d'ouvrir la PR

```bash
npm run lint
npm run typecheck
npm run build
```

Les trois doivent passer en local — la CI les relance de toute façon sur
la PR, mais autant ne pas attendre pour le savoir.
