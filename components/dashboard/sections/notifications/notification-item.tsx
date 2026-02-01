'use client';

import { Bookmark, MessageSquare, Users, Star, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { NotificationType, StaticNotification } from '@/constants/mock-data';

// Icon mapping for notification types
const NOTIFICATION_ICONS: Record<
  NotificationType,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  CHAPTER_PUBLISHED: Bookmark,
  COMMENT_RECEIVED: MessageSquare,
  COLLAB_INVITATION: Users,
  STORY_FEATURED: Star,
  PR_APPROVED: CheckCircle,
  PR_REJECTED: XCircle,
};

// Format relative time
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

interface NotificationItemProps {
  notification: StaticNotification;
  onAcceptInvite?: () => void;
  onDeclineInvite?: () => void;
}

export function NotificationItem({
  notification,
  onAcceptInvite,
  onDeclineInvite,
}: NotificationItemProps) {
  const Icon = NOTIFICATION_ICONS[notification.type] || MessageSquare;
  const isCollabInvite = notification.type === 'COLLAB_INVITATION';

  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-3 transition-colors',
        notification.isRead ? 'bg-background' : 'bg-primary/5 hover:bg-primary/10',
        !isCollabInvite && 'cursor-pointer'
      )}
    >
      {!notification.isRead && <div className="bg-primary mt-1 h-2 w-2 rounded-full" />}

      <div className="bg-muted/40 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
        <Icon size={18} className="text-muted-foreground" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm leading-snug font-medium">{notification.title}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">{notification.message}</p>

        {isCollabInvite && (
          <div className="mt-2 flex gap-2">
            <Button size="sm" onClick={onAcceptInvite}>
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={onDeclineInvite}>
              Decline
            </Button>
          </div>
        )}
      </div>

      <div className="text-muted-foreground pt-1 text-[10px] whitespace-nowrap">
        {getRelativeTime(notification.createdAt)}
      </div>
    </div>
  );
}

export default NotificationItem;
