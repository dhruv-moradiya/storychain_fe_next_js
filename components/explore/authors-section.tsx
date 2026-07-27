import { BookText, TrendingUp, Users } from 'lucide-react';

import { iconBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const AUTHORS = [
  {
    name: 'LoreMaster',
    username: '@loremaster',
    genre: 'High Fantasy',
    stories: 12,
    readers: '45.2k',
    isRising: false,
    image: 'https://i.pravatar.cc/150?u=loremaster',
  },
  {
    name: 'CyberPunk2077',
    username: '@cyberpunk',
    genre: 'Sci-Fi',
    stories: 8,
    readers: '32.1k',
    isRising: true,
    image: 'https://i.pravatar.cc/150?u=cyberpunk',
  },
  {
    name: 'GhostWriter',
    username: '@ghostwriter',
    genre: 'Horror / Mystery',
    stories: 15,
    readers: '28.4k',
    isRising: false,
    image: 'https://i.pravatar.cc/150?u=ghostwriter',
  },
  {
    name: 'RomanceQueen',
    username: '@romancequeen',
    genre: 'Romance',
    stories: 24,
    readers: '89.5k',
    isRising: false,
    image: 'https://i.pravatar.cc/150?u=romancequeen',
  },
];

export function AuthorsSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Voices That Shape Stories
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Discover writers building incredible worlds on Storychain
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {AUTHORS.map((author) => (
          <div
            key={author.username}
            className="group bg-card relative flex flex-col items-center justify-between rounded-xl border p-4 text-center transition-shadow hover:shadow-md sm:p-5 lg:p-6"
          >
            {author.isRising && (
              <div className="absolute top-2 left-2 z-10 sm:top-3 sm:left-3">
                {iconBadge('Rising', TrendingUp, 'pink', {
                  className: 'border-none shadow-sm text-[9px] sm:text-[10px]',
                })}
              </div>
            )}

            <div className="flex flex-col items-center">
              <Avatar className="border-muted mb-2.5 h-14 w-14 border-2 shadow-sm transition-transform group-hover:scale-105 sm:mb-3 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <h3 className="font-libre-baskerville line-clamp-1 text-xs font-bold sm:text-sm lg:text-base">
                {author.name}
              </h3>
              <p className="text-muted-foreground line-clamp-1 text-[10px] sm:text-xs">
                {author.username}
              </p>
              <p className="text-brand-teal mt-0.5 mb-2.5 line-clamp-1 text-[9px] font-medium tracking-wide uppercase sm:mb-3 sm:text-[10px]">
                {author.genre}
              </p>
            </div>

            <div className="w-full">
              <div className="border-border/60 mb-3 flex w-full justify-between border-y py-2 text-[10px] sm:py-2.5 sm:text-xs">
                <div className="flex w-1/2 flex-col items-center border-r">
                  <span className="text-foreground flex items-center gap-1 font-bold">
                    <BookText className="text-muted-foreground h-3 w-3" /> {author.stories}
                  </span>
                  <span className="text-muted-foreground text-[9px] sm:text-[10px]">Stories</span>
                </div>
                <div className="flex w-1/2 flex-col items-center">
                  <span className="text-foreground flex items-center gap-1 font-bold">
                    <Users className="text-muted-foreground h-3 w-3" /> {author.readers}
                  </span>
                  <span className="text-muted-foreground text-[9px] sm:text-[10px]">Readers</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="group-hover:bg-foreground group-hover:text-background h-7.5 w-full rounded-full text-xs font-medium transition-colors sm:h-9"
              >
                Follow
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
