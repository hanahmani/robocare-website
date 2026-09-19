'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { localizePath, useTranslation } from '@/i18n';
import { Arrow } from '@/components/ui/Arrow';
import { SOLUTIONS } from '@/lib/data/solutions';

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Aperçu des quatre solutions, avec renvoi vers la page dédiée. */
export function SolutionsPreview() {
  const { t, d, locale } = useTranslation();
  const items = d.solutions.items;
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? undefined : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section className="bg-white py-[clamp(72px,9vw,120px)]">
      <div className="mx-auto w-[min(1240px,calc(100%-48px))]">
        <motion.div {...rise(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-[26px] bg-[#7D9B70]" />
          <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#3E6B4C]">
            {t('home.solutionsPreview.eyebrow')}
          </p>
        </motion.div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <motion.h2
            {...rise(0.06)}
            className="max-w-[14ch] text-[clamp(30px,4.2vw,50px)] font-bold leading-[1.1] tracking-[-0.03em] text-[#16201B]"
          >
            {t('home.solutionsPreview.title')}
          </motion.h2>

          <motion.div {...rise(0.12)}>
            <Link
              href={localizePath(locale, '/solutions')}
              className="link-underline group inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#3E6B4C] before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']"
            >
              {t('actions.allSolutions')}
              <Arrow size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="mt-[clamp(48px,6vw,76px)] grid grid-cols-1 gap-[clamp(20px,2.4vw,32px)] sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((solution, index) => {
            const copy = items[solution.slug];
            return (
              <motion.div key={solution.slug} {...rise(index * 0.08)}>
                <Link href={localizePath(locale, `/solutions#${solution.slug}`)} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-[#DAD6CC]">
                    <Image
                      src={solution.image}
                      alt={copy.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.045] motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <p className="mt-[18px] font-mono text-[10.5px] tracking-[0.14em] text-[#7D9B70] transition-colors duration-500 group-hover:text-[#3E6B4C]">
                    {copy.brand}
                  </p>
                  <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.015em] text-[#16201B]">
                    {copy.name}
                  </h3>
                  <p className="mt-[9px] text-[14.5px] leading-[1.7] text-[#5C6862]">{copy.short}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
