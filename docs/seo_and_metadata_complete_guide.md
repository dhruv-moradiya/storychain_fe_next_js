# StoryChain — Complete SEO & Metadata Guide

> **Purpose**: Everything you need to know to add, maintain, and test social-sharing metadata across every route in the app — stories, chapters, profiles, and static pages.

---

## Table of Contents

1. [How Social Link Previews Work](#1-how-social-link-previews-work)
2. [Architecture Overview](#2-architecture-overview)
3. [The Critical API Authentication Problem](#3-the-critical-api-authentication-problem)
4. [Site-Wide Root Metadata](#4-site-wide-root-metadata)
5. [Builder Functions — Reference](#5-builder-functions--reference)
6. [Route Coverage Map](#6-route-coverage-map)
7. [New Files Created for SEO](#7-new-files-created-for-seo)
8. [Adding Metadata to a New Page](#8-adding-metadata-to-a-new-page)
9. [Structured Metadata Format](#9-structured-metadata-format)
10. [Sitemap & Robots](#10-sitemap--robots)
11. [Testing Social Previews](#11-testing-social-previews)
12. [Backend API Changes Required](#12-backend-api-changes-required)
13. [Frontend Changes Checklist](#13-frontend-changes-checklist)

---

## 1. How Social Link Previews Work

When you share a link on **WhatsApp, Facebook, Instagram, Telegram, Twitter/X, LinkedIn, Slack, iMessage**, the platform's crawler visits that URL as an **anonymous, unauthenticated HTTP GET request**. It reads specific `<meta>` tags from the HTML and builds the preview card.

The relevant tags are:

```html
<!-- Open Graph (used by Facebook, WhatsApp, LinkedIn, Telegram, Slack) -->
<meta property="og:title" content="Story Title by @author | StoryChain" />
<meta property="og:description" content="By @author • 5 Chapters • Clean story summary..." />
<meta property="og:image" content="https://res.cloudinary.com/.../card-image.jpg" />
<meta property="og:url" content="https://storychain-fe.vercel.app/stories/my-story" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="StoryChain" />

<!-- Twitter/X Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Story Title by @author | StoryChain" />
<meta name="twitter:description" content="By @author • 5 Chapters • Clean story summary..." />
<meta name="twitter:image" content="https://res.cloudinary.com/.../card-image.jpg" />
```

> [!IMPORTANT]
> **The crawler is unauthenticated.** It has no session cookie, no JWT token, nothing. If your backend API requires authentication for story data, the metadata fetch will fail and the preview will show the default platform-level OG image instead of the story's card image.

### What a rich preview looks like (after correct setup)

| Field       | Example Value                                                           |
| ----------- | ----------------------------------------------------------------------- |
| Title       | `The Dragon's Call by @john_doe \| StoryChain`                          |
| Description | `By @john_doe • 12 Chapters • A legendary dragon awakens in the north…` |
| Image       | Story's card image (1200×630)                                           |
| Site name   | `StoryChain`                                                            |

---

## 2. Architecture Overview

The SEO system is built on **Next.js App Router's Metadata API**. It follows this pattern:

```
app/layout.tsx                         ← Root metadata (site-wide defaults)
  └── app/(protected)/stories/[slug]/
        ├── page.tsx                   ← generateMetadata() for /stories/my-story
        ├── overview/page.tsx          ← generateMetadata() with full story data
        ├── chapter/[chapterSlug]/page.tsx  ← generateMetadata() with chapter data
        └── ... other sub-pages
```

All metadata builder utilities live in one file:

```
components/common/seo/seo-metadata.ts
```

And are exported through:

```
components/common/index.ts   →  import { buildStoryMeta, ... } from '@/components/common'
```

### Key concept: `generateMetadata` vs `export const metadata`

| Use Case                                               | Pattern                                              |
| ------------------------------------------------------ | ---------------------------------------------------- |
| Dynamic pages (story slug, chapter slug, user profile) | `export async function generateMetadata({ params })` |
| Static pages (pricing, how-to-use, landing page)       | `export const metadata = buildStaticPageMeta({...})` |
| Protected/private pages (dashboard, settings)          | `export const metadata = buildAppPageMeta({...})`    |

> [!IMPORTANT]
> **Metadata functions only work in Server Components.** If your `page.tsx` has `'use client'` at the top, you CANNOT export `metadata` or `generateMetadata` from it. You must move the client logic to a child component and keep the page file as a Server Component.

---

## 3. The Critical API Authentication Problem

### The Problem

Every story API call goes through `lib/api-client.ts`, which attaches a Clerk auth token:

```ts
// lib/api-client.ts — always tries to attach a token
apiClient.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    // Server-side: uses Clerk's auth()
    const { auth } = await import('@clerk/nextjs/server');
    const { getToken } = await auth();
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  // ...
});
```

When `generateMetadata()` runs **during a social crawler's request**, there is no Clerk session — `getToken()` returns `null`. If your backend **requires** a valid JWT for `GET /stories/slug/:slug/overview`, the metadata fetch will return a 401 error, and `getCachedStoryOverview()` will catch the error and return `null`.

The result: preview falls back to the generic StoryChain logo image instead of the story's card image.

### The Solution (Choose One)

#### ✅ Option A — Make the Story Overview API Publicly Accessible (Recommended)

Ask your backend team to create a **public version** of the story overview endpoint that doesn't require authentication:

```
GET /stories/public/:slug/overview
```

This endpoint should return **only the SEO-relevant fields**:

- `title`, `description`, `slug`
- `cardImage.url`, `coverImage.url`
- `creator.username`
- `settings.genres`
- `stats.totalChapters`
- `status` (only return data if story is published/public)

Then, create a separate `api-client-public.ts` (no auth interceptor) for metadata fetches:

```ts
// lib/api-client-public.ts
import axios from 'axios';

const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  // NO withCredentials, NO auth interceptor
});

export default publicApiClient;
```

Then update `getCachedStoryOverview` in `seo-metadata.ts` to use this public client.

#### Option B — Pass Clerk's Service Token for SSR (Workaround)

If the backend cannot be changed immediately, you can try passing a Clerk **service-level** machine token for server-side metadata calls. However, this approach is complex and fragile.

#### Option C — Use a Separate Next.js Route Handler as a Metadata Proxy

Create a Next.js **Route Handler** that fetches story data internally (server-to-server, bypassing user auth):

```
app/api/seo/story/[slug]/route.ts
```

This is only needed if the backend absolutely cannot expose a public endpoint.

---

## 4. Site-Wide Root Metadata

**File**: `app/layout.tsx`

The root layout sets the **default fallback metadata** used when a page-level `generateMetadata` doesn't override it.

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://storychain-fe.vercel.app'),
  title: {
    default: 'StoryChain - Collaborative Branching Storytelling Platform',
    template: '%s | StoryChain', // Sub-pages use: "Story Title | StoryChain"
  },
  description: 'Create, collaborate, and explore branching narratives...',
  openGraph: {
    images: [{ url: 'https://res.cloudinary.com/.../default-og.png', width: 1200, height: 630 }],
    siteName: 'StoryChain',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@storychain',
  },
};
```

> [!NOTE]
> The `metadataBase` is required for Next.js to resolve relative URLs in OG images. It must be set to your production domain.

**What to update when going to production:**

- Change `metadataBase` URL to the real production domain
- Add `verification.google` for Google Search Console
- Update `SITE_CONFIG.url` in `components/common/seo/seo-metadata.ts`

---

## 5. Builder Functions — Reference

All functions are in `components/common/seo/seo-metadata.ts`.

Import from: `@/components/common`

---

### 5.1 `buildStoryMeta` — Story pages with dynamic data

Use for: any route under `/stories/[slug]/` where you have the story's full data.

```ts
import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getCachedStoryOverview(slug);

  return buildStoryMeta({
    title: story?.title ?? slug,
    description: story?.description ?? '',
    rawDescription: story?.description, // Strips HTML tags automatically
    slug,
    cardImageUrl: story?.cardImage?.url, // Priority 1 for OG image
    coverImageUrl: story?.coverImage?.url, // Priority 2 for OG image
    author: story?.creator?.username,
    genres: story?.settings?.genres || story?.genres,
    stats: story?.stats, // Adds "5 Chapters" to description
    pageLabel: 'Overview', // → "My Story (Overview) by @author | StoryChain"
  });
}
```

**Output metadata structure:**

```ts
{
  title: "The Dragon's Call (Overview) by @john_doe | StoryChain",
  description: "By @john_doe • 12 Chapters • A legendary dragon awakens in the north…",
  keywords: ["The Dragon's Call", "StoryChain", "collaborative writing", "branching narrative", "@john_doe", "fantasy"],
  authors: [{ name: "@john_doe" }],
  alternates: { canonical: "https://storychain-fe.vercel.app/stories/the-dragons-call/overview" },
  openGraph: {
    type: "article",
    title: "The Dragon's Call (Overview) by @john_doe | StoryChain",
    description: "By @john_doe • 12 Chapters • A legendary dragon awakens in the north…",
    url: "https://storychain-fe.vercel.app/stories/the-dragons-call/overview",
    siteName: "StoryChain",
    locale: "en_US",
    images: [{ url: "https://res.cloudinary.com/.../card-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
    images: ["https://res.cloudinary.com/.../card-image.jpg"],
    creator: "@storychain",
  },
  robots: { index: true, follow: true, googleBot: { ... } },
}
```

---

### 5.2 `buildChapterMeta` — Chapter read pages

Use for: `/stories/[slug]/chapter/[chapterSlug]`

```ts
import { buildChapterMeta, getCachedStoryOverview } from '@/components/common';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  const story = await getCachedStoryOverview(slug);

  try {
    const chapter = await getChapterBySlug(chapterSlug);
    return buildChapterMeta({
      storySlug: slug,
      chapterTitle: chapter.title,
      chapterSlug,
      description: chapter.content, // Stripped of HTML automatically
      cardImageUrl: story?.cardImage?.url, // Story's card image used for chapter
      coverImageUrl: story?.coverImage?.url,
      storyTitle: story?.title,
      author: {
        username: chapter.author.username,
        displayName: chapter.author.displayName,
        avatarUrl: chapter.author.avatarUrl,
      },
    });
  } catch {
    // Graceful fallback if chapter fetch fails
    return buildChapterMeta({
      storySlug: slug,
      chapterTitle: chapterSlug,
      chapterSlug,
      cardImageUrl: story?.cardImage?.url,
      storyTitle: story?.title,
    });
  }
}
```

---

### 5.3 `buildStorySubPageMeta` — Protected management sub-pages

Use for: Collaborators, Analytics, Settings, Pull Requests, Reports, History, Tree — pages where the data is protected and you only need basic metadata.

```ts
import { buildStorySubPageMeta } from '@/components/common';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  return buildStorySubPageMeta(slug, 'Collaborators');
}
```

Available sub-page labels:

| Label               | URL Segment        |
| ------------------- | ------------------ |
| `'Chapters'`        | `/chapters`        |
| `'Collaborators'`   | `/collaborators`   |
| `'Submit Requests'` | `/submit-requests` |
| `'Analytics'`       | `/analytics`       |
| `'History'`         | `/history`         |
| `'Settings'`        | `/settings`        |
| `'Tree'`            | `/tree`            |
| `'Reports'`         | `/reports`         |

> [!NOTE]
> Sub-page metadata always sets `robots: noIndex` — these are protected pages that shouldn't appear in search results.

---

### 5.4 `buildProfileMeta` — User profile pages

Use for: `/profile/[userId]`

```ts
import { buildProfileMeta } from '@/components/common';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { userId } = await params;
  // Fetch user profile data (needs public API endpoint)
  const user = await getUserProfile(userId);

  return buildProfileMeta({
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    pageLabel: 'Stories', // Optional sub-page
  });
}
```

---

### 5.5 `buildStaticPageMeta` — Public static pages

Use for: Landing page, pricing, how-to-use, writing-tips, community-guidelines

```ts
import { buildStaticPageMeta } from '@/components/common';

// app/(with-navbar)/pricing/page.tsx
export const metadata = buildStaticPageMeta({
  title: 'Pricing',
  description: 'Simple, transparent pricing for every storyteller on StoryChain.',
  path: '/pricing',
  keywords: ['pricing', 'plans', 'subscription', 'free', 'premium'],
});
```

---

### 5.6 `buildAppPageMeta` — Private app pages (always noIndex)

Use for: Dashboard, notifications, account settings, my-stories list, any page behind auth that should never appear in search engines.

```ts
import { buildAppPageMeta } from '@/components/common';

// app/(protected)/notifications/page.tsx
export const metadata = buildAppPageMeta({
  title: 'Notifications',
  description: 'Your StoryChain notifications and activity updates.',
});
```

---

### 5.7 `getCachedStoryOverview` — Deduplication helper

This is a React `cache()` wrapper around `getStoryOverviewQueryFn`. It ensures that when both `generateMetadata()` and the `Page` component call it for the same slug, only **one** network request is made.

```ts
// components/common/seo/seo-metadata.ts
export const getCachedStoryOverview = cache(
  async (slug: string): Promise<IStoryOverview | null> => {
    try {
      const res = await getStoryOverviewQueryFn(slug);
      return (res?.data as IStoryOverview) ?? null;
    } catch {
      return null; // Graceful fallback — never throws
    }
  }
);
```

---

## 6. Route Coverage Map

### ✅ Already Implemented

| Route                                   | Builder Used         | Notes                                      |
| --------------------------------------- | -------------------- | ------------------------------------------ |
| `app/layout.tsx`                        | Static root metadata | Site-wide defaults, OG image, Twitter card |
| `/` (home)                              | Root layout inherits | No page-level override needed              |
| `/stories/[slug]`                       | `buildStoryMeta`     | Main story URL before redirect             |
| `/stories/[slug]/overview`              | `buildStoryMeta`     | Full story data, card image, author        |
| `/stories/[slug]/chapter/[chapterSlug]` | `buildChapterMeta`   | Chapter title, story card image, author    |
| `/stories/[slug]/chapters`              | `buildStoryMeta`     | Chapter list page                          |
| `/stories/[slug]/tree`                  | `buildStoryMeta`     | Branching tree view                        |
| `/stories/[slug]/analytics`             | `buildStoryMeta`     | Analytics page                             |
| `/stories/[slug]/settings`              | `buildStoryMeta`     | Settings page                              |
| `/stories/[slug]/collaborators`         | `buildStoryMeta`     | Collaborators page                         |
| `/stories/[slug]/pull-requests`         | `buildStoryMeta`     | Pull requests page                         |
| `/stories/[slug]/reports`               | `buildStoryMeta`     | Reports page                               |
| `/builder`                              | `buildAppPageMeta`   | Story creation builder                     |
| `/notifications`                        | `buildAppPageMeta`   | Notifications                              |
| `/how-to-use`                           | Static `metadata`    | Static page                                |
| `/community-guidelines`                 | Static `metadata`    | Static page                                |
| `/terms-and-conditions`                 | Static `metadata`    | Static page                                |

### ⚠️ Needs Improvement or Completion

| Route                           | Current State                       | What to Do                                    |
| ------------------------------- | ----------------------------------- | --------------------------------------------- |
| `/profile/[userId]`             | Generic title: `Profile - {userId}` | Use `buildProfileMeta` with fetched user data |
| `/explore`                      | No `metadata` export at all         | Add `buildStaticPageMeta`                     |
| `/pricing`                      | Needs verification                  | Check if `buildStaticPageMeta` is used        |
| `/writing-tips`                 | Needs verification                  | Check if `buildStaticPageMeta` is used        |
| `/stories/[slug]/history`       | Needs check                         | May need `buildStorySubPageMeta`              |
| `/stories/[slug]/add-character` | Needs check                         | Add `buildStorySubPageMeta`                   |
| `/stories/[slug]/characters`    | Needs check                         | Add `buildStorySubPageMeta`                   |
| `/stories/[slug]/builder`       | Has static metadata                 | Consider if story-specific metadata is needed |

---

## 7. New Files Created for SEO

### `components/common/seo/seo-metadata.ts`

The **central metadata library**. Contains:

- `SITE_CONFIG` — site constants (name, URL, default OG image, Twitter handle)
- `toMetaDescription(html, maxLength)` — strips HTML, truncates to 160 chars
- `toCanonicalUrl(path)` — builds absolute canonical URLs
- `getCachedStoryOverview(slug)` — cached story fetch for metadata
- `buildStoryMeta(input)` — story pages
- `buildChapterMeta(input)` — chapter read pages
- `buildProfileMeta(input)` — user profile pages
- `buildStorySubPageMeta(slug, subPage)` — protected sub-pages
- `buildStaticPageMeta(input)` — public static pages
- `buildAppPageMeta(input)` — always-noIndex app pages

### `components/common/index.ts`

The barrel export — all SEO helpers are re-exported here for clean imports.

---

## 8. Adding Metadata to a New Page

### For a new story sub-page under `/stories/[slug]/my-new-tab`

```tsx
// app/(protected)/stories/[slug]/my-new-tab/page.tsx
import type { Metadata } from 'next';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';
import MyNewTabClient from '@/components/stories/my-new-tab/my-new-tab-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getCachedStoryOverview(slug);

  return buildStoryMeta({
    title: story?.title ?? slug,
    description: story?.description ?? '',
    rawDescription: story?.description,
    slug,
    cardImageUrl: story?.cardImage?.url,
    coverImageUrl: story?.coverImage?.url,
    author: story?.creator?.username,
    genres: story?.settings?.genres || story?.genres,
    stats: story?.stats,
    pageLabel: 'My New Tab', // Customise this label for the sub-page
  });
}

// Page must be a Server Component (no 'use client')
export default async function MyNewTabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MyNewTabClient slug={slug} />;
}
```

### For a new static public page

```tsx
// app/(with-navbar)/my-page/page.tsx
import { buildStaticPageMeta } from '@/components/common';

export const metadata = buildStaticPageMeta({
  title: 'My Page Title',
  description: 'A compelling 150-character description of this page for search engines.',
  path: '/my-page',
  keywords: ['keyword1', 'keyword2'],
});

export default function MyPage() {
  return <div>...</div>;
}
```

---

## 9. Structured Metadata Format

This is the full set of metadata fields that social platforms read. Our builders output all of these automatically.

### Open Graph (Facebook, WhatsApp, Telegram, LinkedIn, Slack)

```html
<meta property="og:type" content="article" />
<!-- "article" for stories, "website" for static pages, "profile" for users -->
<meta property="og:title" content="Title | StoryChain" />
<meta property="og:description" content="Description up to 300 chars" />
<meta property="og:image" content="https://absolute.url/image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Alt text for image" />
<meta property="og:url" content="https://canonical-url.com/path" />
<meta property="og:site_name" content="StoryChain" />
<meta property="og:locale" content="en_US" />
```

### Twitter/X Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Title | StoryChain" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="https://absolute.url/image.jpg" />
<meta name="twitter:creator" content="@storychain" />
```

### Standard SEO

```html
<title>Title | StoryChain</title>
<meta name="description" content="Description" />
<meta name="keywords" content="keyword1, keyword2" />
<link rel="canonical" href="https://canonical-url.com/path" />
<meta name="robots" content="index, follow" />
```

### Description Format for Story Pages

We use a structured description format:

```
By @{username} • {N} Chapters • {clean story description truncated to ~120 chars}
```

**Example:**

> By @john_doe • 12 Chapters • A legendary dragon awakens in the frozen north, and only a young scribe holds the ancient words to stop the coming war.

---

## 10. Sitemap & Robots

### `app/sitemap.ts`

Currently includes only static pages. **Should be extended to include public stories.**

```ts
// app/sitemap.ts — CURRENT (static only)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/how-to-use`, changeFrequency: 'monthly', priority: 0.8 },
    // ...
  ];
}
```

**To add dynamic story URLs to the sitemap**, you need a public API endpoint that returns all published stories:

```ts
// app/sitemap.ts — RECOMMENDED EXTENSION
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://storychain-fe.vercel.app';

  // Static pages
  const staticPages = [
    { url: baseUrl, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/explore`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/how-to-use`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  // Dynamic story pages — requires a public API endpoint
  let storyPages: MetadataRoute.Sitemap = [];
  try {
    const stories = await getPublishedStories(); // public endpoint needed from backend
    storyPages = stories.map((story) => ({
      url: `${baseUrl}/stories/${story.slug}`,
      lastModified: new Date(story.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // Sitemap still works even if dynamic fetch fails
  }

  return [...staticPages, ...storyPages];
}
```

### `app/robots.ts`

Already configured correctly to allow indexing of public pages and block admin/dashboard routes.

---

## 11. Testing Social Previews

### WhatsApp / Telegram

Both crawlers read OG tags before showing a preview. Test with curl:

```bash
curl -A "WhatsApp/2.21.12.21 A" \
  -s "https://storychain-fe.vercel.app/stories/your-story-slug" \
  | grep -i "og:\|twitter:"
```

### Facebook / Instagram

Use the **Facebook Sharing Debugger** to see the exact preview Facebook will generate:
🔗 https://developers.facebook.com/tools/debug/

Enter your story URL → Click **"Debug"** → Then **"Scrape Again"** to refresh cached metadata.

### Twitter / X

🔗 https://cards-dev.twitter.com/validator

### LinkedIn

🔗 https://www.linkedin.com/post-inspector/

### Generic OG Debugger (fastest)

🔗 https://opengraph.xyz/ — Enter any URL to see all OG/Twitter tags at once.

### Local development testing

During local dev (`localhost:3000`), social crawlers can't reach you. Use **ngrok** to expose your local server:

```bash
npx ngrok http 3000
# Then share: https://abc123.ngrok.io/stories/your-slug
```

Or use `curl` against your local server to inspect meta tags:

```bash
curl -s http://localhost:3000/stories/your-story-slug | grep -E 'og:|twitter:|<title>'
```

---

## 12. Backend API Changes Required

To make story metadata work correctly for social sharing:

### 🔴 Critical — Public Story Overview Endpoint

**Current:** `GET /stories/slug/:slug/overview` — requires authentication

**Needed:** `GET /stories/public/:slug/meta` — no authentication required

**Fields to return:**

```json
{
  "data": {
    "title": "The Dragon's Call",
    "slug": "the-dragons-call",
    "description": "A legendary dragon awakens...",
    "status": "published",
    "cardImage": {
      "url": "https://res.cloudinary.com/.../card.jpg",
      "publicId": "stories/card-abc123"
    },
    "coverImage": {
      "url": "https://res.cloudinary.com/.../cover.jpg",
      "publicId": "stories/cover-abc123"
    },
    "creator": {
      "username": "john_doe",
      "clerkId": "user_xxx"
    },
    "settings": {
      "genres": ["fantasy", "adventure"]
    },
    "stats": {
      "totalChapters": 12
    }
  }
}
```

**Security notes:**

- Only return data for stories with `status: "published"` or equivalent public status
- Do not expose private stories, draft stories, or sensitive collaborator data
- Rate limit this endpoint to prevent abuse

### 🟡 Optional — Public User Profile Endpoint

For profile page metadata (`/profile/[userId]`):

**Current:** `GET /users/:userId/profile` — requires authentication

**Needed:** `GET /users/public/:userId/meta` — no authentication

**Fields to return:** `username`, `displayName`, `bio`, `avatarUrl`

### 🟡 Optional — Published Stories List for Sitemap

For sitemap generation:

**Needed:** `GET /stories/public/published` — no authentication, returns slugs + updatedAt for all published public stories

---

## 13. Frontend Changes Checklist

### Already Done ✅

- [x] Central `seo-metadata.ts` helper with all builder functions
- [x] `getCachedStoryOverview` with React `cache()` deduplication
- [x] `stories/[slug]` root page — `generateMetadata` with story card image + author
- [x] `stories/[slug]/overview` — full dynamic metadata
- [x] `stories/[slug]/chapter/[chapterSlug]` — chapter metadata with story card image
- [x] `stories/[slug]/chapters` — chapter list metadata
- [x] `stories/[slug]/tree` — tree view metadata
- [x] `stories/[slug]/analytics` — analytics metadata
- [x] `stories/[slug]/settings` — settings metadata
- [x] `stories/[slug]/collaborators` — collaborators metadata
- [x] `stories/[slug]/pull-requests` — pull requests metadata
- [x] `stories/[slug]/reports` — reports metadata
- [x] Root `layout.tsx` — complete OG + Twitter metadata with fallback image
- [x] Title template `%s | StoryChain` in root layout

### Still To Do ⬜

- [ ] `/profile/[userId]` — Replace generic metadata with `buildProfileMeta` + fetched user data
- [ ] `/explore` — Add `export const metadata = buildStaticPageMeta({...})`
- [ ] `/pricing` — Verify `buildStaticPageMeta` is used (check the file)
- [ ] `/writing-tips` — Verify `buildStaticPageMeta` is used
- [ ] `/stories/[slug]/history` — Add `generateMetadata` with `buildStoryMeta`
- [ ] `/stories/[slug]/add-character` — Add `buildStorySubPageMeta`
- [ ] `/stories/[slug]/characters` — Add `buildStorySubPageMeta`
- [ ] `app/sitemap.ts` — Add dynamic story URLs once public API is available
- [ ] Update `SITE_CONFIG.url` when production domain is confirmed
- [ ] Create `lib/api-client-public.ts` (no auth) once backend exposes public endpoints
- [ ] Update `getCachedStoryOverview` to use the public API client
- [ ] Add Google Search Console `verification` to `layout.tsx` once verified

---

## Quick Reference

```ts
// Story pages — always use these two together
import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';

// Static public pages
import { buildStaticPageMeta } from '@/components/common';

// Protected app pages (always noIndex)
import { buildAppPageMeta } from '@/components/common';

// Profile pages
import { buildProfileMeta } from '@/components/common';

// Chapter pages
import { buildChapterMeta, getCachedStoryOverview } from '@/components/common';

// Protected story management sub-pages (minimal metadata, noIndex)
import { buildStorySubPageMeta } from '@/components/common';

// Helpers
import { SITE_CONFIG, toCanonicalUrl, toMetaDescription } from '@/components/common';
```

---

_Last updated: August 2026_
_Maintained in: `docs/seo_and_metadata_complete_guide.md`_
