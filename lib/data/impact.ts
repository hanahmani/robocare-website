import {
  Activity,
  BarChart3,
  Clock,
  Cpu,
  Droplets,
  FileText,
  FlaskConical,
  Leaf,
  Map,
  Satellite,
  ShieldCheck,
  Sprout,
  Sun,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { CropResult, FeatureItem, StatDatum, Step, Story } from '@/types';

/** Méthodologie — textes dans `impact.method.steps.<id>`. */
export const IMPACT_METHOD = [
  { id: 'collect', icon: Satellite },
  { id: 'analyse', icon: Cpu },
  { id: 'recommend', icon: FileText },
  { id: 'monitor', icon: BarChart3 },
] as const satisfies readonly Step[];

/** Résultats consolidés — libellés dans `impact.stats.<id>`. */
export const IMPACT_STATS = [
  { id: 'hectares', value: 100000, suffix: '+', grouped: true, featured: true, icon: Map },
  { id: 'farms', value: 300, suffix: '+', icon: Users },
  { id: 'water', value: 28, prefix: '−', suffix: ' %', icon: Droplets },
  { id: 'yield', value: 12, prefix: '+', suffix: ' %', icon: TrendingUp },
  { id: 'nitrogen', value: 19, prefix: '−', suffix: ' %', icon: FlaskConical },
  { id: 'lead', value: 14, icon: Clock },
  { id: 'images', value: 1, suffix: ' M+', icon: Satellite },
  { id: 'uptime', value: 99, suffix: ' %', icon: Activity },
] as const satisfies readonly StatDatum[];

/** Résultats par culture — textes dans `impact.crops.items.<slug>`. */
export const IMPACT_CROPS = [
  { slug: 'oliviers', image: '/hero/a.webp', solutionSlug: 'olive-care' },
  { slug: 'agrumes', image: '/hero/b.webp', solutionSlug: 'citrus-care' },
  { slug: 'tomates', image: '/hero/c.webp', solutionSlug: 'greenhouse-care' },
  { slug: 'pommes-de-terre', image: '/hero/d.webp', solutionSlug: 'greenhouse-care' },
  { slug: 'vignes', image: '/hero/e.webp', solutionSlug: 'olive-care' },
  { slug: 'cereales', image: '/hero/f.webp', solutionSlug: 'cereal-care' },
] as const satisfies readonly CropResult[];

/**
 * Grille régulière des métriques par culture : chaque carte affiche exactement
 * `CROP_METRIC_SLOTS` cases (2 ou 3 indicateurs réels selon la culture), les
 * cases manquantes restant `null` pour que la grille CSS reste alignée sur
 * toutes les cartes sans centrage ni étalement au cas par cas.
 */
export const CROP_METRIC_SLOTS = 3;

export type CropIndicator = { label: string; value: string };

export function padCropIndicators(
  indicators: readonly CropIndicator[],
): (CropIndicator | null)[] {
  const slots: (CropIndicator | null)[] = indicators.slice(0, CROP_METRIC_SLOTS);
  while (slots.length < CROP_METRIC_SLOTS) slots.push(null);
  return slots;
}

/** Bénéfices — textes dans `impact.benefits.items.<id>`. */
export const IMPACT_BENEFITS = [
  { id: 'data', icon: BarChart3 },
  { id: 'resources', icon: Droplets },
  { id: 'productivity', icon: Leaf },
  { id: 'sustainable', icon: ShieldCheck },
] as const satisfies readonly FeatureItem[];

/** Études de cas — textes dans `impact.stories.items.<slug>`. */
export const IMPACT_STORIES = [
  { slug: 'olive-farm-tunisia' },
  { slug: 'cereal-cooperative-beja' },
  { slug: 'citrus-orchard-nabeul' },
] as const satisfies readonly Story[];

/**
 * Réductions moyennes constatées — libellés dans `impact.environment.bars.<id>`.
 * `value` est le pourcentage affiché ET la largeur de la barre.
 */
export const IMPACT_ENV_BARS = [
  { id: 'water', value: 28, featured: true },
  { id: 'nitrogen', value: 19 },
  { id: 'treatments', value: 24 },
  { id: 'fuel', value: 15 },
  { id: 'emissions', value: 21 },
] as const;

/** Cartes environnementales — textes dans `impact.environment.cards.<id>`. */
export const IMPACT_ENV_CARDS = [
  { id: 'aquifers', icon: Droplets },
  { id: 'soil', icon: Sprout },
  { id: 'climate', icon: Sun, tone: 'ocre' },
  { id: 'certification', icon: ShieldCheck, tone: 'ocre' },
] as const satisfies readonly FeatureItem[];
