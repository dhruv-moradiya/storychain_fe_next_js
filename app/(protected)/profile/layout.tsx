import type { Metadata } from 'next';

import { ContentLayout } from '@/components/dashboard';
import { ProfileTabs } from '@/components/profile/profile-tabs';

export const metadata: Metadata = {
  title: 'Profile - StoryChain',
  description: 'Manage your profile and settings',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <ProfileTabs />
      <ContentLayout maxWidth="4xl" className="px-4 pb-14">
        {children}
      </ContentLayout>
    </div>
  );
}
