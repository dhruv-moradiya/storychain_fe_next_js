import type { Metadata } from 'next';

// ─────────────────────────────────────────────────────────────────────────────
// Site-wide constants
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name: 'StoryChain',
  url: 'https://storychain-fe.vercel.app',
  description:
    'Create, collaborate, and explore branching narratives with StoryChain. The ultimate platform for interactive storytelling where your choices shape unique narrative journeys.',
  defaultOgImage:
    'https://res.cloudinary.com/dpji4qfnu/image/upload/v1774158510/storychain-logo-raw-removebg-preview_mhethr.png',
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

/** Shared robots config — used across all public pages */
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

// ─────────────────────────────────────────────────────────────────────────────
// Story pages
// ─────────────────────────────────────────────────────────────────────────────

export interface StoryMetaInput {
  title: string;
  description: string;
  slug: string;
  /** Raw HTML description — will be stripped & truncated automatically */
  rawDescription?: string;
  coverImageUrl?: string;
  author?: string;
  genres?: string[];
  /** Sub-page label, e.g. "Overview", "Chapters", "Collaborators" */
  pageLabel?: string;
}

/**
 * Build Next.js Metadata for any story sub-page.
 *
 * @example
 * // app/(protected)/stories/[slug]/overview/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const { slug } = await params;
 *   const story = await getStoryOverview(slug);
 *   return buildStoryMeta({
 *     title: story.title,
 *     description: story.description,
 *     slug,
 *     rawDescription: story.description,
 *     coverImageUrl: story.coverImage?.url,
 *     pageLabel: 'Overview',
 *   });
 * }
 */
export function buildStoryMeta({
  title,
  description,
  slug,
  rawDescription,
  coverImageUrl,
  author,
  genres = [],
  pageLabel,
}: StoryMetaInput): Metadata {
  const metaDescription = toMetaDescription(rawDescription ?? description);
  const pageTitle = pageLabel ? `${title} — ${pageLabel}` : title;
  const canonicalUrl = toCanonicalUrl(
    `/stories/${slug}${pageLabel ? `/${pageLabel.toLowerCase().replace(/\s+/g, '-')}` : ''}`
  );

  const ogImage = coverImageUrl
    ? { url: coverImageUrl, width: 1200, height: 630, alt: `${title} cover` }
    : { url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630, alt: title };

  const keywords = [
    title,
    'story',
    'collaborative writing',
    'branching narrative',
    ...(author ? [author] : []),
    ...genres,
  ];

  return {
    title: pageTitle,
    description: metaDescription,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      title: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
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
  author?: {
    clerkId: string;
    username: string;
    avatarUrl?: string;
    email?: string;
    displayName?: string;
  };
}

/**
 * Build Next.js Metadata for a chapter read page.
 *
 * @example
 * // app/(protected)/stories/[slug]/chapter/[chapterSlug]/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const { slug, chapterSlug } = await params;
 *   const response = await chapterApi.getCachedChapterBySlug(chapterSlug);
 *   const chapter = response.data;
 *   return buildChapterMeta({
 *     storySlug: slug,
 *     chapterTitle: chapter.title,
 *     chapterSlug,
 *     description: chapter.content,
 *     author: {
 *       clerkId: chapter.authorId,
 *       username: chapter.author?.username || 'unknown',
 *       avatarUrl: chapter.author?.avatarUrl,
 *     },
 *   });
 * }
 */
export function buildChapterMeta({
  storySlug,
  chapterTitle,
  chapterSlug,
  description,
  author,
}: ChapterMetaInput): Metadata {
  const pageTitle = chapterTitle;
  const metaDescription =
    description?.substring(0, 160) ?? `Read "${chapterTitle}" on ${SITE_CONFIG.name}.`;
  const canonicalUrl = toCanonicalUrl(`/stories/${storySlug}/chapter/${chapterSlug}`);

  const ogImage = {
    url: SITE_CONFIG.defaultOgImage,
    width: 1200,
    height: 630,
    alt: pageTitle,
  };

  return {
    title: pageTitle,
    description: metaDescription,
    authors: author ? [{ name: author.username }] : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      title: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
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
  const pageTitle = pageLabel ? `${name} — ${pageLabel}` : name;
  const metaDescription =
    bio?.substring(0, 160) ?? `View ${name}'s stories and contributions on ${SITE_CONFIG.name}.`;
  const canonicalUrl = toCanonicalUrl(`/profile/${username}`);

  const ogImage = avatarUrl
    ? { url: avatarUrl, width: 400, height: 400, alt: `${name}'s avatar` }
    : { url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630, alt: pageTitle };

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
    robots: NO_INDEX_ROBOTS, // Profile pages are auth-protected — no indexing
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
  | 'Tree';

const SUB_PAGE_DESCRIPTIONS: Record<StorySubPage, (storyTitle: string) => string> = {
  Chapters: (t) => `Browse all chapters of "${t}" on ${SITE_CONFIG.name}.`,
  Collaborators: (t) => `View and manage collaborators for "${t}" on ${SITE_CONFIG.name}.`,
  'Submit Requests': (t) => `Review and manage chapter PR submissions for "${t}".`,
  Analytics: (t) => `Story analytics and performance metrics for "${t}".`,
  History: (t) => `Full activity and version history for "${t}".`,
  Settings: (t) => `Story settings and configuration for "${t}".`,
  Tree: (t) => `Explore the branching narrative tree for "${t}".`,
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
    title: `${subPage} — ${title}`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      title: `${subPage} — ${title}`,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary',
      title: `${subPage} — ${title}`,
      description,
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: NO_INDEX_ROBOTS, // Protected story management pages — don't index
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
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
    description: description ?? `${title} — ${SITE_CONFIG.name}`,
    robots: NO_INDEX_ROBOTS,
  };
}
