'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Bookmark,
  Coins,
  Eye,
  MessageSquare,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import type { AnalyticsData } from '../analytics.types';

interface OverviewStatsProps {
  data: AnalyticsData['overview'];
}

const statConfig = [
  {
    key: 'totalChapters',
    label: 'Total Chapters',
    icon: BookOpen,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    changeKey: 'chaptersChange',
    format: (v: number) => v.toString(),
  },
  {
    key: 'totalReads',
    label: 'Total Reads',
    icon: Eye,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
    changeKey: 'readsChange',
    format: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()),
  },
  {
    key: 'totalUpvotes',
    label: 'Upvotes',
    icon: ThumbsUp,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    changeKey: 'upvotesChange',
    format: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()),
  },
  {
    key: 'totalComments',
    label: 'Comments',
    icon: MessageSquare,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
    changeKey: 'commentsChange',
    format: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()),
  },
  {
    key: 'totalBookmarks',
    label: 'Bookmarks',
    icon: Bookmark,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    changeKey: 'bookmarksChange',
    format: (v: number) => v.toString(),
  },
  {
    key: 'coinUnlocks',
    label: 'Chapter Unlocks',
    icon: Coins,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    changeKey: 'unlocksChange',
    format: (v: number) => v.toString(),
  },
] as const;

export function OverviewStats({ data }: OverviewStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
          Performance Overview
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
            <Coins className="h-3 w-3" />
            <span>{data.unlockedUsersCount} Unlocked Readers</span>
          </div>
          <div className="bg-brand-blue/10 text-brand-blue flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold">
            <span>{data.upvoteRatio}% Positive</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statConfig.map((config, index) => {
          const Icon = config.icon;
          const value = data[config.key as keyof typeof data] as number;
          const change = data[config.changeKey as keyof typeof data] as number;
          const isPositive = change >= 0;

          return (
            <motion.div
              key={config.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group border-border/50 bg-cream-90/50 hover:border-brand-pink-500/30 hover:bg-cream-90 rounded-lg border p-3 transition-all hover:shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    config.bgColor
                  )}
                >
                  <Icon className={cn('h-4 w-4', config.color)} />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-0.5 text-xs font-medium',
                    isPositive ? 'text-green-600' : 'text-red-500'
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}
                    {change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="text-text-primary text-xl font-bold">{config.format(value)}</p>
              <p className="text-text-secondary-65 text-xs">{config.label}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
