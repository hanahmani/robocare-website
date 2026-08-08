import { Compass, GraduationCap, Lightbulb, ListChecks } from 'lucide-react';
import type { FeatureItem, MediaItem, Member, Milestone, Partner } from '@/types';

/** Frise « Notre histoire » — textes dans `about.milestones.<id>`. */
export const MILESTONES = [
  { id: 'y2021', year: '2021' },
  { id: 'y2022', year: '2022' },
  { id: 'y2023', year: '2023' },
  { id: 'y2024', year: '2024' },
  { id: 'y2025', year: '2025', highlight: true },
] as const satisfies readonly Milestone[];

/** Valeurs — textes dans `about.values.items.<id>`. */
export const VALUES = ['useful', 'field', 'language', 'sobriety'] as const;

/** Équipe — noms et rôles dans `about.team.members.<id>`. */
export const TEAM = [
  { id: 'ceo', group: 'leadership', placeholder: true },
  { id: 'cto', group: 'leadership', placeholder: true },
  { id: 'po', group: 'leadership' },
  { id: 'backend', group: 'engineering', placeholder: true },
  { id: 'frontend', group: 'engineering', placeholder: true },
  { id: 'data', group: 'engineering', placeholder: true },
  { id: 'iot', group: 'engineering', placeholder: true },
  { id: 'olive', group: 'agronomy', placeholder: true },
  { id: 'cereal', group: 'agronomy', placeholder: true },
  { id: 'field', group: 'agronomy', placeholder: true },
] as const satisfies readonly Member[];

export const TEAM_GROUPS = ['leadership', 'engineering', 'agronomy'] as const;

/** Partenaires — noms dans `about.partners.items.<id>`. */
export const PARTNERS = [
  { id: 'olive-coop', category: 'agriculture' },
  { id: 'cereal-group', category: 'agriculture' },
  { id: 'farm-estates', category: 'agriculture' },
  { id: 'citrus-union', category: 'agriculture' },
  { id: 'cloud', category: 'technology' },
  { id: 'satellite-data', category: 'technology' },
  { id: 'iot-networks', category: 'technology' },
  { id: 'telecom', category: 'technology' },
  { id: 'inrat', category: 'research' },
  { id: 'inat', category: 'research' },
  { id: 'crda', category: 'research' },
  { id: 'iit', category: 'research' },
] as const satisfies readonly Partner[];

export const PARTNER_GROUPS = ['agriculture', 'technology', 'research'] as const;

/** Prix — textes dans `about.awards.items.<id>`. */
export const AWARDS = ['national-innovation', 'best-agritech', 'sustainable'] as const;

/** Programmes — textes dans `about.awards.programs.<id>`. */
export const PROGRAMS = ['accelerator', 'green', 'startup-act'] as const;

/** Retombées presse — textes dans `about.media.items.<id>`. */
export const MEDIA = [
  { id: 'irrigation', tone: 'leaf' },
  { id: 'hectares', tone: 'leaf' },
  { id: 'tv', tone: 'ocre' },
  { id: 'drought', tone: 'muted' },
  { id: 'interview', tone: 'ocre' },
  { id: 'maghreb', tone: 'leaf' },
] as const satisfies readonly MediaItem[];

/** Ressources — textes dans `about.resources.items.<id>`. */
export const RESOURCES = [
  'deficit-irrigation',
  'read-ndvi',
  'remote-sensing',
  'traceability',
  'import-fields',
  'report-template',
] as const;

/** FAQ de la page Contact — textes dans `contact.faq.items.<id>`. */
export const CONTACT_FAQ = [
  'hardware',
  'pricing',
  'delay',
  'integration',
  'security',
  'languages',
  'coverage',
  'tunisiaBase',
  'regionalFit',
] as const;

/** Approche et méthodologie — textes dans `about.approach.items.<id>`. */
export const ABOUT_APPROACH = [
  { id: 'approach', icon: Compass },
  { id: 'method', icon: ListChecks },
  { id: 'expertise', icon: GraduationCap, tone: 'ocre' },
  { id: 'innovation', icon: Lightbulb, tone: 'ocre' },
] as const satisfies readonly FeatureItem[];

/** Arguments « pourquoi nous » — textes dans `about.approach.whyUs.items.<id>`. */
export const ABOUT_WHY_US = [
  'local',
  'agronomy',
  'languages',
  'noLockIn',
  'measurable',
] as const;

/** Étapes d'une démonstration — textes dans `contact.demo.steps.<id>`. */
export const CONTACT_DEMO_STEPS = ['request', 'prep', 'demo', 'trial'] as const;
