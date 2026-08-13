import { buildStaticPageMeta } from '@/components/common';

/**
 * Segment-level metadata for /writing-tips.
 *
 * The page.tsx file uses 'use client' (framer-motion animations), so metadata
 * cannot be exported from it directly. This layout.tsx provides the metadata
 * at the segment level instead — Next.js merges it correctly.
 */
export const metadata = buildStaticPageMeta({
  title: 'Writing Tips',
  description:
    'Level up your storytelling craft with expert writing tips, techniques, and best practices for collaborative branching narratives on StoryChain.',
  path: '/writing-tips',
  keywords: [
    'writing tips',
    'storytelling techniques',
    'creative writing',
    'branching narratives',
    'collaborative writing advice',
    'story craft',
  ],
});

export default function WritingTipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
