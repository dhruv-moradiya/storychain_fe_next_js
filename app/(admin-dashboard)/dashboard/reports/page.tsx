import type { Metadata } from 'next';

import { AdminReportsTableSection } from '@/components/admin-dashboard/reports/admin-reports-table-section';

export const metadata: Metadata = {
  title: 'Platform Reports Moderation | StoryChain Admin',
  description: 'Manage and resolve platform-wide content and user reports.',
};

export default function AdminReportsPage() {
  return (
    <div className="w-full space-y-6 p-6">
      <div>
        <h1 className="text-text-primary text-2xl font-bold tracking-tight">
          Platform Reports Moderation
        </h1>
        <p className="text-text-secondary-65 text-sm">
          Review, status-manage, and resolve global content and user reports across StoryChain.
        </p>
      </div>

      <AdminReportsTableSection />
    </div>
  );
}
