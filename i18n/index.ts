/**
 * Point d'entrée i18n **côté client**.
 *
 * `getDictionary.ts` n'est volontairement pas réexporté ici : il lit les cookies
 * de la requête et doit rester importé directement par les Server Components
 * (`import { getTranslation } from '@/i18n/getDictionary'`).
 */

export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_META,
  LOCALE_STORAGE_KEY,
  getDirection,
  isLocale,
  isRtlLocale,
  resolveLocale,
  type Direction,
  type Locale,
} from '@/i18n/config';

export { DICTIONARIES, type Dictionary } from '@/i18n/dictionaries';
export { createTranslator, type TranslationVars, type Translator } from '@/i18n/translate';
export { I18nProvider, useDirection, useTranslation } from '@/i18n/provider';
