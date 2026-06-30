import { useMemo } from 'react';

import type { IChapterTreeItem } from '@/components/stories/sections/tree-section/types/canvas.types';

import type { IChapterTableRow } from '../types';

export function mapTreeToTable(items: IChapterTreeItem[]): IChapterTableRow[] {
  if (!items) return [];
  return items.map((item) => ({
    _id: item._id,
    slug: item.slug,
    storySlug: item.storySlug,
    parentChapterSlug: item.parentChapterSlug,
    ancestorSlugs: item.ancestorSlugs || [],
    depth: item.depth || 0,
    branchIndex: item.branchIndex || 0,
    authorId: item.author?.clerkId || '',
    authorName: item.author?.username || 'Unknown',
    title: item.title,
    content: '',
    chapterNumber: 1 || null,
    votes: item.votes || { upvotes: 0, downvotes: 0, score: 0 },
    status: item.status,
    isEnding: item.isEnding || false,
    pullRequest: {
      isPR: !!item.prId,
      prId: item.prId || undefined,
    },
    version: item.version || 1,
    stats: item.stats || {
      reads: 0,
      uniqueReaders: 0,
      completionRate: 0,
      engagementScore: 0,
      comments: 0,
      childBranches: 0,
    },
    reportCount: item.reportCount || 0,
    isFlagged: item.isFlagged || false,
    coinPrice: item.coinPrice || 0,
    isUnlock: item.isUnlock || false,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    subRows: item.children && item.children.length > 0 ? mapTreeToTable(item.children) : undefined,
  }));
}

export function useMapTreeToTable(items: IChapterTreeItem[] | undefined) {
  return useMemo(() => mapTreeToTable(items || []), [items]);
}
