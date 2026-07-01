'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { Award, Flame, Sparkles, Star, Trophy } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserProfileAchievementsProps {
  badges: Badge[];
}

const rarityConfig = {
  common: {
    bg: 'bg-badge-gray-bg',
    border: 'border-badge-gray-border',
    text: 'text-badge-gray',
    iconBg: 'bg-gradient-to-br from-slate-100 to-slate-200',
    icon: Award,
    label: 'Common',
  },
  rare: {
    bg: 'bg-badge-info-bg',
    border: 'border-badge-info/30',
    text: 'text-badge-info',
    iconBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
    icon: Star,
    label: 'Rare',
  },
  epic: {
    bg: 'bg-badge-purple-bg',
    border: 'border-badge-purple/40',
    text: 'text-badge-purple',
    iconBg: 'bg-gradient-to-br from-purple-100 to-purple-200',
    icon: Flame,
    label: 'Epic',
  },
  legendary: {
    bg: 'bg-badge-amber-bg',
    border: 'border-badge-amber/50',
    text: 'text-badge-amber',
    iconBg: 'bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-200',
    icon: Trophy,
    label: 'Legendary',
  },
};

function UserProfileAchievements({ badges }: UserProfileAchievementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Achievements</h3>
        <span className="text-text-secondary-65 flex items-center gap-1 text-xs">
          <Sparkles className="h-3.5 w-3.5" />
          {badges.length} badges
        </span>
      </div>

      <div className="space-y-2">
        {badges.map((badge, index) => {
          const config = rarityConfig[badge.rarity] ?? rarityConfig.common;
          const Icon = config.icon;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.07 }}
              whileHover={{ x: 2 }}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3 transition-all',
                config.bg,
                config.border
              )}
            >
              <div
                className={cn(
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg',
                  config.iconBg
                )}
              >
                <Icon className={cn('h-4 w-4', config.text)} />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'truncate text-sm font-semibold',
                    badge.rarity === 'legendary'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent'
                      : config.text
                  )}
                >
                  {badge.name}
                </p>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[9px] font-medium tracking-wide uppercase',
                    config.bg,
                    config.text
                  )}
                >
                  {config.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Link
        href="/profile/badges"
        className="text-brand-pink-500 hover:text-brand-pink-600 mt-3 flex w-full items-center justify-center gap-1 text-xs transition-colors hover:underline"
      >
        View all badges →
      </Link>
    </motion.div>
  );
}

export { UserProfileAchievements };
