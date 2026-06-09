'use client';

import { StoryTabs } from '@/components/stories/stories-tabs';
import { StoryRoleProvider } from '@/components/stories/story-role-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <StoryRoleProvider>
        <StoryTabs />
        <div>{children}</div>
      </StoryRoleProvider>
    </div>
  );
}
