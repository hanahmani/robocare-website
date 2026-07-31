# RoboCare — site Next.js 15

Site vitrine RoboCare : agriculture de précision par imagerie satellite, capteurs IoT et IA.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000

Autres scripts : `npm run build`, `npm start`, `npm run typecheck`.

## Stack

Next.js 15 (App Router) · TypeScript strict · Tailwind CSS 3 · Framer Motion · Lucide React.

## Arborescence

```
app/                 Routes App Router (une page = un dossier)
  page.tsx           Accueil
  solutions/         Solutions par culture
  plateforme/        La plateforme (contenu validé, captures réelles)
  technologie/       Briques technologiques
  about/             À propos
  impact/            Résultats et études de cas
  contact/           Formulaire et FAQ
  layout.tsx         Navbar + Footer + polices + SEO global
  sitemap.ts         Plan du site
  robots.ts          robots.txt
  not-found.tsx      404
components/
  animations/        Reveal, Stagger, ScrollProgress
  layout/            Navbar, Footer, PageHero
  ui/                Button, Card, Section, SectionHeading, StatCounter, FaqList, Breadcrumbs
  visuals/           AppWindow (fenêtre applicative animée)
sections/            Une section = un composant (home/, platform/, contact/, shared/)
hooks/               useCountUp, useMediaQuery
lib/                 utils, motion (variants Framer), data/ (contenus typés)
styles/globals.css   Reset, couches @layer, utilitaires .container-page / .eyebrow / .glass
types/               Contrats TypeScript partagés
public/              Visuels (brand/, hero/, platform/)
```

## Design system

Tous les jetons sont dans `tailwind.config.ts` — couleurs (`forest`, `ink`, `sage`, `leaf`,
`lime`, `ocre`), rayons (`card` 24px, `tile` 22px, `field` 14px), ombres (`soft`, `lift`,
`hover`, `glass`) et la courbe `ease-premium` `cubic-bezier(.2,.8,.2,1)`.
**Ne jamais coder une couleur en dur** : passer par les classes du thème.

Typographie : Space Grotesk (titres), Manrope (texte), IBM Plex Mono (étiquettes),
chargées via `next/font` — aucune requête tierce.

## Animations

Toutes les entrées passent par `<Reveal>` / `<Stagger>` (variants dans `lib/motion.ts`) :
fade-in, slide-up, slide latéral, scale, cascade. Les compteurs utilisent `useCountUp`
(IntersectionObserver). `prefers-reduced-motion` neutralise l'ensemble.

## Responsive

Mobile 375 · Tablet 768 (`md`) · Laptop 1024 (`lg`) · Desktop 1440 (`xl`).
Conteneur `max-w-[1240px]`, marges 20 → 40px, grilles `auto-fit` : aucun débordement horizontal.

## Points d'intégration

- `sections/contact/ContactForm.tsx` : brancher `handleSubmit` sur `/api/contact` ou le CRM.
- `lib/data/about.ts` : remplacer « Nom Prénom » par l'équipe réelle et ajouter les portraits.
- Logos partenaires : à déposer dans `public/partners/` puis afficher dans la section Partenaires.

---

## Internationalisation (FR · EN · AR)

Le site est disponible en **français** (langue par défaut), **anglais** et
**arabe**, avec un vrai support RTL pour l'arabe.

### Arborescence i18n

```
i18n/
  config.ts          Langues, direction, clés cookie/localStorage
  dictionaries.ts    Registre des 3 dictionnaires + contrôle de forme
  translate.ts       Fabrique de `t()` (isomorphe, client + serveur)
  provider.tsx       <I18nProvider> et hooks useTranslation / useDirection
  getDictionary.ts   ⚠️ Serveur uniquement (lit le cookie de la requête)
  index.ts           Barrel client-safe

messages/
  fr.json  en.json  ar.json     811 clés, structure strictement identique
```

### Utilisation

```tsx
'use client';
import { useTranslation } from '@/i18n';

const { t, d, locale, dir, isRtl, setLocale } = useTranslation();

t('nav.home');                          // chaîne simple
t('footer.rights', { year: 2026 });     // interpolation {year}
t.list('home.platformPreview.points');  // tableau de chaînes
d.solutions.items['olive-care'].name;   // accès typé (autocomplétion)
```

Dans un Server Component ou un `generateMetadata()` :

```tsx
import { getTranslation } from '@/i18n/getDictionary';
const { locale, d, t } = await getTranslation();
```

### Changement de langue sans rechargement

Les trois dictionnaires sont embarqués dans le bundle. Le sélecteur appelle
`setLocale()`, qui met à jour un state React : le contenu, `document.lang` et
`document.dir` changent immédiatement, sans navigation ni requête réseau.

La persistance est double, et c'est volontaire :

| Support        | Rôle                                                          |
| -------------- | ------------------------------------------------------------- |
| `localStorage` | Mémorise le choix ; fait autorité à l'hydratation             |
| Cookie         | Lu côté serveur pour rendre `<html lang dir>` correct dès le SSR |

Sans le cookie, le HTML servi serait toujours en français et les moteurs de
recherche ne verraient jamais les versions EN/AR. Sans localStorage, on perdrait
la préférence côté client. Les deux sont écrits ensemble à chaque changement, et
un écouteur `storage` synchronise les onglets ouverts.

**Conséquence assumée :** lire un cookie rend les pages dynamiques
(`ƒ` dans le rapport de build) au lieu d'être statiques. Si la génération
statique est prioritaire, la seule alternative propre est de passer à un routage
par segment (`/fr`, `/en`, `/ar`) — mais le changement de langue devient alors
une navigation, pas une bascule instantanée.

### Ajouter une langue

1. Copier `messages/fr.json` → `messages/xx.json` et traduire.
2. Ajouter `'xx'` à `LOCALES` et une entrée dans `LOCALE_META` (`i18n/config.ts`).
3. Importer le fichier dans `i18n/dictionaries.ts`.

`tsc` échoue si le nouveau dictionnaire n'a pas exactement la même forme que
`fr.json` — les clés manquantes sont détectées à la compilation, pas en
production.

### Stratégie RTL

Le RTL ne repose pas sur des inversions manuelles (`flex-row-reverse`,
`text-align: right`). Il repose sur `dir="rtl"` sur `<html>` + les **propriétés
logiques** de Tailwind : `ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`, `border-s`,
`text-start`. Le navigateur inverse alors de lui-même les axes flex, les
grilles, les marges et l'ordre du texte. Ajouter un `flex-row-reverse` par-dessus
inverserait une seconde fois et casserait la mise en page.

Restent quatre cas que CSS logique ne couvre pas, traités explicitement :

- **Flèches** — `components/ui/Arrow.tsx` applique `rtl:rotate-180`.
- **Animations latérales** — `<Reveal from="left|right">` permute ses variantes
  Framer Motion via `useDirection()`.
- **Dégradés directionnels** — barre de progression (`rtl:origin-right`) et
  échelle NDVI (`[dir='rtl'] .bg-index-scale`, dans `styles/globals.css`).
- **Typographie arabe** — police `IBM Plex Sans Arabic` ajoutée en repli dans
  les trois stacks Tailwind, et interlettrage négatif neutralisé sous
  `html[lang='ar']` (l'écriture arabe étant cursive).

Les valeurs qui doivent rester en LTR même en arabe (numéros de téléphone,
e-mails, chiffres des compteurs, hôte de l'application) portent un `dir="ltr"`
local avec `rtl:text-right` pour rester alignées sur la bonne marge.

### Règle de contenu

`lib/data/*.ts` ne contient **aucun libellé** : uniquement des identifiants,
des icônes Lucide, des images, des teintes et des valeurs numériques. Tout le
texte vit dans `/messages`, indexé par ce même identifiant. Les initiales des
membres de l'équipe sont dérivées du nom traduit (`initialsFromName`) plutôt que
codées en dur, des initiales latines n'ayant aucun sens en arabe.
