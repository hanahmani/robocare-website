'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Mosaïque de parcelles (11 polygones irréguliers, arêtes partagées) sur une
 * grille jitterée déterministe — coordonnées précalculées, pas de hasard au
 * rendu (évite tout écart serveur/client).
 */
const PARCELS: { points: string; fill: string }[] = [
  { points: '0,0 121.6,0 103.5,77.9 0,79.8', fill: '#3F9C4A' },
  { points: '121.6,0 217.8,0 205.4,52 103.5,77.9', fill: '#2F7D3A' },
  { points: '217.8,0 325.7,0 311.4,80.2 205.4,52', fill: '#8CC79B' },
  { points: '325.7,0 400,0 400,77.5 311.4,80.2', fill: '#3F9C4A' },
  { points: '0,79.8 103.5,77.9 113.5,156 0,131.7', fill: '#2F7D3A' },
  { points: '103.5,77.9 205.4,52 311.4,80.2 282.2,124.5 227.6,154 113.5,156', fill: '#E0A44A' },
  { points: '311.4,80.2 400,77.5 400,144.7 282.2,124.5', fill: '#3F9C4A' },
  { points: '0,131.7 113.5,156 118.6,208 0,208', fill: '#8CC79B' },
  { points: '113.5,156 227.6,154 181.1,208 118.6,208', fill: '#2F7D3A' },
  { points: '227.6,154 282.2,124.5 296.7,208 181.1,208', fill: '#C9E4D0' },
  { points: '282.2,124.5 400,144.7 400,208 296.7,208', fill: '#3F9C4A' },
];

/** Centre approximatif de la parcelle en stress (polygone ambre ci-dessus). */
const STRESS_MARKER = { x: 207, y: 107 };

const LEGEND = [
  { label: 'Faible', color: '#C9E4D0' },
  { label: 'Moyen', color: '#8CC79B' },
  { label: 'Vigoureux', color: '#2F7D3A' },
  { label: 'Stress', color: '#E0A44A' },
] as const;

/** Fenêtre applicative : carte de parcelles, KPI et courbe NDVI (aperçu plateforme, page d'accueil). */
export function AppWindow() {
  const { d } = useTranslation();
  const kpis = ['area', 'alerts', 'lastPass'] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="overflow-hidden rounded-3xl border border-[#0C1A12]/[0.06] bg-white shadow-[0_1px_2px_rgba(16,40,26,.04),0_24px_60px_-20px_rgba(16,40,26,.14)]"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9AA8A0]">Domaine</p>
            <p className="mt-1 text-[15px] font-semibold text-[#0C1A12]">{d.appWindow.title}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F7F2] px-3 py-1.5 text-[12px] font-medium text-[#2F7D3A]">
            <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-[#3F9C4A]" />
            À jour
          </span>
        </div>

        <div dir="ltr" className="mt-4 flex gap-1.5">
          <span className="rounded-[10px] bg-[#0C1A12] px-3.5 py-1.5 text-[12.5px] font-medium text-white">NDVI</span>
          <span className="rounded-[10px] bg-[#F5F8F6] px-3.5 py-1.5 text-[12.5px] font-medium text-[#7C8C83]">
            NDRE
          </span>
          <span className="rounded-[10px] bg-[#F5F8F6] px-3.5 py-1.5 text-[12.5px] font-medium text-[#7C8C83]">
            H₂O
          </span>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl bg-[#F4F8F5]">
          <svg viewBox="0 0 400 208" className="block h-auto w-full" aria-hidden>
            <defs>
              <radialGradient id="stressHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF6E4" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#FFF6E4" stopOpacity={0} />
              </radialGradient>
            </defs>
            {PARCELS.map((parcel, index) => (
              <motion.polygon
                key={parcel.points}
                points={parcel.points}
                fill={parcel.fill}
                stroke="white"
                strokeWidth={2.5}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.02, ease: 'easeOut' }}
              />
            ))}
            <StressMarker x={STRESS_MARKER.x} y={STRESS_MARKER.y} />
          </svg>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-[0_4px_14px_rgba(16,40,26,.12)]">
            <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#E0A44A]" />
            <span className="text-[12px] font-medium text-[#0C1A12]">Parcelle 17 · stress hydrique</span>
          </div>
        </div>

        <div dir="ltr" className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {LEGEND.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#9AA8A0]"
            >
              <span aria-hidden className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-[#0C1A12]/[0.07]">
          {kpis.map((key) => (
            <div key={key} className="bg-white p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9AA8A0]">
                {d.appWindow.kpis[key].label}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-xl font-semibold tracking-[-0.02em] text-[#0C1A12]">
                {key === 'alerts' ? <PulsingDot /> : null}
                {d.appWindow.kpis[key].value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#0C1A12]/[0.06] bg-[#FCFDFC] p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9AA8A0]">
            {d.appWindow.chart.label}
          </span>
          <span dir="ltr" className="text-base font-semibold text-[#2F7D3A]">
            0,74
          </span>
        </div>
        <NdviCurve />
      </div>
    </motion.div>
  );
}

/** Point du souffle d'alerte : cesse de clignoter si l'utilisateur préfère moins d'animation. */
function PulsingDot() {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#E0A44A]"
      animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/** Marqueur de la parcelle en stress : anneau blanc + halo qui pulse doucement autour. */
function StressMarker({ x, y }: { x: number; y: number }) {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <motion.circle
        cx={x}
        cy={y}
        r={26}
        fill="url(#stressHalo)"
        initial={{ opacity: 0.9, scale: 0.6 }}
        animate={reduced ? undefined : { opacity: [0.9, 0.15, 0.9], scale: [0.6, 1.5, 0.6] }}
        transition={{ duration: 2.4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      >
        <circle cx={x} cy={y} r={6} fill="white" stroke="#E0A44A" strokeWidth={2} />
      </motion.g>
    </>
  );
}

const NDVI_LINE =
  'M8,82 C12.6,80.7 26.4,77 35.6,74.2 C44.8,71.4 54.1,65.8 63.3,65.2 C72.5,64.6 81.7,72.3 90.9,70.8 ' +
  'C100.1,69.3 109.3,59.8 118.5,56.2 C127.7,52.7 137,48.6 146.2,49.5 C155.4,50.4 164.6,62.7 173.8,61.8 ' +
  'C183,60.9 192.3,48.4 201.5,43.9 C210.7,39.4 219.9,37.9 229.1,34.9 C238.3,31.9 247.5,28.9 256.7,25.9 ' +
  'C265.9,22.9 275.2,20 284.4,17 C293.6,14 307.4,9.5 312,8';
const NDVI_AREA = `${NDVI_LINE} L312,82 L8,82 Z`;
const NDVI_DIP = { x: 173.8, y: 61.8 };
const NDVI_END = { x: 312, y: 8 };

/** Série NDVI 12 semaines : tracé qui se dessine au scroll, aire et points en fade juste après. */
function NdviCurve() {
  const reduced = usePrefersReducedMotion();

  return (
    <svg viewBox="0 0 320 90" className="mt-3 block h-[72px] w-full sm:h-20" aria-hidden>
      <defs>
        <linearGradient id="ndviAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3F9C4A" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#3F9C4A" stopOpacity={0} />
        </linearGradient>
      </defs>

      <line x1={8} y1={82} x2={312} y2={82} stroke="#0C1A12" strokeOpacity={0.08} strokeWidth={1} />
      <line
        x1={8}
        y1={45}
        x2={312}
        y2={45}
        stroke="#9AA8A0"
        strokeOpacity={0.3}
        strokeWidth={1}
        strokeDasharray="3 4"
      />

      <motion.path
        d={NDVI_LINE}
        fill="none"
        stroke="#3F9C4A"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={reduced ? undefined : { pathLength: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.3, 0.7, 0.3, 1] }}
      />

      <motion.path
        d={NDVI_AREA}
        fill="url(#ndviAreaGradient)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 1.3, ease: 'easeOut' }}
      />
      <motion.circle
        cx={NDVI_DIP.x}
        cy={NDVI_DIP.y}
        r={3.5}
        fill="#E0A44A"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 1.3, ease: 'easeOut' }}
      />
      <motion.circle
        cx={NDVI_END.x}
        cy={NDVI_END.y}
        r={4}
        fill="#2F7D3A"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 1.3, ease: 'easeOut' }}
      />
    </svg>
  );
}
