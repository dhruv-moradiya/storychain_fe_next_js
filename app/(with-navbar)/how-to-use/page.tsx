'use client';

import { HowToUseHero } from '@/components/how-to-use/how-to-use-hero';
import { GettingStarted } from '@/components/how-to-use/getting-started';
import { FeatureSection } from '@/components/how-to-use/feature-section';
import { ProTips } from '@/components/how-to-use/pro-tips';
import { CTASection } from '@/components/how-to-use/cta-section';
import { gettingStartedSteps, sections, proTips } from '@/lib/data/how-to-use-data';

export default function HowToUsePage() {
  return (
    <div className="bg-bg-cream min-h-screen">
      <HowToUseHero />
      <GettingStarted steps={gettingStartedSteps} />

      {sections.map((section, index) => (
        <FeatureSection key={section.id} section={section} index={index} />
      ))}

      <ProTips tips={proTips} />
      <CTASection />
    </div>
  );
}
