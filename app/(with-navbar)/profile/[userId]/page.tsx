import UserProfileView from '@/components/user-profile/user-profile-view';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  return {
    title: `Profile - ${userId} | StoryChain`,
    description: `View the profile of user ${userId} on StoryChain`,
  };
}

export default async function UserProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return <UserProfileView userId={userId} />;
}
