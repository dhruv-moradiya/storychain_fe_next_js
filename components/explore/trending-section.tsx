'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { ChevronLeft, ChevronRight, Eye, Flame, GitMerge } from 'lucide-react';

import { genreBadge } from '@/components/common/badge';
import { Button } from '@/components/ui/button';

import { TrendingBadge } from '../common/badge/factories';

const TRENDING_STORIES = [
  {
    title: 'The Outlaws of Neon City',
    tagline: 'In a city of light, shadows rule.',
    author: 'CyberPunk2077',
    genre: 'Sci-Fi',
    branches: 124,
    reads: 45200,
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
  {
    title: 'Echoes of the Forgotten Empire',
    tagline: 'A throne lost. A lineage cursed. A destiny rewritten.',
    author: 'LoreMaster',
    genre: 'Fantasy',
    branches: 89,
    reads: 32100,
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
  },
  {
    title: 'Whispers in the Manor',
    tagline: 'Some secrets should stay buried.',
    author: 'GhostWriter',
    genre: 'Horror',
    branches: 56,
    reads: 18400,
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
  },
];

export function TrendingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mb-16 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-libre-baskerville text-foreground text-3xl font-bold tracking-tight">
            Trending This Week
          </h2>
          <p className="text-muted-foreground">
            The stories everyone is reading - and writing - right now
          </p>
        </div>

        {/* Nav buttons */}
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll('left')}
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scroll('right')}
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* No scrollbar - only < > buttons */}
      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TRENDING_STORIES.map((story) => (
          <div
            key={story.title}
            className="group bg-muted/30 relative flex w-[85vw] shrink-0 snap-center flex-col overflow-hidden rounded-md border sm:w-[500px] md:w-[600px] lg:h-[320px] lg:flex-row"
          >
            {/* Image Container */}
            <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden lg:aspect-auto lg:h-full lg:w-[280px]">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
              <TrendingBadge
                label="Trending"
                icon={Flame}
                iconPosition="left"
                iconColor="currentColor"
                className="bg-brand-orange/30! absolute top-3 left-3 gap-1 border-none px-2 py-1"
              />
            </div>

            {/* Content */}
            <div className="lg:bg-background/50 flex flex-1 flex-col justify-between p-5 lg:p-6">
              <div className="space-y-3">
                {genreBadge(story.genre)}
                <div>
                  <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 mb-1 line-clamp-2 text-xl leading-tight font-bold transition-colors sm:text-2xl">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">{story.tagline}</p>
                </div>
                <p className="text-foreground/80 text-xs font-medium">
                  By <span className="text-brand-blue">{story.author}</span>
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-muted-foreground font-ibm-plex-mono flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <GitMerge size={14} />
                    <span>{story.branches} paths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{(story.reads / 1000).toFixed(1)}k reads</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="bg-foreground text-background hover:bg-foreground/90 shrink-0 rounded-full px-4 font-semibold"
                >
                  Read Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
