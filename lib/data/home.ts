import { BarChart3, Cpu, FileText, Satellite } from 'lucide-react';
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
