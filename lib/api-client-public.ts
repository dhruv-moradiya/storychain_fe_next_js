import axios from 'axios';

/**
 * Public API client — no authentication interceptor.
 *
 * Use this ONLY for public / unauthenticated endpoints such as:
 * - GET /stories/public/:slug/meta  (story SEO metadata)
 * - GET /users/public/:userId/meta  (user profile SEO metadata)
 * - GET /stories/public/published   (sitemap story list)
 *
 * Social media crawlers (WhatsApp, Facebook, Instagram, etc.) visit pages as
 * anonymous bots. generateMetadata() runs on the server and must be able to
 * fetch data without a user session. This client has no auth interceptor, so
 * it works correctly in that context.
 */
const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // No withCredentials — no cookies forwarded
  // No Authorization interceptor — fully anonymous requests
});

export default publicApiClient;
