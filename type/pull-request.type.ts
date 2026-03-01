// Types based on BE models: pullRequest.model.ts, prVote.model.ts, prComment.model.ts, prReview.model.ts

// ── Pull Request Types ────────────────────────────────────────────────────────

export type PRType = 'NEW_CHAPTER' | 'EDIT_CHAPTER' | 'DELETE_CHAPTER';

export type PRStatus = 'OPEN' | 'APPROVED' | 'REJECTED' | 'CLOSED' | 'MERGED';

export type PRLabel = 'NEEDS_REVIEW' | 'QUALITY_ISSUE' | 'GRAMMAR' | 'PLOT_HOLE' | 'GOOD_FIRST_PR';

export type TimelineAction =
  | 'CREATED'
  | 'REVIEW_REQUESTED'
  | 'REVIEW_SUBMITTED'
  | 'APPROVED'
  | 'CHANGES_REQUESTED'
  | 'VOTED'
  | 'AUTO_APPROVED'
  | 'MERGED'
  | 'CLOSED'
  | 'REOPENED'
  | 'MARKED_DRAFT'
  | 'READY_FOR_REVIEW';

export interface ITimelineEntry {
  action: TimelineAction;
  performedBy: string | null; // null if system-generated
  performedAt: string;
  metadata?: Record<string, unknown>;
}

export interface IPRChanges {
  original?: string;
  proposed: string;
  diff?: string;
  lineCount?: number;
  additionsCount?: number;
  deletionsCount?: number;
}

export interface IPRVotes {
  upvotes: number;
  downvotes: number;
  score: number;
}

export interface IAutoApprove {
  enabled: boolean;
  threshold: number;
  timeWindow: number;
  qualifiedAt?: string;
  autoApprovedAt?: string;
}

export interface IPRStats {
  views: number;
  discussions: number;
  reviewsReceived: number;
  timeToMerge?: number;
  avgReviewTime?: number;
}

export interface IApprovalsStatus {
  required: number;
  received: number;
  pending: number;
  approvers: string[];
  blockers: string[];
  canMerge: boolean;
}

export interface IPullRequest {
  _id: string;
  title: string;
  description: string;

  // References
  storyId: string;
  chapterId: string;
  parentChapterId: string;
  authorId: string;

  // Author info (populated)
  author?: {
    _id: string;
    username: string;
    displayName?: string;
    avatar?: string;
  };

  // Story info (populated)
  story?: {
    _id: string;
    title: string;
    slug: string;
  };

  // Chapter info (populated)
  chapter?: {
    _id: string;
    title: string;
    slug?: string;
  };

  prType: PRType;
  changes: IPRChanges;
  status: PRStatus;
  votes: IPRVotes;
  commentCount: number;
  autoApprove: IAutoApprove;
  labels: PRLabel[];

  // Merge info
  mergedAt?: string;
  mergedBy?: string;
  closedAt?: string;
  closedBy?: string;
  closeReason?: string;

  // Draft
  isDraft: boolean;
  draftReason?: string;
  draftedAt?: string;

  // Timeline & Stats
  timeline: ITimelineEntry[];
  stats: IPRStats;
  approvalsStatus: IApprovalsStatus;

  // Moderation
  requiresModeration: boolean;
  flaggedForReview: boolean;
  moderationNotes?: string;
  reportIds: string[];

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
