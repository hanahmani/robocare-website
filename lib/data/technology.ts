import { Cpu, Radio, Satellite, Workflow } from 'lucide-react';
import type { Step, TechBlock } from '@/types';

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
