'use client';

import { StatCounter } from '@/components/ui/StatCounter';
import { Reveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/utils';
import type { StatView } from '@/types';

/** Bandeau de statistiques sur fond sombre (accueil et page Impact). */
export function Statistics({
  stats,
  className,
}: {
  stats: readonly StatView[];
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {stats.map((stat) => (
        <StatCounter key={stat.id} {...stat} />
      ))}
    </Reveal>
  );
}
