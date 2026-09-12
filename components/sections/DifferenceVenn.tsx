'use client';

import { useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DEFAULT_DIFFERENCE_CONTENT,
  type DifferenceContent,
  type StateId,
  type ZoneId,
} from '@/components/sections/difference-content';

const ZONE_IDS: readonly ZoneId[] = ['agro', 'data', 'tech'];

/** Rayon des trois disques et centres, en unités du viewBox `0 0 480 430`. */
const RADIUS = 118;
const CIRCLES: Record<ZoneId, { cx: number; cy: number }> = {
  agro: { cx: 240, cy: 143 },
  tech: { cx: 177.6, cy: 251 },
  data: { cx: 302.4, cy: 251 },
};
const CORE = { cx: 240, cy: 215, r: 34 };

/** Position (en %) des libellés HTML superposés — n'est jamais inversée en RTL : la figure ne se miroite pas. */
const LABEL_POSITION: Record<ZoneId, { top: string; left: string }> = {
  agro: { top: '8%', left: '50%' },
  tech: { top: '73%', left: '27%' },
  data: { top: '73%', left: '73%' },
};

const ZONE_FILL_CLASS: Record<ZoneId, string> = {
  agro: 'fill-agro',
  tech: 'fill-tech',
  data: 'fill-data',
};

/** Couleur pleine pour la pastille active — pas de classe construite dynamiquement. */
const PILL_ACTIVE_CLASS: Record<ZoneId, string> = {
  agro: 'border-agro bg-agro text-white',
  tech: 'border-tech bg-tech text-white',
  data: 'border-data bg-data text-white',
};

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

type DifferenceVennProps = {
  zones?: DifferenceContent;
};

/**
 * Diagramme d'intersection (agronomie / data science / technologie) : le
 * disque survolé, cliqué ou focus devient actif et alimente le panneau de
 * droite. Remplace l'ancienne orbite — ce composant montre une intersection,
 * pas une hiérarchie.
 */
export function DifferenceVenn({ zones = DEFAULT_DIFFERENCE_CONTENT }: DifferenceVennProps) {
  const [active, setActive] = useState<StateId>('core');
  const reduced = useReducedMotion();
  const figureRef = useRef<HTMLDivElement>(null);

  const resetToCore = () => setActive('core');

  const handleFigureBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) resetToCore();
  };

  const handleDiskKeyDown = (event: KeyboardEvent, id: StateId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActive(id);
    }
  };

  const state = zones.states[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div
          ref={figureRef}
          onMouseLeave={resetToCore}
          onBlur={handleFigureBlur}
          className="relative isolate mx-auto w-full max-w-[480px]"
        >
          <svg viewBox="0 0 480 430" className="block w-full overflow-visible">
            {ZONE_IDS.map((id, index) => (
              <ZoneDisk
                key={id}
                id={id}
                cx={CIRCLES[id].cx}
                cy={CIRCLES[id].cy}
                active={active === id}
                dimmed={active !== 'core' && active !== id}
                label={zones.labels[id].label}
                entryDelay={index * 0.1}
                reduced={reduced}
                onActivate={() => setActive(id)}
                onKeyDownActivate={(event) => handleDiskKeyDown(event, id)}
              />
            ))}

            {/* Le noyau est dessiné en dernier : en SVG, c'est le dernier élément qui reçoit le pointeur. */}
            <CoreDisk
              active={active === 'core'}
              dimmed={active !== 'core'}
              reduced={reduced}
              label={zones.coreDiskLabel}
              onActivate={resetToCore}
              onKeyDownActivate={(event) => handleDiskKeyDown(event, 'core')}
            />
          </svg>

          {ZONE_IDS.map((id) => (
            <div
              key={id}
              className="pointer-events-none absolute max-w-[18ch] text-balance text-center"
              style={{
                top: LABEL_POSITION[id].top,
                left: LABEL_POSITION[id].left,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <p
                className={cn(
                  'text-[13px] font-semibold uppercase tracking-[0.08em] transition-opacity duration-300',
                  active !== 'core' && active !== id ? 'opacity-45' : 'opacity-100',
                )}
                style={{ color: '#15201A' }}
              >
                {zones.labels[id].label}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6B7280]">
                {zones.labels[id].sublabel}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start">
          {(['agro', 'data', 'tech'] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={active === id}
              onClick={() => setActive(id)}
              className={cn(
                'min-h-11 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-200',
                active === id ? PILL_ACTIVE_CLASS[id] : 'border-[rgba(21,32,26,.12)] text-[#15201A] hover:bg-black/[0.03]',
              )}
            >
              {zones.labels[id].pillLabel}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={active === 'core'}
            onClick={resetToCore}
            className={cn(
              'min-h-11 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-200',
              active === 'core' ? 'border-core bg-core text-white' : 'border-[rgba(21,32,26,.12)] text-[#15201A] hover:bg-black/[0.03]',
            )}
          >
            {zones.corePillLabel}
          </button>
        </div>
      </div>

      <div className="lg:col-span-5" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: PANEL_EASE }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: '#6B7280' }}>
              {state.eyebrow}
            </p>
            <h3 className="mt-2 text-[26px] font-semibold leading-[1.2] tracking-[-0.015em]" style={{ color: '#15201A' }}>
              {state.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: '#6B7280' }}>
              {state.paragraph}
            </p>

            <div className="mt-6">
              {state.points.map((point) => (
                <div key={point.title} className="border-t py-4 first:border-t-0" style={{ borderColor: 'rgba(21,32,26,.12)' }}>
                  <p className="text-[14.5px] font-semibold" style={{ color: '#15201A' }}>
                    {point.title}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-[1.6]" style={{ color: '#6B7280' }}>
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Un des trois disques de métier : entrée en fondu (une fois), poids visuel piloté par CSS (pas par framer). */
function ZoneDisk({
  id,
  cx,
  cy,
  active,
  dimmed,
  label,
  entryDelay,
  reduced,
  onActivate,
  onKeyDownActivate,
}: {
  id: ZoneId;
  cx: number;
  cy: number;
  active: boolean;
  dimmed: boolean;
  label: string;
  entryDelay: number;
  reduced: boolean | null;
  onActivate: () => void;
  onKeyDownActivate: (event: KeyboardEvent) => void;
}) {
  const fillOpacity = active ? 0.48 : dimmed ? 0.28 : 0.3;
  const style: CSSProperties = {
    fillOpacity,
    transition: reduced ? 'none' : 'fill-opacity 400ms ease',
  };

  return (
    <motion.g
      initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : entryDelay, ease: PANEL_EASE }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      tabIndex={0}
      role="button"
      aria-label={label}
      aria-pressed={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={onKeyDownActivate}
      className="cursor-pointer"
    >
      <circle cx={cx} cy={cy} r={RADIUS} className={cn(ZONE_FILL_CLASS[id], 'mix-blend-multiply')} style={style} />
    </motion.g>
  );
}

/** Noyau « RoboCare » : halo permanent (seule animation en boucle) + grossit quand il est l'état actif. */
function CoreDisk({
  active,
  dimmed,
  reduced,
  label,
  onActivate,
  onKeyDownActivate,
}: {
  active: boolean;
  dimmed: boolean;
  reduced: boolean | null;
  label: string;
  onActivate: () => void;
  onKeyDownActivate: (event: KeyboardEvent) => void;
}) {
  const fillOpacity = dimmed ? 0.3 : 1;
  const scale = active ? 1.1 : 1;
  const style: CSSProperties = {
    fillOpacity,
    transform: `scale(${scale})`,
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transition: reduced ? 'none' : 'fill-opacity 400ms ease, transform 400ms ease',
  };

  return (
    <motion.g
      initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.45, ease: PANEL_EASE }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      tabIndex={0}
      role="button"
      aria-label={label}
      aria-pressed={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={onKeyDownActivate}
      className="cursor-pointer"
    >
      {!reduced ? (
        <motion.circle
          cx={CORE.cx}
          cy={CORE.cy}
          r={CORE.r}
          fill="none"
          stroke="#1C7A3C"
          strokeWidth={2}
          initial={{ scale: 1, opacity: 0.45 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ) : null}

      <circle cx={CORE.cx} cy={CORE.cy} r={CORE.r} className="fill-core" style={style} />
      <text
        x={CORE.cx}
        y={CORE.cy}
        textAnchor="middle"
        dominantBaseline="central"
        className="pointer-events-none select-none fill-white text-[11px] font-semibold uppercase tracking-[0.08em]"
      >
        {label}
      </text>
    </motion.g>
  );
}
