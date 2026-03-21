import type { LucideIcon } from 'lucide-react';

export interface CoinPack {
  id: string;
  coins: number;
  priceINR: number;
  bonus?: number; // bonus coins
  badge?: string;
  highlighted?: boolean;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

export interface CoinUsageFeature {
  id: string;
  feature: string;
  description: string;
  coinsRequired: number;
  icon: LucideIcon;
  category: 'reading' | 'writing' | 'ai' | 'social';
  perUnit?: string; // e.g. "per chapter", "per story"
}

export interface StoryRole {
  id: string;
  role: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  rewardShare: number; // percentage
}
