import publicApiClient from '@/lib/api-client-public';

export interface IPublicUserMeta {
  clerkId: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface IPublicUserMetaResponse {
  success: boolean;
  data: IPublicUserMeta;
}

/**
 * Fetch user profile metadata without authentication.
 * Endpoint: GET /users/public/:userId/meta
 *
 * Used exclusively by generateMetadata() in profile pages.
 * Returns only public-safe user fields (no email, no private data).
 */
export const getPublicUserMeta = async (userId: string): Promise<IPublicUserMeta | null> => {
  try {
    const response = await publicApiClient.get<IPublicUserMetaResponse>(
      `/users/public/${userId}/meta`
    );
    return response.data?.data ?? null;
  } catch {
    return null;
  }
};
