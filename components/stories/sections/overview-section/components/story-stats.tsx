import type { IStoryOverview } from '@/type/story';
import { format, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Eye, GitBranch, Heart, RefreshCw, Star, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-soft space-y-3 rounded-xl border p-4 sm:space-y-4 sm:p-5"
      >
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <BookOpen size={16} className="text-brand-pink-500 sm:h-[18px] sm:w-[18px]" />
          About This Story
        </h2>

        <div
          className="text-text-secondary text-justify font-serif text-[15px] leading-[1.75] tracking-[0.01em] sm:text-base sm:leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: description }}
        />

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
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="border-soft space-y-3 rounded-xl border p-4 sm:space-y-4 sm:p-5"
      >
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Star size={16} className="text-brand-orange sm:h-[18px] sm:w-[18px]" />
          Statistics
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
        </div>
      </motion.div>
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
