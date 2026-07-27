import Image from 'next/image';

import { Clock } from 'lucide-react';

import { textBadge } from '@/components/common/badge';

const RECENT_UPDATES = [
  {
    title: 'The Silent King',
    updateType: 'New Branch',
    author: 'LoreMaster',
    time: '15 mins ago',
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
  },
  {
    title: 'Neon Nights',
    updateType: 'Continuation',
    author: 'CyberPunk2077',
    time: '1 hour ago',
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
  {
    title: 'A Royal Affair',
    updateType: 'New Chapter',
    author: 'RomanceQueen',
    time: '3 hours ago',
    image: 'https://i.pinimg.com/1200x/c9/fb/d1/c9fbd1f133ba07267a8b0df433e57cb9.jpg',
  },
  {
    title: 'Midnight Shadows',
    updateType: 'New Branch',
    author: 'GhostWriter',
    time: '5 hours ago',
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
  },
];

export function RecentlyUpdatedSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          New Chapters Added
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Stories that just got a new branch or chapter - jump back in
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
        {RECENT_UPDATES.map((update) => (
          <div key={update.title} className="group flex cursor-pointer flex-col gap-2 sm:gap-3">
            {/* Cover image matching NewReleasesSection */}
            <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-md border shadow-sm transition-shadow group-hover:shadow-md lg:rounded-lg">
              <Image
                src={update.image}
                alt={update.title}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 z-10">
                {textBadge(update.updateType, 'info', { size: 'xs', className: 'shadow-sm' })}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 line-clamp-2 text-xs leading-tight font-bold transition-colors sm:text-sm lg:text-base">
                {update.title}
              </h3>
              <p className="text-muted-foreground line-clamp-1 text-[10px] sm:text-xs">
                by {update.author}
              </p>
              <div className="flex items-center justify-between pt-0.5 sm:pt-1">
                <div className="text-muted-foreground flex items-center gap-1 text-[9px] sm:text-[10px]">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span>{update.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
