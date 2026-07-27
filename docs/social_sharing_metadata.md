# Social Link Preview Metadata (Open Graph & Twitter Cards)

This document explains how social media link previews (WhatsApp, Twitter/X, LinkedIn, Facebook, iMessage, Slack, Telegram) work across all **StoryChain** story routes and details the changes made to achieve complete metadata coverage.

---

## 🌟 Overview

When a user shares a link to a story on WhatsApp, Twitter, or any other app, social media crawlers make an unauthenticated HTTP GET request to the shared URL to read its `<meta>` tags.

Our dynamic Next.js App Router metadata configuration ensures every shared link displays:

1. **App Name**: `StoryChain` (configured in `og:site_name` and title template `%s | StoryChain`).
2. **Story Card Image**: Story's `cardImage.url`, falling back to `coverImage.url`, and then to the default platform image (`SITE_CONFIG.defaultOgImage`).
3. **Story Details**:
   - Title: Story Title (e.g. `The Dragon Tale by @john_doe | StoryChain`)
   - Description: Story description summary (e.g. `By @john_doe • 5 Chapters • Clean formatted story summary...`)
   - Genres & Keywords: Configured in `keywords` & `og:type: article`
4. **Author Details**: Creator's username / display name included in `authors`, title, and description preview.

---

## 📁 Summary of Changes Made

### 1. Centralized Metadata Helper (`components/common/seo/seo-metadata.ts`)

- **Card Image Support**: Extended `StoryMetaInput` and `ChapterMetaInput` with `cardImageUrl` and `coverImageUrl`. Priority order: `cardImageUrl` ➔ `coverImageUrl` ➔ `defaultOgImage`.
- **Rich Preview Content**: Enhanced `buildStoryMeta` and `buildChapterMeta` to cleanly incorporate author credit (`By @username`) and stats (`5 Chapters`) into the Open Graph and Twitter description & title.
- **Server Request Deduplication (`getCachedStoryOverview`)**: Exported a React `cache()` function so page components and `generateMetadata` share a single API call per request cycle without redundant network overhead.

### 2. Root Story Route (`app/(protected)/stories/[slug]/page.tsx`)

- Added `generateMetadata` to the main story URL `/stories/[slug]`.
- **Why**: When users copy and share `https://storychain-fe.vercel.app/stories/my-story`, WhatsApp and Twitter request that exact URL before client-side redirects occur. Adding `generateMetadata` guarantees full social previews on direct story links.

### 3. Story Overview (`app/(protected)/stories/[slug]/overview/page.tsx`)

- Updated `generateMetadata` to fetch story details via `getCachedStoryOverview` and pass `cardImageUrl`, `coverImageUrl`, `author`, `genres`, and `stats` to `buildStoryMeta`.

### 4. Interactive Story Tree (`app/(protected)/stories/[slug]/tree/page.tsx`)

- Added dynamic `generateMetadata` fetching the story's `cardImage`, author details, and title with `pageLabel: 'Tree'`.

### 5. Chapter List (`app/(protected)/stories/[slug]/chapters/page.tsx`)

- Added dynamic `generateMetadata` fetching story details with `pageLabel: 'Chapters'`.

### 6. Chapter Reader (`app/(protected)/stories/[slug]/chapter/[chapterSlug]/page.tsx`)

- Updated `generateMetadata` to attach the story's `cardImage` and `storyTitle` to `buildChapterMeta`, ensuring chapter share links show the story card image and author credit.

### 7. Management Sub-Pages (`collaborators`, `analytics`, `settings`, `pull-requests`)

- Updated `generateMetadata` in `collaborators/page.tsx`, `analytics/page.tsx`, `settings/page.tsx`, and `pull-requests/page.tsx` to use `buildStoryMeta` with `getCachedStoryOverview`.

---

## 🛠️ How to Implement Metadata for New Story Routes

If you create a new route under `/stories/[slug]/new-route/page.tsx`:

```tsx
import type { Metadata } from 'next';

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
    rawDescription: story?.description,
    slug,
    cardImageUrl: story?.cardImage?.url,
    coverImageUrl: story?.coverImage?.url,
    author: story?.creator?.username || story?.creator?.displayName,
    genres: story?.settings?.genres || story?.genres,
    stats: story?.stats,
    pageLabel: 'My New Sub-Page',
  });
}

export default async function NewSubPage() {
  return <div>...</div>;
}
```

---

## 🧪 Testing Social Previews

You can test how social media apps parse your links using these tools:

1. **WhatsApp & Telegram**: Share the story link in a chat or test with `curl`:
   ```bash
   curl -A "WhatsApp/2.21.12.21 A" -s https://storychain-fe.vercel.app/stories/your-story-slug | grep -i "og:"
   ```
2. **Twitter/X Card Validator**: Paste your URL in the Twitter / X Card Debugger.
3. **Facebook Sharing Debugger**: [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
4. **LinkedIn Post Inspector**: [https://www.linkedin.com/post-inspector/](https://www.linkedin.com/post-inspector/)
