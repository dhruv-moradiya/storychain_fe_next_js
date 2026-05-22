'use client';

import { BookOpen } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';

interface AppearanceItem {
  id: number;
  chapter: string;
  title: string;
  description: string;
  role: 'Main' | 'Supporting';
}

const appearanceItems: AppearanceItem[] = [
  {
    id: 1,
    chapter: 'Chapter 1',
    title: 'The Walls of Sandalwood',
    description: 'Aarav is introduced as a young merchant in Surat.',
    role: 'Main',
  },
  {
    id: 2,
    chapter: 'Chapter 2',
    title: 'The Currency of Silence',
    description: 'He starts noticing unusual night shipments.',
    role: 'Main',
  },
  {
    id: 3,
    chapter: 'Chapter 3',
    title: 'The Hidden Path',
    description: 'Aarav follows a lead and meets Jalaluddin.',
    role: 'Main',
  },
  {
    id: 4,
    chapter: 'Chapter 4',
    title: 'Whispers in the Docks',
    description: 'He discovers a secret about the cargo.',
    role: 'Main',
  },
  {
    id: 5,
    chapter: 'Chapter 5',
    title: 'Storm Over the Sea',
    description: 'Aarav helps during a dangerous storm.',
    role: 'Supporting',
  },
];

export function CharacterAppearances() {
  return (
    <div className="border-soft bg-background/50 flex h-full flex-col justify-between space-y-6 rounded-2xl border p-5 md:p-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="text-brand-pink-500 h-5 w-5 shrink-0" />
          <h3 className="text-text-primary text-base font-semibold">Appearances</h3>
        </div>
        <Button
          variant="link"
          className="text-brand-pink-500 hover:text-brand-pink-600 h-auto p-0 text-xs font-semibold"
        >
          View All Chapters &rarr;
        </Button>
      </div>

      {/* Chapters List */}
      <div className="divide-border/30 space-y-3 divide-y pb-2">
        {appearanceItems.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 pt-3 first:pt-0">
            <div className="space-y-1">
              <span className="text-text-secondary-65 block text-[10px] font-bold tracking-wider uppercase">
                {item.chapter}: {item.title}
              </span>
              <p className="text-text-secondary line-clamp-1 text-xs">{item.description}</p>
            </div>
            <div className="shrink-0 pt-1">
              {createBadge({
                label: item.role,
                size: 'xs',
                color: item.role === 'Main' ? 'emerald' : 'blue',
                mono: true,
              })}
            </div>
          </div>
        ))}
      </div>

      {/* View all appearances link */}
      <div className="border-soft border-t pt-2">
        <Button
          variant="link"
          className="text-brand-pink-500 hover:text-brand-pink-600 h-auto w-full justify-center p-0 text-xs font-semibold"
        >
          View All Appearances &rarr;
        </Button>
      </div>
    </div>
  );
}
