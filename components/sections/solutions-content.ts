export type SolutionId = 'olive' | 'cereal' | 'citrus' | 'greenhouse';

export type SolutionResult = {
  /** Signé — négatif pour une réduction (eau, azote, traitements…). */
  value: number;
  unit: string;
  baseline: string;
};

export type SolutionTabContent = {
  id: SolutionId;
  name: string;
  crop: string;
  lede: string;
  result: SolutionResult;
  tracks: string[];
  outcome: string;
  image: { src: string; alt: string };
};

/** Référence partagée par les quatre résultats — pas de baseline chiffrée par culture dans les données actuelles. */
const BASELINE_NOTE = 'Indicateurs relevés sur les exploitations partenaires — détail dans les études de cas.';

/**
 * Sépare un `metric` traduit (« −28 % d'eau », « −28% water », « −28 % من الماء »)
 * en valeur numérique signée + unité, pour le compteur animé. Les trois locales
 * du site suivent toutes le motif `<signe><nombre> % <unité>`.
 */
export function parseMetric(metric: string): { value: number; unit: string } {
  const match = metric.match(/^([−+-]?\d+)\s*%\s*(.*)$/u);
  if (!match) return { value: 0, unit: metric };
  const isNegative = match[1].startsWith('−') || match[1].startsWith('-');
  const digits = match[1].replace(/[−+-]/u, '');
  return { value: (isNegative ? -1 : 1) * Number(digits), unit: match[2].trim() };
}

/** Contenu FR par défaut — permet de tester le composant seul, hors page. */
export const DEFAULT_SOLUTIONS: SolutionTabContent[] = [
  {
    id: 'olive',
    name: 'Olive Care',
    crop: 'Oliveraies en sec ou en irrigué : suivi du stress hydrique et de l’alternance.',
    lede: 'L’olivier tolère la sécheresse mais paie l’année suivante. Olive Care suit la vigueur de chaque arbre par imagerie satellite et drone, repère les zones en déficit hydrique avant la nouaison et sécurise le calendrier d’irrigation déficitaire.',
    result: { value: -28, unit: 'd’eau', baseline: BASELINE_NOTE },
    tracks: [
      'Indice de vigueur arbre par arbre et détection des manquants',
      'Suivi du stress hydrique avant floraison et nouaison',
      'Détection précoce de la maladie de l’œil de paon',
      'Prévision de récolte par zone d’oliveraie',
    ],
    outcome: 'Alternance réduite · Irrigation déficitaire maîtrisée · Traitements ciblés au lieu de généralisés',
    image: { src: '/hero/1.webp', alt: 'Oliveraie suivie par imagerie satellite' },
  },
  {
    id: 'cereal',
    name: 'Cereal Care',
    crop: 'Blé dur et orge : pilotage de l’azote et prévision de rendement.',
    lede: 'Sur céréales, tout se joue entre le tallage et l’épiaison. Cereal Care transforme l’indice NDRE en carte de modulation azotée, suit la levée, et donne une estimation de rendement par zone plusieurs semaines avant la moisson.',
    result: { value: -19, unit: 'd’azote', baseline: BASELINE_NOTE },
    tracks: [
      'Carte de modulation azotée à partir du NDRE',
      'Contrôle de levée et de densité après semis',
      'Détection des zones de verse et de stress hydrique',
      'Estimation de rendement par zone homogène',
    ],
    outcome: 'Azote apporté là où il est utile · Resemis décidé à temps · Logistique de moisson anticipée',
    image: { src: '/hero/2.webp', alt: 'Parcelle de céréales suivie par NDRE' },
  },
  {
    id: 'citrus',
    name: 'Citrus Care',
    crop: 'Agrumes : salinité, irrigation goutte-à-goutte et calibre des fruits.',
    lede: 'Les agrumes réagissent vite à un excès de sel et à une irrigation mal répartie. Citrus Care croise capteurs de sol, conductivité et imagerie pour ajuster les tours d’eau, secteur par secteur, jusqu’au calibre visé à la récolte.',
    result: { value: -21, unit: 'd’eau', baseline: BASELINE_NOTE },
    tracks: [
      'Suivi de la salinité et de la conductivité du sol',
      'Contrôle d’homogénéité du goutte-à-goutte',
      'Alerte de stress avant chute physiologique des fruits',
      'Suivi de la vigueur par secteur d’irrigation',
    ],
    outcome: 'Calibre plus homogène · Moins de fruits perdus · Réseau d’irrigation contrôlé',
    image: { src: '/hero/3.webp', alt: 'Verger d’agrumes irrigué au goutte-à-goutte' },
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse Care',
    crop: 'Serres : climat, fertirrigation et pression des ravageurs en continu.',
    lede: 'Sous abri, une dérive de température ou d’humidité coûte une semaine de production. Greenhouse Care agrège les capteurs de chaque chapelle, surveille le VPD et déclenche l’alerte avant que la culture ne décroche.',
    result: { value: -24, unit: 'de traitements', baseline: BASELINE_NOTE },
    tracks: [
      'Température, humidité et VPD par chapelle',
      'Suivi de la fertirrigation et de la conductivité',
      'Alerte de pression des ravageurs et maladies',
      'Historique climatique comparé entre cycles',
    ],
    outcome: 'Cycles plus réguliers · Moins de traitements curatifs · Consommation d’énergie maîtrisée',
    image: { src: '/hero/4.webp', alt: 'Cultures sous serre équipées de capteurs' },
  },
];
