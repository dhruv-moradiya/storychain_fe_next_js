'use client';

import { useSearchParams } from 'next/navigation';

export type TBuilderMode = 'new' | 'update';

export function useBuilderParams() {
  const searchParams = useSearchParams();

  const storySlug = searchParams.get('storySlug') || undefined;
  const mode = (searchParams.get('mode') as TBuilderMode) || 'new';
  const autoSaveId = searchParams.get('autoSaveId') || undefined;
  const parentChapterId = searchParams.get('parent') || undefined;

  return {
    storySlug,
    mode,
    autoSaveId,
    parentChapterId,
  };
}
