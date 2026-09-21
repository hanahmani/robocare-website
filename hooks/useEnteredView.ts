'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Passe à `true` la première fois que l'élément entre dans le viewport, et y
 * reste.
 *
 * Pourquoi ne pas utiliser `whileInView` / `useInView` de framer-motion :
 * WebKit (Safari, iOS) ne rapporte jamais d'intersection pour les éléments
 * internes d'un SVG (`<g>`, `<circle>`, `<text>`) — mesuré, le ratio y reste à
 * 0 alors qu'il vaut 1 sur le `<div>` parent. Les figures animées par scroll
 * restaient donc invisibles sur iPhone. Cette version observe un élément HTML
 * avec l'`IntersectionObserver` natif, qui lui est fiable partout, et laisse
 * l'appelant piloter les animations SVG depuis ce seul booléen.
 *
 * `ref` doit pointer vers un élément HTML, jamais vers un nœud SVG.
 */
export function useEnteredView(ref: RefObject<Element | null>, amount = 0.3) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (entered || !el) return;

    // Sans IntersectionObserver, on affiche la figure plutôt que de la cacher.
    if (typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: amount },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, amount, entered]);

  return entered;
}
