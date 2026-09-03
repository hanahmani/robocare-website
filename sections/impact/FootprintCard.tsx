import type { LucideIcon } from 'lucide-react';
import { IconChip } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type Tone = 'leaf' | 'ocre';

const TONE: Record<Tone, { border: string }> = {
  leaf: { border: 'hover:border-leaf-600/30' },
  ocre: { border: 'hover:border-ocre-600/30' },
};

type Props = {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  text: string;
};

/** Une des quatre cartes « ce que cela change pour la ressource ». */
export function FootprintCard({ icon: Icon, tone, title, text }: Props) {
  const palette = TONE[tone];

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-tile border border-forest-950/[0.08] bg-white p-6 shadow-soft transition-surface duration-slow ease-premium hover:-translate-y-1.5 hover:shadow-hover motion-reduce:hover:translate-y-0 lg:p-7',
        palette.border,
      )}
    >
      <div className="flex items-center gap-3.5">
        <IconChip tone={tone} className="h-10 w-10 shrink-0 lg:h-11 lg:w-11">
          <Icon size={19} aria-hidden />
        </IconChip>
        <h3 className="text-[17px] text-ink-900">{title}</h3>
      </div>
      <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-ink-500">{text}</p>
    </article>
  );
}
