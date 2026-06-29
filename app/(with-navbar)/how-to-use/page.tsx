import type { Metadata } from 'next';

import { CollaborationSection } from '@/components/how-to-use/collaboration-section';
import { CTASection } from '@/components/how-to-use/cta-section';
import { DistributionSection } from '@/components/how-to-use/distribution-section';
import { DocLayout } from '@/components/how-to-use/doc-layout';
import { GettingStartedSection } from '@/components/how-to-use/getting-started-section';
import { GuideFAQSection } from '@/components/how-to-use/guide-faq-section';
import { HowToUseHero } from '@/components/how-to-use/how-to-use-hero';
import { MonetizationSection } from '@/components/how-to-use/monetization-section';
import { ProfileSettingsSection } from '@/components/how-to-use/profile-settings-section';
import { ReadingSection } from '@/components/how-to-use/reading-section';
import { WritingEditingSection } from '@/components/how-to-use/writing-editing-section';

export const metadata: Metadata = {
  title: 'How StoryChain Works | App Guide',
  description:
    'A complete guide to creating stories, collaborating with others, earning from your writing, and discovering content on StoryChain.',
};

function SectionDivider() {
  return <div className="border-border/30 mx-auto border-t" />;
}

export default function HowToUsePage() {
  return (
    <div className="bg-bg-cream min-h-screen">
      <HowToUseHero />

      <DocLayout>
        <GettingStartedSection />
        <SectionDivider />
        <CollaborationSection />
        <SectionDivider />
        <MonetizationSection />
        <SectionDivider />
        <DistributionSection />
        <SectionDivider />
        <WritingEditingSection />
        <SectionDivider />
        <ReadingSection />
        <SectionDivider />
        <ProfileSettingsSection />
        <SectionDivider />
        <GuideFAQSection />
      </DocLayout>

      <CTASection />
    </div>
  );
}
