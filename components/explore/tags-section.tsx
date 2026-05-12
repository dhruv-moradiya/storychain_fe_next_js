import { Hash } from 'lucide-react';

import { tagBadge } from '@/components/common/badge';

const TAGS = [
  { name: 'magic-system', count: '1.2k' },
  { name: 'time-travel', count: '850' },
  { name: 'unreliable-narrator', count: '420' },
  { name: 'slow-burn', count: '2.1k' },
  { name: 'war', count: '1.5k' },
  { name: 'dragons', count: '980' },
  { name: 'found-family', count: '3.4k' },
  { name: 'cybernetics', count: '670' },
  { name: 'enemies-to-lovers', count: '4.2k' },
  { name: 'dystopian', count: '1.1k' },
  { name: 'space-opera', count: '540' },
  { name: 'dark-academia', count: '890' },
  { name: 'heist', count: '320' },
  { name: 'mythology', count: '1.4k' },
  { name: 'post-apocalyptic', count: '930' },
  { name: 'villain-protagonist', count: '560' },
  { name: 'artificial-intelligence', count: '780' },
  { name: 'parallel-universe', count: '450' },
  { name: 'steampunk', count: '310' },
  { name: 'grimdark', count: '620' },
];

export function TagsSection() {
  return (
    <section className="mb-20 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Find Stories by Theme
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">Dive deeper with tags</p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {TAGS.map((tag) => (
          <div key={tag.name}>
            {tagBadge(`${tag.name} · ${tag.count}`, {
              icon: Hash,
              iconPosition: 'left',
              shape: 'pill',
              size: 'sm',
              removable: false,
              className: 'cursor-pointer hover:opacity-80',
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
