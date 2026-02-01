'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookOpen, PenTool, Bell } from 'lucide-react';

const tabs = [
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

export function DashboardTabs() {
  const pathname = usePathname();

  const getIsActive = (tabKey: string) => pathname?.includes(tabKey) ?? false;

  // Desktop: Show horizontal tabs
  return (
    <div className="bg-bg-cream/80 border-border/30 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-3 sm:gap-2 sm:px-4">
        {tabs.map((t) => {
          const isActive = getIsActive(t.key);
          const Icon = t.icon;

          return (
            <Link
              key={t.key}
              href={t.path}
              className={cn(
                'text-text-secondary-65 hover:text-text-primary relative flex items-center gap-1.5 px-2 py-3 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:text-sm',
                isActive && 'text-brand-pink-500'
              )}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{t.label}</span>
              {isActive && (
                <span className="bg-brand-pink-500 absolute right-2 bottom-0 left-2 h-0.5 rounded-full sm:right-3 sm:left-3" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
