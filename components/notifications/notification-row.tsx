'use client';

import type { INotification } from '@/type/notification';
import { formatDistanceToNow } from 'date-fns';
import { Check } from 'lucide-react';

import { NotificationMessage } from '@/components/shared/notification-message';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAcceptInvitation, useDeclineInvitation } from '@/services/stories/stories.mutation';

import { DEFAULT_NOTIFICATION_ICON, NOTIFICATION_ICONS } from './notification-icon-map';

interface NotificationRowProps {
  notification: INotification;
}

export function NotificationRow({ notification }: NotificationRowProps) {
  const Icon = NOTIFICATION_ICONS[notification.type] ?? DEFAULT_NOTIFICATION_ICON;
  const isCollabInvitation = notification.type === 'collab_invitation';

  const acceptMutation = useAcceptInvitation(notification.relatedStorySlug ?? '');
  const declineMutation = useDeclineInvitation(notification.relatedStorySlug ?? '');

  const isBusy = acceptMutation.isPending || declineMutation.isPending;

  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-xl p-4 transition-colors',
        notification.isRead
          ? 'hover:bg-muted/50 bg-transparent'
          : 'bg-brand-pink-500/5 hover:bg-brand-pink-500/10'
      )}
    >
      {/* Icon badge */}
      <div className="bg-brand-pink-500/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
        <Icon className="text-brand-pink-500 h-4 w-4" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              'font-lora text-sm leading-snug',
              notification.isRead ? 'text-text-secondary-65' : 'text-text-primary font-semibold'
            )}
          >
            <NotificationMessage message={notification.title} />
          </p>
          {!notification.isRead && (
            <span className="bg-brand-pink-500 h-2 w-2 shrink-0 rounded-full" />
          )}
        </div>

        <p className="font-lora text-text-secondary-65 text-sm leading-relaxed">
          <NotificationMessage message={notification.message} />
        </p>

        <p className="text-text-secondary-65/70 text-xs">
          {formatDistanceToNow(new Date(), { addSuffix: true })}
        </p>

        {/* Collab invitation actions */}
        {isCollabInvitation && (
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              className="bg-brand-pink-500 hover:bg-brand-pink-600 h-8 rounded-lg px-4 text-white"
              onClick={() => acceptMutation.mutate()}
              disabled={isBusy}
            >
              {acceptMutation.isPending ? 'Accepting…' : 'Accept'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border/50 text-text-secondary-65 hover:text-text-primary hover:bg-cream-90 h-8 rounded-lg px-4"
              onClick={() => declineMutation.mutate()}
              disabled={isBusy}
            >
              {declineMutation.isPending ? 'Declining…' : 'Decline'}
            </Button>
          </div>
        )}
      </div>

      {/* Mark-read button */}
      {!notification.isRead && (
        <Button
          variant="ghost"
          size="icon"
          className="text-text-secondary-65 hover:text-brand-pink-500 h-8 w-8 shrink-0"
          title="Mark as read"
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
