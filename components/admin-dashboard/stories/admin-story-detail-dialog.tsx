'use client';

import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import { TStoryCollaboratorRole, TStoryContentRating } from '@/type/story';
import { IAdminStoryItem } from '@/type/story/admin-story.type';
import { formatDistanceToNow } from 'date-fns';
import {
  BookOpen,
  CheckCircle2,
  Coins,
  Eye,
  GitPullRequest,
  Globe,
  Lock,
  Users,
  XCircle,
} from 'lucide-react';

import {
  collaboratorRoleBadge,
  collaboratorStatusBadge,
  contentRatingBadge,
  countBadge,
  genreBadge,
  storyStatusBadge,
  tagBadge,
  textBadge,
} from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AdminStoryDetailDialogProps {
  story: IAdminStoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DescriptionSection({ description }: { description?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  const isLong = description.length > 220 || description.split('\n').length > 5;

  return (
    <div className="space-y-1.5">
      <h4 className="text-text-primary text-[10px] font-semibold tracking-wider uppercase">
        Description
      </h4>
      <div className="bg-muted/10 border-border/30 text-text-secondary-65 rounded-xl border p-3 leading-relaxed">
        <p className={cn('text-xs whitespace-pre-wrap', !isExpanded && 'line-clamp-5')}>
          {description}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary mt-2 flex cursor-pointer items-center gap-1 text-xs font-semibold hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}

function GenresAndTagsSection({
  genres = [],
  tags = [],
  limit = 5,
}: {
  genres?: string[];
  tags?: string[];
  limit?: number;
}) {
  const [open, setOpen] = useState(false);

  const allItems = [
    ...genres.map((g) => ({ type: 'genre' as const, value: g })),
    ...tags.map((t) => ({ type: 'tag' as const, value: t })),
  ];

  if (allItems.length === 0) return null;

  const visibleItems = allItems.slice(0, limit);
  const remainingCount = allItems.length - limit;

  const renderBadge = (item: { type: 'genre' | 'tag'; value: string }) => {
    return item.type === 'genre'
      ? genreBadge(item.value, { size: 'sm' })
      : tagBadge(item.value, { size: 'sm' });
  };

  return (
    <div className="space-y-2">
      <h4 className="text-text-primary text-[10px] font-semibold tracking-wider uppercase">
        Genres & Tags
      </h4>
      <div className="flex flex-wrap items-center gap-1.5">
        {visibleItems.map((item, idx) => (
          <React.Fragment key={`${item.type}-${item.value}-${idx}`}>
            {renderBadge(item)}
          </React.Fragment>
        ))}

        {remainingCount > 0 && (
          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="inline-block"
          >
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button type="button" className="cursor-pointer outline-none">
                  {textBadge(`+${remainingCount}`, 'pink', { size: 'xs', shape: 'pill' })}
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="start"
                className="bg-card border-border/50 pointer-events-none z-50 w-64 space-y-2 rounded-xl p-3 shadow-xl"
              >
                <div className="text-text-primary border-border/30 border-b pb-1.5 text-xs font-semibold">
                  All Genres & Tags ({allItems.length})
                </div>
                <div className="flex max-h-44 flex-wrap gap-1.5 overflow-y-auto">
                  {allItems.map((item, idx) => (
                    <React.Fragment key={`all-${item.type}-${item.value}-${idx}`}>
                      {renderBadge(item)}
                    </React.Fragment>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminStoryDetailDialog({ story, open, onOpenChange }: AdminStoryDetailDialogProps) {
  if (!story) return null;

  const creator = story.creator;
  const settings = story.settings;
  const stats = story.stats;
  const chapterDetails = story.chapterDetails;
  const prDetails = story.pullRequestDetails;
  const pool = story.storyPool;

  const creatorBannerContent = (
    <div className="bg-muted/20 border-border/30 hover:bg-muted/30 group/creator flex items-center gap-3 rounded-xl border p-3 transition-all">
      <Avatar className="ring-border/30 group-hover/creator:ring-primary/50 h-9 w-9 shrink-0 ring-1 transition-all">
        <AvatarImage src={creator?.avatarUrl} alt={creator?.username || 'Creator'} />
        <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
          {(creator?.username || 'U').charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col">
        <span className="text-text-primary group-hover/creator:text-primary truncate text-xs font-semibold transition-colors group-hover/creator:underline">
          Created by {creator?.username || 'Unknown'}
        </span>
        {creator?.email && (
          <span className="text-text-secondary-65 truncate text-xs">{creator.email}</span>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-h-[90vh] max-w-4xl overflow-y-auto rounded-2xl p-6 shadow-xl sm:max-w-4xl">
        <DialogHeader className="border-border/40 space-y-3 border-b pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {storyStatusBadge((story.status || 'draft').toUpperCase(), { size: 'sm' })}
            {settings?.isPublic !== undefined && (
              <Badge
                variant="outline"
                className="border-border/40 text-text-secondary-65 gap-1 text-xs font-normal"
              >
                {settings.isPublic ? (
                  <>
                    <Globe className="h-3 w-3 text-blue-500" /> Public
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3 text-amber-500" /> Private
                  </>
                )}
              </Badge>
            )}
            {settings?.contentRating &&
              contentRatingBadge(settings.contentRating as TStoryContentRating, { size: 'sm' })}
          </div>

          <DialogTitle className="text-text-primary line-clamp-2 text-xl font-bold">
            {story.title || story.slug}
          </DialogTitle>
          <DialogDescription className="text-text-secondary-65 font-mono text-xs">
            Slug: /{story.slug} • ID: {story._id}
          </DialogDescription>

          {/* Creator banner */}
          {creator?.clerkId ? (
            <Link href={`/dashboard/users/${creator.clerkId}`} className="block pt-1">
              {creatorBannerContent}
            </Link>
          ) : (
            <div className="pt-1">{creatorBannerContent}</div>
          )}
        </DialogHeader>

        <div className="space-y-6 pt-4 text-xs">
          {/* Description Section with Read More */}
          <DescriptionSection description={story.description} />

          {/* Fixed Metrics Grid UI */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Chapters Card */}
            <div className="border-border/40 bg-card/60 dark:bg-card/40 flex flex-col justify-between space-y-3.5 rounded-2xl border p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500">
                  <BookOpen className="h-3.5 w-3.5" />
                </div>
                <span className="text-text-secondary-50 text-[10px] font-semibold tracking-wider whitespace-nowrap uppercase">
                  Chapters
                </span>
              </div>
              <div>
                <p className="text-text-primary font-mono text-2xl font-bold">
                  {chapterDetails?.totalChapters ?? stats?.totalChapters ?? 0}
                </p>
                <p className="text-text-secondary-65 mt-1 text-xs">
                  {chapterDetails?.publishedChapters ?? 0} published
                </p>
              </div>
            </div>

            {/* Pull Requests Card */}
            <div className="border-border/40 bg-card/60 dark:bg-card/40 flex flex-col justify-between space-y-3.5 rounded-2xl border p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                  <GitPullRequest className="h-3.5 w-3.5" />
                </div>
                <span className="text-text-secondary-50 text-[10px] font-semibold tracking-wider whitespace-nowrap uppercase">
                  Pull Requests
                </span>
              </div>
              <div>
                <p className="text-text-primary font-mono text-2xl font-bold">
                  {prDetails?.totalPRs ?? 0}
                </p>
                <p className="text-text-secondary-65 mt-1 text-xs">
                  {prDetails?.pendingPRs ?? 0} pending
                </p>
              </div>
            </div>

            {/* Total Reads Card */}
            <div className="border-border/40 bg-card/60 dark:bg-card/40 flex flex-col justify-between space-y-3.5 rounded-2xl border p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Eye className="h-3.5 w-3.5" />
                </div>
                <span className="text-text-secondary-50 text-[10px] font-semibold tracking-wider whitespace-nowrap uppercase">
                  Total Reads
                </span>
              </div>
              <div>
                <p className="text-text-primary font-mono text-2xl font-bold">
                  {(chapterDetails?.totalReads ?? stats?.totalReads ?? 0).toLocaleString()}
                </p>
                <p className="text-text-secondary-65 mt-1 text-xs">
                  {(stats?.totalVotes ?? 0).toLocaleString()} votes
                </p>
              </div>
            </div>

            {/* Story Pool Card */}
            <div className="border-border/40 bg-card/60 dark:bg-card/40 flex flex-col justify-between space-y-3.5 rounded-2xl border p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Coins className="h-3.5 w-3.5" />
                </div>
                <span className="text-text-secondary-50 text-[10px] font-semibold tracking-wider whitespace-nowrap uppercase">
                  Story Pool
                </span>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {(pool?.balance ?? 0).toLocaleString()}
                </p>
                <p className="text-text-secondary-65 mt-1 text-xs">
                  {(pool?.totalReceived ?? 0).toLocaleString()} received
                </p>
              </div>
            </div>
          </div>

          {/* Settings & Permissions */}
          <div className="space-y-2">
            <h4 className="text-text-primary text-[10px] font-semibold tracking-wider uppercase">
              Settings & Rules
            </h4>
            <div className="bg-muted/10 border-border/30 grid grid-cols-2 gap-2.5 rounded-xl border p-3.5 sm:grid-cols-4">
              <div className="flex items-center gap-1.5 text-xs">
                {settings?.allowBranching ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                )}
                <span>Allow Branching</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                {settings?.requireApproval ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                )}
                <span>Require Approval</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                {settings?.allowComments ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                )}
                <span>Allow Comments</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                {settings?.allowVoting ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                )}
                <span>Allow Voting</span>
              </div>
            </div>
          </div>

          {/* Genres & Tags Section with > 5 limit popover */}
          <GenresAndTagsSection genres={settings?.genres} tags={story.tags} limit={5} />

          {/* Collaborators List with User Links */}
          {story.collaborators && story.collaborators.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-text-primary flex items-center gap-2 text-[10px] font-semibold tracking-wider uppercase">
                <Users className="text-primary h-3.5 w-3.5" /> Collaborators{' '}
                {countBadge(story.collaborators.length, 'pink', { size: 'sm' })}
              </h4>
              <div className="bg-muted/10 border-border/30 space-y-2 rounded-2xl border p-3.5">
                {story.collaborators.map((c) => {
                  const collabContent = (
                    <div className="group/collab flex min-w-0 cursor-pointer items-center gap-2.5">
                      <Avatar className="ring-border/30 group-hover/collab:ring-primary/50 h-7 w-7 shrink-0 ring-1 transition-all">
                        <AvatarImage src={c.user?.avatarUrl} alt={c.user?.username} />
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                          {(c.user?.username || 'U').charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-text-primary group-hover/collab:text-primary truncate text-xs font-semibold transition-colors group-hover/collab:underline">
                          {c.user?.username}
                        </span>
                        {c.user?.email && (
                          <span className="text-text-secondary-65 max-w-[200px] truncate text-[10px]">
                            {c.user.email}
                          </span>
                        )}
                      </div>
                    </div>
                  );

                  return (
                    <div
                      key={c._id}
                      className="border-border/20 bg-background/50 hover:bg-muted/20 flex items-center justify-between gap-3 rounded-xl border px-3 py-2 transition-all"
                    >
                      {c.user?.clerkId ? (
                        <Link href={`/dashboard/users/${c.user.clerkId}`} className="min-w-0">
                          {collabContent}
                        </Link>
                      ) : (
                        collabContent
                      )}
                      <div className="flex shrink-0 items-center gap-2">
                        {collaboratorRoleBadge(c.role as TStoryCollaboratorRole, { size: 'sm' })}
                        {collaboratorStatusBadge(c.status, { size: 'sm' })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="border-border/40 text-text-secondary-50 flex flex-wrap justify-between gap-2 border-t pt-3 font-mono text-[11px]">
            <span>
              Created:{' '}
              {story.createdAt
                ? formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })
                : '—'}
            </span>
            <span>
              Last Activity:{' '}
              {story.lastActivityAt
                ? formatDistanceToNow(new Date(story.lastActivityAt), { addSuffix: true })
                : '—'}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
