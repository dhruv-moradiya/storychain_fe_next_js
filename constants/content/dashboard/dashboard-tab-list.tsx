import { BookOpen, PenTool } from 'lucide-react';

const DASHBOARD_TABS = [
  {
    key: 'stories',
    label: 'Stories',
    path: '/stories',
    icon: BookOpen,
  },
  {
    key: 'chapters',
    label: 'Chapters',
    path: '/chapters',
    icon: PenTool,
  },
];

export { DASHBOARD_TABS };
