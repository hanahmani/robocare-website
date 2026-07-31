'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n';
import { SITE } from '@/lib/data/site';
import { EASE } from '@/lib/motion';

/** Carte NDVI simulée (grille 12 × 4) reprise de l'aperçu plateforme. */
const CELLS = [
  '#1F8049','#2A8F52','#7FA98B','#D9C657','#C88A2E','#7FA98B','#1F8049','#2A8F52','#1F8049','#7FA98B','#2A8F52','#1F8049',
  '#2A8F52','#7FA98B','#C88A2E','#8C3B12','#C88A2E','#D9C657','#7FA98B','#1F8049','#2A8F52','#1F8049','#1F8049','#2A8F52',
  '#1F8049','#2A8F52','#D9C657','#C88A2E','#D9C657','#7FA98B','#2A8F52','#1F8049','#1F8049','#2A8F52','#7FA98B','#1F8049',
  '#2A8F52','#1F8049','#7FA98B','#D9C657','#7FA98B','#2A8F52','#1F8049','#1F8049','#2A8F52','#1F8049','#2A8F52','#1F8049',
];

const SERIES = [34, 41, 49, 44, 57, 63, 52, 68, 76, 84, 92, 100];

const KPI_TONES = {
  area: 'text-white',
  alerts: 'text-ocre-400',
  lastPass: 'text-lime-500',
} as const;

/** Fenêtre applicative : chrome navigateur, carte NDVI, KPI et histogramme. */
export function AppWindow() {
  const { d } = useTranslation();
  const kpis = ['area', 'alerts', 'lastPass'] as const;

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/[0.16] bg-forest-900 shadow-glass">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.06] px-4 py-3">
        <span className="h-[9px] w-[9px] rounded-full bg-white/20" />
        <span className="h-[9px] w-[9px] rounded-full bg-white/20" />
        <span className="h-[9px] w-[9px] rounded-full bg-white/20" />
        <span dir="ltr" className="ms-2.5 font-mono text-[10.5px] text-white/45">
          {SITE.appHost}
        </span>
      </div>

      <div className="grid gap-3.5 p-4 sm:p-[18px]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="font-display text-[16px] font-semibold text-white">
            {d.appWindow.title}
          </div>
          <div dir="ltr" className="flex gap-1.5 font-mono text-[10px]">
            <span className="rounded-full bg-lime-500/[0.16] px-2 py-1 text-lime-500">NDVI</span>
            <span className="rounded-full bg-white/[0.07] px-2 py-1 text-white/50">NDRE</span>
            <span className="rounded-full bg-white/[0.07] px-2 py-1 text-white/50">H₂O</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-[3px] overflow-hidden rounded-xl" aria-hidden>
          {CELLS.map((color, index) => (
            <span key={index} style={{ background: color }} className="aspect-square" />
          ))}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          {kpis.map((key) => (
            <div key={key} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/45">
                {d.appWindow.kpis[key].label}
              </div>
              <div className={`mt-1.5 font-display text-[19px] ${KPI_TONES[key]}`}>
                {d.appWindow.kpis[key].value}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5">
          <div className="flex justify-between font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/45">
            <span>{d.appWindow.chart.label}</span>
            <span dir="ltr" className="text-lime-500">
              0,74
            </span>
          </div>
          <div className="mt-3 flex h-16 items-end gap-[5px]">
            {SERIES.map((height, index) => (
              <motion.span
                key={index}
                initial={{ scaleY: 0.08 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: index * 0.05, ease: EASE }}
                style={{
                  height: `${height}%`,
                  background: index === 6 ? '#E4A93C' : `rgba(158,216,75,${0.3 + index * 0.055})`,
                }}
                className="flex-1 origin-bottom rounded-[3px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
