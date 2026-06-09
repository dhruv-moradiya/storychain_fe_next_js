import { ICoinBundleListFilters } from '@/type/coin-bundle/coin-bundle.type';

export const QueryKey = {
  coinBundle: {
    /** Base key for all coin-bundle queries. */
    all: ['coin-bundle'] as const,
    /** Admin list with optional filters. */
    list: (filters?: ICoinBundleListFilters) => ['coin-bundle', 'list', filters ?? {}] as const,
  },

  user: {
    me: ['user', 'me'] as const,
    searchByUsername: (username: string) => ['user', 'search', username] as const,
  },

  notification: {
    list: ['notification', 'list'] as const,
  },

  chapter: {
    byId: (chapterId: string) => ['chapter', 'detail', chapterId] as const,
    bySlug: (chapterSlug: string) => ['chapter', 'slug', chapterSlug] as const,
    my: ['chapter', 'my'] as const,
    search: (storySlug: string) => ['chapter', 'search', storySlug] as const,

    // Comments
    comments: (chapterSlug: string, limit: number, _parentCommentId?: string) =>
      ['chapter', 'comments', chapterSlug, 'limit', limit] as const,
    replies: (chapterSlug: string, parentCommentId: string, limit: number) =>
      ['chapter', 'comments', chapterSlug, 'replies', parentCommentId, 'limit', limit] as const,
  },

  story: {
    // ----------------
    // STORY ROUTES
    // ----------------
    list: ['story', 'list'] as const,
    new: ['story', 'new'] as const,
    my: ['story', 'my'] as const,

    overviewBySlug: (slug: string) => ['story', 'overview', slug] as const,
    settingsBySlug: (slug: string) => ['story', 'settings', slug] as const,
    bySlug: (slug: string) => ['story', 'slug', slug] as const,
    basicBySlug: (slug: string) => ['story', 'basic', slug] as const,
    byId: (storyId: string) => ['story', 'detail', storyId] as const,
    search: (query: string) => ['story', 'search', query] as const,
    collaborators: (slug: string) => ['story', slug, 'collaborators'] as const,
    signatureUrl: (slug: string) => ['story', slug, 'signature-url'] as const,
    userRole: (slug: string) => ['story', slug, 'user-role'] as const,

    // ----------------
    // CHAPTER ROUTES
    // ----------------
    chapters: (storyId: string) => ['story', storyId, 'chapters'] as const,

    // ----------------
    // CHAPTER AUTO SAVE ROUTES
    // ----------------
    autoSave: {
      base: ['chapter', 'autosave'] as const,

      enable: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'enable', chapterId ?? null, draftId ?? null] as const,

      save: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'save', chapterId ?? null, draftId ?? null] as const,

      disable: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'disable', chapterId ?? null, draftId ?? null] as const,

      draft: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'draft', chapterId ?? null, draftId ?? null] as const,

      interval: (draftId: string) => ['chapter', 'autosave', 'interval', draftId] as const,

      publish: (id: string) => ['publish', 'autosave', id] as const,
    },
  },
};
