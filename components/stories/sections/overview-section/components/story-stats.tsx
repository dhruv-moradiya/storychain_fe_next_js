import { motion } from 'framer-motion';
import { BookOpen, Eye, Heart, Users, Star, Calendar, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import type { IStory } from '@/type/story';

interface StoryStatsProps {
  story: IStory;
}

export function StoryStats({ story }: StoryStatsProps) {
  const { description, stats, status, createdAt, lastActivityAt } = story;
  // Formatting dates using date-fns
  // eslint-disable-next-line react-hooks/purity
  const startedAt = format(new Date(createdAt || Date.now()), 'MMM yyyy');
  const updatedAgo = formatDistanceToNow(new Date(lastActivityAt), { addSuffix: true });

  // Progress logic (placeholders for now if not in API)
  const progressPercent = 0;
  const estimatedChapters = 0;

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-border/50 space-y-3 rounded-xl border p-4 sm:space-y-4 sm:p-5"
      >
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <BookOpen size={16} className="text-brand-pink-500 sm:h-[18px] sm:w-[18px]" />
          About This Story
        </h2>

        <div
          className="text-text-secondary font-serif text-[15px] leading-[1.75] tracking-[0.01em] sm:text-base sm:leading-[1.8]"
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
        className="border-border/50 space-y-3 rounded-xl border p-4 sm:space-y-4 sm:p-5"
      >
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Star size={16} className="text-brand-orange sm:h-[18px] sm:w-[18px]" />
          Statistics
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <StatCard
            icon={<BookOpen size={16} />}
            label="Chapters"
            value={stats.totalChapters}
            color="pink"
          />
          <StatCard
            icon={<Eye size={16} />}
            label="Reads"
            value={stats.totalReads.toLocaleString()}
            color="blue"
          />
          <StatCard
            icon={<Heart size={16} />}
            label="Votes"
            value={stats.totalVotes.toLocaleString()}
            color="red"
          />
          <StatCard
            icon={<Users size={16} />}
            label="Contributors"
            value={stats.uniqueContributors}
            color="purple"
          />
        </div>

        {/* Rating */}
        <div className="text-text-secondary-65 flex items-center gap-2 text-sm">
          <span className="text-yellow-500">⭐</span>
          <span>
            Rating: <strong className="text-text-primary">{stats.averageRating.toFixed(1)}</strong>{' '}
            ({stats.totalVotes.toLocaleString()} votes)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="bg-muted/50 h-2 w-full overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="from-brand-pink-500 to-brand-orange h-full bg-linear-to-r"
            />
          </div>
          <p className="text-text-secondary-65 text-xs">
            Progress: {progressPercent}% (Est. {estimatedChapters} chapters)
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color: 'pink' | 'blue' | 'red' | 'purple';
}) {
  const colorStyles = {
    pink: 'text-brand-pink-500 border-brand-pink-500/30',
    blue: 'text-blue-500 border-blue-500/30',
    red: 'text-red-500 border-red-500/30',
    purple: 'text-purple-500 border-purple-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'flex items-center justify-between rounded-lg border p-2 sm:p-3',
        colorStyles[color]
      )}
    >
      <div className="text-text-secondary-65 flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-xs">
        <span className={cn(colorStyles[color].split(' ')[0])}>{icon}</span>
        {label}
      </div>
      <span className="text-text-primary text-xs font-bold sm:text-sm">{value}</span>
    </motion.div>
  );
}
