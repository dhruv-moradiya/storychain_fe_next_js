import type { IStoryOverview } from '@/type/story';
import { format, formatDistanceToNow } from 'date-fns';
import { BookOpen, Calendar, Eye, GitBranch, Heart, RefreshCw, Star, Users } from 'lucide-react';

import { StaggerChildren } from '@/lib/animations';
import { cn } from '@/lib/utils';

import ReadMore from './read-more';

interface StoryStatsProps {
  story: IStoryOverview;
}

export function StoryStats({ story }: StoryStatsProps) {
  const { description, stats, status, publishedAt, lastActivityAt } = story;
  // Formatting dates using date-fns
  // eslint-disable-next-line react-hooks/purity
  const startedAt = format(new Date(publishedAt || Date.now()), 'MMM yyyy');
  const updatedAgo = formatDistanceToNow(new Date(lastActivityAt), { addSuffix: true });

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* About Section */}
      <div className="border-soft space-y-3 rounded-xl border p-4 sm:space-y-4 sm:p-5">
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <BookOpen size={16} className="text-brand-pink-500 sm:h-[18px] sm:w-[18px]" />
          About This Story
        </h2>

        <ReadMore html={description} maxLines={6} />

        <div className="text-text-secondary-65 space-y-1.5 pt-2 text-xs sm:space-y-2">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-pink-500/70" />
            <span>Started: {startedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw size={14} className="text-brand-pink-500/70" />
            <span>Updated: {updatedAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-brand-pink-500/70" />
            <span>Status: {status}</span>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="border-soft space-y-3 rounded-xl border p-4 sm:space-y-4 sm:p-5">
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Star size={16} className="text-brand-orange sm:h-4.5 sm:w-4.5" />
          Statistics
        </h2>

        {/* StatCards — staggered entrance */}
        <StaggerChildren className="grid grid-cols-2 gap-2 sm:gap-4" stagger={0.07} duration={0.35}>
          <StatCard
            icon={<BookOpen size={15} />}
            label="Chapters"
            value={stats.totalChapters}
            color="pink"
          />
          <StatCard
            icon={<Eye size={15} />}
            label="Reads"
            value={stats.totalReads.toLocaleString()}
            color="blue"
          />
          <StatCard
            icon={<Heart size={15} />}
            label="Votes"
            value={stats.totalVotes.toLocaleString()}
            color="pink"
          />
          <StatCard
            icon={<GitBranch size={15} />}
            label="Branches"
            value={stats.totalBranches}
            color="blue"
          />
          <StatCard
            icon={<Star size={15} />}
            label="Rating"
            value={stats.averageRating.toFixed(1)}
            color="orange"
          />
          <StatCard
            icon={<Users size={15} />}
            label="Collaborators"
            value={stats.uniqueContributors}
            color="pink"
          />
        </StaggerChildren>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color = 'pink',
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color?: 'pink' | 'blue' | 'orange' | 'purple';
}) {
  const colorStyles = {
    pink: 'text-brand-pink-500',
    blue: 'text-brand-blue',
    orange: 'text-brand-orange',
    purple: 'text-purple-500',
  };

  return (
    <div className="group border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center gap-3 rounded-md border px-3 py-2.5 transition-all">
      {/* Icon */}
      <div
        className={cn('flex h-8 w-8 items-center justify-center rounded-lg', colorStyles[color])}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-text-primary text-sm font-semibold">{value}</span>
        <span className="text-text-secondary-65 text-[11px]">{label}</span>
      </div>
    </div>
  );
}
