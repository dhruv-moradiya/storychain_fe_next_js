'use client';

import { DashboardContentLayout } from '@/components/dashboard';
import {
  NotificationItem,
  NotificationsEmpty,
} from '@/components/dashboard/sections/notifications';
import { MOCK_NOTIFICATIONS } from '@/constants/mock-data';

export default function NotificationsPage() {
  if (MOCK_NOTIFICATIONS.length === 0) {
    return (
      <DashboardContentLayout maxWidth="5xl" paddingSize="none">
        <NotificationsEmpty />
      </DashboardContentLayout>
    );
  }

  return (
    <DashboardContentLayout maxWidth="5xl" paddingSize="none">
      <div className="overflow-hidden rounded-xl border shadow-sm">
        <div className="bg-muted/40 border-b p-3 text-sm font-medium">Notifications</div>

        <div className="divide-y">
          {MOCK_NOTIFICATIONS.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onAcceptInvite={() => console.log('Accept:', notification.id)}
              onDeclineInvite={() => console.log('Decline:', notification.id)}
            />
          ))}
        </div>
      </div>
    </DashboardContentLayout>
  );
}
