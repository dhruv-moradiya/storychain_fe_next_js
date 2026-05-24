import Image from 'next/image';

import { Clock } from 'lucide-react';

import { textBadge } from '@/components/common/badge';

const NEW_RELEASES = [
  {
    title: 'Neon Nights',
    author: 'CyberPunk2077',
    genre: 'Sci-Fi',
    date: '2 hours ago',
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
  {
    title: 'The Silent King',
    author: 'LoreMaster',
    genre: 'Fantasy',
    date: '5 hours ago',
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
  },
  {
    title: 'Midnight Shadows',
    author: 'GhostWriter',
    genre: 'Horror',
    date: '1 day ago',
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
  },
  {
    title: 'A Royal Affair',
    author: 'RomanceQueen',
    genre: 'Romance',
    date: '1 day ago',
    image: 'https://i.pinimg.com/1200x/c9/fb/d1/c9fbd1f133ba07267a8b0df433e57cb9.jpg',
  },
  {
    title: 'The Last Stand',
    author: 'ActionHero',
    genre: 'Action',
    date: '2 days ago',
    image: 'https://i.pinimg.com/736x/5b/5f/49/5b5f49f21bb1356ae1c359fb6bc29e6a.jpg',
  },
  {
    title: 'Secrets of the Deep',
    author: 'OceanExplorer',
    genre: 'Adventure',
    date: '3 days ago',
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
];

export function NewReleasesSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            Fresh Off the Page
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Brand new stories - be the first to shape where they go
          </p>
        </div>

        <div className="hidden rounded-full border p-1 sm:flex">
          <button className="bg-muted rounded-full px-3 py-1 text-xs font-medium">7 Days</button>
          <button className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1 text-xs font-medium">
            30 Days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {NEW_RELEASES.map((story) => (
          <div key={story.title} className="group flex cursor-pointer flex-col gap-3">
            <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-lg border shadow-sm transition-shadow group-hover:shadow-md">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* <div className="absolute top-2 left-2">
                {textBadge('New', 'pink', { className: 'shadow-sm border-none' })}
              </div> */}
            </div>

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
