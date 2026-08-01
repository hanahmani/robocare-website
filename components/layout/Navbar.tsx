'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { NAV_ITEMS, SITE } from '@/lib/data/site';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { ButtonExternal } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { LanguageSwitcher, LanguageSwitcherMobile } from '@/components/layout/LanguageSwitcher';

/** Barre de navigation : sticky, glassmorphism, lien actif, menu mobile. */
export function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  // Referme le tiroir à chaque changement de route.
  useEffect(() => setOpen(false), [pathname]);

  // Bloque le défilement d'arrière-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-forest-950/[0.07] bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="container-page flex items-center gap-7 py-3.5">
        <Link href="/" className="flex shrink-0 items-center" aria-label={t('a11y.homeLink')}>
          <Image
            src="/brand/logo-robocare.png"
            alt={t('common.logoAlt')}
            width={160}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation desktop / laptop */}
        <nav aria-label={t('a11y.mainNav')} className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-3 py-2 text-[14.5px] font-semibold transition-all duration-[250ms] ease-premium',
                  active
                    ? 'bg-sage-100 text-leaf-600'
                    : 'text-ink-700 hover:bg-sage-100 hover:text-leaf-600',
                )}
              >
                {t(`nav.${item.key}`)}
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest-950/[0.12] text-forest-900 transition-colors hover:bg-sage-50 lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
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
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-forest-950/[0.07] bg-white lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'block rounded-field px-4 py-3.5 text-[15.5px] font-semibold transition-colors',
                      isActive(item.href)
                        ? 'bg-sage-100 text-leaf-600'
                        : 'text-ink-700 hover:bg-sage-50',
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </motion.div>
              ))}

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
