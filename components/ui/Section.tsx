import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'white' | 'sage' | 'cream' | 'dark';

const TONES: Record<Tone, string> = {
  white: 'bg-white text-ink-900',
  sage: 'bg-sage-50 text-ink-900',
  cream: 'bg-cream text-ink-900',
  dark: 'bg-forest-950 text-white',
};

type SectionProps = {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /** Retire le padding vertical haut (sections enchaînées). */
  flushTop?: boolean;
};

/** Bloc de page : gère le fond, le rythme vertical et le conteneur. */
export function Section({
  children,
  tone = 'white',
  id,
  className,
  flushTop = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        TONES[tone],
        flushTop ? 'pb-[72px] lg:pb-[120px]' : 'py-[72px] lg:py-[120px]',
        className,
      )}
    >
      <div className="container-page relative">{children}</div>
    </section>
  );
}

/** Filet dégradé « échelle d'indices », utilisé comme séparateur. */
export function IndexScale({ className }: { className?: string }) {
  return <div aria-hidden className={cn('h-1 w-full bg-index-scale', className)} />;
}
