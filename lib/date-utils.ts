import type { INotification } from '@/type/notification';

/**
 * Safely extracts a valid Date object from a notification, falling back to:
 * 1. notification.createdAt (if valid date)
 * 2. notification.updatedAt (if valid date)
 * 3. MongoDB ObjectId timestamp derived from notification._id (if valid)
 * 4. Current Date as fallback
 */
export function getNotificationDate(notification: Partial<INotification>): Date {
  if (notification.createdAt) {
    const d = new Date(notification.createdAt);
    if (!isNaN(d.getTime())) return d;
  }

  if (notification.updatedAt) {
    const d = new Date(notification.updatedAt);
    if (!isNaN(d.getTime())) return d;
  }

  if (notification._id && typeof notification._id === 'string' && notification._id.length === 24) {
    try {
      const timestamp = parseInt(notification._id.substring(0, 8), 16) * 1000;
      const d = new Date(timestamp);
      if (!isNaN(d.getTime())) return d;
    } catch {
      // ignore
    }
  }

  return new Date();
}

/**
 * Formats a notification date nicely for display:
 * e.g., "Just now", "5m ago", "2h ago", "3d ago", or "14 Apr"
 */
export function formatNotificationDate(
  dateInput?: Date | string | number | null,
  id?: string
): string {
  let date: Date;

  if (dateInput) {
    date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      date = getNotificationDate({ _id: id });
    }
  } else {
    date = getNotificationDate({ _id: id });
  }

  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Sorts notifications by date descending (newest first).
 */
export function sortNotificationsByDate(notifications: INotification[]): INotification[] {
  return [...notifications].sort((a, b) => {
    const dateA = getNotificationDate(a).getTime();
    const dateB = getNotificationDate(b).getTime();
    return dateB - dateA;
  });
}
