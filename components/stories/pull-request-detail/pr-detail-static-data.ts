import type { IPRComment, IPRReview, IPullRequest } from '@/type';

// ── Timeline Entry (prototype shape – will be replaced by API type) ──────────

export interface IPRDetailTimelineEntry {
  action: string;
  author: {
    displayName: string;
    avatar: string;
  };
  createdAt: string;
}

// ── Static Pull Request ──────────────────────────────────────────────────────

export const staticPullRequest: IPullRequest = {
  _id: 'pr-1',
  title: "Add Gojo's Past Chapter",
  description:
    'This PR adds a new chapter to the story, focusing on the early days of Gojo Satoru and Suguru Geto.',
  storySlug: 'jujutsu-kaisen',
  chapterSlug: 'gojo-past-part-1',
  parentChapterSlug: 'hidden-inventory',
  authorId: 'author-123',
  author: {
    clerkId: 'author-123',
    username: 'GojoSatou',
    displayName: 'Gojo Satoru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gojo',
  },
  prType: 'new_branch',
  content: {
    proposed:
      "The summer was hot. The cicadas were loud. Gojo and Geto were playing basketball at the school court. 'Suguru, do you think we're really the strongest?' Gojo asked while dunking. Geto smiled, 'Of course, Satoru. There's no doubt about it.' They didn't know that their bond would be tested soon by a man named Toji. The cursed energy in the air was thick, and the weight of their responsibility started to show.",
    wordCount: 172,
    readingMinutes: 1,
  },
  status: 'approved',
  votes: {
    upvotes: 12,
    downvotes: 1,
    score: 11,
  },
  commentCount: 3,
  autoApprove: {
    enabled: true,
    threshold: 15,
    timeWindow: 2,
  },
  labels: ['good_first_pr', 'needs_review'],
  isDraft: false,
  draftReason: '',
  draftedAt: new Date().toISOString(),
  approvalsStatus: {
    required: 2,
    received: 2,
    pending: 0,
    approvers: ['Gojo Satoru', 'Nanami Kento'],
    blockers: [],
    canMerge: true,
  },
  stats: {
    views: 1420,
    discussions: 3,
    reviewsReceived: 2,
  },
  createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  updatedAt: new Date().toISOString(),
};

// ── Static Comments ──────────────────────────────────────────────────────────

export const staticComments: IPRComment[] = [
  {
    _id: 'c-1',
    pullRequestId: 'pr-1',
    userId: 'user-2',
    content:
      'The dialogue between Gojo and Geto feels very authentic. It captures their early dynamic perfectly. Maybe add more description about the environment?',
    commentType: 'SUGGESTION',
    user: {
      _id: 'user-2',
      username: 'GetoSuguru',
      displayName: 'Suguru Geto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suguru',
    },
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    replies: [
      {
        _id: 'c-1-r-1',
        pullRequestId: 'pr-1',
        userId: 'author-123',
        content: "Thanks! I'll add more atmosphere in the next update.",
        commentType: 'GENERAL',
        user: {
          _id: 'author-123',
          username: 'GojoSatou',
          displayName: 'Gojo Satoru',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gojo',
        },
        isEdited: false,
        isResolved: false,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
  },
  {
    _id: 'c-2',
    pullRequestId: 'pr-1',
    userId: 'user-3',
    content: "Wait, wasn't Shoko there too? I think it would be nice to include her briefly.",
    commentType: 'QUESTION',
    user: {
      _id: 'user-3',
      username: 'ShokoIeiri',
      displayName: 'Shoko Ieiri',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shoko',
    },
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

// ── Static Reviews ───────────────────────────────────────────────────────────

export const staticReviews: IPRReview[] = [
  {
    _id: 'rev-1',
    pullRequestId: 'pr-1',
    reviewerId: 'rev-1-id',
    reviewStatus: 'APPROVED',
    summary:
      'Excellent addition to the lore. The pacing is just right. The emotional weight of their friendship is handled with maturity.',
    feedback: [
      {
        section: 'Characterization',
        comment: 'The voices for Gojo and Geto are spot on.',
        rating: 5,
      },
      {
        section: 'Consistency',
        comment: 'Fits perfectly with the Hidden Inventory timeline.',
        rating: 4,
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    reviewer: {
      _id: 'rev-1-id',
      username: 'NanamiKento',
      displayName: 'Nanami Kento',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nanami',
    },
  },
];

// ── Static Timeline ──────────────────────────────────────────────────────────

export const staticTimeline: IPRDetailTimelineEntry[] = [
  {
    action: 'created',
    author: {
      displayName: 'Uzumaki Naruto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naruto',
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    action: 'voted',
    author: {
      displayName: 'Suguru Geto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suguru',
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    action: 'approved',
    author: {
      displayName: 'Nanami Kento',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nanami',
    },
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
];
