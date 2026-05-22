'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { ChevronRight, Users } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';

interface RelationshipItem {
  id: number;
  name: string;
  relation: string;
  avatar: string;
  tag: string;
  tagColor: 'blue' | 'purple' | 'emerald' | 'amber' | 'gray';
  description: string;
  closenessLabel: string;
  closenessVal: number;
}

const relationshipItems: RelationshipItem[] = [
  {
    id: 1,
    name: 'Virendrasinh',
    relation: 'Father',
    avatar: 'https://i.pinimg.com/736x/ed/6a/34/ed6a34d97fdc66f2347f5e0936c51d4c.jpg',
    tag: 'Family',
    tagColor: 'blue',
    description: 'A respected merchant who wants Aarav to stay away from dangerous secrets.',
    closenessLabel: 'Loves & Respects',
    closenessVal: 85,
  },
  {
    id: 2,
    name: 'Devanshi',
    relation: 'Sister',
    avatar: 'https://i.pinimg.com/control1/736x/b0/35/31/b035314c4e0e4582468f62278e0a19a1.jpg',
    tag: 'Family',
    tagColor: 'blue',
    description: "Caring and protective sister who supports Aarav in ways he doesn't see.",
    closenessLabel: 'Very Close',
    closenessVal: 90,
  },
  {
    id: 3,
    name: 'Jalaluddin',
    relation: 'Mentor',
    avatar: 'https://i.pinimg.com/736x/02/b8/74/02b8743b9f902d9a2e863256ec203905.jpg',
    tag: 'Mentor',
    tagColor: 'purple',
    description: 'A wise navigator who guides Aarav and teaches him about the unseen seas.',
    closenessLabel: 'Trusts Deeply',
    closenessVal: 80,
  },
  {
    id: 4,
    name: 'Zahra',
    relation: 'Ally',
    avatar: 'https://i.pinimg.com/736x/c4/cf/77/c4cf77c049226340d430cbe8a4391c69.jpg',
    tag: 'Ally',
    tagColor: 'emerald',
    description: 'A trader with connections across continents who helps Aarav.',
    closenessLabel: 'Close Ally',
    closenessVal: 75,
  },
];

export function CharacterRelationships() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <div className="border-soft bg-background/50 relative space-y-5 rounded-2xl border p-5 md:p-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Users className="text-brand-pink-500 h-5 w-5 shrink-0" />
        <h3 className="text-text-primary text-base font-semibold">Relationships</h3>
      </div>

      <div className="group relative">
        {/* Scrolling Cards Row */}
        <div
          ref={scrollRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {relationshipItems.map((item) => (
            <div
              key={item.id}
              className="border-soft bg-background hover:border-brand-pink-500/30 flex w-[280px] shrink-0 snap-center flex-col justify-between rounded-xl border p-4 transition-colors duration-300"
            >
              {/* Header: Avatar, Name, Relationship */}
              <div className="flex items-start gap-3">
                <div className="border-soft relative h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-text-primary block truncate text-sm font-bold">
                    {item.name}{' '}
                    <span className="text-text-secondary-65 text-xs font-normal">
                      ({item.relation})
                    </span>
                  </span>
                  <div className="mt-1">
                    {createBadge({
                      label: item.tag,
                      size: 'xs',
                      color: item.tagColor,
                      mono: true,
                    })}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary mt-3 line-clamp-2 text-xs leading-relaxed">
                {item.description}
              </p>

              {/* Closeness progress bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-semibold">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {item.closenessLabel}
                  </span>
                  <span className="text-text-primary">{item.closenessVal}%</span>
                </div>
                <div className="bg-soft h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${item.closenessVal}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll right button overlay */}
        <div className="pointer-events-none absolute inset-y-0 -right-4 flex items-center pr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:-right-8">
          <Button
            variant="outline"
            size="icon"
            className="border-soft bg-background hover:bg-muted pointer-events-auto h-8 w-8 rounded-full shadow-md"
            onClick={scrollRight}
            aria-label="Next Relationships"
          >
            <ChevronRight size={16} className="text-text-secondary-75" />
          </Button>
        </div>
      </div>
    </div>
  );
}
