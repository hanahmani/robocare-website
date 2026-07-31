import ar from '@/messages/ar.json';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import type { Locale } from '@/i18n/config';

/**
 * Le français fait foi : la forme de `fr.json` définit le contrat.
 * Toute clé manquante ou en trop dans `en.json` / `ar.json` casse le `tsc`.
 */
export type Dictionary = typeof fr;

const FR: Dictionary = fr;
const EN: Dictionary = en;
const AR: Dictionary = ar;

/** Les trois dictionnaires, embarqués dans le bundle pour un switch instantané. */
export const DICTIONARIES: Record<Locale, Dictionary> = {
  fr: FR,
  en: EN,
  ar: AR,
};
