import Image from 'next/image';
import Link from 'next/link';

import type { ILatestChaptersResponse } from '@/type/story';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChartNoAxesColumn, Eye, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChapterPreviewProps {
  chapters: ILatestChaptersResponse[];
  continueChapter?: string;
}

export function ChapterPreview({ chapters }: ChapterPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="space-y-3 sm:space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <BookOpen size={16} className="text-brand-pink-500 sm:h-[18px] sm:w-[18px]" />
          Latest Chapters
        </h2>

        <Button
          variant="ghost"
          size="sm"
          className="text-brand-pink-500 hover:bg-brand-pink-500/10 gap-1 text-xs sm:text-sm"
        >
          View All
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* Chapters List */}
      <div className="space-y-2 sm:space-y-3">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.slug} chapter={chapter} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2 pt-3 sm:flex-row sm:gap-3 sm:pt-4">
        <Button className="from-brand-pink-500 to-brand-orange flex-1 gap-2 bg-linear-to-r text-sm text-white hover:opacity-90 sm:text-base">
          <BookOpen size={16} className="sm:h-[18px] sm:w-[18px]" />
          Start Reading
        </Button>
      </div>
    </motion.div>
  );
}

interface IChapterCardProps {
  chapter: ILatestChaptersResponse;
}

function ChapterCard({ chapter }: IChapterCardProps) {
  const { title, stats, author, storySlug, updatedAt } = chapter;

  const dateFormatted = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });

  return (
    <Link
      href={`/stories/${storySlug}/chapter/${chapter.slug}`}
      className={cn(
        'border-soft relative block w-full cursor-pointer rounded-xl border p-3 sm:p-4',
        'hover:border-brand-pink-500/50 transition-all hover:shadow-sm'
      )}
    >
      {/* Author */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative h-8 w-8">
          <Image
            src={
              author.avatar ||
              'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg'
            }
            alt={author.username}
            fill
            className="border-brand-pink-500/30 rounded-full border object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-text-primary text-xs font-medium sm:text-sm">
            {author.username}
          </span>
          <span className="text-text-secondary-65 ml-1.5 text-[10px] sm:ml-2 sm:text-xs">
            • Author
          </span>
        </div>

        <span className="text-text-secondary-65 text-[10px] whitespace-nowrap sm:text-xs">
          {dateFormatted}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-text-primary mt-2 text-sm leading-snug font-semibold sm:mt-3 sm:text-base">
        {title}
      </h3>

      {/* Stats */}
      <div className="text-text-secondary-65 mt-2 flex items-center gap-3 text-[10px] sm:mt-3 sm:gap-4 sm:text-xs">
        <span className="flex items-center gap-1">
          <Eye size={12} className="text-blue-500 sm:h-3.5 sm:w-3.5" />
          {stats.reads.toLocaleString()}
        </span>

        <span className="flex items-center gap-1">
          <MessageSquare size={12} className="text-green-500 sm:h-3.5 sm:w-3.5" />
          {stats.comments}
        </span>

        <span className="flex items-center gap-1">
          <ChartNoAxesColumn size={12} className="text-purple-500 sm:h-3.5 sm:w-3.5" />
          {stats.engagementScore}
        </span>
      </div>
    </Link>
  );
}
