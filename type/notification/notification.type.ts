export type TNotificationType =
  | 'collab_invitation'
  | 'new_branch'
  | 'chapter_upvote'
  | 'story_milestone'
  | 'story_continued'
  | 'pr_opened'
  | 'pr_approved'
  | 'pr_rejected'
  | 'pr_merged'
  | 'pr_commented'
  | 'comment_reply'
  | 'comment_mention'
  | 'mention'
  | 'new_follower'
  | 'badge_earned';

export interface INotification {
  _id: string;
  userId: string;
  type: TNotificationType;
  relatedStorySlug: string | null;
  relatedChapterSlug: string | null;
  relatedPullRequestId: string | null;
  relatedCommentId: string | null;
  relatedUserId: string | null;
  title: string;
  message: string;
  isRead: boolean;
  readAt: Date | string | null;
  actionUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface INotificationListData {
  notifications: INotification[];
  total: number;
  page: number;
  totalPages: number;
}
