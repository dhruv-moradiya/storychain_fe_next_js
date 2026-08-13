'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { IStory } from '@/type/story/story.types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Eye, FileText } from 'lucide-react';

import { DashboardGrid } from '@/components/dashboard/layout/dashboard-grid';

interface LegacyStory {
  id: string;
  title: string;
  slug: string;
  coverUrl?: string;
  genre?: string;
  rating?: number;
  reads?: number;
  chapters?: number;
  description?: string;
  createdAt?: string | Date;
}

type StoryItem = IStory | LegacyStory;

interface UserProfileStoriesProps {
  stories?: StoryItem[];
  username: string;
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

function ExploreStyleStoryCard({ story, username }: { story: StoryItem; username: string }) {
  const [imgError, setImgError] = useState(false);

  const isFullStory = '_id' in story;
  const id = isFullStory ? story._id : story.id;
  const coverUrl = isFullStory ? story.cardImage?.url || story.coverImage?.url : story.coverUrl;
  const genre = isFullStory ? story.genres?.[0] || 'General' : story.genre || 'General';
  const rating = isFullStory ? (story.stats?.averageRating ?? 0) : (story.rating ?? 0);
  const reads = isFullStory ? (story.stats?.totalReads ?? 0) : (story.reads ?? 0);
  const chapters = isFullStory ? (story.stats?.totalChapters ?? 0) : (story.chapters ?? 0);

  const showCover = coverUrl && !imgError;
  const createdAtDate = isFullStory && story.createdAt ? new Date(story.createdAt) : null;
  const formattedTime =
    createdAtDate && !isNaN(createdAtDate.getTime())
      ? formatDistanceToNow(createdAtDate, { addSuffix: true })
      : null;

  return (
    <Link
      key={id}
      href={`/stories/${story.slug}/overview`}
      className="group flex cursor-pointer flex-col gap-2 sm:gap-3"
    >
      {/* Cover Image Container (400x600px 2:3 ratio) */}
      <div className="border-primary/20 bg-muted relative aspect-2/3 w-full overflow-hidden rounded-md border shadow-sm transition-all group-hover:shadow-md lg:rounded-lg">
        {showCover ? (
          <Image
            src={coverUrl}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="bg-muted/80 flex h-full w-full flex-col items-center justify-center p-3 text-center">
            <BookOpen className="text-muted-foreground/50 mb-1.5 h-8 w-8" />
            <span className="text-muted-foreground line-clamp-2 text-xs font-semibold">
              {story.title}
            </span>
          </div>
        )}
      </div>

      {/* Content Metadata Below Cover */}
      <div className="space-y-1">
        <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 line-clamp-2 text-xs leading-tight font-bold transition-colors sm:text-sm lg:text-base">
          {story.title}
        </h3>

        <p className="text-muted-foreground line-clamp-1 text-[10px] sm:text-xs">by {username}</p>

        <div className="flex items-center justify-between pt-0.5 sm:pt-1">
          <span className="text-brand-teal truncate text-[9px] font-medium tracking-wide uppercase sm:text-[10px]">
            {genre}
          </span>

          <div className="text-muted-foreground flex items-center gap-2 text-[9px] sm:text-[10px]">
            {reads > 0 && (
              <span className="flex items-center gap-0.5">
                <Eye size={10} />
                {formatNumber(reads)}
              </span>
            )}
            {chapters > 0 && (
              <span className="flex items-center gap-0.5">
                <FileText size={10} />
                {chapters}
              </span>
            )}
            {formattedTime && (
              <span className="hidden items-center gap-1 sm:flex">
                <Clock size={10} />
                <span>{formattedTime}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function UserProfileStories({ stories = [], username }: UserProfileStoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-libre-baskerville text-foreground text-lg font-bold sm:text-xl">
            Featured Stories
          </h3>
          <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
            {stories.length}
          </span>
        </div>

        {stories.length > 0 && (
          <Link
            href={`/stories?creator=${username}`}
            className="text-primary flex items-center gap-1 text-xs transition-colors hover:underline"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>

      {stories.length > 0 ? (
        <DashboardGrid minItemWidth={170} gap="md">
          {stories.map((story) => (
            <ExploreStyleStoryCard
              key={'_id' in story ? story._id : story.id}
              story={story}
              username={username}
            />
          ))}
        </DashboardGrid>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <BookOpen className="text-muted-foreground/40 mb-2 h-10 w-10" />
          <p className="text-muted-foreground text-sm">No stories published yet</p>
        </div>
      )}
    </motion.div>
  );
}

export { UserProfileStories };
