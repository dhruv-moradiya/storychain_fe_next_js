import { CoinTxDirection, CoinTxType } from '@/type/transaction/transaction-enum';
import {
  ArrowDownLeft,
  ArrowUpRight,
  BookOpen,
  Building,
  Circle,
  Gift,
  Layers,
  Lock,
  LucideIcon,
  MinusCircle,
  RefreshCw,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Zap,
} from 'lucide-react';

import type { BadgeColorKey, BadgeConfig } from './types';
import { iconBadge } from './utils';

// ============================================
// COIN TRANSACTION TYPE BADGES
// ============================================

const COIN_TX_TYPE_CONFIG: Record<
  string,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  // Enums from CoinTxType
  [CoinTxType.PURCHASE]: { color: 'emerald', icon: ShoppingCart, label: 'Purchase' },
  [CoinTxType.CHAPTER_EARN]: { color: 'indigo', icon: BookOpen, label: 'Chapter Earn' },
  [CoinTxType.REFERRAL_REWARD]: { color: 'purple', icon: Gift, label: 'Referral Reward' },
  [CoinTxType.DAILY_REWARD]: { color: 'amber', icon: Zap, label: 'Daily Reward' },
  [CoinTxType.ADMIN_CREDIT]: { color: 'cyan', icon: ShieldCheck, label: 'Admin Credit' },
  [CoinTxType.STORY_POOL_CREDIT]: { color: 'blue', icon: Layers, label: 'Story Pool Credit' },
  [CoinTxType.PLATFORM_FEE]: { color: 'slate', icon: Building, label: 'Platform Fee' },
  [CoinTxType.EARNINGS_DISTRIBUTION]: {
    color: 'pink',
    icon: Share2,
    label: 'Earnings Distribution',
  },
  [CoinTxType.CHAPTER_UNLOCK]: { color: 'rose', icon: Lock, label: 'Chapter Unlock' },
  [CoinTxType.WITHDRAWAL]: { color: 'orange', icon: ArrowUpRight, label: 'Withdrawal' },
  [CoinTxType.ADMIN_DEBIT]: { color: 'error', icon: MinusCircle, label: 'Admin Debit' },

  // Friendly uppercase aliases for convenience
  Purchase: { color: 'emerald', icon: ShoppingCart, label: 'Purchase' },
  Spend: { color: 'rose', icon: Lock, label: 'Spend' },
  Refund: { color: 'blue', icon: RefreshCw, label: 'Refund' },
  Withdraw: { color: 'orange', icon: ArrowUpRight, label: 'Withdraw' },
};

export function coinTxTypeBadge(
  type: CoinTxType | string,
  options?: Partial<BadgeConfig>
): React.ReactElement {
  const config = COIN_TX_TYPE_CONFIG[type] ??
    COIN_TX_TYPE_CONFIG[type?.toLowerCase?.() || ''] ?? {
      color: 'gray' as BadgeColorKey,
      icon: Circle,
      label: String(type),
    };
  return iconBadge(config.label, config.icon, config.color, {
    size: 'sm',
    shape: 'pill',
    style: 'soft',
    ...options,
  });
}

// ============================================
// COIN TRANSACTION DIRECTION BADGES
// ============================================

const COIN_TX_DIRECTION_CONFIG: Record<
  string,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  [CoinTxDirection.CREDIT]: { color: 'emerald', icon: ArrowDownLeft, label: 'Credit' },
  [CoinTxDirection.DEBIT]: { color: 'rose', icon: ArrowUpRight, label: 'Debit' },
  Credit: { color: 'emerald', icon: ArrowDownLeft, label: 'Credit' },
  Debit: { color: 'rose', icon: ArrowUpRight, label: 'Debit' },
};

export function coinTxDirectionBadge(
  direction: CoinTxDirection | string,
  options?: Partial<BadgeConfig>
): React.ReactElement {
  const config = COIN_TX_DIRECTION_CONFIG[direction] ??
    COIN_TX_DIRECTION_CONFIG[direction?.toLowerCase?.() || ''] ?? {
      color: 'gray' as BadgeColorKey,
      icon: Circle,
      label: String(direction),
    };
  return iconBadge(config.label, config.icon, config.color, {
    size: 'sm',
    shape: 'pill',
    style: 'soft',
    ...options,
  });
}
