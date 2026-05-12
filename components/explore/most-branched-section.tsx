'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { ArrowDownToDot, ChevronLeft, ChevronRight, GitMerge, Users } from 'lucide-react';

import { genreBadge } from '@/components/common/badge';
import { Button } from '@/components/ui/button';

const BRANCHED_STORIES = [
  {
    title: 'The Infinite Labyrinth',
    genre: 'Fantasy',
    branches: 428,
    contributors: 156,
    depth: 42,
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
    rank: 1,
  },
  {
    title: 'Cyberpunk: Neon Genesis',
    genre: 'Sci-Fi',
    branches: 312,
    contributors: 89,
    depth: 28,
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
    rank: 2,
  },
  {
    title: 'Chronicles of Eldoria',
    genre: 'Fantasy',
    branches: 245,
    contributors: 112,
    depth: 35,
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
    rank: 3,
  },
  {
    title: 'The Mars Colony Paradox',
    genre: 'Sci-Fi',
    branches: 198,
    contributors: 64,
    depth: 19,
    image: 'https://i.pinimg.com/1200x/c9/fb/d1/c9fbd1f133ba07267a8b0df433e57cb9.jpg',
    rank: 4,
  },
  {
    title: 'Whispers in the Code',
    genre: 'Mystery',
    branches: 154,
    contributors: 42,
    depth: 12,
    image: 'https://i.pinimg.com/736x/5b/5f/49/5b5f49f21bb1356ae1c359fb6bc29e6a.jpg',
    rank: 5,
  },
  {
    title: 'Empire of Dust',
    genre: 'Historical',
    branches: 132,
    contributors: 38,
    depth: 15,
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
    rank: 6,
  },
  {
    title: 'The Last Starship',
    genre: 'Sci-Fi',
    branches: 110,
    contributors: 25,
    depth: 8,
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
    rank: 7,
  },
];

export function MostBranchedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : 200;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mb-16 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            Choose Your Path
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            These stories have the richest branching universes - dozens of paths, written by the
            community
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

      {/* Uniform card row — no scrollbar, nav by buttons */}
      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {BRANCHED_STORIES.map((story) => (
          <div
            key={story.title}
            className="group bg-card relative flex w-[45vw] shrink-0 snap-start flex-col overflow-hidden rounded-xl border transition-all hover:shadow-md sm:w-48 lg:w-48"
          >
            {/* Rank Badge */}
            <div className="bg-background/90 absolute top-3 left-3 z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shadow-sm backdrop-blur-sm">
              #{story.rank}
            </div>

            {/* Cover — fixed height for uniformity */}
            <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div className="mb-3 space-y-2">
                {genreBadge(story.genre)}
                <h3 className="font-libre-baskerville group-hover:text-brand-purple line-clamp-2 text-base leading-tight font-bold transition-colors">
                  {story.title}
                </h3>
              </div>

              <div className="space-y-2.5">
                {/* Branch visualization bar */}
                <div className="space-y-1">
                  <div className="text-foreground/80 flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <GitMerge size={12} className="text-brand-pink-500" /> {story.branches}{' '}
                      Branches
                    </span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="from-brand-pink-400 to-brand-purple h-full rounded-full bg-gradient-to-r"
                      style={{ width: `${Math.min(100, (story.branches / 500) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="border-border/50 grid grid-cols-2 gap-2 border-t pt-2">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Users size={12} />
                    <span>{story.contributors} writers</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <ArrowDownToDot size={12} />
                    <span>Depth: {story.depth}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
