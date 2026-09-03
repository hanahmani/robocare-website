'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { PLATFORM_VIEWS } from '@/lib/data/platform';
import { SITE } from '@/lib/data/site';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Sélecteur des vues applicatives (captures réelles). */
export function PlatformShowcase() {
  const { t, d } = useTranslation();
  const copy = d.platform.views;
  const [active, setActive] = useState<(typeof PLATFORM_VIEWS)[number]['id']>(PLATFORM_VIEWS[0].id);
  const view = PLATFORM_VIEWS.find((item) => item.id === active) ?? PLATFORM_VIEWS[0];

  return (
    <>
      <div role="tablist" aria-label={t('a11y.appViews')} className="flex flex-wrap gap-2.5">
        {PLATFORM_VIEWS.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`view-${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                'rounded-chip px-5 py-3.5 text-start transition-surface duration-base ease-premium',
                selected
                  ? 'border border-forest-900 bg-forest-900 text-lime-100 shadow-soft'
                  : 'border border-forest-950/10 bg-white text-ink-700 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-leaf-500/40',
              )}
            >
              <span className="block font-display text-[15px] font-semibold">
                {copy[item.id].tab}
              </span>
              <span className="mt-0.5 block font-mono text-[10.5px] tracking-[0.08em] opacity-70">
                {copy[item.id].field}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`view-${view.id}`}
        role="tabpanel"
        className="mt-5 overflow-hidden rounded-card border border-forest-950/[0.08] bg-white shadow-soft"
      >
        <div className="flex items-center gap-2 border-b border-forest-950/[0.07] bg-sage-50 px-4 py-3">
          <span className="h-[9px] w-[9px] rounded-full bg-forest-950/[0.14]" />
          <span className="h-[9px] w-[9px] rounded-full bg-forest-950/[0.14]" />
          <span className="h-[9px] w-[9px] rounded-full bg-forest-950/[0.14]" />
          <span dir="ltr" className="ms-2.5 font-mono text-[10.5px] text-ink-300">
            {SITE.appHost}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={view.id}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Image
              src={view.image}
              alt={copy[view.id].alt}
              width={view.width}
              height={view.height}
              sizes="(max-width: 1240px) 100vw, 1160px"
              className="block h-auto w-full"
              priority={view.id === PLATFORM_VIEWS[0].id}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        {copy[view.id].highlights.map((highlight) => (
          <motion.div
            key={highlight}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex gap-3 rounded-chip border border-forest-950/[0.07] bg-white px-[18px] py-4 text-[14.5px] leading-[1.6] text-ink-700 transition-surface duration-base hover:-translate-y-1.5 motion-reduce:hover:translate-y-0 hover:shadow-soft"
          >
            <Check size={17} className="mt-[3px] shrink-0 text-leaf-500" aria-hidden />
            {highlight}
          </motion.div>
        ))}
      </div>
    </>
  );
}
