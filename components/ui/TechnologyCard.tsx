import type { LucideIcon } from 'lucide-react';
import { FlowRail } from '@/components/ui/FlowRail';
import { cn } from '@/lib/utils';

type Props = {
  icon: LucideIcon;
  title: string;
  text: string;
  /** Position dans la grille : décale le point du filet pour un effet de cascade. */
  index?: number;
  /** Réservé à la grille des technologies : fond dégradé sombre mis en avant. */
  featured?: boolean;
  /** `dark` : carte verre sur fond sombre (grille technologies). `light` : carte blanche sur fond clair (chaîne de valeur). */
  tone?: 'dark' | 'light';
};

/**
 * Carte reliée à sa voisine par un filet de données animé (`FlowRail`).
 * Réutilisée par la grille des quatre technologies (fond sombre, page
 * Durabilité) et par la chaîne de valeur agroalimentaire (fond clair) —
 * seul `tone` change le chromatisme.
 */
export function TechnologyCard({ icon: Icon, title, text, index = 0, featured = false, tone = 'dark' }: Props) {
  const dark = tone === 'dark';

  return (
    <div className="min-w-0">
      <FlowRail tone={dark ? 'light' : 'dark'} delay={index * 0.4} />
      <div
        className={cn(
          'group mt-[18px] flex h-full flex-col rounded-tile border p-[26px]',
          'transition-[transform,border-color,background-color,box-shadow] duration-slow ease-premium',
          'hover:-translate-y-1.5 motion-reduce:hover:translate-y-0',
          dark
            ? featured
              ? 'border-lime-500/20 bg-[linear-gradient(165deg,#0B2015,#06120C_60%)] shadow-glass hover:border-lime-500/40'
              : 'border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-lime-500/30 hover:bg-white/[0.07]'
            : 'border-forest-950/[0.08] bg-white shadow-soft hover:border-leaf-500/40 hover:shadow-hover',
        )}
      >
        <span
          className={cn(
            'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-field border',
            'transition-transform duration-slow ease-premium group-hover:-rotate-3 group-hover:scale-105',
            'motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100',
            dark
              ? featured
                ? 'border-white/10 bg-lime-500/[0.16] text-lime-500'
                : 'border-white/10 bg-lime-500/[0.12] text-lime-400'
              : 'border-transparent bg-sage-100 text-leaf-600',
          )}
        >
          <Icon size={20} aria-hidden />
        </span>
        <h3 className={cn('mt-5 text-[18px]', dark ? 'text-white' : 'text-ink-900')}>{title}</h3>
        <p className={cn('mt-2.5 flex-1 text-[14px] leading-[1.7]', dark ? 'text-white/70' : 'text-ink-500')}>
          {text}
        </p>
      </div>
    </div>
  );
}
