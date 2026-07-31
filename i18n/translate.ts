import { DEFAULT_LOCALE, type Locale } from '@/i18n/config';
import { DICTIONARIES } from '@/i18n/dictionaries';

/** Valeurs injectables dans une chaîne : `{year}`, `{count}`… */
export type TranslationVars = Record<string, string | number>;

export type Translator = {
  /** Chaîne simple : `t('nav.home')`. */
  (path: string, vars?: TranslationVars): string;
  /** Liste de chaînes : `t.list('home.platform.points')`. */
  list: (path: string) => string[];
};

function lookup(source: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === 'object' ? (node as Record<string, unknown>)[key] : undefined,
      source,
    );
}

function interpolate(template: string, vars?: TranslationVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/**
 * Construit la fonction `t` d'une langue.
 * Une clé absente retombe sur le français, puis sur la clé elle-même
 * (visible en développement, jamais bloquant en production).
 */
export function createTranslator(locale: Locale): Translator {
  const resolve = (path: string): unknown =>
    lookup(DICTIONARIES[locale], path) ?? lookup(DICTIONARIES[DEFAULT_LOCALE], path);

  const translate = ((path: string, vars?: TranslationVars) => {
    const value = resolve(path);
    if (typeof value === 'string') return interpolate(value, vars);
    if (typeof value === 'number') return String(value);
    return path;
  }) as Translator;

  translate.list = (path: string) => {
    const value = resolve(path);
    return Array.isArray(value) ? value.map(String) : [];
  };

  return translate;
}
