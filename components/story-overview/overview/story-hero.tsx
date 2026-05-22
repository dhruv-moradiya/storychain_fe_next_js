import Image from 'next/image';

import type { IStoryOverview } from '@/type/story';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BookOpen, Bookmark, Heart, Share2 } from 'lucide-react';

import {
  BadgeGroup,
  contentRatingBadge,
  genresBadges,
  storyStatusBadge,
} from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { StaggerChildren } from '@/lib/animations';

interface StoryHeroProps {
  story: IStoryOverview;
  onBack: () => void;
}

export function StoryHero({ story, onBack }: StoryHeroProps) {
  const { title, slug, status, settings, cardImage, stats } = story;
  return (
    <div className="space-y-6">
      {/* Top Actions */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10! text-text-secondary-65 hover:text-brand-pink-500 gap-2"
          onClick={onBack}
        >
          <ArrowLeft size={14} />
          Back
        </Button>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Notification Button */}
          <motion.button className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 hidden h-9 w-9 items-center justify-center rounded-lg border transition sm:flex">
            <Bell size={18} />
          </motion.button>

          {/* Like Button */}
          <motion.button className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 flex h-8 items-center gap-1 rounded-lg border px-2 transition sm:h-9 sm:px-3">
            <Heart size={14} />
            <span className="text-xs sm:text-sm">{stats?.totalVotes?.toLocaleString() || 0}</span>
          </motion.button>

          {/* Bookmark Button */}
          <motion.button className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 flex h-8 w-8 items-center justify-center rounded-lg border transition sm:h-9 sm:w-9">
            <Bookmark size={16} />
          </motion.button>

          {/* Share Button */}
          <motion.button className="border-border/50 text-text-secondary-65 hover:border-brand-pink-500/50 hover:text-brand-pink-500 flex h-8 w-8 items-center justify-center rounded-lg border transition sm:h-9 sm:w-9">
            <Share2 size={16} />
          </motion.button>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Card Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg border shadow-md sm:h-36 sm:w-24"
        >
          {cardImage?.url ? (
            <Image src={cardImage.url} alt={title} fill className="object-cover" />
          ) : (
            <div className="bg-muted flex h-full w-full items-center justify-center">
              <BookOpen className="text-foreground/40 h-5 w-5" />
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Slug */}
          <p className="text-text-secondary-65 font-ibm-plex-mono text-xs">{slug}</p>

          {/* Title */}
          <h1 className="text-text-primary text-lg font-bold sm:text-2xl md:text-3xl">{title}</h1>

          {/* Status & Content Rating — staggered */}
          <StaggerChildren className="flex flex-wrap gap-1.5" stagger={0.1} duration={0.35}>
            {storyStatusBadge(status)}
            {contentRatingBadge(settings.contentRating)}
          </StaggerChildren>

          {/* Genres — staggered */}
          {settings.genres.length > 0 && (
            <StaggerChildren className="flex flex-wrap gap-1.5" stagger={0.06} duration={0.3}>
              {genresBadges(settings.genres)}
            </StaggerChildren>
          )}

          {/* Tags — staggered */}
          {story.tags.length > 0 && (
            <StaggerChildren className="flex flex-wrap gap-1.5" stagger={0.05} duration={0.3}>
              {/* {tagsBadges(story.tags)} */}
              <BadgeGroup
                badges={story.tags.map((tag) => ({
                  label: tag,
                  color: 'pink',
                  shape: 'pill',
                  size: 'sm',
                }))}
                gap="xs"
                max={4}
              />
            </StaggerChildren>
          )}
        </div>
      </div>
    </div>
  );
}
