import { ProfileTabs } from '@/components/profile/profile-tabs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - StoryChain',
  description: 'Manage your profile and settings',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <ProfileTabs />
      <div className="container mx-auto max-w-4xl px-3 pb-14 sm:px-4">{children}</div>
    </div>
  );
}
