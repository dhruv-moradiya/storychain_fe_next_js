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

      {/* Table */}
      <ChaptersTable data={tableData} context={context} pageSize={10} />
    </div>
  );
}
