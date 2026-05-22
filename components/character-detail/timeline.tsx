'use client';

import { Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TimelineItem {
  id: number;
  chapter: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    chapter: 'Chapter 1',
    description: 'Aarav is introduced at the Surat docks.',
  },
  {
    id: 2,
    chapter: 'Chapter 2',
    description: 'He notices suspicious shipments arriving at night.',
  },
  {
    id: 3,
    chapter: 'Chapter 4',
    description: 'He follows a clue that leads to an unexpected discovery.',
  },
  {
    id: 4,
    chapter: 'Chapter 7',
    description: 'Aarav faces a dangerous confrontation.',
  },
  {
    id: 5,
    chapter: 'Chapter 10',
    description: 'He makes a choice that changes everything.',
  },
];

export function CharacterTimeline() {
  return (
    <div className="border-soft bg-background/50 flex h-full flex-col justify-between space-y-6 rounded-2xl border p-5 md:p-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Clock className="text-brand-pink-500 h-5 w-5 shrink-0" />
        <h3 className="text-text-primary text-base font-semibold">Character Timeline</h3>
      </div>

      {/* Timeline Steps */}
      <div className="border-brand-pink-500/20 relative ml-3 space-y-6 border-l py-2 pl-6">
        {timelineItems.map((item) => (
          <div key={item.id} className="group relative">
            {/* Timeline node dot */}
            <span className="bg-background border-brand-pink-500 absolute top-1.5 -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border">
              <span className="bg-brand-pink-500 h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125" />
            </span>
            {/* Text details */}
            <div className="space-y-1">
              <span className="text-text-secondary-65 block text-[10px] font-bold tracking-wider uppercase">
                {item.chapter}
              </span>
              <p className="text-text-primary text-xs font-semibold sm:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View full timeline link */}
      <div className="border-soft border-t pt-2">
        <Button
          variant="link"
          className="text-brand-pink-500 hover:text-brand-pink-600 h-auto w-full justify-center p-0 text-xs font-semibold"
        >
          View Full Timeline &rarr;
        </Button>
      </div>
    </div>
  );
}
