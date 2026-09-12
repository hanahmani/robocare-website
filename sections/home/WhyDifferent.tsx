'use client';

import { Reveal } from '@/components/animations/Reveal';
import { Section } from '@/components/ui/Section';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';
import { DifferenceVenn } from '@/components/sections/DifferenceVenn';
import { DEFAULT_DIFFERENCE_CONTENT } from '@/components/sections/difference-content';

/**
 * « En quoi RoboCare est différent » : diagramme d'intersection (agronomie ×
 * data science × technologie) — l'ancienne orbite montrait une hiérarchie,
 * alors que le propos est une intersection.
 */
export function WhyDifferent() {
  const { t, d } = useTranslation();
  const items = d.home.different.items;
  const results = DEFAULT_DIFFERENCE_CONTENT.results.map((result, index) => ({
    ...result,
    // Réutilise les textes existants (productivité, durabilité, coûts) — seule
    // « Traçabilité » n'a pas d'équivalent dans l'ancienne liste numérotée.
    text: [items.productivity, items.sustainability, items.risk, "Un historique daté et exportable, à chaque étape."][
      index
    ],
  }));

  return (
    <Section>
      <Reveal className="mx-auto max-w-[38rem] text-center">
        <h2 className="text-h2">{t('home.different.title')}</h2>
        <span aria-hidden className="mx-auto mt-5 block h-[2px] w-16 bg-leaf-600" />
      </Reveal>

      <div className="mt-section-gap">
        <DifferenceVenn />
      </div>

      <div className="mt-section-gap grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-0">
        {results.map((result, index) => (
          <div
            key={result.label}
            className={cn(
              'border-t border-[rgba(21,32,26,.12)] px-5 py-6 text-center',
              index > 0 && 'sm:border-s',
            )}
          >
            <p className="text-[15px] font-semibold text-ink-900">{result.label}</p>
            <p className="mt-2.5 text-[13.5px] leading-[1.55] text-ink-500">{result.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
