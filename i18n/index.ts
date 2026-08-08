/**
 * Point d'entrée i18n **côté client**.
 *
 * `getDictionary.ts` n'est volontairement pas réexporté ici : bien qu'il ne
 * lise plus de cookie, il reste le point d'entrée dédié aux Server Components
 * (`import { getTranslation } from '@/i18n/getDictionary'`), pour garder une
 * frontière claire entre code serveur et code client.
 */

export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  getDirection,
  isLocale,
  isRtlLocale,
  localizePath,
  resolveLocale,
  stripLocale,
  type Direction,
  type Locale,
} from '@/i18n/config';

export { DICTIONARIES, type Dictionary } from '@/i18n/dictionaries';
export { createTranslator, type TranslationVars, type Translator } from '@/i18n/translate';
export { I18nProvider, useDirection, useTranslation } from '@/i18n/provider';
