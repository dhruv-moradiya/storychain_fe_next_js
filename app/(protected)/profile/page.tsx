import { buildAppPageMeta } from '@/components/common';
import GeneralSection from '@/components/profile/general-section';

export const metadata = buildAppPageMeta({
  title: 'My Profile',
  description: 'Manage your StoryChain profile, stories, and settings.',
});

export default function ProfilePage() {
  return <GeneralSection />;
}
