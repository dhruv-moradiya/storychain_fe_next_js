'use client';

import { Button } from '@/components/ui/button';
import type { ChapterData } from '@/components/common/chapter-reader';

interface ChapterPaginationProps {
  parentChapter?: ChapterData['parentChapter'];
  nextChapter?: { id: string; title: string }; // In a real app, this would come from the API
  onNavigate: (id: string) => void;
}

export function ChapterPagination({
  parentChapter,
  nextChapter,
  onNavigate,
}: ChapterPaginationProps) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4">
      {parentChapter ? (
        <Button
          variant="ghost"
          className="border-border/50 hover:border-brand-pink-500/30 flex h-auto flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors"
          onClick={() => onNavigate(parentChapter.id)}
        >
          <span className="text-text-secondary-65 text-xs">← Previous</span>
          <span className="text-text-primary line-clamp-1 font-medium">{parentChapter.title}</span>
        </Button>
      ) : (
        <div />
      )}

      {nextChapter ? (
        <Button
          variant="ghost"
          className="border-border/50 hover:border-brand-pink-500/30 flex h-auto flex-col items-end gap-1 rounded-xl border p-4 text-right transition-colors"
          onClick={() => onNavigate(nextChapter.id)}
        >
          <span className="text-text-secondary-65 text-xs">Next →</span>
          <span className="text-text-primary line-clamp-1 font-medium">{nextChapter.title}</span>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
