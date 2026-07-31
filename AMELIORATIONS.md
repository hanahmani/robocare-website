# RoboCare — améliorations apportées

Toutes les modifications sont **additives**. Aucune page, route, ni composant existant
n'a été supprimé ou remplacé ; aucun style du design system n'a été modifié.

---

## 1. Contraintes respectées

| Contrainte | Traitement |
|---|---|
| Aucune nouvelle page | 0 route ajoutée. `NAV_ITEMS` inchangé. |
| Architecture inchangée | Même arborescence `app/ · components/ · sections/ · lib/data/ · messages/`. |
| Composants existants conservés | Tous réutilisés (`Card`, `Section`, `SectionHeading`, `Reveal`, `Stagger`, `FaqList`, `CheckRow`, `Pill`, `IconChip`, `PageHero`). |
| Design conservé | Aucun jeton Tailwind modifié. Les nouveaux blocs n'emploient que les couleurs, rayons, ombres et courbes déjà définis. |
| Contenu original | Rédigé pour ce projet, en FR / EN / AR. |

**Règle du projet respectée :** aucun libellé n'a été codé en dur. Tout le texte
ajouté vit dans `/messages/{fr,en,ar}.json`, comme l'impose `types/index.ts`.

---

## 2. Contenu ajouté (× 3 langues)

Un script de fusion a vérifié que `fr.json`, `en.json` et `ar.json` conservent une
forme strictement identique : **0 clé manquante, 0 clé en trop**. Le `tsc` échouerait
sinon, `Dictionary` étant typé sur `fr.json`.

| Page | Section ajoutée | Fichier |
|---|---|---|
| Accueil | Six bénéfices RoboCare | `sections/home/WhyRoboCare.tsx` |
| Accueil | Témoignages + bandeau partenaires | `sections/home/SocialProof.tsx` |
| Accueil | Mini-FAQ (5 questions) | `sections/home/HomeFaq.tsx` |
| Solutions | Les fondamentaux : agriculture de précision, satellite, IoT, drone, IA, irrigation | `sections/solutions/FarmingConcepts.tsx` |
| Plateforme | Cartographie, analyse, alertes, gestion d'exploitation | `sections/platform/PlatformCapabilities.tsx` |
| Plateforme | Architecture en 5 couches + cloud / sécurité / synchronisation | `sections/platform/PlatformArchitecture.tsx` |
| Technologie | NDVI, NDRE, NDWI, SAVI — ce que chacun mesure | `sections/technology/VegetationIndices.tsx` |
| Technologie | Vision par ordinateur, ML, big data, API, GPS/SIG, protocoles | `sections/technology/TechStack.tsx` |
| Impact | Empreinte environnementale + barres animées | `sections/impact/ImpactEnvironment.tsx` |
| À propos | Approche, méthodologie, expertise, innovation, pourquoi nous, engagement | `sections/about/AboutApproach.tsx` |
| Contact | Déroulé d'une démonstration + bloc rassurant | `sections/contact/ContactDemo.tsx` |
| Contact | 3 questions de FAQ supplémentaires (tarif, intégration, hébergement) | `messages/*.json` |

**Alternance des fonds préservée.** Chaque insertion suit le rythme existant
blanc → crème → sauge → sombre. Exemple sur l'accueil :
`Hero(sombre) → Stats(sombre) → À propos(blanc) → Pourquoi(crème) → Solutions(sauge) → Plateforme(sombre) → Témoignages(blanc) → FAQ(sauge) → CTA(blanc)`.

---

## 3. Chatbot IA

```
lib/chat/knowledge.ts   19 entrées trilingues, mode d'emploi en tête de fichier
lib/chat/engine.ts      normalisation, correspondance, providers
components/chat/ChatWidget.tsx   interface
```

Monté une seule fois dans `app/layout.tsx` → présent sur toutes les pages.

**Couvre les 12 questions demandées**, plus 7 : tarif, démarrage sans matériel,
cultures couvertes, détection des maladies, sécurité des données, langues, couverture
géographique.

**Moteur.** Normalisation des accents latins *et* des diacritiques arabes, unification
des variantes `أإآ→ا`, `ة→ه`, `ى→ي`, retrait de l'article défini `ال`, mots vides par
langue, score normalisé avec correspondance partielle par préfixe. En dessous du seuil
de confiance, l'assistant l'admet et propose les trois entrées les plus proches plutôt
que d'inventer.

Testé sur 27 formulations réalistes en FR / EN / AR : **27/27**. Les quatre premiers
essais avaient échoué — c'est ce qui a fait apparaître le problème de l'article défini
arabe (`الهاتف` ne rejoignait pas `هاتف`) et un mot-clé parasite côté français.

**Brancher une IA plus tard.** L'interface ne connaît pas la provenance des réponses :

```ts
export type ChatProvider = {
  id: string;
  ask: (input, locale, history) => Promise<ChatAnswer>;
};
```

Définir `NEXT_PUBLIC_CHAT_ENDPOINT` bascule sur `createRemoteProvider()`, qui appelle
`POST { message, locale, history } → { text }`. Toute erreur — réseau, délai, réponse
vide — retombe sur la base locale : le visiteur obtient toujours une réponse.
**Aucune modification du composant n'est nécessaire.**

**Interface.** Animation d'ouverture, avatar, historique persistant (sessionStorage),
indicateur « écrit… », réponses rapides, saisie libre, renvois contextuels vers les
pages. Modes clair et sombre **locaux au widget** : aucun mode sombre global n'a été
introduit, le reste du site est intact. Position `end-*` logique, donc en bas à droite
en FR/EN et en bas à gauche en arabe. `role="dialog"`, `aria-live`, Échap pour fermer,
focus rendu au lanceur.

---

## 4. SEO

- **JSON-LD** (`lib/seo/schema.ts`) : `Organization` + `WebSite` globaux, puis par page
  `WebPage`, `BreadcrumbList`, `FAQPage` (accueil, contact), `SoftwareApplication`
  (accueil, plateforme), `Service` × 4 (solutions), `ContactPage`. Rendu côté serveur,
  un seul graphe par page, `<` échappé.
- **Open Graph / Twitter** par page via `lib/seo/metadata.ts`.
- **7 images sociales 1200 × 630** générées dans `public/og/`, reprenant la grammaire
  des heros : photo, dégradé forest-950, grille lime, logo, Space Grotesk, filet
  d'échelle d'indices.
- **Titre de l'accueil corrigé** : il valait « RoboCare — … · RoboCare », le gabarit
  `%s · RoboCare` s'appliquant à un titre contenant déjà la marque.
- **Sitemap** enrichi (images, fréquence distincte pour l'accueil).
- **Balises sémantiques** : `<article>`, `<figure>/<figcaption>` pour les témoignages,
  `<dl>` pour les indices, `<ol>` pour les couches et les étapes.

### Choix assumé : pas de `hreflang`

Le site sert les trois langues **sur la même URL** (cookie `robocare_locale`, pas de
segment `/fr/`). Déclarer des `hreflang` vers des URL inexistantes aurait dégradé le
référencement. Si vous souhaitez des URL par langue, c'est un changement de routage —
hors du périmètre « ne pas modifier les routes ».

---

## 5. Accessibilité

Structure `h1 → h2 → h3` respectée dans chaque section ajoutée · contrastes issus des
jetons existants · `aria-label` sur les contrôles du chat · `aria-live="polite"` sur
l'historique · barres de progression exposées via `role="img"` avec libellé chiffré ·
`aria-hidden` sur tout le décoratif · navigation clavier complète, focus visible hérité
du `:focus-visible` global · `prefers-reduced-motion` honoré par `useReducedMotion()`
et par les valeurs initiales des barres et compteurs.

---

## 6. Qualité

```
npx tsc --noEmit   ✓ aucune erreur
npx next lint      ✓ aucun avertissement
npx next build     ✓ 12 pages générées
```

Fumigation sur les 7 routes × 3 langues : HTTP 200, `lang`/`dir` corrects (`ar` → `rtl`),
contenu présent, JSON-LD valide, lanceur du chat rendu.

**Deux défauts corrigés en chemin.** `cn()` est une simple concaténation, sans
`tailwind-merge` : surcharger une utilitaire déjà posée par un composant
(`text-[13px]` d'un `Pill` par `text-[12px]`) produit un résultat qui dépend de l'ordre
du CSS généré. J'ai retiré ces surcharges au lieu de parier dessus.

---

## 7. Note de build

Le build a d'abord échoué dans mon environnement : `next/font/google` télécharge les
polices à la compilation et Google Fonts n'était pas joignable. J'ai vérifié le build
avec des polices neutralisées, puis **restauré `app/layout.tsx` à l'identique**. Le
fichier livré importe bien Manrope, Space Grotesk, IBM Plex Mono et IBM Plex Sans
Arabic. Chez vous, avec un accès réseau normal, le build passera directement.

Après décompression : `npm install`, puis `npm run dev`.
