import type { Metadata } from 'next';
// ─────────────────────────────────────────────────────────────────────────────
// Story pages & cached fetcher
// ─────────────────────────────────────────────────────────────────────────────

import { cache } from 'react';

import type { IStoryOverview } from '@/type/story';

import { getPublicStoryMeta } from '@/services/stories/stories-public-api';
import { getStoryOverviewQueryFn } from '@/services/stories/stories.query';
import { type IPublicUserMeta, getPublicUserMeta } from '@/services/users/user-public-api';

// ─────────────────────────────────────────────────────────────────────────────
// Site-wide constants
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name: 'StoryChain',
  url: 'https://storychain-fe.vercel.app',
  description:
    'Create, collaborate, and explore branching narratives with StoryChain. The ultimate platform for interactive storytelling where your choices shape unique narrative journeys.',
  defaultOgImage:
    'https://res.cloudinary.com/dpji4qfnu/image/upload/v1781672960/5a66e236-525f-4415-a962-fabcd2e705b2_1_vigjei.png',
  twitterHandle: '@storychain',
  locale: 'en_US',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Strip HTML tags and truncate to a safe meta description length */
export function toMetaDescription(html: string, maxLength = 160): string {
  return html
    .replace(/<[^>]*>?/gm, '')
    .substring(0, maxLength)
    .trim();
}

/** Build the canonical URL for a page path */
export function toCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Shared robots config - used across all public pages */
const DEFAULT_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

/** Robots for pages we never want indexed (auth, settings, admin, etc.) */
const NO_INDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
};

/**
 * React.cache deduplicates story fetches so generateMetadata and page components
 * share a single request per render cycle on the server.
 *
 * Strategy:
 * 1. Try the public (no-auth) endpoint first — works for anonymous social crawlers.
 * 2. Fall back to the authenticated endpoint — works for logged-in users.
 * 3. Return null on total failure — caller should provide safe defaults.
 */
export const getCachedStoryOverview = cache(
  async (slug: string): Promise<IStoryOverview | null> => {
    // 1. Try public endpoint (no auth required — works for WhatsApp/Facebook/etc.)
    try {
      const publicData = await getPublicStoryMeta(slug);
      if (publicData) {
        // Shape the public response to match IStoryOverview so callers stay unchanged
        return {
          title: publicData.title,
          slug: publicData.slug,
          description: publicData.description,
          status: publicData.status as IStoryOverview['status'],
          cardImage: publicData.cardImage,
          coverImage: publicData.coverImage,
          creator: {
            clerkId: publicData.creator.clerkId,
            username: publicData.creator.username,
            // Fields below are not in the public response; use safe defaults
            email: '',
            avatar: '',
            displayName: publicData.creator.username,
          },
          settings: {
            ...({} as IStoryOverview['settings']),
            genres: publicData.settings.genres,
          },
          stats: {
            ...({} as IStoryOverview['stats']),
            totalChapters: publicData.stats.totalChapters,
          },
          // Non-SEO fields — safe empty defaults
          collaborators: [],
          latestChapters: [],
          tags: [],
          genres: publicData.settings.genres,
          contentRating: 'general' as IStoryOverview['contentRating'],
          trendingScore: 0,
          lastActivityAt: new Date(),
          publishedAt: new Date(),
        } as unknown as IStoryOverview;
      }
    } catch {
      // Public endpoint unavailable or not yet deployed — fall through
    }

    // 2. Fall back to authenticated endpoint (works for logged-in users)
    try {
      const res = await getStoryOverviewQueryFn(slug);
      return (res?.data as IStoryOverview) ?? null;
    } catch {
      return null;
    }
  }
);

/**
 * React.cache-wrapped fetch for public user profile metadata.
 * Tries the public endpoint first (no auth), always returns null on failure.
 */
export const getCachedPublicUserProfile = cache(
  async (userId: string): Promise<IPublicUserMeta | null> => {
    return await getPublicUserMeta(userId);
  }
);

export interface StoryMetaInput {
  title: string;
  description: string;
  slug: string;
  /** Raw HTML description - will be stripped & truncated automatically */
  rawDescription?: string;
  cardImageUrl?: string;
  coverImageUrl?: string;
  author?: string;
  genres?: string[];
  /** Sub-page label, e.g. "Overview", "Chapters", "Collaborators" */
  pageLabel?: string;
  stats?: {
    totalChapters?: number;
    totalBranches?: number;
    totalReads?: number;
  };
}

/**
 * Build Next.js Metadata for any story page or sub-page (WhatsApp, Twitter/X, LinkedIn preview ready).
 */
export function buildStoryMeta({
  title,
  description,
  slug,
  rawDescription,
  cardImageUrl,
  coverImageUrl,
  author,
  genres = [],
  pageLabel,
  stats,
}: StoryMetaInput): Metadata {
  const cleanDesc = toMetaDescription(rawDescription ?? description);

  // Format metadata description with author and chapter info for social preview clarity
  const authorCredit = author ? `By ${author}` : '';
  const chaptersInfo =
    stats?.totalChapters !== undefined
      ? `${stats.totalChapters} ${stats.totalChapters === 1 ? 'Chapter' : 'Chapters'}`
      : '';

  const metaParts = [authorCredit, chaptersInfo, cleanDesc].filter(Boolean);
  const metaDescription = metaParts.length > 0 ? metaParts.join(' • ') : cleanDesc;

  const baseTitle = pageLabel ? `${title} (${pageLabel})` : title;
  const displayTitle = author ? `${baseTitle} by ${author}` : baseTitle;
  const canonicalUrl = toCanonicalUrl(
    `/stories/${slug}${pageLabel ? `/${pageLabel.toLowerCase().replace(/\s+/g, '-')}` : ''}`
  );

  // Priority for image: cardImageUrl -> coverImageUrl -> SITE_CONFIG.defaultOgImage
  const resolvedImageUrl = cardImageUrl || coverImageUrl || SITE_CONFIG.defaultOgImage;
  const imageAlt = `${title} - Story Card Image`;

  const ogImage = {
    url: resolvedImageUrl,
    secureUrl: resolvedImageUrl,
    width: 1200,
    height: 630,
    alt: imageAlt,
    type: resolvedImageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg',
  };

  const keywords = [
    title,
    'StoryChain',
    'collaborative writing',
    'branching narrative',
    ...(author ? [author] : []),
    ...genres,
  ];

  return {
    // Use {absolute} to bypass the root layout's title template ('%s | StoryChain')
    // which would otherwise produce "... | StoryChain | StoryChain"
    title: { absolute: `${displayTitle} | ${SITE_CONFIG.name}` },
    description: metaDescription,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      title: `${displayTitle} | ${SITE_CONFIG.name}`,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayTitle} | ${SITE_CONFIG.name}`,
      description: metaDescription,
      images: [ogImage.url],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: DEFAULT_ROBOTS,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Chapter pages
// ─────────────────────────────────────────────────────────────────────────────

export interface ChapterMetaInput {
  storySlug: string;
  chapterTitle: string;
  chapterSlug: string;
  description?: string;
  cardImageUrl?: string;
  coverImageUrl?: string;
  storyTitle?: string;
  author?: {
    clerkId?: string;
    username: string;
    avatarUrl?: string;
    email?: string;
    displayName?: string;
  };
}

/**
 * Build Next.js Metadata for a chapter read page.
 */
export function buildChapterMeta({
  storySlug,
  chapterTitle,
  chapterSlug,
  description,
  cardImageUrl,
  coverImageUrl,
  storyTitle,
  author,
}: ChapterMetaInput): Metadata {
  const authorName = author?.displayName || author?.username;
  const authorCredit = authorName ? `by ${authorName}` : '';
  const pageTitle = storyTitle
    ? `${chapterTitle} - ${storyTitle} ${authorCredit}`
    : `${chapterTitle} ${authorCredit}`;

  const cleanDesc = description ? toMetaDescription(description) : '';
  const metaDescription = cleanDesc ? cleanDesc : `Read "${chapterTitle}" on ${SITE_CONFIG.name}.`;

  const canonicalUrl = toCanonicalUrl(`/stories/${storySlug}/chapter/${chapterSlug}`);

  const resolvedImageUrl = cardImageUrl || coverImageUrl || SITE_CONFIG.defaultOgImage;
  const ogImage = {
    url: resolvedImageUrl,
    secureUrl: resolvedImageUrl,
    width: 1200,
    height: 630,
    alt: pageTitle,
    type: resolvedImageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg',
  };

  return {
    // Use {absolute} to bypass the root layout's title template
    title: { absolute: `${pageTitle.trim()} | ${SITE_CONFIG.name}` },
    description: metaDescription,
    authors: authorName ? [{ name: authorName }] : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      title: `${pageTitle.trim()} | ${SITE_CONFIG.name}`,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle.trim()} | ${SITE_CONFIG.name}`,
      description: metaDescription,
      images: [ogImage.url],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: DEFAULT_ROBOTS,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Profile pages
// ─────────────────────────────────────────────────────────────────────────────

export interface ProfileMetaInput {
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  /** Sub-page label, e.g. "Stories", "Badges", "Settings" */
  pageLabel?: string;
}

/**
 * Build Next.js Metadata for public/private profile pages.
 *
 * @example
 * // app/(with-navbar)/profile/[username]/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const { username } = await params;
 *   const user = await getUserProfile(username);
 *   return buildProfileMeta({
 *     username,
 *     displayName: user.displayName,
 *     bio: user.bio,
 *     avatarUrl: user.avatarUrl,
 *   });
 * }
 */
export function buildProfileMeta({
  username,
  displayName,
  bio,
  avatarUrl,
  pageLabel,
}: ProfileMetaInput): Metadata {
  const name = displayName ?? `@${username}`;
  const pageTitle = pageLabel ? `${name} - ${pageLabel}` : name;
  const metaDescription =
    bio?.substring(0, 160) ?? `View ${name}'s stories and contributions on ${SITE_CONFIG.name}.`;
  const canonicalUrl = toCanonicalUrl(`/profile/${username}`);

  const ogImage = avatarUrl
    ? {
        url: avatarUrl,
        secureUrl: avatarUrl,
        width: 400,
        height: 400,
        alt: `${name}'s avatar`,
        type: avatarUrl.endsWith('.png') ? 'image/png' : 'image/jpeg',
      }
    : {
        url: SITE_CONFIG.defaultOgImage,
        secureUrl: SITE_CONFIG.defaultOgImage,
        width: 1200,
        height: 630,
        alt: pageTitle,
        type: 'image/png',
      };

  return {
    title: pageTitle,
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'profile',
      title: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description: metaDescription,
      images: [ogImage.url],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: NO_INDEX_ROBOTS, // Profile pages are auth-protected - no indexing
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Static / utility story pages  (Collaborators, Submit Requests, Analytics…)
// ─────────────────────────────────────────────────────────────────────────────

export type StorySubPage =
  | 'Chapters'
  | 'Collaborators'
  | 'Submit Requests'
  | 'Analytics'
  | 'History'
  | 'Settings'
  | 'Tree'
  | 'Reports';

const SUB_PAGE_DESCRIPTIONS: Record<StorySubPage, (storyTitle: string) => string> = {
  Chapters: (t) => `Browse all chapters of "${t}" on ${SITE_CONFIG.name}.`,
  Collaborators: (t) => `View and manage collaborators for "${t}" on ${SITE_CONFIG.name}.`,
  'Submit Requests': (t) => `Review and manage chapter PR submissions for "${t}".`,
  Analytics: (t) => `Story analytics and performance metrics for "${t}".`,
  History: (t) => `Full activity and version history for "${t}".`,
  Settings: (t) => `Story settings and configuration for "${t}".`,
  Tree: (t) => `Explore the branching narrative tree for "${t}".`,
  Reports: (t) => `Review user reports and moderation appeals for "${t}".`,
};

/**
 * Build Next.js Metadata for static story sub-pages (no dynamic story data needed).
 *
 * @example
 * // app/(protected)/stories/[slug]/collaborators/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const { slug } = await params;
 *   return buildStorySubPageMeta(slug, 'Collaborators');
 * }
 */
export function buildStorySubPageMeta(
  slug: string,
  subPage: StorySubPage,
  storyTitle?: string
): Metadata {
  const title = storyTitle ?? slug;
  const description = SUB_PAGE_DESCRIPTIONS[subPage](title);
  const urlSlug = subPage.toLowerCase().replace(/\s+/g, '-');
  const canonicalUrl = toCanonicalUrl(`/stories/${slug}/${urlSlug}`);

  return {
    title: `${subPage} - ${title}`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      title: `${subPage} - ${title}`,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary',
      title: `${subPage} - ${title}`,
      description,
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: NO_INDEX_ROBOTS, // Protected story management pages - don't index
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Generic static pages (landing, pricing, how-to-use, writing-tips, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export interface StaticPageMetaInput {
  title: string;
  description: string;
  path: string;
  ogImageUrl?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Build Next.js Metadata for any generic static page.
 *
 * @example
 * // app/(with-navbar)/pricing/page.tsx
 * export const metadata = buildStaticPageMeta({
 *   title: 'Pricing',
 *   description: 'Simple, transparent pricing for every storyteller.',
 *   path: '/pricing',
 *   keywords: ['pricing', 'plans', 'subscription'],
 * });
 */
export function buildStaticPageMeta({
  title,
  description,
  path,
  ogImageUrl,
  keywords = [],
  noIndex = false,
}: StaticPageMetaInput): Metadata {
  const canonicalUrl = toCanonicalUrl(path);
  const ogImage = ogImageUrl ?? SITE_CONFIG.defaultOgImage;

  return {
    title,
    description,
    keywords: [...keywords, SITE_CONFIG.name, 'storytelling', 'collaborative writing'],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: noIndex ? NO_INDEX_ROBOTS : DEFAULT_ROBOTS,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard / protected app pages  (Settings, Notifications, My Reports, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export interface AppPageMetaInput {
  title: string;
  description?: string;
}

/**
 * Build Next.js Metadata for private app pages. Always sets noIndex.
 *
 * @example
 * // app/(protected)/profile/settings/page.tsx
 * export const metadata = buildAppPageMeta({
 *   title: 'Account Settings',
 *   description: 'Manage your StoryChain account settings.',
 * });
 */
export function buildAppPageMeta({ title, description }: AppPageMetaInput): Metadata {
  return {
    title,
    description: description ?? `${title} - ${SITE_CONFIG.name}`,
    robots: NO_INDEX_ROBOTS,
  };
}
