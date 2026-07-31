'use client';

import { LOCALES, LOCALE_META, useTranslation, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';

/**
 * Sélecteur FR / EN / AR — design d'origine conservé (pilule bordée).
 * Le clic change langue, direction et contenu sans rechargement de page.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t('a11y.languageGroup')}
      className={cn(
        'items-center gap-0.5 rounded-full border border-forest-950/[0.12] p-[3px]',
        className,
      )}
    >
      {LOCALES.map((code: Locale) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={LOCALE_META[code].htmlLang}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={t('a11y.switchTo', { language: LOCALE_META[code].name })}
            title={LOCALE_META[code].name}
            className={cn(
              'rounded-full px-2.5 py-[5px] font-mono text-[11px] transition-colors duration-[250ms] ease-premium',
              active
                ? 'bg-forest-900 text-lime-100'
                : 'text-ink-400 hover:bg-sage-100 hover:text-leaf-600',
            )}
          >
            {LOCALE_META[code].code}
          </button>
        );
      })}
    </div>
  );
}

/** Variante pleine largeur pour le tiroir mobile. */
export function LanguageSwitcherMobile() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t('a11y.languageGroup')}
      className="mt-2 grid grid-cols-3 gap-1.5 rounded-field border border-forest-950/[0.12] p-1.5"
    >
      {LOCALES.map((code: Locale) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={LOCALE_META[code].htmlLang}
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cn(
              'min-h-11 rounded-[10px] px-3 py-2 text-[14px] font-semibold transition-colors duration-[250ms]',
              active ? 'bg-forest-900 text-lime-100' : 'text-ink-700 hover:bg-sage-100',
            )}
          >
            {LOCALE_META[code].name}
          </button>
        );
      })}
    </div>
  );
}
