'use client';

import { CoinPacksSection } from '@/components/pricing/coin-packs-section';
import { CoinUsageSection } from '@/components/pricing/coin-usage-section';
import { PricingFAQ } from '@/components/pricing/pricing-faq';
import { PricingHero } from '@/components/pricing/pricing-hero';
import { RewardsSection } from '@/components/pricing/rewards-section';
import { coinPacks, coinUsageFeatures, storyRoles } from '@/lib/data/coins-data';
import { faqs } from '@/lib/data/pricing-data';

export default function PricingPage() {
  return (
    <div className="bg-bg-cream min-h-screen">
      <PricingHero />

      {/* ── Coin Packs ─────────────────────────────────── */}
      <CoinPacksSection packs={coinPacks} />

      {/* ── Coin Usage Guide ───────────────────────────── */}
      <CoinUsageSection features={coinUsageFeatures} />

      {/* ── Creator Rewards ────────────────────────────── */}
      <RewardsSection roles={storyRoles} />

      <PricingFAQ faqs={faqs} />
    </div>
  );
}
