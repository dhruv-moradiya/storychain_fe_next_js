'use client';

import { useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SORT_TABS = [
  { value: 'trending', label: 'Trending', count: 1205 },
  { value: 'new', label: 'New', count: 342 },
  { value: 'most-branches', label: 'Most Branches', count: 89 },
  { value: 'highest-rated', label: 'Highest Rated', count: 500 },
  { value: 'completed', label: 'Completed', count: 210 },
  { value: 'fantasy', label: 'Fantasy', count: 1543 },
  { value: 'romance', label: 'Romance', count: 2104 },
  { value: 'horror', label: 'Horror', count: 654 },
  { value: 'thriller', label: 'Thriller', count: 890 },
  { value: 'sci-fi', label: 'Sci-Fi', count: 1102 },
  { value: 'mystery', label: 'Mystery', count: 945 },
  { value: 'historical', label: 'Historical', count: 432 },
];

export function ExploreFilters() {
  const [activeTab, setActiveTab] = useState('trending');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 240;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-background/80 sticky top-16 z-30 -mx-4 mb-8 w-[calc(100%+32px)] border-b px-4 py-3 backdrop-blur-md sm:mx-0 sm:w-full sm:px-0">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground mr-1 shrink-0 text-sm font-medium">Sort by:</span>

        {/* Prev button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 rounded-full"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </Button>

        {/* Scrollable tab list - no visible scrollbar */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div[data-tabs-scroll]::-webkit-scrollbar { display: none; }`}</style>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-9 w-max gap-1 bg-transparent p-0">
              {SORT_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {tab.label}
                  <span className="bg-muted text-muted-foreground data-[state=active]:bg-primary-foreground/20 data-[state=active]:text-primary-foreground ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]">
                    {tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Next button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 rounded-full"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
