'use client';

import { cn, pad2 } from '@/lib/utils';

type Props = {
  index: number;
  last: boolean;
  title: string;
  text: string;
};

/** Une étape du pipeline technique — pastille numérotée posée sur le filet de liaison. */
export function PipelineStep({ index, last, title, text }: Props) {
  return (
    <div className={cn('group relative flex gap-5 sm:gap-7', last ? 'pb-0' : 'pb-8 lg:pb-10')}>
      <div className="flex flex-col items-center">
        <span
          dir="ltr"
          className="glass inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-lime-500/30 font-mono text-[11px] tracking-[0.1em] text-lime-500 tabular-nums transition-colors duration-300 ease-premium group-hover:border-lime-500/60 group-hover:bg-white/[0.12]"
        >
          {pad2(index)}
        </span>
        {!last ? (
          <span
            aria-hidden
            className="mt-1 w-px flex-1 bg-lime-500/20 transition-colors duration-300 ease-premium group-hover:bg-lime-500/50"
          />
        ) : null}
      </div>

      <div className="max-w-[62ch] pt-1">
        <h3 className="text-[20px] text-white lg:text-[22px]">{title}</h3>
        <p className="mt-3 text-[15px] leading-[1.75] text-white/70">{text}</p>
      </div>
    </div>
  );
}
