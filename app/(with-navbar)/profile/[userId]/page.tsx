import type { Metadata } from 'next';

import { buildProfileMeta, getCachedPublicUserProfile } from '@/components/common';
import UserProfileView from '@/components/user-profile/user-profile-view';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  const user = await getCachedPublicUserProfile(userId);

  return buildProfileMeta({
    username: user?.username ?? userId,
    displayName: user?.displayName,
    bio: user?.bio,
    avatarUrl: user?.avatarUrl,
  });
}

export default async function UserProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  return <UserProfileView userId={userId} />;
}
