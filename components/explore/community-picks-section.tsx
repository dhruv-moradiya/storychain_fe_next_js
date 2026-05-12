import Image from 'next/image';

import { Award, Star } from 'lucide-react';

import { iconBadge } from '@/components/common/badge';

const COMMUNITY_PICKS = [
  {
    title: "The Alchemist's Daughter",
    genre: 'Fantasy',
    rating: 4.9,
    votes: 12450,
    rank: 1,
    isEditorPick: true,
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
  },
  {
    title: 'Silicon Heartbreak',
    genre: 'Sci-Fi Romance',
    rating: 4.8,
    votes: 9820,
    rank: 2,
    isEditorPick: false,
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
  {
    title: 'The Last Train to Nowhere',
    genre: 'Mystery',
    rating: 4.7,
    votes: 8430,
    rank: 3,
    isEditorPick: false,
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
  },
  {
    title: 'A Dance with Dragons',
    genre: 'Dark Fantasy',
    rating: 4.7,
    votes: 7900,
    rank: 4,
    isEditorPick: false,
    image: 'https://i.pinimg.com/1200x/c9/fb/d1/c9fbd1f133ba07267a8b0df433e57cb9.jpg',
  },
  {
    title: 'Echoes of Summer',
    genre: 'Slice of Life',
    rating: 4.6,
    votes: 6200,
    rank: 5,
    isEditorPick: false,
    image: 'https://i.pinimg.com/736x/5b/5f/49/5b5f49f21bb1356ae1c359fb6bc29e6a.jpg',
  },
];

export function CommunityPicksSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Loved by the Community
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Reader-voted favorites across all genres
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Top Pick Highlight */}
        <div className="group bg-card relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border sm:flex-row lg:col-span-1">
          <div className="absolute top-3 left-3 z-10">
            {COMMUNITY_PICKS[0].isEditorPick &&
              iconBadge("Editor's Pick", Award, 'orange', { className: 'border-none shadow-md' })}
          </div>
          <div className="relative h-64 w-full shrink-0 sm:h-full sm:w-1/2">
            <Image
              src={COMMUNITY_PICKS[0].image}
              alt={COMMUNITY_PICKS[0].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 flex items-end gap-2 text-white sm:hidden">
              <span className="font-libre-baskerville text-6xl leading-none font-bold opacity-80">
                1
              </span>
            </div>
          </div>
          <div className="relative flex flex-1 flex-col justify-center p-6">
            <div className="font-libre-baskerville text-muted/30 pointer-events-none absolute top-4 right-4 hidden text-8xl font-bold select-none sm:block">
              1
            </div>
            <span className="text-brand-pink-500 mb-2 text-xs font-semibold tracking-wider uppercase">
              {COMMUNITY_PICKS[0].genre}
            </span>
            <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 z-10 mb-4 text-2xl leading-tight font-bold transition-colors">
              {COMMUNITY_PICKS[0].title}
            </h3>
            <div className="z-10 flex items-center gap-2">
              <div className="text-brand-orange flex items-center gap-1">
                <Star size={18} className="fill-current" />
                <span className="font-bold">{COMMUNITY_PICKS[0].rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({(COMMUNITY_PICKS[0].votes / 1000).toFixed(1)}k votes)
              </span>
            </div>
          </div>
        </div>

        {/* Other Picks List */}
        <div className="flex flex-col gap-3 lg:col-span-1">
          {COMMUNITY_PICKS.slice(1).map((story) => (
            <div
              key={story.title}
              className="group bg-card hover:bg-muted/50 flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-colors"
            >
              <div className="font-libre-baskerville text-muted-foreground/50 group-hover:text-brand-pink-400 w-8 shrink-0 text-center text-2xl font-bold transition-colors">
                {story.rank}
              </div>
              <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md shadow-sm">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h4 className="font-libre-baskerville group-hover:text-brand-pink-500 truncate text-base font-bold transition-colors">
                  {story.title}
                </h4>
                <div className="mt-1 flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground max-w-[100px] truncate">
                    {story.genre}
                  </span>
                  <div className="text-brand-orange flex items-center gap-1">
                    <Star size={12} className="fill-current" />
                    <span className="font-medium">{story.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
