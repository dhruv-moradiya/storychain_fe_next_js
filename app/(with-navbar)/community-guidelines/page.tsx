import type { Metadata } from 'next';

import { CommunityGuidelinesContent } from '@/components/community-guidelines/community-guidelines-content';

export const metadata: Metadata = {
  title: 'Community Guidelines | StoryChain',
  description:
    'Read the Community Guidelines for StoryChain. Discover our standards for respectful co-authorship, content safety, originality, and fair play.',
};

export default function CommunityGuidelinesPage() {
  return <CommunityGuidelinesContent />;
}
