'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from '@/i18n';
import { TEAM_MEMBERS, type TeamGroup, type TeamMember } from '@/lib/data/team';
import { cn, initialsFromName } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';
import { Stagger, StaggerItem } from '@/components/animations/Stagger';

const FILTER_KEYS = ['all', 'leadership', 'engineering', 'agronomy'] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const GROUP_TO_FILTER_KEY: Record<TeamGroup, FilterKey> = {
  Leadership: 'leadership',
  Engineering: 'engineering',
  Agronomy: 'agronomy',
};

function orderedGroups(members: TeamMember[]): TeamGroup[] {
  const order: TeamGroup[] = [];
  for (const member of members) {
    if (!order.includes(member.team)) order.push(member.team);
  }
  return order;
}

function MemberCard({
  member,
  name,
  role,
  linkedinAriaLabel,
}: {
  member: TeamMember;
  name: string;
  role: string;
  linkedinAriaLabel: string;
}) {
  const [errored, setErrored] = useState(false);
  const showPhoto = Boolean(member.photo) && !errored;

  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative mb-[18px] aspect-square w-full max-w-[172px]">
        <div className="absolute inset-0 rounded-full bg-sage-200" />
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element -- repli sur initiales géré via onError, pas d'optimisation nécessaire
          <img
            src={member.photo}
            alt={`${name}, ${role}`}
            width={172}
            height={172}
            loading="lazy"
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full rounded-full object-cover transition-transform duration-slow ease-premium [object-position:center_20%] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span aria-hidden className="text-[22px] font-bold text-ink-400">
              {initialsFromName(name)}
            </span>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full transition-[box-shadow] duration-slow ease-premium [box-shadow:inset_0_0_0_1px_rgba(6,18,12,0.10)] group-hover:[box-shadow:inset_0_0_0_1px_rgba(77,158,47,0.45)]"
        />
      </div>

      {/* h4 : la section est un h2 et les groupes des h3. */}
      <h4 className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-ink-900">
        {name}
      </h4>
      <p className="mt-[5px] text-pretty text-[13px] leading-[1.45] text-ink-500">{role}</p>

      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener"
          aria-label={linkedinAriaLabel}
          className={cn(
            'mt-3 flex h-7 w-7 items-center justify-center rounded-full border border-forest-950/[0.12]',
            'text-[11px] font-extrabold text-ink-500',
            'transition-[background-color,border-color,color,transform] duration-base ease-premium',
            'hover:border-forest-900 hover:bg-forest-900 hover:text-cream',
            'active:scale-90 active:duration-fast motion-reduce:active:scale-100',
          )}
        >
          in
        </a>
      ) : null}
    </div>
  );
}

/** Section « Équipe » — grille filtrable, portraits recadrés sur un disque uniforme. */
export function TeamSection() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = useMemo(() => {
    const result: Record<FilterKey, number> = {
      all: TEAM_MEMBERS.length,
      leadership: 0,
      engineering: 0,
      agronomy: 0,
    };
    for (const member of TEAM_MEMBERS) result[GROUP_TO_FILTER_KEY[member.team]] += 1;
    return result;
  }, []);

  const groups = useMemo(() => {
    const filtered =
      filter === 'all'
        ? TEAM_MEMBERS
        : TEAM_MEMBERS.filter((member) => GROUP_TO_FILTER_KEY[member.team] === filter);
    return orderedGroups(filtered).map((team) => ({
      team,
      members: filtered.filter((member) => member.team === team),
    }));
  }, [filter]);

  const titleLines = t.list('about.team.title');

  return (
    <section
      id="equipe"
      aria-labelledby="team-heading"
      className="scroll-mt-24 bg-cream-fade py-section"
    >
      <div className="container-page">
        {/* En-tête */}
        <Reveal className="grid grid-cols-1 items-end gap-8 border-b border-forest-950/[0.08] pb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow mb-[22px] text-leaf-600">{t('about.team.eyebrow')}</p>
            {/*
              h2, et non h1 : la page « À propos » porte déjà son h1 dans le
              PageHero. Deux h1 sur une même page brouillent le plan du
              document pour les lecteurs d'écran comme pour l'indexation.
            */}
            <h2
              id="team-heading"
              className="text-balance text-h2 font-extrabold text-ink-900"
            >
              {titleLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < titleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
          </div>
          <div>
            <p className="mb-2 max-w-[38ch] text-pretty text-body text-ink-500">
              {t('about.team.intro')}
            </p>
          </div>
        </Reveal>

        {/* Filtres */}
        <Reveal
          className="flex flex-nowrap gap-2.5 overflow-x-auto py-11 sm:flex-wrap sm:overflow-visible"
          delay={0.06}
        >
          {FILTER_KEYS.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(key)}
                className={cn(
                  'cursor-pointer whitespace-nowrap rounded-full px-[18px] py-[9px] text-[13px] font-bold',
                  'transition-surface duration-base',
                  'active:scale-95 active:duration-fast motion-reduce:active:scale-100',
                  active
                    ? 'border border-forest-900 bg-forest-900 text-cream'
                    : 'border border-forest-950/[0.12] bg-transparent text-ink-700 hover:border-forest-900 hover:bg-white',
                )}
              >
                {t(`about.team.filters.${key}`)}{' '}
                <span className="font-semibold opacity-55">{counts[key]}</span>
              </button>
            );
          })}
        </Reveal>

        {/* Groupes */}
        <div aria-live="polite">
          {groups.map(({ team, members }) => (
            <div key={team} className="mb-16">
              <div className="mb-8 flex items-center gap-4">
                <h3 className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">
                  {t(`about.team.filters.${GROUP_TO_FILTER_KEY[team]}`)}
                </h3>
                <span aria-hidden className="h-px flex-1 bg-forest-950/[0.08]" />
              </div>
              {/* La cascade rejoue au changement de filtre : les nouvelles
                  cartes montent en `hidden` puis suivent le variant du
                  conteneur, déjà en `show`. */}
              <Stagger
                stagger={0.05}
                className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-5 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))] sm:gap-x-7 sm:gap-y-11"
              >
                {members.map((member) => {
                  const name = t(`about.team.members.${member.id}.name`);
                  const role = t(`about.team.members.${member.id}.role`);
                  return (
                    <StaggerItem key={member.id}>
                      <MemberCard
                        member={member}
                        name={name}
                        role={role}
                        linkedinAriaLabel={t('about.team.linkedinAriaLabel', { name })}
                      />
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
