import Image from 'next/image';

import { BookOpen, CheckCircle2, GitMerge } from 'lucide-react';

import { iconBadge } from '@/components/common/badge';

const COMPLETED_STORIES = [
  {
    title: "The Alchemist's Daughter",
    chapters: 24,
    branches: 89,
    date: 'Dec 2025',
    readTime: '4.5 hours',
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
  },
  {
    title: 'A Dance with Dragons',
    chapters: 42,
    branches: 156,
    date: 'Jan 2026',
    readTime: '8.2 hours',
    image: 'https://i.pinimg.com/1200x/c9/fb/d1/c9fbd1f133ba07267a8b0df433e57cb9.jpg',
  },
  {
    title: 'Silicon Heartbreak',
    chapters: 18,
    branches: 45,
    date: 'Feb 2026',
    readTime: '3.1 hours',
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
  {
    title: 'The Last Train to Nowhere',
    chapters: 15,
    branches: 32,
    date: 'Mar 2026',
    readTime: '2.5 hours',
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
  },
];

export function CompletedStoriesSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Stories Worth Savoring
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Complete worlds - fully written, fully explored
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
        {COMPLETED_STORIES.map((story) => (
          <div key={story.title} className="group flex cursor-pointer flex-col gap-2 sm:gap-3">
            {/* Cover — 2:3 aspect ratio matching NewReleasesSection */}
            <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-md border shadow-sm transition-shadow group-hover:shadow-md lg:rounded-lg">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 z-10">
                {iconBadge('Complete', CheckCircle2, 'success', {
                  className: 'border-none shadow-sm text-[9px] sm:text-[10px]',
                })}
              </div>
            </div>

            {/* Details below cover */}
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 line-clamp-2 text-xs leading-tight font-bold transition-colors sm:text-sm lg:text-base">
                {story.title}
              </h3>

              <div className="text-muted-foreground flex items-center justify-between pt-0.5 text-[9px] sm:text-[10px]">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {story.chapters} Chs
                </span>
                <span className="flex items-center gap-1">
                  <GitMerge className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {story.branches} Branches
                </span>
              </div>

              <div className="text-muted-foreground flex items-center justify-between pt-0.5 text-[9px] sm:text-[10px]">
                <span className="text-foreground font-medium">{story.readTime}</span>
                <span className="truncate">{story.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
