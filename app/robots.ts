import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/profile/', '/api/', '/_next/'],
    },
    sitemap: 'https://storychain-fe.vercel.app/sitemap.xml', // Update to your production domain
  };
}
