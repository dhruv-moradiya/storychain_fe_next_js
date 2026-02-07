import { StoryTabs } from '@/components/stories/stories-tabs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <StoryTabs />
      <div>{children}</div>
    </div>
  );
}
