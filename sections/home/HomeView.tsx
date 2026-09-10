'use client';

import { useTranslation } from '@/i18n';
import { Hero } from '@/sections/home/Hero';
import { About } from '@/sections/home/About';
import { WhyRoboCare } from '@/sections/home/WhyRoboCare';
import { SolutionsPreview } from '@/sections/home/SolutionsPreview';
import { PlatformPreview } from '@/sections/home/PlatformPreview';
import { VideoShowcase } from '@/sections/home/VideoShowcase';
import { SocialProof } from '@/sections/home/SocialProof';
import { HomeFaq } from '@/sections/home/HomeFaq';
import { StatsShowcase } from '@/sections/shared/StatsShowcase';
import { WhyDifferent } from '@/sections/home/WhyDifferent';
import { CtaBand } from '@/sections/shared/CtaBand';
import { Section, IndexScale } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HOME_STATS } from '@/lib/data/home';

/** Page d'accueil (vue client : le contenu suit la langue sans rechargement). */
export function HomeView() {
  const { t, d } = useTranslation();

  const stats = HOME_STATS.map((stat) => ({ ...stat, label: d.home.stats[stat.id] }));

  return (
    <>
      <Hero />

      {/* Chiffres clés */}
      <section className="relative overflow-hidden bg-white pt-10 pb-10 lg:pt-14 lg:pb-14">
        <div className="container-page">
          <SectionHeading
            className="mx-auto text-center"
            eyebrow={t('home.stats.eyebrow')}
            title={t('home.stats.title')}
          />
          <StatsShowcase stats={stats} tone="light" className="mt-section-gap" />
        </div>
        <IndexScale className="absolute inset-x-0 bottom-0" />
      </section>

      <WhyDifferent />

      {/* Alternance des fonds conservée : blanc → crème → blanc → crème → sauge → sombre → blanc → sauge */}
      <About />
      <WhyRoboCare />
      <SolutionsPreview />
      <PlatformPreview />
      <VideoShowcase />
      <SocialProof />
      <HomeFaq />

      <Section>
        <CtaBand showContacts />
      </Section>
    </>
  );
}
