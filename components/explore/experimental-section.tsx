import Image from 'next/image';

import { ArrowBigUp, Beaker, GitBranch } from 'lucide-react';

import { iconBadge } from '@/components/common/badge';

const EXPERIMENTS = [
  {
    title: 'The AI Interrogator',
    author: 'CodeWhisperer',
    upvotes: 452,
    branches: 12,
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
  {
    title: 'Quantum Leap 404',
    author: 'GlitchMaster',
    upvotes: 328,
    branches: 8,
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
  },
  {
    title: 'Hive Mind Diaries',
    author: 'Collective01',
    upvotes: 215,
    branches: 24,
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
  },
  {
    title: 'Syntax Error: Love',
    author: 'RomanceBot',
    upvotes: 189,
    branches: 5,
    image: 'https://i.pinimg.com/1200x/c9/fb/d1/c9fbd1f133ba07267a8b0df433e57cb9.jpg',
  },
];

export function ExperimentalSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-libre-baskerville text-foreground flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Community Experiments <Beaker className="text-brand-teal" />
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Unpolished, unpredictable, unforgettable - stories still finding their shape
          </p>
        </div>

        <div className="hidden rounded-full border p-1 sm:flex">
          <button className="bg-muted rounded-full px-3 py-1 text-xs font-medium">All</button>
          <button className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1 text-xs font-medium">
            Rising
          </button>
          <button className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1 text-xs font-medium">
            Wildcard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
        {EXPERIMENTS.map((exp) => (
          <div key={exp.title} className="group flex cursor-pointer flex-col gap-2 sm:gap-3">
            {/* Cover image matching NewReleasesSection standard */}
            <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-md border shadow-sm transition-shadow group-hover:shadow-md lg:rounded-lg">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover opacity-85 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute top-2 left-2 z-10">
                {iconBadge('Challenge', Beaker, 'cyan', {
                  className: 'border-none shadow-sm text-[9px] sm:text-[10px]',
                })}
              </div>
            </div>

            {/* Details below cover */}
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-libre-baskerville group-hover:text-brand-teal line-clamp-2 text-xs leading-tight font-bold transition-colors sm:text-sm lg:text-base">
                {exp.title}
              </h3>

              <p className="text-muted-foreground line-clamp-1 text-[10px] sm:text-xs">
                by {exp.author}
              </p>

              <div className="text-muted-foreground flex items-center justify-between pt-0.5 sm:pt-1">
                <div className="text-brand-orange flex items-center gap-0.5 text-[9px] font-bold sm:text-[10px]">
                  <ArrowBigUp className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
                  <span>{exp.upvotes}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px]">
                  <GitBranch className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span>{exp.branches} branches</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
