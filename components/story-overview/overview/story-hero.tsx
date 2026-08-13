'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { IStoryOverview } from '@/type/story';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BookOpen, Bookmark, Heart, Maximize2, Share2 } from 'lucide-react';

import {
  BadgeGroup,
  contentRatingBadge,
  genresBadges,
  storyStatusBadge,
} from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StaggerChildren } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface StoryHeroProps {
  story: IStoryOverview;
  onBack: () => void;
}

export function StoryHero({ story, onBack }: StoryHeroProps) {
  const { title, slug, status, settings, cardImage, stats } = story;
  const [isImageOpen, setIsImageOpen] = useState(false);

  const displayThumbnail = cardImage?.thumbnailUrl || cardImage?.url;

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Card Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'relative mx-auto h-48 w-32 shrink-0 overflow-hidden rounded-xl border shadow-lg sm:mx-0 sm:h-36 sm:w-24 md:h-64 md:w-44',
            cardImage?.url && 'group cursor-pointer'
          )}
          onClick={() => cardImage?.url && setIsImageOpen(true)}
        >
          {displayThumbnail ? (
            <>
              <Image
                src={displayThumbnail}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {cardImage?.url && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="bg-background/80 text-foreground flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur-xs">
                    <Maximize2 size={16} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted flex h-full w-full items-center justify-center">
              <BookOpen className="text-foreground/40 h-5 w-5" />
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <p className="text-text-secondary-65 font-ibm-plex-mono text-xs">{slug}</p>

          <h1 className="text-text-primary text-lg font-bold sm:text-2xl md:text-3xl">{title}</h1>

          <StaggerChildren
            className="flex flex-wrap justify-center gap-1.5 sm:justify-start"
            stagger={0.1}
            duration={0.35}
          >
            {storyStatusBadge(status)}
            {contentRatingBadge(settings.contentRating)}
          </StaggerChildren>

          {settings.genres.length > 0 && (
            <StaggerChildren
              className="flex flex-wrap justify-center gap-1.5 sm:justify-start"
              stagger={0.06}
              duration={0.3}
            >
              {genresBadges(settings.genres)}
            </StaggerChildren>
          )}

          {story.tags.length > 0 && (
            <StaggerChildren
              className="flex flex-wrap justify-center gap-1.5 sm:justify-start"
              stagger={0.05}
              duration={0.3}
            >
              <BadgeGroup
                className="justify-center sm:justify-start"
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

      {/* Full Image Preview Dialog */}
      {cardImage?.url && (
        <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
          <DialogContent className="border-border/50 bg-card/95 max-w-xl gap-0 overflow-hidden rounded-2xl p-0 shadow-2xl backdrop-blur-md">
            <DialogHeader className="border-border/30 border-b px-5 py-3.5">
              <DialogTitle className="text-text-primary text-sm font-semibold">
                {title} <span className="text-text-secondary-65">- Card Image</span>
              </DialogTitle>
            </DialogHeader>
            <div className="relative flex max-h-[80vh] min-h-75 w-full items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cardImage.url}
                alt={title}
                className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
