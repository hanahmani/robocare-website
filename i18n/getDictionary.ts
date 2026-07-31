import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, LOCALE_COOKIE, resolveLocale, type Locale } from '@/i18n/config';
import { DICTIONARIES, type Dictionary } from '@/i18n/dictionaries';
import { createTranslator, type Translator } from '@/i18n/translate';

/**
 * ⚠️ Module réservé aux Server Components (il lit les cookies de la requête).
 * Côté client, utiliser `useTranslation()` depuis `@/i18n`.
 */

/** Langue de la requête courante, déduite du cookie posé par le sélecteur. */
export async function getLocale(): Promise<Locale> {
  try {
    const store = await cookies();
    return resolveLocale(store.get(LOCALE_COOKIE)?.value);
  } catch {
    // Contexte statique (sitemap, robots…) : on retombe sur la langue par défaut.
    return DEFAULT_LOCALE;
  }
}

/** Dictionnaire d'une langue donnée — ou de la langue de la requête si omise. */
export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return DICTIONARIES[locale ?? (await getLocale())];
}

/**
 * Raccourci pour les `generateMetadata()` et les Server Components :
 * renvoie la langue, le dictionnaire typé et la fonction `t()`.
 */
export async function getTranslation(locale?: Locale): Promise<{
  locale: Locale;
  d: Dictionary;
  t: Translator;
}> {
  const resolved = locale ?? (await getLocale());
  const d = DICTIONARIES[resolved];
  return { locale: resolved, d, t: createTranslator(resolved) };
}
