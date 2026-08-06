'use client';

import { useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Stagger } from '@/components/animations/Stagger';
import { EASE, fadeUp } from '@/lib/motion';
import { useCountUp } from '@/hooks/useCountUp';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';
import type { StatView } from '@/types';

type StatCardData = StatView & { icon: LucideIcon };

/** Bruit fin (SVG turbulence), encodé une seule fois au chargement du module. */
const NOISE_BG = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>",
)}")`;

/** Décalages déterministes des particules (pas de Math.random : évite les écarts SSR/CSR). */
const PARTICLE_SEEDS = [0.12, 0.34, 0.58, 0.71, 0.89];

/**
 * Bandeau de statistiques premium : bento glassmorphique, halo qui suit la souris,
 * inclinaison 3D des cartes et bordure animée au survol. Réservé à l'accueil —
 * la page Impact garde `<Statistics>` (grille plus dense, huit indicateurs).
 */
export function StatsShowcase({
  stats,
  className,
}: {
  stats: readonly StatCardData[];
  className?: string;
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 40, damping: 22 });
  const springY = useSpring(my, { stiffness: 40, damping: 22 });

  function handlePointerMove(event: ReactMouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  }

  return (
    <div className={cn('relative', className)} onMouseMove={handlePointerMove}>
      <AmbientBackground x={springX} y={springY} />

      <Stagger
        stagger={0.09}
        className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-4"
      >
        {stats.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </Stagger>
    </div>
  );
}

/** Mesh sombre : halos flottants, trame animée et grain, tous derrière la grille. */
function AmbientBackground({
  x,
  y,
}: {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  const spotlightX = useTransform(x, (v) => `${v * 100}%`);
  const spotlightY = useTransform(y, (v) => `${v * 100}%`);

  return (
    <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-20 -z-10 overflow-hidden">
      <div className="absolute -left-[10%] top-0 h-[360px] w-[360px] animate-floaty rounded-full bg-[radial-gradient(circle,rgba(158,216,75,.16),transparent_70%)] blur-3xl" />
      <div className="absolute -right-[8%] bottom-0 h-[420px] w-[420px] animate-floaty-alt rounded-full bg-[radial-gradient(circle,rgba(31,128,73,.22),transparent_70%)] blur-3xl" />
      <motion.div
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(158,216,75,.10),transparent_72%)] blur-2xl"
        style={{ left: spotlightX, top: spotlightY }}
      />
      <div className="grid-overlay animate-grid-pan absolute inset-0 opacity-40" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: NOISE_BG }} />
    </div>
  );
}

function StatCard({ stat, index }: { stat: StatCardData; index: number }) {
  const { t } = useTranslation();
  const separator = stat.grouped ? t('common.thousandsSeparator') : '';

  const { ref: countRef, display } = useCountUp<HTMLDivElement>({
    target: stat.value,
    prefix: stat.prefix,
    suffix: stat.suffix,
    separator,
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 240, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 240, damping: 22 });

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 8);
    rotateX.set((0.5 - py) * 8);
    node.style.setProperty('--mx', `${px * 100}%`);
    node.style.setProperty('--my', `${py * 100}%`);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const Icon = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 900 }}
      className="group relative rounded-[22px] p-px transition-shadow duration-[400ms] ease-premium hover:shadow-lime motion-reduce:!transform-none"
    >
      {/* Bordure dégradée animée : masquée au repos, révélée par le padding de 1px. */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[22px] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,rgba(158,216,75,.65)_10%,transparent_26%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative h-full overflow-hidden rounded-[21px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5">
        {/* Trait d'accent en haut, révélé au survol */}
        <span
          aria-hidden
          className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-lime-500/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Dégradé radial décoratif propre à la carte */}
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(158,216,75,.12),transparent_60%)]"
        />
        {/* Halo qui suit le curseur */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(158,216,75,.16), transparent 70%)',
          }}
        />
        <CardParticles seed={index} />

        <div className="relative flex h-full flex-col">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lime-400 transition-transform duration-[400ms] ease-premium group-hover:-rotate-6 group-hover:scale-110">
            <Icon size={16} aria-hidden />
          </span>

          <div
            ref={countRef}
            dir="ltr"
            className={cn(
              'mt-4 whitespace-nowrap font-display font-semibold leading-none tracking-display tabular-nums rtl:text-right',
              stat.featured ? 'text-[26px] text-lime-400 sm:text-[30px]' : 'text-[24px] text-white sm:text-[28px]',
            )}
          >
            {display}
          </div>
          <div className="mt-2.5 font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/55">
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Particules ambiantes, positions dérivées d'une graine fixe (déterministe, sans dépendance). */
function CardParticles({ seed }: { seed: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLE_SEEDS.map((value, i) => {
        const left = `${((value * 137 + seed * 23) % 88) + 6}%`;
        const top = `${((value * 71 + seed * 41) % 78) + 8}%`;
        const delay = ((i + seed) % 5) * 0.5;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-lime-400/40"
            style={{ left, top }}
            animate={{ y: [0, -10, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
          />
        );
      })}
    </div>
  );
}
