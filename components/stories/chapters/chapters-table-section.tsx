'use client';

import { useParams } from 'next/navigation';

import { ScrollText } from 'lucide-react';

import { TableSkeleton } from '@/components/common/table-skeleton';
import { useStoryRole } from '@/components/stories/story-role-context';
import { useGetStoryTree } from '@/services/stories/stories.query';

import { ChaptersTable } from './chapters-table';
import { useMapTreeToTable } from './hooks/use-map-tree-to-table';
import { MOCK_CURRENT_USER_ID } from './mock-data';
import type { IChaptersTableContext, UserRole } from './types';

export function ChaptersTableSection() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data, isLoading } = useGetStoryTree(slug);

  const { role } = useStoryRole();

  const context: IChaptersTableContext = {
    isOwnerOrPrivileged: role === 'owner' || role === 'co_author',
    currentUserId: MOCK_CURRENT_USER_ID,
    userRole: role as UserRole,
  };

  const tableData = useMapTreeToTable(data?.data?.chapters);

  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <ScrollText className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h1 className="text-text-primary text-xl font-semibold">Chapters</h1>
            <p className="text-text-secondary-65 text-sm">Manage your story chapters</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-border/30 bg-muted/20 flex flex-wrap items-center gap-4 rounded-xl border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
            <span className="text-[10px] text-emerald-500">✓</span>
          </div>
          <span className="text-text-secondary-65 text-xs">Unlocked / Free</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10">
            <span className="text-[10px] text-amber-500">🔒</span>
          </div>
          <span className="text-text-secondary-65 text-xs">Locked — costs coins</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-l-brand-pink-500/20 bg-muted/20 h-2 w-4 rounded border-l-2" />
          <span className="text-text-secondary-65 text-xs">Child branch (depth 1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-l-brand-pink-500/30 bg-muted/30 h-2 w-4 rounded border-l-2" />
          <span className="text-text-secondary-65 text-xs">Grandchild (depth 2+)</span>
        </div>
        <span className="text-text-secondary-50 ml-auto text-xs">
          Click <kbd className="bg-muted border-border/50 rounded border px-1 text-[10px]">▶</kbd>{' '}
          to expand branches
        </span>
      </div>

      {/* <div className="bg-card border-soft flex max-w-[400px] flex-col gap-5 rounded-2xl border p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
              <Unlock className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="text-text-secondary-65 text-[15px] font-medium">Free</span>
          </div>
          <div className="flex items-center gap-2">
            {chapterStatusBadge('PUBLISHED'.toUpperCase(), { size: 'sm', className: 'uppercase' })}
            <button className="text-text-secondary-50 hover:text-text-primary hover:bg-muted/50 rounded-md p-1 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-text-secondary-50 text-lg font-semibold">#1</span>
          <h3 className="text-text-primary text-lg font-bold">The Invitation</h3>
        </div>

        <div className="border-border/40 flex items-center justify-between border-b px-1 pt-1 pb-5">
          <div className="flex items-center gap-2 text-emerald-500">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm font-medium">0</span>
          </div>
          <div className="flex items-center gap-2 text-red-400">
            <ThumbsDown className="h-4 w-4" />
            <span className="text-sm font-medium">0</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">0</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-medium">0</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-2">
            <GitFork className="h-4 w-4" />
            <span className="text-sm font-medium">1</span>
          </div>
        </div>

        <div className="flex items-start justify-between pt-1">
          <div className="flex flex-col gap-2">
            <span className="text-text-secondary-50 text-[10px] font-bold tracking-wider uppercase">
              Depth
            </span>
            <Badge
              variant="outline"
              className="text-text-secondary-65 border-border/40 h-5 px-1.5 font-mono text-[10px]"
            >
              L1
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-text-secondary-50 text-[10px] font-bold tracking-wider uppercase">
              Engagement
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-red-400">0/100</span>
              <span className="text-text-secondary-50 text-[10px] font-medium">0.0% complete</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-text-secondary-50 text-[10px] font-bold tracking-wider uppercase">
              Moderation
            </span>
            <span className="text-text-secondary-65 mt-1 text-xs font-medium">Clean</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-text-secondary-50 text-[10px] font-bold tracking-wider uppercase">
              Ver.
            </span>
            <span className="text-text-secondary-65 mt-1 text-xs font-medium">v1</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-text-secondary-50 text-[10px] font-bold tracking-wider uppercase">
              Updated
            </span>
            <span className="text-text-secondary-65 mt-1 text-xs font-medium">Jun 30, 2026</span>
          </div>
        </div>
      </div> */}

      {/* Table */}
      <ChaptersTable data={tableData} context={context} pageSize={10} />
    </div>
  );
}
