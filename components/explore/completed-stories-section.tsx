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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMPLETED_STORIES.map((story) => (
          <div
            key={story.title}
            className="group bg-card cursor-pointer overflow-hidden rounded-xl border transition-all hover:shadow-md"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-3 left-3">
                {iconBadge('Complete', CheckCircle2, 'success', {
                  className: 'border-none shadow-sm',
                })}
              </div>
              <h3 className="font-libre-baskerville absolute right-3 bottom-3 left-3 line-clamp-1 text-lg font-bold text-white">
                {story.title}
              </h3>
            </div>

            <div className="bg-card text-muted-foreground grid grid-cols-2 gap-x-2 gap-y-3 p-4 text-xs">
              <div className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-foreground/70" />
                <span>{story.chapters} Chapters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitMerge size={14} className="text-foreground/70" />
                <span>{story.branches} Branches</span>
              </div>
              <div className="col-span-2 flex items-center justify-between border-t pt-3">
                <span className="text-foreground font-medium">{story.readTime}</span>
                <span>Finished {story.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
