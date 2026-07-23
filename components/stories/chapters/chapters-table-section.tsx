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

      {/* Table */}
      <ChaptersTable data={tableData} context={context} pageSize={10} />
    </div>
  );
}
