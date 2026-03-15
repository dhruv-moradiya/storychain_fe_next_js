# SEO Metadata — Quick Reference

File: [seo-metadata.ts](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts)

Import from: `@/components/common`

> [!IMPORTANT]
> Next.js App Router handles SEO via **[generateMetadata](file:///d:/projects/storychain-frontend/storychain_fe_next_js/app/%28protected%29/stories/%5Bslug%5D/collaborators/page.tsx#5-13)** (async) or **`export const metadata`** (static) in [page.tsx](file:///d:/projects/storychain-frontend/storychain_fe_next_js/app/%28public%29/page.tsx) / [layout.tsx](file:///d:/projects/storychain-frontend/storychain_fe_next_js/app/layout.tsx). These are **not** React components — they run server-side only.

---

## Builder Functions

### [buildStoryMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#70-142) — Story pages with dynamic data

```ts
import { buildStoryMeta } from '@/components/common';

// app/(protected)/stories/[slug]/overview/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryOverview(slug); // your fetch

  return buildStoryMeta({
    title: story.title,
    description: story.description, // used as fallback
    rawDescription: story.description, // stripped of HTML & truncated
    slug,
    coverImageUrl: story.coverImage?.url, // used as OG image
    author: story.creator.username, // optional
    genres: story.settings.genres, // optional keywords
    pageLabel: 'Overview', // → "My Story — Overview"
  });
}
```

**Used for:** Overview, Chapters list, History, Tree (when story data is available)

---

### [buildChapterMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#158-223) — Chapter read pages

```ts
import { buildChapterMeta } from '@/components/common';

// app/(protected)/stories/[slug]/chapter/[chapterSlug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  const chapter = await getChapter(slug, chapterSlug);

  return buildChapterMeta({
    storySlug: slug,
    chapterTitle: chapter.title,
    chapterSlug,
    description: chapter.content,
    author: {
      clerkId: chapter.authorId,
      username: chapter.author?.username || 'unknown',
      avatarUrl: chapter.author?.avatarUrl,
    },
  });
}
```

---

### [buildStorySubPageMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#317-359) — Protected story management pages

For pages where you only have the slug (no full story data fetched):

```ts
import { buildStorySubPageMeta } from '@/components/common';

// Collaborators, Submit Requests, Analytics, Settings, History, Tree, Builder
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  return buildStorySubPageMeta(slug, 'Collaborators');
  //                           ^^^^  ^^^^^^^^^^^^^^^^
  //                           slug  StorySubPage union type
}
```

**Available sub-page labels:**

| Value               | URL segment        |
| ------------------- | ------------------ |
| `'Chapters'`        | `/chapters`        |
| `'Collaborators'`   | `/collaborators`   |
| `'Submit Requests'` | `/submit-requests` |
| `'Analytics'`       | `/analytics`       |
| `'History'`         | `/history`         |
| `'Settings'`        | `/settings`        |
| `'Tree'`            | `/tree`            |

> Sets `robots: noIndex` — these are auth-protected pages.

---

### [buildProfileMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#237-293) — Public / private profile pages

```ts
import { buildProfileMeta } from '@/components/common';

// app/(with-navbar)/profile/[username]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserProfile(username);

  return buildProfileMeta({
    username,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    pageLabel: 'Stories', // optional: "Alice — Stories"
  });
}
```

---

### [buildStaticPageMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#373-420) — Public static pages

```ts
import { buildStaticPageMeta } from '@/components/common';

// app/(with-navbar)/pricing/page.tsx
export const metadata = buildStaticPageMeta({
  title: 'Pricing',
  description: 'Simple, transparent pricing for every storyteller.',
  path: '/pricing',
  keywords: ['pricing', 'plans', 'subscription'],
  // noIndex: true  ← add to hide from search engines
});
```

**Used for:** `/`, `/pricing`, `/how-to-use`, `/writing-tips`

---

### [buildAppPageMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#430-447) — Private app pages (always noIndex)

```ts
import { buildAppPageMeta } from '@/components/common';

// Dashboard, Settings, Notifications, My Reports, Badges, Subscription…
export const metadata = buildAppPageMeta({
  title: 'Account Settings',
  description: 'Manage your StoryChain account settings.',
});
```

---

## Helpers

```ts
import { SITE_CONFIG, toCanonicalUrl, toMetaDescription } from '@/components/common';

toMetaDescription('<p>HTML text here</p>', 160); // → plain text, max 160 chars
toCanonicalUrl('/stories/my-story'); // → 'https://storychain.app/stories/my-story'
SITE_CONFIG.name; // → 'StoryChain'
SITE_CONFIG.url; // → 'https://storychain.app'
```

---

## Pages already migrated

| Page                                   | Builder used                                                                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `stories/[slug]/overview`              | [buildStoryMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#70-142)         |
| `stories/[slug]/chapter/[chapterSlug]` | [buildChapterMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#158-223)      |
| `stories/[slug]/collaborators`         | [buildStorySubPageMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#317-359) |
| `stories/[slug]/submit-requests`       | [buildStorySubPageMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#317-359) |
| `profile`                              | [buildAppPageMeta](file:///d:/projects/storychain-frontend/storychain_fe_next_js/components/common/seo/seo-metadata.ts#430-447)      |
