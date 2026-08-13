'use client';

import Link from 'next/link';
import { useState } from 'react';

import { IAdminStoryCollaborator, IAdminStoryItem } from '@/type/story/admin-story.type';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpen,
  Coins,
  Eye,
  GitPullRequest,
  ThumbsUp,
  Users,
} from 'lucide-react';

import { storyStatusBadge, textBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    handleSelectStory?: (story: IAdminStoryItem) => void;
  }
}

function GenresCell({ genres = [] }: { genres?: string[] }) {
  const [open, setOpen] = useState(false);
  const limit = 5;

  if (!genres || genres.length === 0) return null;

  const visibleGenres = genres.slice(0, limit);
  const remainingCount = genres.length - limit;

  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-1">
      {visibleGenres.map((g) => (
        <Badge
          key={g}
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary px-1.5 py-0 text-[10px] font-medium capitalize"
        >
          {g}
        </Badge>
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
              className="bg-card border-border/50 pointer-events-none z-50 w-60 space-y-2 rounded-xl p-3 shadow-xl"
            >
              <div className="text-text-primary border-border/30 border-b pb-1.5 text-xs font-semibold">
                All Genres ({genres.length})
              </div>
              <div className="flex max-h-40 flex-wrap gap-1 overflow-y-auto">
                {genres.map((g) => (
                  <Badge
                    key={g}
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary px-1.5 py-0 text-[10px] font-medium capitalize"
                  >
                    {g}
                  </Badge>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}

function CollaboratorsCell({ collaborators }: { collaborators?: IAdminStoryCollaborator[] }) {
  const count = collaborators?.length || 0;

  if (!collaborators || count === 0) {
    return <span className="text-text-secondary-50 font-mono text-xs">0</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <Badge
        variant="outline"
        className="border-primary/30 bg-primary/10 text-primary gap-1.5 font-mono text-xs font-semibold"
      >
        <Users className="text-primary h-3.5 w-3.5" />
        {count}
      </Badge>
    </div>
  );
}

export const columns: ColumnDef<IAdminStoryItem>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Story</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const story = row.original;
      return (
        <div className="flex min-w-[180px] flex-col gap-1">
          <span className="text-text-primary line-clamp-1 text-sm font-semibold">
            {story.title || story.slug}
          </span>
          <span className="text-text-secondary-50 line-clamp-1 font-mono text-xs">
            /{story.slug}
          </span>
          {story.settings?.genres && <GenresCell genres={story.settings.genres} />}
        </div>
      );
    },
  },
  {
    accessorKey: 'creator',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Creator</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const creator = row.original.creator;
      const username = creator?.username || 'Unknown';
      const email = creator?.email;
      const avatarUrl = creator?.avatarUrl;
      const clerkId = creator?.clerkId;

      const userContent = (
        <div className="group/user flex min-w-[150px] items-center gap-2.5">
          <Avatar className="ring-border/30 group-hover/user:ring-primary/50 h-7 w-7 ring-1 transition-all">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="text-text-primary group-hover/user:text-primary truncate text-xs font-medium transition-colors group-hover/user:underline">
              {username}
            </span>
            {email && (
              <span className="text-text-secondary-65 max-w-[130px] truncate text-[11px]">
                {email}
              </span>
            )}
          </div>
        </div>
      );

      if (clerkId) {
        return (
          <Link
            href={`/dashboard/users/${clerkId}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-block"
          >
            {userContent}
          </Link>
        );
      }

      return userContent;
    },
  },
  {
    accessorKey: 'collaborators',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Collaborators</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      return <CollaboratorsCell collaborators={row.original.collaborators} />;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Status</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status || 'draft';
      return storyStatusBadge(status.toUpperCase(), { size: 'sm' });
    },
  },
  {
    accessorKey: 'chapterDetails',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Chapters & PRs</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const chapters =
        row.original.chapterDetails?.totalChapters ?? row.original.stats?.totalChapters ?? 0;
      const prs = row.original.pullRequestDetails?.totalPRs ?? 0;

      return (
        <div className="flex flex-col gap-1 font-mono text-xs">
          <span className="text-text-primary flex items-center gap-1.5">
            <BookOpen className="text-brand-pink-500 h-3 w-3 shrink-0" />
            {chapters} chapters
          </span>
          <span className="text-text-secondary-65 flex items-center gap-1.5">
            <GitPullRequest className="h-3 w-3 shrink-0 text-orange-500" />
            {prs} PRs
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'stats',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Performance</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const reads = row.original.chapterDetails?.totalReads ?? row.original.stats?.totalReads ?? 0;
      const votes = row.original.stats?.totalVotes ?? 0;

      return (
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-text-secondary-65 flex items-center gap-1.5">
            <Eye className="h-3 w-3 shrink-0 text-blue-500" />
            {reads.toLocaleString()} reads
          </span>
          <span className="text-text-secondary-65 flex items-center gap-1.5">
            <ThumbsUp className="h-3 w-3 shrink-0 text-emerald-500" />
            {votes.toLocaleString()} votes
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'storyPool',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Story Pool</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const balance = row.original.storyPool?.balance ?? 0;
      return (
        <Badge
          variant="secondary"
          className="gap-1 border-amber-500/20 bg-amber-500/10 text-xs font-semibold text-amber-600 dark:text-amber-400"
        >
          <Coins className="h-3 w-3 text-amber-500" />
          {balance.toLocaleString()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-text-secondary-50 hover:bg-muted/50 -ml-3 h-8 cursor-pointer px-2 text-[11px] font-semibold tracking-wider uppercase"
      >
        <span>Last Activity</span>
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp className="text-primary ml-1.5 h-3 w-3" />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown className="text-primary ml-1.5 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const lastActivity =
        row.original.lastActivityAt || row.original.updatedAt || row.original.createdAt;
      if (!lastActivity) return <span className="text-text-secondary-50 text-xs">—</span>;

      try {
        return (
          <span className="text-text-secondary-65 font-mono text-xs">
            {formatDistanceToNow(new Date(lastActivity), { addSuffix: true })}
          </span>
        );
      } catch {
        return <span className="text-text-secondary-50 text-xs">—</span>;
      }
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row, table }) => {
      const story = row.original;

      return (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              table.options.meta?.handleSelectStory?.(story);
            }}
            className="border-border/50 bg-card hover:bg-muted/60 h-8 cursor-pointer rounded-lg text-xs font-medium shadow-2xs transition-all"
          >
            Inspect
          </Button>
        </div>
      );
    },
  },
];
