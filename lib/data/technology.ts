import { Brain, Code2, Compass, Cpu, Database, Eye, Radio, Satellite, Workflow } from 'lucide-react';
import type { FeatureItem, Step, TechBlock } from '@/types';

/** Indicateurs du hero — textes dans `technology.metrics.<id>`. */
export const TECH_METRICS = [
  { id: 'revisit' },
  { id: 'sensors' },
  { id: 'drone' },
  { id: 'lead', featured: true },
] as const;

/** Les quatre briques — textes dans `technology.blocks.<id>`. */
export const TECH_BLOCKS = [
  { id: 'ai', icon: Cpu },
  { id: 'satellite', icon: Satellite, showScale: true },
  { id: 'iot', icon: Radio },
  { id: 'drone', icon: Workflow },
] as const satisfies readonly TechBlock[];

/** Chaîne de traitement — textes dans `technology.pipeline.steps.<id>`. */
export const TECH_PIPELINE = [
  { id: 'acquisition' },
  { id: 'preprocessing' },
  { id: 'inference' },
  { id: 'delivery' },
] as const satisfies readonly Step[];

/**
 * Indices de végétation détaillés — textes dans `technology.indices.items.<id>`.
 * `accent` colore l'en-tête de la carte selon l'échelle d'indices du site.
 */
export const VEGETATION_INDICES = [
  { id: 'ndvi', accent: '#4D9E2F' },
  { id: 'ndre', accent: '#9ED84B' },
  { id: 'ndwi', accent: '#7FA98B' },
  { id: 'savi', accent: '#C88A2E' },
] as const;

/** Briques techniques détaillées — textes dans `technology.stack.items.<id>`. */
export const TECH_STACK = [
  { id: 'vision', icon: Eye },
  { id: 'ml', icon: Brain },
  { id: 'bigdata', icon: Database, tone: 'ocre' },
  { id: 'api', icon: Code2 },
  { id: 'gis', icon: Compass, tone: 'ocre' },
  { id: 'protocols', icon: Radio },
] as const satisfies readonly FeatureItem[];

/** FAQ de la page Technologie — textes dans `technology.faq.items.<id>`. */
export const TECHNOLOGY_FAQ = [
  'whatIsPrecisionAg',
  'satelliteImproveFarming',
  'detectStressEarly',
  'analyzeSatelliteImages',
  'ndviNdreExplained',
  'aiDecisionMaking',
  'droneInspection',
  'droneDetectProblems',
  'droneFertilizationSpraying',
  'droneAdvantages',
] as const;
