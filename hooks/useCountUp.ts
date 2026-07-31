'use client';

import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '@/lib/utils';

type Options = {
  target: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
};

/**
 * Compteur qui s'incrémente lorsque l'élément entre dans le viewport.
 * Respecte `prefers-reduced-motion` (affiche directement la valeur finale).
 */
export function useCountUp<T extends HTMLElement>({
  target,
  duration = 1400,
  separator = '',
  prefix = '',
  suffix = '',
}: Options) {
  const ref = useRef<T | null>(null);
  const [display, setDisplay] = useState(
    () => `${prefix}${formatNumber(target, separator)}${suffix}`,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let frame = 0;
    setDisplay(`${prefix}${formatNumber(0, separator)}${suffix}`);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${prefix}${formatNumber(target * eased, separator)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, separator, prefix, suffix]);

  return { ref, display };
}
