'use client';

import { useTranslation } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { RequestDemoButton } from '@/components/ui/RequestDemoButton';
import { CtaBand } from '@/sections/shared/CtaBand';
import { SustainabilityHero } from '@/sections/sustainability/SustainabilityHero';
import { SustainabilitySteps } from '@/sections/sustainability/SustainabilitySteps';
import { WhySustainability } from '@/sections/sustainability/WhySustainability';
import { SustainabilityTimeline } from '@/sections/sustainability/SustainabilityTimeline';
import { TechnologyGrid } from '@/sections/sustainability/TechnologyGrid';
import { WaterSection } from '@/sections/sustainability/WaterSection';
import { SoilSection } from '@/sections/sustainability/SoilSection';
import { BiodiversitySection } from '@/sections/sustainability/BiodiversitySection';
import { FootprintSection } from '@/sections/sustainability/FootprintSection';
import { ValueChainSection } from '@/sections/sustainability/ValueChainSection';
import { ImpactDashboard } from '@/sections/sustainability/ImpactDashboard';
import { EcosystemSection } from '@/sections/sustainability/EcosystemSection';
import { DataToImpactSection } from '@/sections/sustainability/DataToImpactSection';
import { ResilienceSection } from '@/sections/sustainability/ResilienceSection';
import { VisionSection } from '@/sections/sustainability/VisionSection';

/**
 * Page « Durabilité » : contexte, approche en cinq étapes, technologies, puis
 * un parcours thématique (eau, sols, biodiversité, empreinte, chaîne de
 * valeur, impact, écosystème, résilience, vision) qui referme sur le CTA.
 */
export function SustainabilityView() {
  const { t } = useTranslation();

  return (
    <>
      <SustainabilityHero />
      <SustainabilitySteps />
      <WhySustainability />
      <SustainabilityTimeline />
      <TechnologyGrid />
      <WaterSection />
      <SoilSection />
      <BiodiversitySection />
      <FootprintSection />
      <ValueChainSection />
      <ImpactDashboard />
      <EcosystemSection />
      <DataToImpactSection />
      <ResilienceSection />
      <VisionSection />

      <Section>
        <CtaBand
          eyebrow={t('sustainability.cta.eyebrow')}
          title={t('sustainability.cta.title')}
          text={t('sustainability.cta.text')}
          actions={
            <>
              <Button href="/about" variant="lime" size="lg">
                {t('sustainability.cta.ctaDiscover')}
              </Button>
              <RequestDemoButton variant="outline-light" size="lg" />
            </>
          }
        />
      </Section>
    </>
  );
}
