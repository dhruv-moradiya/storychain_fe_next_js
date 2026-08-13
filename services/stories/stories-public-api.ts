import publicApiClient from '@/lib/api-client-public';

export interface IPublicStoryMeta {
  title: string;
  slug: string;
  description: string;
  status: string;
  cardImage?: { url: string; publicId: string };
  coverImage?: { url: string; publicId: string };
  creator: { username: string; clerkId: string };
  settings: { genres: string[] };
  stats: { totalChapters: number };
}

export interface IPublicStoryMetaResponse {
  success: boolean;
  data: IPublicStoryMeta;
}

export interface IPublicStoryListItem {
  slug: string;
  updatedAt: string;
}

export interface IPublicStoryListResponse {
  success: boolean;
  data: IPublicStoryListItem[];
}

/**
 * Fetch story metadata without authentication.
 * Endpoint: GET /stories/public/:slug/meta
 *
 * Used exclusively by generateMetadata() for social sharing previews.
 * Only returns data for published/public stories.
 */
export const getPublicStoryMeta = async (slug: string): Promise<IPublicStoryMeta | null> => {
  try {
    const response = await publicApiClient.get<IPublicStoryMetaResponse>(
      `/stories/public/${slug}/meta`
    );
    return response.data?.data ?? null;
  } catch {
    return null;
  }
};

/**
 * Fetch all published story slugs for sitemap generation.
 * Endpoint: GET /stories/public/published
 *
 * Used exclusively by app/sitemap.ts.
 */
export const getPublishedStorySlugs = async (): Promise<IPublicStoryListItem[]> => {
  try {
    const response = await publicApiClient.get<IPublicStoryListResponse>(
      '/stories/public/published'
    );
    return response.data?.data ?? [];
  } catch {
    return [];
  }
};
