'use client';

import { CTASection } from '@/components/how-to-use/cta-section';
import { FeatureSection } from '@/components/how-to-use/feature-section';
import { GettingStarted } from '@/components/how-to-use/getting-started';
import { HowToUseHero } from '@/components/how-to-use/how-to-use-hero';
import { ProTips } from '@/components/how-to-use/pro-tips';
import { gettingStartedSteps, proTips, sections } from '@/lib/data/how-to-use-data';

// Note: Metadata must be exported from a Server Component
// Moving this to a layout.tsx for this route group would be better
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
