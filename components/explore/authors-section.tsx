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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AUTHORS.map((author) => (
          <div
            key={author.username}
            className="group bg-card relative flex flex-col items-center rounded-2xl border p-6 text-center transition-all hover:shadow-md"
          >
            {author.isRising &&
              iconBadge('Rising', TrendingUp, 'pink', {
                className: 'absolute left-4 top-4 border-none shadow-sm',
              })}

            <Avatar className="border-muted mb-4 h-20 w-20 border-2 shadow-sm transition-transform group-hover:scale-105">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <h3 className="font-libre-baskerville text-lg font-bold">{author.name}</h3>
            <p className="text-muted-foreground mb-1 text-sm">{author.username}</p>
            <p className="text-brand-teal mb-4 text-xs font-medium">{author.genre}</p>

            <div className="mb-4 flex w-full justify-between border-t border-b py-3 text-sm">
              <div className="flex w-1/2 flex-col items-center border-r">
                <span className="flex items-center gap-1.5 font-bold">
                  <BookText size={14} className="text-muted-foreground" /> {author.stories}
                </span>
                <span className="text-muted-foreground text-xs">Stories</span>
              </div>
              <div className="flex w-1/2 flex-col items-center">
                <span className="flex items-center gap-1.5 font-bold">
                  <Users size={14} className="text-muted-foreground" /> {author.readers}
                </span>
                <span className="text-muted-foreground text-xs">Readers</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="group-hover:bg-foreground group-hover:text-background w-full rounded-full transition-colors"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
