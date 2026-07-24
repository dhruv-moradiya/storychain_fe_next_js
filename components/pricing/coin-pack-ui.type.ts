import type { LucideIcon } from 'lucide-react';

/**
 * UI representation of a coin bundle for display in CoinPackCard.
 * Derived from ICoinBundle + visual palette fields assigned at render time.
 */
export interface CoinPackUI {
  /** Bundle _id from the API */
  id: string;
  /** Bundle slug used to create a coin order */
  slug: string;
  /** Base coins in the pack */
  coins: number;
  /** Price in Indian Rupees (converted from paise) */
  priceINR: number;
  /** Price in US Dollars (converted from cents) */
  priceUSD: number;
  /** Bonus coins (if any) */
  bonus?: number;
  /** Badge label (e.g. "+100 Bonus") */
  badge?: string;
  /** Whether this pack should be highlighted as "Best Value" */
  highlighted: boolean;
  /** Lucide icon component assigned by palette */
  icon: LucideIcon;
  /** Tailwind text colour class */
  color: string;
  /** Tailwind background colour class */
  bgColor: string;
  /** Tailwind border colour class */
  borderColor: string;
}
