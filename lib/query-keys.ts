import { IAlbumQueryFilters } from '@/type/album/album-request.types';
import { ICoinBundleListFilters } from '@/type/coin-bundle/coin-bundle.type';
import { IPaginatedReportQueryParams } from '@/type/reports';
import { IAdminStoriesQueryParams } from '@/type/story/admin-story.type';
import { IPaginatedUserQueryParams } from '@/type/user/user-request.type';

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
    getWallet: ['user', 'wallet'] as const,
    list: (filters?: IPaginatedUserQueryParams) => ['user', 'list', filters ?? {}] as const,
    detailByClerkId: (clerkId: string) => ['user', 'detail', clerkId] as const,
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
    adminList: (filters?: IAdminStoriesQueryParams) =>
      ['story', 'adminList', filters ?? {}] as const,
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
    timeline: (slug: string, params?: { limit?: number; skip?: number }) =>
      ['story', slug, 'timeline', params ?? {}] as const,
    timelineInfinite: (slug: string, limit?: number) =>
      ['story', slug, 'timeline', 'infinite', { limit }] as const,

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

    // ----------------
    // EXPLORE
    // ----------------

    explore: {
      fresh: ['story', 'explore', 'fresh'] as const,
    },
  },

  character: {
    byStorySlug: (slug: string) => ['character', 'story', slug] as const,
    signatureUrl: (slug: string) => ['character', 'story', slug, 'signature-url'] as const,
  },

  galleryImages: {
    byStorySlug: (slug: string) => ['gallery-images', 'story', slug] as const,
    signatureUrl: (slug: string) => ['gallery-images', 'story', slug, 'signature-url'] as const,
  },

  album: {
    byStorySlug: (slug: string, filters?: IAlbumQueryFilters) =>
      ['album', 'story', slug, filters ?? {}] as const,
    byId: (albumId: string) => ['album', 'detail', albumId] as const,
  },

  report: {
    my: (filters?: IPaginatedReportQueryParams) => ['report', 'my', filters ?? {}] as const,
    myById: (reportId: string) => ['report', 'my', 'detail', reportId] as const,
    story: (storySlug: string, filters?: IPaginatedReportQueryParams) =>
      ['report', 'story', storySlug, filters ?? {}] as const,
    admin: (filters?: IPaginatedReportQueryParams) => ['report', 'admin', filters ?? {}] as const,
    adminById: (reportId: string) => ['report', 'admin', 'detail', reportId] as const,
  },

  pullRequest: {
    all: ['pull-requests'] as const,
    my: (limit?: number) =>
      limit !== undefined
        ? (['pull-requests', 'my', { limit }] as const)
        : (['pull-requests', 'my'] as const),
    myList: (page?: number, limit?: number) => ['pull-requests', 'my', { page, limit }] as const,
    story: (storySlug: string, limit?: number) =>
      limit !== undefined
        ? (['pull-requests', 'story', storySlug, { limit }] as const)
        : (['pull-requests', 'story', storySlug] as const),
    storyList: (storySlug: string, page?: number, limit?: number) =>
      ['pull-requests', 'story', storySlug, { page, limit }] as const,
  },
};
