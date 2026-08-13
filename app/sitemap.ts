import type { MetadataRoute } from 'next';

import { getPublishedStorySlugs } from '@/services/stories/stories-public-api';

const BASE_URL = 'https://storychain-fe.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/how-to-use`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/writing-tips`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/community-guidelines`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Fetched from the public API — returns [] gracefully if the endpoint is not
  // yet available. No code changes needed once the backend is deployed.
  let storyPages: MetadataRoute.Sitemap = [];
  try {
    const stories = await getPublishedStorySlugs();
    storyPages = stories.map((story) => ({
      url: `${BASE_URL}/stories/${story.slug}`,
      lastModified: new Date(story.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // Silently skip — sitemap still works for static pages
  }

  return [...staticPages, ...storyPages];
}
