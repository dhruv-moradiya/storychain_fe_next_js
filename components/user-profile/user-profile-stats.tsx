'use client';

import { motion } from 'framer-motion';
import { BookOpen, Eye, FileText, GitFork, ThumbsDown, ThumbsUp } from 'lucide-react';

import { DashboardGrid } from '@/components/dashboard/layout/dashboard-grid';
import { cn } from '@/lib/utils';

interface UserProfileStatsProps {
  stats?: {
    storiesCreated?: number;
    chaptersWritten?: number;
    branchesCreated?: number;
    totalUpvotes?: number;
    totalDownvotes?: number;
    stories?: number;
    chapters?: number;
    words?: number;
    totalReads?: number;
    totalLikes?: number;
  };
}

function formatNumber(num: number = 0): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function UserProfileStats({ stats }: UserProfileStatsProps) {
  const statItems = [
    {
      key: 'stories',
      label: 'Stories',
      value: stats?.storiesCreated ?? stats?.stories ?? 0,
      icon: BookOpen,
      iconColor: 'text-primary',
    },
    {
      key: 'chapters',
      label: 'Chapters',
      value: stats?.chaptersWritten ?? stats?.chapters ?? 0,
      icon: FileText,
      iconColor: 'text-chart-2',
    },
    {
      key: 'branches',
      label: 'Branches',
      value: stats?.branchesCreated ?? 0,
      icon: GitFork,
      iconColor: 'text-chart-3',
    },
    {
      key: 'upvotes',
      label: 'Upvotes',
      value: stats?.totalUpvotes ?? stats?.totalLikes ?? 0,
      icon: ThumbsUp,
      iconColor: 'text-emerald-500',
    },
    {
      key: 'downvotes',
      label: 'Downvotes',
      value: stats?.totalDownvotes ?? 0,
      icon: ThumbsDown,
      iconColor: 'text-destructive',
    },
    {
      key: 'reads',
      label: 'Reads',
      value: stats?.totalReads ?? 0,
      icon: Eye,
      iconColor: 'text-chart-4',
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <DashboardGrid minItemWidth={140} gap="sm">
        {statItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              className="border-border bg-card text-card-foreground hover:border-primary/40 hover:bg-accent/40 flex flex-col items-center justify-center rounded-xl border p-4 shadow-sm transition-all"
            >
              <Icon className={cn('mb-2 h-5 w-5', item.iconColor)} />
              <span className="text-foreground mb-0.5 font-mono text-xl font-bold">
                {formatNumber(item.value)}
              </span>
              <span className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </DashboardGrid>
    </motion.div>
  );
}

export { UserProfileStats };
