import type { LucideIcon } from 'lucide-react';
import {
  Cloud,
  Compass,
  Cpu,
  Droplet,
  Factory,
  Globe,
  Grid3x3,
  Layers,
  Leaf,
  Map,
  Radar,
  Recycle,
  Satellite,
  Sun,
  TreePine,
  Users,
  Wifi,
} from 'lucide-react';
import type { FeatureItem, ImpactMetricDatum, Step } from '@/types';

/** Raccourcis techniques affichés sous les actions du hero — textes dans `sustainability.hero.chips.<id>`. */
export const SUSTAINABILITY_HERO_CHIPS = [
  'soilHealth',
  'waterStress',
  'cropHealth',
  'ndvi',
  'iotSensor',
  'aiInsight',
] as const;

/** Étape de la méthode « Comment nous rendons l'agriculture plus durable ». */
type SustainabilityStep = { id: 'measure' | 'decide' | 'prove'; image: string; cta?: boolean };

/**
 * Les trois étapes de la méthode — textes dans `sustainability.steps.<id>`.
 * `cta: undefined` explicite sur les deux premières — voir la note sur
 * `WHY_SUSTAINABILITY_CARDS`.
 */
export const SUSTAINABILITY_STEPS = [
  { id: 'measure', image: '/hero/9.jpg', cta: undefined },
  { id: 'decide', image: '/hero/8.jpg', cta: undefined },
  { id: 'prove', image: '/hero/7.jpg', cta: true },
] as const satisfies readonly SustainabilityStep[];

/** Puces de chaque étape, dans l'ordre d'affichage — textes dans `sustainability.steps.<step>.bullets.<id>`. */
export const SUSTAINABILITY_STEP_BULLETS = {
  measure: ['satellite', 'sensors', 'fieldLog'],
  decide: ['irrigationPlan', 'earlyAlert', 'targeted'],
  prove: ['report', 'traceability'],
} as const satisfies Record<SustainabilityStep['id'], readonly string[]>;

/** Bandeau de résultats chiffrés qui clôt la méthode — textes dans `sustainability.steps.results.<id>`. */
export const SUSTAINABILITY_RESULTS = ['water', 'inputs', 'yield'] as const;

/**
 * Pourquoi la durabilité — textes dans `sustainability.why.cards.<id>`.
 * `tone: undefined` sur les deux éléments qui n'en ont pas : `as const` sur un
 * tableau où le champ serait simplement absent créerait un type par élément
 * (`id` littéral, mais `tone` inaccessible sur les deux qui l'omettent) —
 * l'écrire explicitement garde à la fois `id` littéral (utile pour indexer le
 * dictionnaire) et `tone` accessible uniformément lors du `.map()`.
 */
export const WHY_SUSTAINABILITY_CARDS = [
  { id: 'water', icon: Droplet, tone: undefined },
  { id: 'soil', icon: Layers, tone: 'ocre' },
  { id: 'footprint', icon: Globe, tone: undefined },
  { id: 'climate', icon: Sun, tone: 'ocre' },
] as const satisfies readonly FeatureItem[];

/** Parcours en cinq étapes — textes dans `sustainability.approach.steps.<id>`. */
export const APPROACH_STEPS = [
  { id: 'observe' },
  { id: 'understand' },
  { id: 'anticipate' },
  { id: 'act' },
  { id: 'measure' },
] as const satisfies readonly Step[];

/** Une brique technologique de la grille (§4) — la dernière est mise en avant. */
type TechnologyItem = { id: string; icon: LucideIcon; featured?: boolean };

/**
 * Les quatre technologies — textes dans `sustainability.technology.items.<id>`.
 * `featured: undefined` explicite sur les trois premières — voir la note sur
 * `WHY_SUSTAINABILITY_CARDS`.
 */
export const TECHNOLOGY_ITEMS = [
  { id: 'satellite', icon: Satellite, featured: undefined },
  { id: 'drone', icon: Radar, featured: undefined },
  { id: 'iot', icon: Wifi, featured: undefined },
  { id: 'ai', icon: Cpu, featured: true },
] as const satisfies readonly TechnologyItem[];

/** Étape de la chaîne de décision pour l'eau (§5) — la dernière ferme la boucle. */
type WaterStep = { id: string; featured?: boolean };

/** Chaîne de décision pour l'eau — textes dans `sustainability.water.steps.<id>`. */
export const WATER_STEPS = [
  { id: 'available', featured: undefined },
  { id: 'need', featured: undefined },
  { id: 'analysis', featured: undefined },
  { id: 'irrigation', featured: true },
] as const satisfies readonly WaterStep[];

/** Ce que suit RoboCare sur les sols — textes dans `sustainability.soil.checks.<id>`. */
export const SOIL_CHECKS = ['health', 'resources', 'interventions'] as const;

/** Biodiversité — textes dans `sustainability.biodiversity.cards.<id>`. */
export const BIODIVERSITY_CARDS = [
  { id: 'biodiversity', icon: Leaf },
  { id: 'resources', icon: Recycle },
  { id: 'ecosystems', icon: TreePine },
] as const satisfies readonly FeatureItem[];

/** Ce qu'une agriculture plus précise peut réduire — textes dans `sustainability.footprint.list.<id>`. */
export const FOOTPRINT_LIST = ['travel', 'consumption', 'interventions', 'inputs', 'energy'] as const;

/**
 * Jalons du cycle d'optimisation, positionnés autour du cercle SVG.
 * `angle` est en degrés, 0° pointant vers le haut, sens horaire — les mêmes
 * coordonnées pilotent le point et son étiquette dans `FootprintSection`.
 */
export const FOOTPRINT_CYCLE = [
  { id: 'observe', angle: 0 },
  { id: 'analyze', angle: 72 },
  { id: 'optimize', angle: 144 },
  { id: 'reduce', angle: 216 },
  { id: 'preserve', angle: 288 },
] as const;

/** Acteurs de la chaîne de valeur — textes dans `sustainability.valueChain.cards.<id>`. */
export const VALUE_CHAIN_CARDS = [
  { id: 'farmers', icon: Users },
  { id: 'agrifood', icon: Factory },
  { id: 'advisors', icon: Compass },
  { id: 'territories', icon: Globe },
] as const satisfies readonly FeatureItem[];

/**
 * Indicateurs d'impact — libellés, suffixe compact et unité dans
 * `sustainability.dashboard.metrics.<id>` : l'unité change d'écriture selon
 * la langue (« tonnes », « t », « طن »). Une valeur `undefined` fait afficher
 * `--` sans animation par `SustainabilityMetric`. Le CO₂ est une estimation
 * prudente limitée à l'énergie de pompage évitée (847 000 m³ × ~0,5 kWh/m³
 * × ~0,46 kg CO₂/kWh ≈ 195 t). Les grands nombres passent par un suffixe
 * compact (« k », « ألف ») pour tenir dans une tuile sur cinq colonnes.
 * `value`/`prefix`/`grouped` sont explicités partout (même absents) pour
 * rester accessibles uniformément lors du `.map()`.
 */
export const IMPACT_METRICS = [
  { id: 'co2', icon: Cloud, value: 200, prefix: '+', grouped: undefined },
  { id: 'water', icon: Droplet, value: 847, prefix: undefined, grouped: undefined },
  { id: 'surface', icon: Map, value: 100, prefix: '+', grouped: undefined },
  { id: 'parcels', icon: Grid3x3, value: 7000, prefix: '+', grouped: true },
  { id: 'farmers', icon: Users, value: 300, prefix: '+', grouped: undefined },
] as const satisfies readonly ImpactMetricDatum[];

/** Carte de l'écosystème agricole (§11) — la dernière est mise en avant sur fond sombre. */
type EcosystemCard = { id: string; featured?: boolean };

/** Cartes de l'écosystème agricole — textes dans `sustainability.ecosystem.cards.<id>`. */
export const ECOSYSTEM_CARDS = [
  { id: 'soil', featured: undefined },
  { id: 'water', featured: undefined },
  { id: 'biodiversity', featured: undefined },
  { id: 'climate', featured: undefined },
  { id: 'ecosystems', featured: true },
] as const satisfies readonly EcosystemCard[];

/** Chaîne « de la donnée à l'impact » — libellés dans `sustainability.dataToImpact.chain.<id>`. */
export const DATA_TO_IMPACT_CHAIN = [
  'satellite',
  'observation',
  'data',
  'analysis',
  'recommendation',
  'decision',
  'action',
  'impact',
] as const;

/** Trois piliers de résilience — textes dans `sustainability.resilience.cards.<id>`. */
export const RESILIENCE_CARDS = [
  { id: 'anticipate', image: '/hero/x.jpg' },
  { id: 'optimize', image: '/hero/y.jpg' },
  { id: 'preserve', image: '/hero/z.jpg' },
] as const;
