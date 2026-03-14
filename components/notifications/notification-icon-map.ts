import {
  BookOpen,
  Bell,
  GitPullRequest,
  Star,
  MessageSquare,
  Users,
  Check,
  Award,
  type LucideIcon,
} from 'lucide-react';
import type { TNotificationType } from '@/type/notification';

export const NOTIFICATION_ICONS: Record<TNotificationType, LucideIcon> = {
  collab_invitation: BookOpen,
  new_branch: GitPullRequest,
  chapter_upvote: Star,
  story_milestone: Award,
  story_continued: BookOpen,
  pr_opened: GitPullRequest,
  pr_approved: Check,
  pr_rejected: MessageSquare,
  pr_merged: GitPullRequest,
  pr_commented: MessageSquare,
  comment_reply: MessageSquare,
  comment_mention: MessageSquare,
  mention: Users,
  new_follower: Users,
  badge_earned: Award,
};

export const DEFAULT_NOTIFICATION_ICON = Bell;
