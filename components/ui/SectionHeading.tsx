import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  /** Sur fond sombre : inverse les couleurs de texte. */
  invert?: boolean;
  align?: 'start' | 'between';
  aside?: ReactNode;
  className?: string;
};

/** En-tête de section : étiquette, titre, sous-titre, contenu latéral optionnel. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  invert = false,
  align = 'start',
  aside,
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        align === 'between'
          ? 'flex flex-wrap items-end justify-between gap-6'
          : 'max-w-[44rem]',
        className,
      )}
    >
      <div className={align === 'between' ? 'max-w-[42rem]' : undefined}>
        {eyebrow ? (
          <p className={cn('eyebrow', invert ? 'text-lime-500' : 'text-leaf-600')}>{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            'mt-4 text-[30px] leading-[1.04] sm:text-[38px] lg:text-[52px]',
            invert && 'text-white',
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              'mt-[18px] text-[16px] leading-[1.7] lg:text-[17px]',
              invert ? 'text-white/[0.72]' : 'text-ink-500',
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {aside}
    </Reveal>
  );
}
