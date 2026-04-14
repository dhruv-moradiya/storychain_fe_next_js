import type {
  IPRComment,
  IPRReview,
  IPRVote,
  IPullRequest,
  PRStatus,
  PRType,
} from '@/type/pull-request.type';

// ==================== MOCK AUTHORS ====================

const mockAuthors = {
  gojo: {
    _id: 'user-1',
    username: 'gojo_satoru',
    displayName: 'Gojo Satoru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gojo',
  },
  megumi: {
    _id: 'user-2',
    username: 'megumi_f',
    displayName: 'Megumi Fushiguro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=megumi',
  },
  yuji: {
    _id: 'user-3',
    username: 'itadori_yuji',
    displayName: 'Itadori Yuji',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuji',
  },
  nobara: {
    _id: 'user-4',
    username: 'nobara_k',
    displayName: 'Nobara Kugisaki',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nobara',
  },
  nanami: {
    _id: 'user-5',
    username: 'nanami_kento',
    displayName: 'Nanami Kento',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nanami',
  },
  geto: {
    _id: 'user-6',
    username: 'suguru_geto',
    displayName: 'Suguru Geto',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=geto',
  },
  yuta: {
    _id: 'user-7',
    username: 'yuta_okkotsu',
    displayName: 'Yuta Okkotsu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuta',
  },
  maki: {
    _id: 'user-8',
    username: 'maki_zenin',
    displayName: 'Maki Zenin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maki',
  },
};

// ==================== MOCK PULL REQUESTS ====================

export const mockPullRequests: IPullRequest[] = [
  {
    _id: 'pr-8',
    title: 'Delete Redundant Chapter',
    description:
      'Removes the filler chapter that was added during the hiatus. Community consensus is that it disrupts the flow.',
    authorId: mockAuthors.maki._id,
    prType: 'continuation',

    status: 'closed',
    votes: { upvotes: 12, downvotes: 28, score: -16 },
    commentCount: 34,
    autoApprove: { enabled: false, threshold: 10, timeWindow: 7 },
    labels: ['plot_hole'],
    isDraft: false,
    closedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    closedBy: mockAuthors.gojo._id,
    closeReason:
      'Community vote resulted in keeping the chapter with revisions instead of deletion.',
    stats: { views: 567, discussions: 12, reviewsReceived: 5 },
    approvalsStatus: {
      required: 3,
      received: 1,
      pending: 2,
      approvers: [mockAuthors.maki._id],
      blockers: [mockAuthors.gojo._id, mockAuthors.yuji._id],
      canMerge: false,
    },
    chapterSlug: 'filler-chapter',
    content: {
      proposed:
        'The chapter was originally created as a placeholder during the hiatus, intended to bridge the gap between two major arcs. However, after receiving overwhelmingly negative feedback from the community, it became clear that the chapter was not serving its intended purpose. Instead of providing a seamless transition, it disrupted the flow of the story and felt out of place within the established narrative.',
      readingMinutes: 5,
      wordCount: 1200,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    draftedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    draftReason:
      'Initially created as a placeholder during the hiatus, but community feedback has been overwhelmingly negative.',
    parentChapterSlug: 'filler-chapter',
    storySlug: 'the-shadow-war',
    // mergedAt: null,
    // mergedBy: null,
  },
  {
    _id: '69ddfdaa93989f35ff2b7d77',
    title: 'Benevolentia talio cena nam arcus accusator adsuesco',
    description: '',
    storySlug: 'merchant-of-forbidden-seas',
    chapterSlug: 'the-tattered-ledger-266a31',
    parentChapterSlug: 'the-weight-of-shadows-79aff7',
    authorId: 'user_35fzdqhSi93wmi7Xze3xBkwtJBD',
    prType: 'new_branch' as const,
    content: {
      proposed:
        'Cui conor vulticulus commodo doloremque alii vere tergeo. Surculus contabesco cado audacia ulciscor acquiro cetera. Compello circumvenio abstergo sum aranea vulticulus sublime ascisco.\n\nStrenuus deporto terga tutamen copia mollitia tamdiu vero spargo socius. Turba ipsa blanditiis aeger impedit arbitro uterque. Canonicus est conatus caries atrocitas demitto solio adflicto.\n\nDebeo solio in vulgaris spiritus paulatim minus absum substantia. Aranea cilicium stipes patria vix iusto pecus. Comitatus suadeo ipsum tabesco.\n\nTerrito voco decipio tremo denego aetas dignissimos vinco. Pecco vulgo suspendo. Animi carpo tonsor creber quibusdam concedo.\n\nVomer conor absconditus paulatim vicinus argentum coerceo. Possimus id theca. Adamo barba corrigo possimus pectus desparatus administratio patior ultio.\n\nAttonbitus speciosus argentum ulciscor admitto baiulus adsuesco conculco thesis cauda. Sollicito tres ascit video. Candidus patria porro ocer turbo aegre tandem corporis sol.\n\nUnus decretum crur cognatus nihil unde cohors denuo decor. Statim arbor illo ars decens ustilo cattus angustus benigne. Argumentum vindico addo voco pecto suscipit succedo suasoria.',
      wordCount: 153,
      readingMinutes: 1,
    },
    status: 'open' as const,
    votes: {
      upvotes: 0,
      downvotes: 0,
      score: 0,
    },
    commentCount: 27,
    autoApprove: {
      enabled: false,
      threshold: 20,
      timeWindow: 9,
    },
    labels: [],
    isDraft: true,
    approvalsStatus: {
      required: 2,
      received: 3,
      pending: 0,
      approvers: [
        'user_37Sbu5bOsSQ2a3FfUfTcpMSZ8U9',
        'user_37SzOisEwiHWupJu3VU82CXQHd4',
        'user_38TzxSDUatNLlJx6GHvnpEKPYKV',
      ],
      blockers: [],
      canMerge: true,
    },
    draftReason: '',
    draftedAt: '2025-11-14T11:24:56.331Z',
    stats: {
      views: 268,
      discussions: 0,
      reviewsReceived: 3,
    },
    author: {
      clerkId: 'user_35fzdqhSi93wmi7Xze3xBkwtJBD',
      username: 'dhruv',
      avatarUrl: '',
    },
    story: {
      title: 'Merchant of Forbidden Seas',
      slug: 'merchant-of-forbidden-seas',
    },
    chapter: {
      title: 'The Tattered Ledger',
      slug: 'the-tattered-ledger-266a31',
      parentChapter: {
        title: 'The Weight of Shadows',
        slug: 'the-weight-of-shadows-79aff7',
      },
    },
    approvers: [
      {
        clerkId: 'user_37Sbu5bOsSQ2a3FfUfTcpMSZ8U9',
        username: 'gojo',
        avatarUrl: '',
      },
      {
        clerkId: 'user_37SzOisEwiHWupJu3VU82CXQHd4',
        username: 'wixogih',
        avatarUrl: '',
      },
      {
        clerkId: 'user_38TzxSDUatNLlJx6GHvnpEKPYKV',
        username: 'pileb',
        avatarUrl: '',
      },
    ],
    blockers: [],
    createdAt: '2025-11-14T11:24:56.331Z',
    updatedAt: '2026-04-14T08:41:16.236Z',
  } as const,
];

// ==================== MOCK PR COMMENTS ====================

export const mockPRComments: IPRComment[] = [
  {
    _id: 'comment-1',
    pullRequestId: 'pr-1',
    userId: mockAuthors.nanami._id,
    content:
      'This chapter idea is solid. The characterization of young Gojo feels authentic. Consider adding more details about his relationship with Geto during their early training days.',
    commentType: 'APPROVAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
    user: mockAuthors.nanami,
  },
  {
    _id: 'comment-2',
    pullRequestId: 'pr-1',
    userId: mockAuthors.megumi._id,
    content: 'The opening line about the mist is evocative. Nice atmospheric touch.',
    commentType: 'GENERAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    user: mockAuthors.megumi,
  },
  {
    _id: 'comment-3',
    pullRequestId: 'pr-1',
    userId: mockAuthors.yuji._id,
    parentCommentId: 'comment-1',
    content: 'Agreed! Maybe we could see their first sparring session?',
    commentType: 'SUGGESTION',
    suggestion: {
      line: 8,
      originalText: 'Behind him, another figure emerged',
      suggestedText: 'Behind him, his future rival and closest friend emerged',
    },
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    user: mockAuthors.yuji,
  },
  {
    _id: 'comment-4',
    pullRequestId: 'pr-2',
    userId: mockAuthors.gojo._id,
    content:
      "The revised dialogue is much more impactful. Yuji's emotional state really comes through now.",
    commentType: 'APPROVAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    user: mockAuthors.gojo,
  },
  {
    _id: 'comment-5',
    pullRequestId: 'pr-3',
    userId: mockAuthors.geto._id,
    content:
      'The flashback disrupts pacing significantly. This information could be revealed more organically through dialogue or a dedicated chapter.',
    commentType: 'REQUEST_CHANGES',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    user: mockAuthors.geto,
  },
  {
    _id: 'comment-6',
    pullRequestId: 'pr-4',
    userId: mockAuthors.maki._id,
    content: "Love the mirror metaphor. It ties beautifully into the story's themes of identity.",
    commentType: 'APPROVAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    user: mockAuthors.maki,
  },
  {
    _id: 'comment-7',
    pullRequestId: 'pr-7',
    userId: mockAuthors.nanami._id,
    content:
      'The battle choreography needs work. The transitions between fighters feel abrupt. Can we add more connective tissue between the different combat sequences?',
    commentType: 'REQUEST_CHANGES',
    isEdited: true,
    editedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    user: mockAuthors.nanami,
  },
  {
    _id: 'comment-8',
    pullRequestId: 'pr-7',
    userId: mockAuthors.geto._id,
    parentCommentId: 'comment-7',
    content:
      "Working on it! I've drafted some transition paragraphs that should smooth out the flow.",
    commentType: 'GENERAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    user: mockAuthors.geto,
  },
];

// ==================== MOCK PR REVIEWS ====================

export const mockPRReviews: IPRReview[] = [
  {
    _id: 'review-1',
    pullRequestId: 'pr-1',
    reviewerId: mockAuthors.nanami._id,
    reviewStatus: 'APPROVED',
    summary:
      'Excellent character work. The dialogue feels natural and the pacing is well-balanced.',
    feedback: [
      { section: 'Opening', rating: 5, comment: 'Atmospheric and engaging' },
      { section: 'Dialogue', rating: 4, comment: 'Natural flow, minor polish needed' },
      { section: 'Character Development', rating: 5, comment: 'Perfect capture of young Gojo' },
    ],
    overallRating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    reviewer: mockAuthors.nanami,
  },
  {
    _id: 'review-2',
    pullRequestId: 'pr-2',
    reviewerId: mockAuthors.nanami._id,
    reviewStatus: 'APPROVED',
    summary: 'The emotional weight is much better now. Approved.',
    feedback: [
      { section: 'Dialogue', rating: 5, comment: 'Significant improvement' },
      { section: 'Emotional Impact', rating: 5, comment: 'Really hits hard now' },
    ],
    overallRating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    reviewer: mockAuthors.nanami,
  },
  {
    _id: 'review-3',
    pullRequestId: 'pr-3',
    reviewerId: mockAuthors.geto._id,
    reviewStatus: 'CHANGES_REQUESTED',
    summary: 'Flashback placement is problematic. Consider restructuring.',
    feedback: [
      { section: 'Pacing', rating: 2, comment: 'Flashback interrupts flow' },
      { section: 'Content', rating: 4, comment: 'Good content, wrong placement' },
    ],
    overallRating: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    reviewer: mockAuthors.geto,
  },
  {
    _id: 'review-4',
    pullRequestId: 'pr-5',
    reviewerId: mockAuthors.gojo._id,
    reviewStatus: 'APPROVED',
    summary: 'Essential worldbuilding. Well-written and engaging.',
    feedback: [
      { section: 'Worldbuilding', rating: 5, comment: 'Fills important gaps' },
      { section: 'Writing Quality', rating: 5, comment: 'Polished prose' },
      { section: 'Integration', rating: 4, comment: 'Fits well with existing lore' },
    ],
    overallRating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    reviewer: mockAuthors.gojo,
  },
  {
    _id: 'review-5',
    pullRequestId: 'pr-7',
    reviewerId: mockAuthors.nanami._id,
    reviewStatus: 'CHANGES_REQUESTED',
    summary: 'Good foundation but needs more work on transitions.',
    feedback: [
      { section: 'Action Sequences', rating: 4, comment: 'Exciting but disjointed' },
      { section: 'Character Balance', rating: 3, comment: 'Some characters feel sidelined' },
      { section: 'Pacing', rating: 3, comment: 'Transitions need smoothing' },
    ],
    overallRating: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    reviewer: mockAuthors.nanami,
  },
];

// ==================== MOCK PR VOTES ====================

export const mockPRVotes: IPRVote[] = [
  {
    _id: 'vote-1',
    pullRequestId: 'pr-1',
    userId: mockAuthors.nanami._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    user: mockAuthors.nanami,
  },
  {
    _id: 'vote-2',
    pullRequestId: 'pr-1',
    userId: mockAuthors.megumi._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 0.5).toISOString(),
    user: mockAuthors.megumi,
  },
  {
    _id: 'vote-3',
    pullRequestId: 'pr-1',
    userId: mockAuthors.yuji._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: mockAuthors.yuji,
  },
  {
    _id: 'vote-4',
    pullRequestId: 'pr-2',
    userId: mockAuthors.gojo._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    user: mockAuthors.gojo,
  },
  {
    _id: 'vote-5',
    pullRequestId: 'pr-2',
    userId: mockAuthors.nobara._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
    user: mockAuthors.nobara,
  },
  {
    _id: 'vote-6',
    pullRequestId: 'pr-3',
    userId: mockAuthors.geto._id,
    vote: -1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 65).toISOString(),
    user: mockAuthors.geto,
  },
  {
    _id: 'vote-7',
    pullRequestId: 'pr-5',
    userId: mockAuthors.gojo._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(),
    user: mockAuthors.gojo,
  },
  {
    _id: 'vote-8',
    pullRequestId: 'pr-5',
    userId: mockAuthors.nanami._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 44).toISOString(),
    user: mockAuthors.nanami,
  },
];

// ==================== HELPER FUNCTIONS ====================

export function getPullRequestById(id: string): IPullRequest | undefined {
  return mockPullRequests.find((pr) => pr._id === id);
}

export function getCommentsByPRId(pullRequestId: string): IPRComment[] {
  return mockPRComments.filter((c) => c.pullRequestId === pullRequestId);
}

export function getReviewsByPRId(pullRequestId: string): IPRReview[] {
  return mockPRReviews.filter((r) => r.pullRequestId === pullRequestId);
}

export function getVotesByPRId(pullRequestId: string): IPRVote[] {
  return mockPRVotes.filter((v) => v.pullRequestId === pullRequestId);
}

export function filterPullRequests(
  status?: PRStatus | 'all',
  prType?: PRType | 'all',
  searchQuery?: string
): IPullRequest[] {
  return mockPullRequests.filter((pr) => {
    if (status && status !== 'all' && pr.status !== status) return false;
    if (prType && prType !== 'all' && pr.prType !== prType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return pr.title.toLowerCase().includes(query) || pr.description.toLowerCase().includes(query);
    }
    return true;
  });
}
