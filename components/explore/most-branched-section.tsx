'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { ArrowDownToDot, ChevronLeft, ChevronRight, GitMerge, Users } from 'lucide-react';

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
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:gap-4 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {BRANCHED_STORIES.map((story) => (
          <div
            key={story.title}
            className="group flex w-[130px] shrink-0 cursor-pointer snap-start flex-col gap-2 transition-transform sm:w-44 sm:gap-3 lg:w-48"
          >
            {/* Cover — 2:3 aspect ratio matching NewReleasesSection */}
            <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-md border shadow-sm transition-shadow group-hover:shadow-md lg:rounded-lg">
              {/* Rank Badge */}
              <div className="bg-background/90 text-foreground border-border/50 absolute top-2 left-2 z-10 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-sm backdrop-blur-sm sm:h-6 sm:w-6 sm:text-xs">
                #{story.rank}
              </div>

              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Details */}
            <div className="space-y-1">
              <span className="text-brand-teal truncate text-[9px] font-medium tracking-wide uppercase sm:text-[10px]">
                {story.genre}
              </span>

              <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 line-clamp-2 text-xs leading-tight font-bold transition-colors sm:text-sm lg:text-base">
                {story.title}
              </h3>

              {/* Branch visualization bar */}
              <div className="space-y-1 pt-0.5">
                <div className="text-muted-foreground flex items-center justify-between text-[9px] font-medium sm:text-[10px]">
                  <span className="flex items-center gap-1">
                    <GitMerge className="text-brand-pink-500 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span className="text-foreground font-semibold">{story.branches}</span> Branches
                  </span>
                </div>
                <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
                  <div
                    className="from-brand-pink-400 to-brand-purple h-full rounded-full bg-linear-to-r"
                    style={{ width: `${Math.min(100, (story.branches / 500) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Writers & Depth */}
              <div className="text-muted-foreground flex items-center justify-between pt-0.5 text-[9px] sm:text-[10px]">
                <span className="flex items-center gap-1 truncate">
                  <Users className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
                  {story.contributors} writers
                </span>
                <span className="flex shrink-0 items-center gap-0.5">
                  <ArrowDownToDot className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
                  Depth: {story.depth}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
