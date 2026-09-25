# Portfolio de Zacharia

Portfolio de **Zacharia Thomas Mansal**, développeur full stack et DevOps à Dakar. Le site présente ses compétences, son parcours, ses projets et ses coordonnées en français et en anglais.

## Développement local

```bash
npm ci
npm run dev
```

## Production

```bash
npm run build
```

Le déploiement Vercel utilise `vercel.json` et publie le dossier `dist/`. Le workflow GitHub Actions `.github/workflows/portfolio-ci.yml` installe les dépendances et vérifie la compilation à chaque push sur `master` et à chaque pull request vers `master`.

Pour activer les déploiements automatiques, importer le dépôt GitHub `zachariathomas59-rgb/developer-portfolios` dans Vercel et conserver `master` comme branche de production.

Le CV téléchargeable se trouve dans `public/CV-Zacharia-Mansal.pdf`.
