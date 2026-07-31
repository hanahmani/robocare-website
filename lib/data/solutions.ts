import { Crosshair, Cpu, Droplets, Radio, Satellite, Workflow } from 'lucide-react';
import type { FeatureItem, Solution } from '@/types';

/** Les quatre solutions par culture — contenus dans `solutions.items.<slug>`. */
export const SOLUTIONS = [
  { slug: 'olive-care', image: '/hero/1.webp', tone: 'leaf' },
  { slug: 'cereal-care', image: '/hero/2.webp', tone: 'ocre' },
  { slug: 'citrus-care', image: '/hero/3.webp', tone: 'ocre' },
  { slug: 'greenhouse-care', image: '/hero/4.webp', tone: 'leaf' },
] as const satisfies readonly Solution[];

export type SolutionSlug = (typeof SOLUTIONS)[number]['slug'];

/**
 * Fondamentaux de l'agriculture de précision — textes dans
 * `solutions.concepts.items.<id>`. Purement pédagogique : ces blocs
 * expliquent ce sur quoi reposent les quatre solutions ci-dessus.
 */
export const SOLUTION_CONCEPTS = [
  { id: 'precision', icon: Crosshair },
  { id: 'satellite', icon: Satellite },
  { id: 'iot', icon: Radio, tone: 'ocre' },
  { id: 'drone', icon: Workflow, tone: 'ocre' },
  { id: 'ai', icon: Cpu },
  { id: 'irrigation', icon: Droplets },
] as const satisfies readonly FeatureItem[];
