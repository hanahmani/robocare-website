import type { Locale } from '@/i18n/config';
import { DICTIONARIES, type Dictionary } from '@/i18n/dictionaries';
import { createTranslator, type Translator } from '@/i18n/translate';

/**
 * ⚠️ Module réservé aux Server Components.
 *
 * La langue vient désormais du segment d'URL `[locale]` (résolu et validé par
 * `app/[locale]/layout.tsx`), plus d'un cookie : aucune lecture de requête ici,
 * ce qui permet à ces pages de rester statiquement générables.
 */

/** Dictionnaire d'une langue donnée. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Raccourci pour les `generateMetadata()` et les Server Components. */
export function getTranslation(locale: Locale): { locale: Locale; d: Dictionary; t: Translator } {
  return { locale, d: DICTIONARIES[locale], t: createTranslator(locale) };
}
