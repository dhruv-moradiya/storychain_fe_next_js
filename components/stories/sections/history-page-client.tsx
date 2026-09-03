'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { IStoryTimelineEvent } from '@/type/story';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Clock,
  Filter,
  Grid2X2,
  History,
  List,
  Loader2,
  RefreshCw,
  Search,
} from 'lucide-react';

import HistoryTimeline from '@/components/stories/sections/history-timeline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { fadeIn } from '@/lib/utils';
import { useGetInfiniteStoryTimeline } from '@/services/stories/stories.query';

interface HistoryPageClientProps {
  slug?: string;
}

type TActionCategory =
  | 'all'
  | 'story'
  | 'chapters'
  | 'prs'
  | 'collaborators'
  | 'settings'
  | 'media';

export function HistoryPageClient({ slug: propSlug }: HistoryPageClientProps) {
  const params = useParams();
  const slug = propSlug || (params?.slug as string);

  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionCategory, setActionCategory] = useState<TActionCategory>('all');

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteStoryTimeline(slug, 20);

  // Flatten all pages into events
  const events = useMemo<IStoryTimelineEvent[]>(() => {
    return data?.pages.flatMap((page) => page.data.events) || [];
  }, [data]);

  const totalEvents = data?.pages[0]?.data.total ?? events.length;

  // Filter events based on search query and category
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Category filter
      if (actionCategory !== 'all') {
        const action = event.action;
        if (actionCategory === 'story' && !action.startsWith('story_')) return false;
        if (actionCategory === 'chapters' && !action.startsWith('chapter_')) return false;
        if (actionCategory === 'prs' && !action.startsWith('pr_')) return false;
        if (actionCategory === 'collaborators' && !action.startsWith('collaborator_')) return false;
        if (
          actionCategory === 'settings' &&
          action !== 'settings_updated' &&
          action !== 'cover_image_updated' &&
          action !== 'card_image_updated'
        )
          return false;
        if (
          actionCategory === 'media' &&
          !action.startsWith('gallery_') &&
          !action.startsWith('album_') &&
          action !== 'images_added_to_album'
        )
          return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const actionMatches = event.action.toLowerCase().replace(/_/g, ' ').includes(q);
        const userMatches = event.performedBy?.username?.toLowerCase().includes(q) ?? false;
        const chapterMatches =
          event.metadata?.chapterTitle?.toLowerCase().includes(q) ||
          event.metadata?.chapter?.title?.toLowerCase().includes(q) ||
          false;
        const targetUserMatches =
          event.metadata?.targetUser?.username?.toLowerCase().includes(q) || false;
        const prMatches = event.metadata?.prTitle?.toLowerCase().includes(q) || false;

        return actionMatches || userMatches || chapterMatches || targetUserMatches || prMatches;
      }

      return true;
    });
  }, [events, actionCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          {...fadeIn()}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <History className="text-primary h-6 w-6" />
              <h1 className="font-libre-baskerville text-foreground text-2xl font-bold">
                Story History
              </h1>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              Detailed chronological record of story milestones and contributor activities
              {totalEvents > 0 && ` (${totalEvents} events total)`}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="border-border/50 bg-card flex items-center gap-1 self-start rounded-lg border p-1 shadow-xs">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('detailed')}
              className={`h-8 px-3 text-xs font-medium transition-all ${
                viewMode === 'detailed'
                  ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Grid2X2 className="mr-1.5 h-3.5 w-3.5" />
              Detailed
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('compact')}
              className={`h-8 px-3 text-xs font-medium transition-all ${
                viewMode === 'compact'
                  ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <List className="mr-1.5 h-3.5 w-3.5" />
              Compact
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div {...fadeIn(0.1)} className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search history by activity, user, or chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border/50 bg-card pl-9 text-sm"
            />
          </div>

          <Select
            value={actionCategory}
            onValueChange={(v) => setActionCategory(v as TActionCategory)}
          >
            <SelectTrigger className="border-border/50 bg-card w-full sm:w-44">
              <Filter className="text-muted-foreground mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="border-border/50 bg-card">
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="chapters">Chapters</SelectItem>
              <SelectItem value="prs">Submit Requests</SelectItem>
              <SelectItem value="collaborators">Collaborators</SelectItem>
              <SelectItem value="story">Story Status</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
              <SelectItem value="media">Gallery & Albums</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4 py-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="border-border/40 bg-card flex gap-4 rounded-xl border p-5">
                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-full max-w-sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <motion.div
            {...fadeIn()}
            className="border-border/50 bg-card flex flex-col items-center justify-center rounded-xl border px-4 py-16 text-center shadow-xs"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-foreground text-lg font-semibold">Failed to load story history</h3>
            <p className="text-muted-foreground mt-1 max-w-md text-sm">
              {error?.message || 'An error occurred while fetching timeline events.'}
            </p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="border-border/50 mt-4 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredEvents.length === 0 && (
          <motion.div
            {...fadeIn()}
            className="border-border/50 bg-card flex flex-col items-center justify-center rounded-xl border px-4 py-16 text-center shadow-xs"
          >
            <div className="bg-muted mb-4 flex h-14 w-14 items-center justify-center rounded-full">
              <Clock className="text-muted-foreground h-7 w-7" />
            </div>
            <h3 className="text-foreground text-lg font-semibold">
              {searchQuery || actionCategory !== 'all'
                ? 'No matching timeline events'
                : 'No history events yet'}
            </h3>
            <p className="text-muted-foreground mt-1 max-w-md text-sm">
              {searchQuery || actionCategory !== 'all'
                ? 'Try adjusting your search query or filter category.'
                : 'Activity and milestones will be logged here as your story evolves.'}
            </p>
          </motion.div>
        )}

        {/* Timeline Events List */}
        {!isLoading && !isError && filteredEvents.length > 0 && (
          <motion.div {...fadeIn(0.15)}>
            <HistoryTimeline events={filteredEvents} variant={viewMode} storySlug={slug} />

            {/* Load More Button */}
            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="border-border/50 bg-card gap-2"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading more events...
                    </>
                  ) : (
                    'Load More History'
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
