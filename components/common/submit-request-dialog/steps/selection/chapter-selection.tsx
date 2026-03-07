'use client';

import { useState } from 'react';
import { BookOpen, Check, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChapterOption } from '../../types/submit-request-dialog.types';

interface ChapterSelectionProps {
  chapters: ChapterOption[];
  /** Slug of the currently selected chapter (or 'root' for Story Introduction) */
  selectedChapterSlug: string;
  onSelect: (slug: string) => void;
  /** When true, shows "Story Introduction / insert as first chapter" option with slug='root' */
  showRootOption?: boolean;
  isLoading?: boolean;
}

export function ChapterSelection({
  chapters,
  selectedChapterSlug,
  onSelect,
  showRootOption = false,
  isLoading,
}: ChapterSelectionProps) {
  const [search, setSearch] = useState('');

  const filteredChapters = chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search chapters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 border-black/10 bg-white/50 pl-9 font-mono text-sm"
        />
      </div>

      {/* Chapter list */}
      <div className="max-h-[200px] space-y-2 overflow-y-auto pr-1">
        {/* Root option */}
        {showRootOption && (
          <button
            type="button"
            onClick={() => onSelect('root')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-all',
              selectedChapterSlug === 'root'
                ? 'border-brand-pink-500 bg-brand-pink-500/5'
                : 'border-black/10 hover:border-black/20 hover:bg-black/2'
            )}
          >
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                selectedChapterSlug === 'root' ? 'bg-brand-pink-500/15' : 'bg-black/5'
              )}
            >
              <BookOpen
                className={cn(
                  'h-3.5 w-3.5',
                  selectedChapterSlug === 'root' ? 'text-brand-pink-500' : 'text-text-secondary-65'
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-text-primary text-sm font-medium">Story Introduction</p>
              <p className="text-text-secondary-65 font-mono text-xs">Insert as first chapter</p>
            </div>
            {selectedChapterSlug === 'root' && (
              <div className="bg-brand-pink-500 flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </button>
        )}

        {filteredChapters.length === 0 && search ? (
          <p className="text-text-secondary-65 py-4 text-center text-sm">No chapters found</p>
        ) : (
          filteredChapters.map((chapter) => {
            const isSelected = selectedChapterSlug === chapter.slug;
            return (
              <button
                key={chapter.slug}
                type="button"
                onClick={() => onSelect(chapter.slug)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-all',
                  isSelected
                    ? 'border-brand-pink-500 bg-brand-pink-500/5'
                    : 'border-black/10 hover:border-black/20 hover:bg-black/2'
                )}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-medium',
                    isSelected
                      ? 'bg-brand-pink-500/15 text-brand-pink-500'
                      : 'text-text-secondary-65 bg-black/5'
                  )}
                >
                  {chapter.order}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary truncate text-sm">{chapter.title}</p>
                </div>
                {isSelected && (
                  <div className="bg-brand-pink-500 flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
