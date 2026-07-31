import {
  BarChart3,
  Cpu,
  FileCheck2,
  FileText,
  Languages,
  Rocket,
  Satellite,
  Sun,
  Target,
  Timer,
} from 'lucide-react';
import type { FeatureItem, StatDatum } from '@/types';

/** Chiffres clés sous le hero d'accueil — libellés dans `home.stats.*`. */
export const HOME_STATS = [
  { id: 'users', value: 300, suffix: '+' },
  { id: 'hectares', value: 100000, suffix: '+', grouped: true, featured: true },
  { id: 'partners', value: 15, suffix: '+' },
  { id: 'alerts', value: 100000, suffix: '+', grouped: true },
  { id: 'images', value: 1, suffix: 'M+' },
  { id: 'uptime', value: 99, suffix: '%' },
] as const satisfies readonly StatDatum[];

/** Piliers de la section « Qui nous sommes » — textes dans `home.about.pillars.*`. */
export const HOME_PILLARS = [
  { id: 'satellite', icon: Satellite },
  { id: 'sensors', icon: BarChart3 },
  { id: 'ai', icon: Cpu, tone: 'ocre' },
  { id: 'guidance', icon: FileText, tone: 'ocre' },
] as const satisfies readonly FeatureItem[];

/** Histogramme décoratif de la carte « humidité du sol » (design validé). */
export const HERO_MOISTURE_BARS = [
  { height: 38, color: 'rgba(158,216,75,.35)' },
  { height: 54, color: 'rgba(158,216,75,.45)' },
  { height: 41, color: 'rgba(158,216,75,.35)' },
  { height: 26, color: '#E4A93C' },
  { height: 21, color: '#D8232A' },
  { height: 33, color: 'rgba(158,216,75,.35)' },
] as const;

/** Valeur affichée sur la carte NDVI du hero (chiffre, non traduit). */
export const HERO_NDVI_VALUE = '0,74';

/** Bénéfices « Pourquoi RoboCare » — textes dans `home.why.items.*`. */
export const HOME_BENEFITS = [
  { id: 'leadTime', icon: Timer },
  { id: 'noHardware', icon: Rocket },
  { id: 'mediterranean', icon: Sun, tone: 'ocre' },
  { id: 'decision', icon: Target },
  { id: 'traceability', icon: FileCheck2, tone: 'ocre' },
  { id: 'reach', icon: Languages },
] as const satisfies readonly FeatureItem[];

/** Témoignages d'exploitations — textes dans `home.testimonials.items.*`. */
export const HOME_TESTIMONIALS = ['olive', 'cereal', 'citrus'] as const;

/** Mini-FAQ de l'accueil — textes dans `home.faq.items.*`. */
export const HOME_FAQ = ['start', 'accuracy', 'clouds', 'size', 'data'] as const;
