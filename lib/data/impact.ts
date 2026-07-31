import {
  BarChart3,
  Cpu,
  Droplets,
  FileText,
  Leaf,
  Satellite,
  ShieldCheck,
  Sprout,
  Sun,
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
  { id: 'hectares', value: 100000, suffix: '+', grouped: true, featured: true },
  { id: 'farms', value: 300, suffix: '+' },
  { id: 'water', value: 28, prefix: '−', suffix: ' %' },
  { id: 'yield', value: 12, prefix: '+', suffix: ' %' },
  { id: 'nitrogen', value: 19, prefix: '−', suffix: ' %' },
  { id: 'lead', value: 14 },
  { id: 'images', value: 1, suffix: ' M+' },
  { id: 'uptime', value: 99, suffix: ' %' },
] as const satisfies readonly StatDatum[];

/** Résultats par culture — textes dans `impact.crops.items.<slug>`. */
export const IMPACT_CROPS = [
  {
    slug: 'oliviers',
    image: '/hero/a.webp',
    tint: 'rgba(230,243,235,.28)',
    solutionSlug: 'olive-care',
  },
  {
    slug: 'agrumes',
    image: '/hero/b.webp',
    tint: 'rgba(237,232,225,.26)',
    solutionSlug: 'citrus-care',
  },
  {
    slug: 'tomates',
    image: '/hero/c.webp',
    tint: 'rgba(210,186,187,.24)',
    solutionSlug: 'greenhouse-care',
  },
  {
    slug: 'pommes-de-terre',
    image: '/hero/d.webp',
    tint: 'rgba(216,206,192,.26)',
    solutionSlug: 'greenhouse-care',
  },
  {
    slug: 'vignes',
    image: '/hero/e.webp',
    tint: 'rgba(235,217,208,.26)',
    solutionSlug: 'olive-care',
  },
  {
    slug: 'cereales',
    image: '/hero/f.webp',
    tint: 'rgba(220,218,206,.24)',
    solutionSlug: 'cereal-care',
  },
] as const satisfies readonly CropResult[];

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
