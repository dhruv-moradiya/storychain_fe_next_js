'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { Award, Flame, Sparkles, Star, Trophy } from 'lucide-react';

import { cn } from '@/lib/utils';

interface BadgeItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  isUnlocked?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserProfileAchievementsProps {
  badges?: BadgeItem[];
  achievements?: {
    level: number;
    levelTitle: string;
    xp: number;
    nextLevelXp: number;
  };
}

const rarityConfig = {
  common: {
    bg: 'bg-muted/60',
    border: 'border-border',
    text: 'text-foreground',
    iconBg: 'bg-muted',
    icon: Award,
  },
  rare: {
    bg: 'bg-blue-500/10 dark:bg-blue-950/40',
    border: 'border-blue-500/30',
    text: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/20',
    icon: Star,
  },
  epic: {
    bg: 'bg-purple-500/10 dark:bg-purple-950/40',
    border: 'border-purple-500/30',
    text: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/20',
    icon: Flame,
  },
  legendary: {
    bg: 'bg-amber-500/10 dark:bg-amber-950/40',
    border: 'border-amber-500/30',
    text: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/20',
    icon: Trophy,
  },
};

function UserProfileAchievements({ badges = [], achievements }: UserProfileAchievementsProps) {
  const displayBadges = badges.filter((b) => b.isUnlocked !== false);
  const xpPercentage =
    achievements && achievements.nextLevelXp > 0
      ? Math.min(100, Math.round((achievements.xp / achievements.nextLevelXp) * 100))
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-sm"
    >
      {/* XP & Level Progress */}
      {achievements && (
        <div className="border-border mb-5 border-b pb-4">
          <div className="flex items-center justify-between">
            <span className="text-foreground text-xs font-bold tracking-wider uppercase">
              Level {achievements.level} • {achievements.levelTitle}
            </span>
            <span className="text-primary font-mono text-xs font-bold">
              {achievements.xp} / {achievements.nextLevelXp} XP
            </span>
          </div>
          <div className="bg-muted mt-2.5 h-2 w-full overflow-hidden rounded-full">
            <div
              className="from-primary to-chart-2 h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-foreground font-bold">Achievements</h3>
        <span className="text-muted-foreground flex items-center gap-1 text-xs">
          <Sparkles className="text-primary h-3.5 w-3.5" />
          {displayBadges.length} unlocked
        </span>
      </div>

      <div className="space-y-2">
        {displayBadges.map((badge, index) => {
          const rarity = badge.rarity ?? 'common';
          const config = rarityConfig[rarity] ?? rarityConfig.common;
          const Icon = config.icon;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
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
                <p className="text-foreground truncate text-sm font-semibold">{badge.name}</p>
                {badge.description && (
                  <p className="text-muted-foreground truncate text-xs">{badge.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {displayBadges.length === 0 && (
        <p className="text-muted-foreground py-4 text-center text-xs">No badges unlocked yet.</p>
      )}

      <Link
        href="/profile/badges"
        className="text-primary mt-3 flex w-full items-center justify-center gap-1 text-xs transition-colors hover:underline"
      >
        View all badges →
      </Link>
    </motion.div>
  );
}

export { UserProfileAchievements };
