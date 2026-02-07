import StoryBuilderClient from '@/components/story-builder/story-builder-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Story Builder | StoryChain',
  description: 'Create your interactive story chapter with our rich text editor.',
};

export default function BuilderPage() {
  return <StoryBuilderClient />;
}
