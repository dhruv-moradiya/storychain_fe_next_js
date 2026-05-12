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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXPERIMENTS.map((exp) => (
          <div
            key={exp.title}
            className="group bg-card relative flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="absolute top-3 left-3 z-10">
              {iconBadge('Challenge', Beaker, 'cyan', { className: 'border-none shadow-sm' })}
            </div>

            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover opacity-80 grayscale transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="from-background absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>

            <div className="z-10 -mt-6 flex flex-1 flex-col justify-between p-4 pt-0">
              <div>
                <h3 className="font-libre-baskerville group-hover:text-brand-teal mb-1 text-lg leading-tight font-bold transition-colors">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground text-xs">by {exp.author}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <div className="text-brand-orange flex items-center gap-1 text-sm font-bold">
                  <ArrowBigUp size={18} className="fill-current" /> {exp.upvotes}
                </div>
                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <GitBranch size={14} /> {exp.branches} branches
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
