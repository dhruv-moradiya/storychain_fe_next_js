import { BookOpen, Compass, Crown, Ghost, Heart, Moon, Rocket, Search, Sword } from 'lucide-react';

import { cn } from '@/lib/utils';

const GENRES = [
  {
    name: 'Fantasy',
    count: '12.4k',
    icon: Crown,
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    name: 'Romance',
    count: '15.2k',
    icon: Heart,
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  },
  {
    name: 'Sci-Fi',
    count: '8.9k',
    icon: Rocket,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Horror',
    count: '6.3k',
    icon: Ghost,
    color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
  },
  {
    name: 'Mystery',
    count: '7.1k',
    icon: Search,
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'Thriller',
    count: '5.8k',
    icon: Sword,
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
  {
    name: 'Historical',
    count: '4.2k',
    icon: BookOpen,
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  {
    name: 'Adventure',
    count: '9.5k',
    icon: Compass,
    color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  },
  {
    name: 'Dark Fantasy',
    count: '3.7k',
    icon: Moon,
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
];

export function GenresSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Explore by Genre
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">Find your kind of story</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {GENRES.map((genre) => (
          <div
            key={genre.name}
            className="group bg-card hover:border-brand-pink-200 dark:hover:border-brand-pink-800 cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110',
                  genre.color
                )}
              >
                <genre.icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="group-hover:text-brand-pink-500 truncate text-sm font-semibold transition-colors">
                  {genre.name}
                </h3>
                <p className="text-muted-foreground text-xs">{genre.count} stories</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
