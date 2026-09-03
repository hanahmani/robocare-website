'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { localizePath, stripLocale, useTranslation } from '@/i18n';
import { NAV_ITEMS, SITE } from '@/lib/data/site';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { ButtonExternal } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { LanguageSwitcher, LanguageSwitcherMobile } from '@/components/layout/LanguageSwitcher';

/** Au-delà de ce défilement, la barre passe en mode « condensé ». */
const CONDENSE_AT = 12;

/** Barre de navigation : sticky, glassmorphism, lien actif, menu mobile. */
export function Navbar() {
  const pathname = usePathname();
  const { locale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  // Chemin courant sans préfixe de langue, pour comparer aux `href` de NAV_ITEMS.
  const currentPath = stripLocale(pathname);

  /*
   * État condensé au défilement. `useMotionValueEvent` lit la valeur de
   * défilement déjà suivie par framer (listener passif, mesurée une fois par
   * frame) : pas de second écouteur `scroll`, et `setCondensed` ne déclenche un
   * rendu qu'au franchissement du seuil, pas à chaque pixel.
   */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (value) => {
    setCondensed(value > CONDENSE_AT);
  });

  // Referme le tiroir à chaque changement de route.
  useEffect(() => setOpen(false), [pathname]);

  // Bloque le défilement d'arrière-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Échap referme le tiroir : attendu de tout composant qui masque la page.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  return (
    <header
      data-condensed={condensed}
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-slow ease-premium',
        'border-b backdrop-blur-xl backdrop-saturate-150',
        // Au repos la barre se fond dans la page ; dès le premier défilement
        // elle s'opacifie et se détache par une ombre, pour rester lisible
        // au-dessus de n'importe quelle section.
        condensed
          ? 'border-forest-950/[0.09] bg-white/[0.92] shadow-[0_10px_30px_-24px_rgba(6,18,12,.55)]'
          : 'border-transparent bg-white/80',
      )}
    >
      <div
        className={cn(
          'container-page flex items-center gap-7 transition-[padding] duration-slow ease-premium',
          condensed ? 'py-2.5' : 'py-3.5',
        )}
      >
        <Link
          href={localizePath(locale, '/')}
          className="flex shrink-0 items-center rounded-field"
          aria-label={t('a11y.homeLink')}
        >
          <Image
            src="/brand/logo-robocare.png"
            alt={t('common.logoAlt')}
            width={160}
            height={40}
            priority
            className={cn(
              'w-auto transition-[height] duration-slow ease-premium',
              condensed ? 'h-9' : 'h-10',
            )}
          />
        </Link>

        {/* Navigation desktop / laptop */}
        <nav aria-label={t('a11y.mainNav')} className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={localizePath(locale, item.href)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  // `isolate` : sans lui, la pastille en `-z-10` remonterait
                  // jusqu'au contexte d'empilement du header (créé par le
                  // `backdrop-blur`) et disparaîtrait derrière son fond.
                  'group relative isolate whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-semibold',
                  'transition-colors duration-base ease-premium',
                  active ? 'text-leaf-600' : 'text-ink-700 hover:text-leaf-600',
                )}
              >
                {/* La pastille active est un seul élément partagé : `layoutId`
                    la fait glisser d'un onglet à l'autre au lieu de la faire
                    disparaître puis réapparaître. */}
                {active ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-sage-100"
                    transition={{ duration: 0.32, ease: EASE }}
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-sage-100 opacity-0 transition-opacity duration-base ease-premium group-hover:opacity-100"
                  />
                )}
                <span className="relative">{t(`nav.${item.key}`)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2.5 lg:ms-0">
          <LanguageSwitcher className="hidden md:flex" />

          <ButtonExternal
            href={SITE.appLoginUrl}
            variant="outline"
            className="hidden sm:inline-flex"
          >
            {t('actions.login')}
          </ButtonExternal>

          <ButtonExternal
            href={SITE.appRegisterUrl}
            variant="dark"
            className="hidden sm:inline-flex"
          >
            {t('actions.createAccount')}
          </ButtonExternal>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border text-forest-900 lg:hidden',
              'transition-[background-color,border-color,transform] duration-base ease-premium',
              'active:scale-95 active:duration-fast motion-reduce:active:scale-100',
              open
                ? 'border-forest-900 bg-forest-900 text-white'
                : 'border-forest-950/[0.12] hover:border-forest-950/25 hover:bg-sage-50',
            )}
          >
            {/* Rotation croisée entre les deux icônes : la bascule se lit
                comme un même objet qui change d'état. */}
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="inline-flex"
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </motion.span>
          </button>
        </div>
      </div>

      <ScrollProgress />

      {/* Tiroir mobile / tablette */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label={t('a11y.mobileNav')}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-forest-950/[0.07] bg-white lg:hidden"
          >
            {/* Le défilement de la page est verrouillé pendant l'ouverture :
                sans hauteur maximale, un tiroir plus haut que l'écran
                deviendrait inatteignable sur les petits téléphones. */}
            <div className="container-page flex max-h-[calc(100svh-5rem)] flex-col gap-1 overflow-y-auto py-4">
              {NAV_ITEMS.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.035 * index, duration: 0.28, ease: EASE }}
                  >
                    <Link
                      href={localizePath(locale, item.href)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-field px-4 py-3.5 text-[15.5px] font-semibold',
                        'transition-colors duration-base ease-premium active:bg-sage-200',
                        active ? 'bg-sage-100 text-leaf-600' : 'text-ink-700 hover:bg-sage-50',
                      )}
                    >
                      {t(`nav.${item.key}`)}
                      {/* Repère visuel de la page courante, en plus de la
                          couleur : le contraste seul ne suffit pas. */}
                      {active ? (
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
                      ) : null}
                    </Link>
                  </motion.div>
                );
              })}

              <LanguageSwitcherMobile />

              <RequestDemoButton
                variant="primary"
                size="lg"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              />
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
