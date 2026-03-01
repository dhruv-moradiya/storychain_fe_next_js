import GeneralSection from '@/components/profile/general-section';
import { buildAppPageMeta } from '@/components/common';

export const metadata = buildAppPageMeta({
  title: 'My Profile',
  description: 'Manage your StoryChain profile, stories, and settings.',
});

export default function ProfilePage() {
  return <GeneralSection />;
}
