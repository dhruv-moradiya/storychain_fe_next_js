'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';

const TRENDING_STORIES = [
  {
    title: 'The Outlaws of Neon City',
    tagline: 'In a city of light, shadows rule.',
    author: 'CyberPunk2077',
    genre: 'Sci-Fi',
    branches: 124,
    reads: 45200,
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
    date: '2 hours ago',
  },
  {
    title: 'Echoes of the Forgotten Empire',
    tagline: 'A throne lost. A lineage cursed. A destiny rewritten.',
    author: 'LoreMaster',
    genre: 'Fantasy',
    branches: 89,
    reads: 32100,
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
    date: '3 hours ago',
  },
  {
    title: 'Whispers in the Manor',
    tagline: 'Some secrets should stay buried.',
    author: 'GhostWriter',
    genre: 'Horror',
    branches: 56,
    reads: 18400,
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
    date: '1 hours ago',
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
          <h2 className="font-libre-baskerville text-foreground text-xl font-bold tracking-tight md:text-3xl">
            Trending This Week
          </h2>
          <p className="text-muted-foreground">
            The stories everyone is reading & writing right now
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
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TRENDING_STORIES.map((story) => (
          <div key={story.title} className="group flex cursor-pointer flex-col gap-3">
            {/* Image Container */}
            <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-lg border shadow-sm transition-shadow group-hover:shadow-md">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* <div className="absolute top-2 left-2">
                {textBadge('Trending', 'amber', {
                  className: 'shadow-sm border-non bg-amber-500/50! text-amber-100!',
                })}
              </div> */}
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 line-clamp-1 text-base leading-tight font-bold transition-colors">
                {story.title}
              </h3>
              <p className="text-muted-foreground line-clamp-1 text-xs">by {story.author}</p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-brand-teal text-[10px] font-medium tracking-wider uppercase">
                  {story.genre}
                </span>
                <div className="text-muted-foreground flex items-center gap-1 text-[10px]">
                  <Clock size={10} />
                  <span>{story.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
