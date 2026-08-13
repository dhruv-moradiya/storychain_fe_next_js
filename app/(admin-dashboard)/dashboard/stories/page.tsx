import type { Metadata } from 'next';

import { AdminStoriesTableSection } from '@/components/admin-dashboard/stories';

export const metadata: Metadata = {
  title: 'Stories Management | StoryChain Admin',
  description: 'View and manage all platform stories, settings, chapters, and story pools.',
};

export default function AdminStoriesPage() {
  return (
    <div className="w-full space-y-6 p-6">
      <div>
        <h1 className="text-text-primary text-2xl font-bold tracking-tight">Stories Management</h1>
        <p className="text-text-secondary-65 text-sm">
          View, filter, and inspect platform stories across StoryChain.
        </p>
      </div>

      <AdminStoriesTableSection />
    </div>
  );
}
