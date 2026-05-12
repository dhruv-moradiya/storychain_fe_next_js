'use client';

import { useParams, useSearchParams } from 'next/navigation';

export type TBuilderMode = 'new' | 'update';

export function useBuilderParams() {
  const searchParams = useSearchParams();
  const params = useParams();
  console.log('params', params);

  const mode = (searchParams.get('mode') as TBuilderMode) || 'new';
  const autoSaveId = searchParams.get('autoSaveId') || undefined;
  const parentChapterSlug = searchParams.get('parentChapterSlug') || undefined;

  return {
    storySlug: params.slug as string,
    mode,
    autoSaveId,
    parentChapterSlug,
  };
}
