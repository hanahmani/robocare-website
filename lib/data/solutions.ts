import type { Solution } from '@/types';

/** Les quatre solutions par culture — contenus dans `solutions.items.<slug>`. */
export const SOLUTIONS = [
  { slug: 'olive-care', image: '/hero/1.webp', tone: 'leaf' },
  { slug: 'cereal-care', image: '/hero/2.webp', tone: 'ocre' },
  { slug: 'citrus-care', image: '/hero/3.webp', tone: 'ocre' },
  { slug: 'greenhouse-care', image: '/hero/4.webp', tone: 'leaf' },
] as const satisfies readonly Solution[];

export type SolutionSlug = (typeof SOLUTIONS)[number]['slug'];
