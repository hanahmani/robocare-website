'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from '@/i18n';
import { TEAM_MEMBERS, type TeamGroup, type TeamMember } from '@/lib/data/team';
import { cn, initialsFromName } from '@/lib/utils';

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
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-[18px] aspect-square w-full max-w-[172px]">
        <div className="absolute inset-0 rounded-full bg-[#EAEEE8]" />
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element -- repli sur initiales géré via onError, pas d'optimisation nécessaire
          <img
            src={member.photo}
            alt={`${name}, ${role}`}
            width={172}
            height={172}
            loading="lazy"
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full rounded-full object-cover [object-position:center_20%]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span aria-hidden className="text-[22px] font-bold text-[#7C8478]">
              {initialsFromName(name)}
            </span>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full [box-shadow:inset_0_0_0_1px_rgba(13,35,24,0.10)]"
        />
      </div>

      <h3 className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-[#0D2318]">
        {name}
      </h3>
      <p className="mt-[5px] text-pretty text-[13px] leading-[1.45] text-[#6E7669]">{role}</p>

      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener"
          aria-label={linkedinAriaLabel}
          className="mt-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#DFDDD5] text-[11px] font-extrabold text-[#5E665A] transition-colors duration-150 hover:border-[#0D2318] hover:bg-[#0D2318] hover:text-[#FAF9F6] motion-reduce:transition-none"
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
      className="scroll-mt-24 bg-[#FAF9F6] px-5 pb-[72px] pt-14 sm:px-8 sm:pb-24 sm:pt-[72px] lg:min-h-screen lg:px-14 lg:pb-[120px] lg:pt-[88px]"
    >
      <div className="mx-auto max-w-[1120px]">
        {/* En-tête */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#E4E2DB] pb-14 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="mb-[22px] text-[12px] font-bold uppercase tracking-[0.16em] text-[#7C8478]">
              {t('about.team.eyebrow')}
            </p>
            <h1
              id="team-heading"
              className="text-balance text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#0D2318] sm:text-[44px] lg:text-[60px]"
            >
              {titleLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < titleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>
          </div>
          <div>
            <p className="mb-2 max-w-[38ch] text-pretty text-[17px] leading-[1.6] text-[#5E665A]">
              {t('about.team.intro')}
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-nowrap gap-2.5 overflow-x-auto py-11 sm:flex-wrap sm:overflow-visible">
          {FILTER_KEYS.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(key)}
                className={cn(
                  'cursor-pointer whitespace-nowrap rounded-full px-[18px] py-[9px] text-[13px] font-bold transition-all duration-150 motion-reduce:transition-none',
                  active
                    ? 'border border-[#0D2318] bg-[#0D2318] text-[#FAF9F6]'
                    : 'border border-[#DFDDD5] bg-transparent text-[#3C443A] hover:border-[#0D2318]',
                )}
              >
                {t(`about.team.filters.${key}`)}{' '}
                <span className="font-semibold opacity-55">{counts[key]}</span>
              </button>
            );
          })}
        </div>

        {/* Groupes */}
        <div aria-live="polite">
          {groups.map(({ team, members }) => (
            <div key={team} className="mb-16">
              <div className="mb-8 flex items-center gap-4">
                <h2 className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-[#7C8478]">
                  {t(`about.team.filters.${GROUP_TO_FILTER_KEY[team]}`)}
                </h2>
                <span aria-hidden className="h-px flex-1 bg-[#E4E2DB]" />
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-5 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))] sm:gap-x-7 sm:gap-y-11">
                {members.map((member) => {
                  const name = t(`about.team.members.${member.id}.name`);
                  const role = t(`about.team.members.${member.id}.role`);
                  return (
                    <MemberCard
                      key={member.id}
                      member={member}
                      name={name}
                      role={role}
                      linkedinAriaLabel={t('about.team.linkedinAriaLabel', { name })}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
