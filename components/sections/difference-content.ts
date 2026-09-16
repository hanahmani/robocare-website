/** Un des trois métiers du diagramme d'intersection. */
export type ZoneId = 'agro' | 'data' | 'tech';

/** `core` = le recouvrement des trois métiers (état par défaut). */
export type StateId = ZoneId | 'core';

export type ZonePoint = {
  title: string;
  text: string;
};

export type ZoneState = {
  eyebrow: string;
  title: string;
  paragraph: string;
  points: ZonePoint[];
};

export type ZoneLabel = {
  /** Libellé principal superposé sur le disque (« Agronomie »…) et de la pastille sous la figure. */
  label: string;
  /** Sous-titre court, sous le libellé principal. */
  sublabel: string;
};

export type ResultItem = {
  label: string;
  text: string;
};

/** Contenu complet reçu par `DifferenceVenn` via la prop `zones`. */
export type DifferenceContent = {
  states: Record<StateId, ZoneState>;
  labels: Record<ZoneId, ZoneLabel>;
  corePillLabel: string;
  coreDiskLabel: string;
  results: ResultItem[];
};

/** Valeurs FR par défaut — permettent de tester le composant seul. */
export const DEFAULT_DIFFERENCE_CONTENT: DifferenceContent = {
  corePillLabel: 'Le recouvrement',
  coreDiskLabel: 'RoboCare',
  labels: {
    agro: { label: 'Agronomie', sublabel: 'Expertise terrain' },
    data: { label: 'Data science', sublabel: 'Data science' },
    tech: { label: 'Technologie', sublabel: 'Ingénierie produit' },
  },
  states: {
    core: {
      eyebrow: 'Le recouvrement',
      title: 'Trois métiers, une seule décision',
      paragraph:
        "Notre force vient de l'intégration de l'agronomie, de la data science et de technologies de pointe : chaque paire de métiers produit quelque chose qu'aucun des deux ne produit seul.",
      points: [
        {
          title: 'Agronomie × Data science',
          text: 'Des seuils calibrés sur des séries tunisiennes, au lieu de seuils importés.',
        },
        {
          title: 'Data science × Technologie',
          text: 'Une alerte automatique dans les 24 h qui suivent le passage satellite.',
        },
        {
          title: 'Agronomie × Technologie',
          text: 'Une consigne lisible par le chef de culture comme par l\'ouvrier.',
        },
      ],
    },
    agro: {
      eyebrow: 'Agronomie',
      title: "Savoir ce qu'un chiffre veut dire sur une parcelle",
      paragraph:
        "L'expertise de terrain qui donne un sens agronomique à chaque mesure, avant toute décision.",
      points: [
        {
          title: 'Itinéraires locaux',
          text: 'Olivier conduit en sec, céréales pluviales, maraîchage sous abri.',
        },
        {
          title: "Seuils d'intervention",
          text: 'À partir de quel écart une action se justifie économiquement.',
        },
        {
          title: 'Lecture du symptôme',
          text: "Distinguer un stress hydrique d'une carence.",
        },
      ],
    },
    data: {
      eyebrow: 'Data science',
      title: 'Séparer le signal du bruit propre à la parcelle',
      paragraph:
        'Des modèles entraînés sur le terrain tunisien, qui distinguent une vraie anomalie du bruit de mesure.',
      points: [
        {
          title: 'Indices par zone',
          text: 'NDVI, NDRE, NDWI, SAVI — jamais en moyenne de parcelle.',
        },
        {
          title: 'Séries locales',
          text: "Entraînement sur l'historique tunisien, ré-entraînement chaque saison.",
        },
        {
          title: "Détection d'écart",
          text: 'Alerte au-delà du bruit mesuré, pas sur un seuil fixe.',
        },
      ],
    },
    tech: {
      eyebrow: 'Technologie',
      title: 'Mesurer en continu et faire arriver la consigne',
      paragraph:
        "L'ingénierie qui relie la mesure de terrain à la personne qui doit agir, sans perdre de temps.",
      points: [
        {
          title: 'Trois sources',
          text: 'Satellite tous les 5 jours, capteurs toutes les 15 min, drone à la demande.',
        },
        {
          title: 'Trois canaux',
          text: 'E-mail, SMS, WhatsApp.',
        },
        {
          title: 'Trois langues',
          text: 'FR, EN, AR, rapports exportés inclus.',
        },
      ],
    },
  },
  results: [
    { label: 'Rendement', text: 'Maximisent la productivité des cultures' },
    { label: 'Durabilité', text: 'Renforcent la durabilité grâce à l’agriculture de précision' },
    { label: 'Coûts', text: 'Réduisent les risques et les coûts opérationnels' },
    { label: 'Traçabilité', text: 'Un historique daté et exportable, à chaque étape.' },
  ],
};
