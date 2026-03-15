import { Metadata } from 'next';

import NotificationsPageContent from '@/components/notifications/notifications-page';

export const metadata: Metadata = {
  title: 'Notifications | StoryChain',
  description: 'Manage your notifications on StoryChain.',
};

export default function NotificationsRoute() {
  return (
    <div className="container mx-auto py-8">
      <NotificationsPageContent />
    </div>
  );
}
