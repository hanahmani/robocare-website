import { Stagger, StaggerItem } from '@/components/animations/Stagger';

export type FaqEntry = { question: string; answer: string };

/**
 * Liste de questions fréquentes (libellés déjà traduits par l'appelant).
 * Basée sur <details> : accessible au clavier et ouvrable sans JavaScript.
 *
 * Les entrées apparaissent en cascade plutôt qu'en bloc : la liste se lit de
 * haut en bas, l'entrée doit suivre le même sens.
 */
export function FaqList({ items }: { items: readonly FaqEntry[] }) {
  return (
    <Stagger className="flex flex-col gap-3" stagger={0.06}>
      {items.map((item) => (
        <StaggerItem key={item.question}>
          <details
            className={[
              'group rounded-tile border border-forest-950/[0.08] bg-white p-6 shadow-soft',
              'transition-[border-color,box-shadow,background-color] duration-base ease-premium',
              'hover:border-forest-950/[0.16] hover:shadow-lift',
              'open:border-leaf-500/30 open:shadow-lift',
            ].join(' ')}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[17px] font-semibold text-ink-900 lg:text-[18px]">
              {item.question}
              <span
                aria-hidden
                className="mt-1 shrink-0 text-leaf-600 transition-transform duration-base group-open:rotate-45"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="h-[18px] w-[18px]"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">
              {item.answer}
            </p>
          </details>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
