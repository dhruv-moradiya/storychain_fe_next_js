import Image from 'next/image';

import { Clock } from 'lucide-react';

import { textBadge } from '../common/badge';

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RECENT_UPDATES.map((update) => (
          <div
            key={update.title}
            className="group flex cursor-pointer items-center gap-4 rounded-xl border p-2 transition-all hover:shadow-md"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md shadow-sm">
              <Image
                src={update.image}
                alt={update.title}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center space-y-1">
              <div className="flex items-center gap-2">
                {textBadge(update.updateType, 'info', { size: 'xs' })}
              </div>
              <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 truncate text-base font-bold transition-colors">
                {update.title}
              </h3>
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span className="truncate">by {update.author}</span>
                <span className="flex shrink-0 items-center gap-1">
                  <Clock size={10} /> {update.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
