'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_META, stripLocale, useTranslation, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';

/**
 * Sélecteur FR / EN / AR — design d'origine conservé (pilule bordée).
 *
 * Chaque option est un vrai lien vers l'équivalent de la page courante dans
 * l'autre langue (`/fr/services` → `/en/services`) : navigable au clavier,
 * suivi par les moteurs, fonctionnel sans JavaScript.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useTranslation();
  const rest = stripLocale(usePathname());

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
          <Link
            key={code}
            href={`/${code}${rest === '/' ? '' : rest}`}
            hrefLang={LOCALE_META[code].htmlLang}
            aria-current={active ? 'true' : undefined}
            aria-label={t('a11y.switchTo', { language: LOCALE_META[code].name })}
            title={LOCALE_META[code].name}
            className={cn(
              'inline-block rounded-full px-2.5 py-[5px] font-mono text-[11px] transition-colors duration-base ease-premium',
              active
                ? 'bg-forest-900 text-lime-100'
                : 'text-ink-400 hover:bg-sage-100 hover:text-leaf-600',
            )}
          >
            {LOCALE_META[code].code}
          </Link>
        );
      })}
    </div>
  );
}

/** Variante pleine largeur pour le tiroir mobile. */
export function LanguageSwitcherMobile() {
  const { locale, t } = useTranslation();
  const rest = stripLocale(usePathname());

  return (
    <div
      role="group"
      aria-label={t('a11y.languageGroup')}
      className="mt-2 grid grid-cols-3 gap-1.5 rounded-field border border-forest-950/[0.12] p-1.5"
    >
      {LOCALES.map((code: Locale) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}${rest === '/' ? '' : rest}`}
            hrefLang={LOCALE_META[code].htmlLang}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'flex min-h-11 items-center justify-center rounded-[10px] px-3 py-2 text-[14px] font-semibold transition-colors duration-base',
              active ? 'bg-forest-900 text-lime-100' : 'text-ink-700 hover:bg-sage-100',
            )}
          >
            {LOCALE_META[code].name}
          </Link>
        );
      })}
    </div>
  );
}
