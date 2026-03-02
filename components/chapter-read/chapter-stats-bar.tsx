'use client';

import { IChapterDetail } from '@/type/chapter/chapter-detail.type';
import { Eye, GitBranch, MessageSquare, ThumbsUp, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterStatsBarProps {
  chapter: IChapterDetail;
}

function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
}

export function ChapterStatsBar({ chapter }: ChapterStatsBarProps) {
  const { stats, votes } = chapter;
  const score = votes.upvotes - votes.downvotes;

  const statItems = [
    {
      icon: Eye,
      label: 'Reads',
      value: formatNumber(stats.reads),
      className: 'text-brand-blue bg-brand-blue/5',
    },
    {
      icon: Users,
      label: 'Unique',
      value: formatNumber(stats.uniqueReaders),
      className: 'text-brand-pink-600 bg-brand-pink-500/5',
    },
    {
      icon: MessageSquare,
      label: 'Comments',
      value: formatNumber(stats.comments),
      className: 'text-brand-orange bg-brand-orange/5',
    },
    {
      icon: GitBranch,
      label: 'Branches',
      value: formatNumber(stats.childBranches),
      className: 'text-primary bg-primary/5',
    },
    {
      icon: Zap,
      label: 'Completion',
      value: `${Math.round(stats.completionRate)}%`,
      className: 'text-amber-600 bg-amber-500/5',
    },
    {
      icon: ThumbsUp,
      label: 'Score',
      value: score >= 0 ? `+${formatNumber(score)}` : formatNumber(score),
      className: score >= 0 ? 'text-emerald-600 bg-emerald-500/5' : 'text-red-600 bg-red-500/5',
    },
  ];

  return (
    <div className="bg-card/40 border-border/40 flex w-full flex-wrap items-center justify-between gap-1 rounded-2xl border p-1.5 shadow-xs backdrop-blur-sm sm:flex-nowrap">
      {statItems.map(({ icon: Icon, label, value, className }) => (
        <div
          key={label}
          className={cn(
            'group flex flex-1 flex-col items-center justify-center gap-1 rounded-[14px] py-2.5 transition-all hover:bg-white/40 sm:py-3',
            'min-w-[80px]'
          )}
        >
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110',
              className
            )}
          >
            <Icon size={15} />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-ibm-plex-mono text-text-primary text-sm leading-none font-bold">
              {value}
            </span>
            <span className="text-muted-foreground/60 mt-1 text-[9px] font-bold tracking-widest uppercase">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChapterStatsBar;
