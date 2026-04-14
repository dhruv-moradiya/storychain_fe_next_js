// Types based on BE models: pullRequest.model.ts, prVote.model.ts, prComment.model.ts, prReview.model.ts

// ── Pull Request Types ────────────────────────────────────────────────────────

enum PRType {
  NEW_BRANCH = 'new_branch',
  CONTINUATION = 'continuation',
  EDIT = 'edit',
}

const PR_TYPES = ['new_branch', 'continuation', 'edit'] as const;

enum PRStatus {
  OPEN = 'open',
  APPROVED = 'approved',
  CLOSED = 'closed',
  MERGED = 'merged',
}

const PR_STATUSES = ['open', 'approved', 'closed', 'merged'] as const;

enum PRLabel {
  NEEDS_REVIEW = 'needs_review',
  QUALITY_ISSUE = 'quality_issue',
  GRAMMAR = 'grammar',
  PLOT_HOLE = 'plot_hole',
  LORE_INCONSISTENCY = 'lore_inconsistency',
  CONFLICT = 'conflict',
  DUPLICATE = 'duplicate',
  CHANGES_REQUESTED = 'changes_requested',
  APPROVED = 'approved',
  GOOD_FIRST_PR = 'good_first_pr',
}

const PR_LABELS = [
  'needs_review',
  'quality_issue',
  'grammar',
  'plot_hole',
  'lore_inconsistency',
  'conflict',
  'duplicate',
  'changes_requested',
  'approved',
  'good_first_pr',
] as const;

enum PRTimelineAction {
  SUBMITTED = 'submitted',
  REVIEW_REQUESTED = 'review_requested',
  REVIEW_SUBMITTED = 'review_submitted',
  APPROVED = 'approved',
  CHANGES_REQUESTED = 'changes_requested',
  VOTED = 'voted',
  AUTO_APPROVED = 'auto_approved',
  MERGED = 'merged',
  CLOSED = 'closed',
  REOPENED = 'reopened',
  MARKED_DRAFT = 'marked_draft',
  READY_FOR_REVIEW = 'ready_for_review',
  LABEL_ADDED = 'label_added',
  LABEL_REMOVED = 'label_removed',
}

const PR_TIMELINE_ACTIONS = [
  'submitted',
  'review_requested',
  'review_submitted',
  'approved',
  'changes_requested',
  'voted',
  'auto_approved',
  'merged',
  'closed',
  'reopened',
  'marked_draft',
  'ready_for_review',
  'label_added',
  'label_removed',
] as const;

export {
  PRType,
  PR_TYPES,
  PRStatus,
  PR_STATUSES,
  PRLabel,
  PR_LABELS,
  PRTimelineAction,
  PR_TIMELINE_ACTIONS,
};

// Derived types (mirrors BE `typeof ARRAY[number]` pattern)
export type TPRType = (typeof PR_TYPES)[number];
export type TPRStatus = (typeof PR_STATUSES)[number];
export type TPRLabel = (typeof PR_LABELS)[number];
export type TPRTimelineAction = (typeof PR_TIMELINE_ACTIONS)[number];

export interface ITimelineEntry {
  action: PRTimelineAction;
  performedBy: string | null; // null if system-generated
  performedAt: string;
  metadata?: Record<string, unknown>;
}

export interface IPullRequest {
  _id: string;
  title: string;
  description: string;

  // Story/Chapter References (slug-based, mirrors BE)
  storySlug: string;
  chapterSlug: string;
  parentChapterSlug: string;
  authorId: string;

  // Populated objects
  story?: {
    title: string;
    slug: string;
  };
  chapter?: {
    title: string;
    slug: string;
    parentChapter?: {
      title: string;
      slug: string;
    };
  };
  approvers?: {
    clerkId: string;
    username: string;
    avatarUrl: string;
  }[];
  blockers?: {
    clerkId: string;
    username: string;
    avatarUrl: string;
  }[];

  // Populated author data
  author?: {
    clerkId?: string;
    username?: string;
    avatarUrl?: string;
    avatar?: string;
    displayName?: string;
  };

  // PR Type
  prType: TPRType;

  // Content
  content: {
    proposed: string;
    wordCount: number;
    readingMinutes: number;
  };

  // Status
  status: TPRStatus;

  // Voting aggregate (counts only; actual votes live in PRVote collection)
  votes: {
    upvotes: number;
    downvotes: number;
    score: number;
  };

  // Comment count (actual comments live in PRComment collection)
  commentCount: number;

  // Auto-approve config
  autoApprove: {
    enabled: boolean;
    threshold: number; // votes needed
    timeWindow: number; // days
    qualifiedAt?: string; // when score first passed threshold
    autoApprovedAt?: string; // when auto-approval fired
  };

  // Labels
  labels: TPRLabel[];

  // Merge info
  mergedAt?: string;
  mergedBy?: string;

  closedAt?: string;
  closedBy?: string;
  closeReason?: string;

  // Draft
  isDraft: boolean;
  draftReason: string;
  draftedAt: string;

  // Approvals
  approvalsStatus: {
    required: number;
    received: number;
    pending: number;
    approvers: string[];
    blockers: string[];
    canMerge: boolean;
  };

  // Stats
  stats: {
    views: number;
    discussions: number;
    reviewsReceived: number;
  };

  createdAt: string;
  updatedAt: string;
}

// ── PR Vote Types ─────────────────────────────────────────────────────────────

export type VoteValue = 1 | -1;

export interface IPRVote {
  _id: string;
  pullRequestId: string;
  userId: string;
  vote: VoteValue;
  createdAt: string;

  // Populated
  user?: {
    _id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };
}

// ── PR Comment Types ──────────────────────────────────────────────────────────

export type PRCommentType = 'GENERAL' | 'SUGGESTION' | 'QUESTION' | 'APPROVAL' | 'REQUEST_CHANGES';

export interface IPRSuggestion {
  line?: number;
  originalText?: string;
  suggestedText?: string;
}

export interface IPRComment {
  _id: string;
  pullRequestId: string;
  userId: string;
  parentCommentId?: string | null;
  content: string;
  commentType: PRCommentType;
  suggestion?: IPRSuggestion;
  isEdited: boolean;
  editedAt?: string;
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;

  // Populated
  user?: {
    _id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };

  // Nested replies (for threaded view)
  replies?: IPRComment[];
}

// ── PR Review Types ───────────────────────────────────────────────────────────

export type ReviewStatus =
  | 'PENDING_REVIEW'
  | 'IN_REVIEW'
  | 'CHANGES_REQUESTED'
  | 'APPROVED'
  | 'NEEDS_WORK'
  | 'DRAFT';

export interface IReviewFeedback {
  section?: string;
  rating?: number; // 1-5
  comment?: string;
}

export interface IPRReview {
  _id: string;
  pullRequestId: string;
  reviewerId: string;
  reviewStatus: ReviewStatus;
  summary?: string;
  feedback: IReviewFeedback[];
  overallRating?: number; // 1-5
  createdAt: string;
  updatedAt: string;

  // Populated
  reviewer?: {
    _id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };
}

// ── Story Collaborator Roles ──────────────────────────────────────────────────
// NOTE: TStoryCollaboratorRole / TStoryCollaboratorStatus live in '@/type/story'.
// ROLE_HIERARCHY is also exported from there; import from '@/type/story' directly.
