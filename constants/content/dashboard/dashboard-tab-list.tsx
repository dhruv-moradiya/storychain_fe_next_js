import { BookOpen, PenTool } from 'lucide-react';

const DASHBOARD_TABS = [
  {
    key: 'stories',
    label: 'Stories',
    path: '/dashboard',
    icon: BookOpen,
  },
  {
    key: 'my-chapters',
    label: 'My Chapters',
    path: '/dashboard/my-chapters',
    icon: PenTool,
  },
];

export { DASHBOARD_TABS };
