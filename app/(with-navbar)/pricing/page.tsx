import { buildStaticPageMeta } from '@/components/common';
import { CoinPacksSection } from '@/components/pricing/coin-packs-section';
import { PricingFAQ } from '@/components/pricing/pricing-faq';
import { PricingHero } from '@/components/pricing/pricing-hero';
import { RewardsSection } from '@/components/pricing/rewards-section';
import { faqs } from '@/lib/data/pricing-data';

export const metadata = buildStaticPageMeta({
  title: 'Pricing',
  description:
    'Simple, transparent pricing for every storyteller. Buy coins to unlock chapters, support creators, and access premium features on StoryChain.',
  path: '/pricing',
  keywords: ['pricing', 'coins', 'plans', 'unlock chapters', 'support creators', 'premium'],
});

export default function PricingPage() {
  return (
    <div className="bg-background min-h-screen">
      <PricingHero />

      <CoinPacksSection />

      {/* <CoinUsageSection /> */}

      <RewardsSection />

      <PricingFAQ faqs={faqs} />
    </div>
  );
}
