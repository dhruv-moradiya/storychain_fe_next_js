import { CoinPacksSection } from '@/components/pricing/coin-packs-section';
import { CoinUsageSection } from '@/components/pricing/coin-usage-section';
import { PricingFAQ } from '@/components/pricing/pricing-faq';
import { PricingHero } from '@/components/pricing/pricing-hero';
import { RewardsSection } from '@/components/pricing/rewards-section';
import { faqs } from '@/lib/data/pricing-data';

export default function PricingPage() {
  return (
    <div className="bg-background min-h-screen">
      <PricingHero />

      <CoinPacksSection />

      <CoinUsageSection />

      <RewardsSection />

      <PricingFAQ faqs={faqs} />
    </div>
  );
}
