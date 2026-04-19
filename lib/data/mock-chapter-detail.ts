import { IChapterDetail, IChapterVersion, IComment } from '@/type/chapter/chapter-detail.type';

export const MOCK_CHAPTER_DETAIL: IChapterDetail = {
  _id: 'ch_001',
  slug: 'the-morning-they-left',
  storySlug: 'the-paper-crane-pact',
  storyTitle: 'The Paper Crane Pact',

  parentChapterSlug: null,
  ancestorSlugs: [],
  depth: 0,
  branchIndex: 1,

  authorId: 'user_001',

  title: 'The Morning They Left',
  content: `<p>The last origami crane sat on the windowsill like a small, white ghost. Naomi had placed it there three years ago, on the morning her mother had packed a single bag and slipped out before dawn - before the neighborhood woke, before the birds remembered what sound was for.</p>
    <p>She remembered thinking it felt unfair that the sun rose anyway.</p>
    <p>The crane had yellowed slightly at its wing-tips now, softened by two summers of afternoon light. Naomi pressed her fingertip against its paper beak and wondered, not for the first time, whether her mother had ever learned to fold one herself, or if she had simply carried the ghost of an intention the way most people carry unread books.</p>
    <blockquote>"Some promises are just shapes we make with our hands," her grandmother had told her once. "What matters is the muscle memory."</blockquote>
    <p>Naomi still wasn't sure she believed that. She had been folding cranes since she was seven - over a thousand now, tucked into drawers and gifted to strangers and left in hospital waiting rooms. But the wish at the center of each one had never changed, and it had never come true.</p>
    <p>She was thinking about this when she heard the knock at the door.</p>`,
  chapterNumber: 1,

  votes: {
    upvotes: 247,
    downvotes: 12,
    score: 235,
  },

  status: 'published',
  isEnding: false,

  pullRequest: {
    isPR: false,
  },

  version: 3,

  stats: {
    reads: 4820,
    uniqueReaders: 3910,
    completions: 3720,
    dropOffs: 190,
    totalReadTime: 156000,
    avgReadTime: 4,
    completionRate: 95.1,
    engagementScore: 88,
    comments: 34,
    childBranches: 5,
  },

  reportCount: 0,
  isFlagged: false,

  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
};

export const MOCK_CHAPTER_VERSIONS: IChapterVersion[] = [
  {
    _id: 'v3',
    chapterSlug: 'the-morning-they-left',
    version: 3,
    content: MOCK_CHAPTER_DETAIL.content,
    title: 'The Morning They Left',
    editedBy: 'user_001',
    editedByUser: {
      clerkId: 'user_001',
      username: 'evelynwrites',
      avatarUrl: '',
      displayName: 'Evelyn Hart',
    },
    editReason: 'Polished final paragraph for flow',
    changesSummary: 'Minor prose refinements to closing section.',
    editType: 'manual_edit',
    changeMetadata: { characterCountDelta: -42, wordCountDelta: -7 },
    isVisible: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    _id: 'v2',
    chapterSlug: 'the-morning-they-left',
    version: 2,
    content: '',
    title: 'The Morning They Left',
    editedBy: 'user_002',
    editedByUser: {
      clerkId: 'user_002',
      username: 'marcusbeta',
      avatarUrl: '',
      displayName: 'Marcus Osei',
    },
    editReason: 'Fixed typos and added a paragraph',
    changesSummary: 'Grammar fixes and expanding the grandmother memory section.',
    editType: 'pr_merge',
    changeMetadata: { characterCountDelta: 120, wordCountDelta: 22 },
    isVisible: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
  },
  {
    _id: 'v1',
    chapterSlug: 'the-morning-they-left',
    version: 1,
    content: '',
    title: 'The Morning They Left',
    editedBy: 'user_001',
    editedByUser: {
      clerkId: 'user_001',
      username: 'evelynwrites',
      avatarUrl: '',
      displayName: 'Evelyn Hart',
    },
    editType: 'initial_create',
    changeMetadata: { characterCountDelta: 1840, wordCountDelta: 310 },
    isVisible: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
];

export const MOCK_COMMENTS: IComment[] = [
  {
    _id: 'cmt_001',
    chapterSlug: 'the-morning-they-left',
    userId: 'user_003',
    user: {
      clerkId: 'user_003',
      username: 'readerlily',
      avatarUrl: '',
      displayName: 'Lily Chen',
    },
    parentCommentId: null,
    content:
      'The imagery of the yellowed crane is so powerful. That detail alone carries the weight of three years of waiting. Beautiful opening chapter.',
    votes: { upvotes: 18, downvotes: 0 },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    isEdited: false,
    isDeleted: false,
    reportCount: 0,
    replies: [
      {
        _id: 'cmt_002',
        chapterSlug: 'the-morning-they-left',
        userId: 'user_001',
        user: {
          clerkId: 'user_001',
          username: 'evelynwrites',
          avatarUrl: '',
          displayName: 'Evelyn Hart',
        },
        parentCommentId: 'cmt_001',
        content:
          'Thank you so much! That detail came from a real crane I saw once. Glad it landed the way I hoped.',
        votes: { upvotes: 7, downvotes: 0 },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        isEdited: false,
        isDeleted: false,
        reportCount: 0,
      },
    ],
  },
  {
    _id: 'cmt_003',
    chapterSlug: 'the-morning-they-left',
    userId: 'user_004',
    user: {
      clerkId: 'user_004',
      username: 'j_writes',
      avatarUrl: '',
      displayName: 'Jordan Blake',
    },
    parentCommentId: null,
    content:
      '"Some promises are just shapes we make with our hands" - this line is going to stay with me for a long time. The grandmother feels so present even in such a brief mention.',
    votes: { upvotes: 24, downvotes: 1 },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    isEdited: false,
    isDeleted: false,
    reportCount: 0,
    replies: [],
  },
  {
    _id: 'cmt_004',
    chapterSlug: 'the-morning-they-left',
    userId: 'user_005',
    user: {
      clerkId: 'user_005',
      username: 'bookworm99',
      avatarUrl: '',
      displayName: 'Sam Rivera',
    },
    parentCommentId: null,
    content:
      'I love how the ending hooks you. "She was thinking about this when she heard the knock at the door." - perfect cut.',
    votes: { upvotes: 11, downvotes: 0 },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isEdited: false,
    isDeleted: false,
    reportCount: 0,
    replies: [],
  },
];
