'use client';

import { useState } from 'react';

import { Grid2X2, List } from 'lucide-react';

import HistoryTimeline from '@/components/stories/sections/history-timeline';
import { Button } from '@/components/ui/button';
import { MOCK_HISTORY_EVENTS } from '@/lib/data/mock-history';
import { cn } from '@/lib/utils';

export function HistoryPageClient() {
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  // Sort events by date (newest first)
  const sortedEvents = [...MOCK_HISTORY_EVENTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-text-primary text-2xl font-bold">Story History</h2>
          <div className="bg-bg-cream border-border/50 flex items-center rounded-lg border p-1 shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('detailed')}
              className={cn(
                'h-8 px-3 text-xs font-medium',
                viewMode === 'detailed'
                  ? 'bg-brand-pink-500 hover:bg-brand-pink-600 text-white shadow-sm hover:text-white'
                  : 'text-text-secondary-65 hover:bg-cream-90 hover:text-text-primary'
              )}
            >
              <Grid2X2 className="mr-2 h-4 w-4" />
              Detailed
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('compact')}
              className={cn(
                'h-8 px-3 text-xs font-medium',
                viewMode === 'compact'
                  ? 'bg-brand-pink-500 hover:bg-brand-pink-600 text-white shadow-sm hover:text-white'
                  : 'text-text-secondary-65 hover:bg-cream-90 hover:text-text-primary'
              )}
            >
              <List className="mr-2 h-4 w-4" />
              Compact
            </Button>
          </div>
        </div>

        <HistoryTimeline events={sortedEvents} variant={viewMode} />
      </div>
    </div>
  );
}
