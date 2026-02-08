import { BookOpen, PenTool, Bell } from 'lucide-react';

const DASHBOARD_TABS = [
  {
    key: 'stories',
    label: 'Stories',
    path: '/dashboard/stories',
    icon: BookOpen,
  },
  {
    key: 'my-chapters',
    label: 'My Chapters',
    path: '/dashboard/my-chapters',
    icon: PenTool,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    path: '/dashboard/notifications',
    icon: Bell,
  },
];

export { DASHBOARD_TABS };
