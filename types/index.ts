import type { LucideIcon } from 'lucide-react';

/**
 * Contrats partagés.
 *
 * ⚠️ Règle du projet : **aucun libellé ici**. Ces types ne décrivent que la
 * structure (identifiants, icônes, visuels, valeurs numériques). Tout le texte
 * vit dans `/messages/*.json` et se résout via `useTranslation()`.
 */

/** Entrée de navigation. `key` pointe vers `nav.<key>` dans le dictionnaire. */
export type NavItem = {
  key: 'home' | 'solutions' | 'platform' | 'technology' | 'about' | 'impact' | 'contact';
  href: string;
};

/** Lien de pied de page : soit une clé de traduction, soit une valeur brute (e-mail, téléphone). */
export type FooterLink = {
  href: string;
  labelKey?: string;
  label?: string;
  /** Force le sens LTR (numéros de téléphone, adresses e-mail). */
  ltr?: boolean;
};

export type FooterColumn = {
  titleKey: string;
  links: readonly FooterLink[];
};

/** Fil d'Ariane : `labelKey` est un chemin de traduction. */
export type Crumb = {
  labelKey: string;
  href?: string;
};

/** Statistique animée. Le libellé est résolu par le composant appelant. */
export type StatDatum = {
  /** Identifiant de traduction. */
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  /** Applique le séparateur de milliers de la langue active. */
  grouped?: boolean;
  featured?: boolean;
  icon?: LucideIcon;
};

/** Statistique prête à l'affichage (libellés déjà traduits). */
export type StatView = StatDatum & {
  label: string;
  note?: string;
};

export type Tone = 'leaf' | 'ocre';

/** Carte icône + texte (piliers, modules, bénéfices). */
export type FeatureItem = {
  id: string;
  icon: LucideIcon;
  tone?: Tone;
};

/** Solution par culture — visuels et identifiants uniquement. */
export type Solution = {
  slug: 'olive-care' | 'cereal-care' | 'citrus-care' | 'greenhouse-care';
  image: string;
  tone: Tone;
};

/** Brique technologique. */
export type TechBlock = {
  id: 'ai' | 'satellite' | 'iot' | 'drone';
  icon: LucideIcon;
  /** Affiche l'échelle d'indices sous le texte. */
  showScale?: boolean;
};

/** Étape numérotée d'un process. */
export type Step = {
  id: string;
  icon?: LucideIcon;
};

/** Résultat mesuré par culture. */
export type CropResult = {
  slug: 'oliviers' | 'agrumes' | 'tomates' | 'pommes-de-terre' | 'vignes' | 'cereales';
  image: string;
  tint: string;
  solutionSlug: Solution['slug'];
};

/** Étude de cas. */
export type Story = {
  slug: 'olive-farm-tunisia' | 'cereal-cooperative-beja' | 'citrus-orchard-nabeul';
};

/** Jalon de la frise « Notre histoire ». */
export type Milestone = {
  id: 'y2021' | 'y2022' | 'y2023' | 'y2024' | 'y2025';
  year: string;
  highlight?: boolean;
};

/** Membre d'équipe. Les initiales sont dérivées du nom traduit. */
export type Member = {
  id: string;
  group: 'leadership' | 'engineering' | 'agronomy';
  /** Fiche encore générique (avatar neutre). */
  placeholder?: boolean;
};

/** Partenaire. */
export type Partner = {
  id: string;
  category: 'agriculture' | 'technology' | 'research';
};

/** Retombée presse. */
export type MediaItem = {
  id: string;
  tone: 'leaf' | 'ocre' | 'muted';
};

/** Vue applicative (capture réelle de la plateforme). */
export type PlatformView = {
  id: 'pivot' | 'olive';
  image: string;
  width: number;
  height: number;
};
