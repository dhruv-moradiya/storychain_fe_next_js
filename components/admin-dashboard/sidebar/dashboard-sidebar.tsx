'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { useClerk } from '@clerk/nextjs';
import {
  BookOpen,
  ChevronDown,
  CircleDollarSign,
  Coins,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Monitor,
  Moon,
  Settings,
  SlidersHorizontal,
  Sun,
  Users,
} from 'lucide-react';

import { StorychainLogo } from '@/components/common/logo/storychain-logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn, getInitials } from '@/lib/utils';
import { useMe } from '@/services/users/user.query';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
  {
    title: 'Stories',
    href: '/stories',
    icon: BookOpen,
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: SlidersHorizontal,
  },
  {
    title: 'Coins & Packages',
    href: '/coins-packages',
    icon: Coins,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileBarChart2,
  },
  {
    title: 'Withdraw Requests',
    href: '/withdraw-requests',
    icon: CircleDollarSign,
  },
  {
    title: 'CMS',
    href: '/cms',
    icon: Monitor,
  },
  {
    title: 'Support Tickets',
    href: '/support-tickets',
    icon: MessageSquare,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const { data: userResponse } = useMe();
  const user = userResponse?.data;

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme : 'system';

  const initials = getInitials(user?.username, 'AD');
  const displayName = user?.username || 'Admin';

  // Format role string nicely (e.g. SUPER_ADMIN -> Super Admin)
  const formatRole = (role?: string) => {
    if (!role) return 'Super Admin';
    return role
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const displayRole = user?.role ? formatRole(user.role) : 'Super Admin';

  return (
    <Sidebar className="border-border-soft **:data-[sidebar=sidebar]:bg-background! border-r bg-transparent">
      {/* Header with brand logo */}
      <SidebarHeader className="border-border-soft flex flex-row items-center justify-between border-b px-6 py-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <StorychainLogo size="medium" className="h-7 w-auto" />
        </Link>
      </SidebarHeader>

      {/* Main Navigation Content */}
      <SidebarContent className="px-4 py-4">
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="text-text-secondary-50 mb-2 px-3 text-[10px] font-bold tracking-wider uppercase">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));

              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      'flex h-10 w-full cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-[14px] font-normal transition-all',
                      isActive
                        ? 'bg-primary/10! text-primary! hover:bg-primary/10 hover:text-primary font-semibold'
                        : 'text-text-secondary-65 hover:bg-brand-warm-beige/30 hover:text-text-primary'
                    )}
                  >
                    <Link href={item.href} className="flex w-full items-center gap-3">
                      <Icon
                        className={cn(
                          'h-[18px] w-[18px] shrink-0 transition-all duration-200 ease-out',
                          isActive
                            ? 'text-brand-pink-500 scale-105'
                            : 'text-text-secondary-65 group-hover/menu-item:text-text-primary group-hover/menu-item:translate-x-0.5 group-hover/menu-item:scale-105'
                        )}
                      />
                      <span className="transition-transform duration-200 ease-out group-hover/menu-item:translate-x-0.5">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with profile card and logout */}
      <SidebarFooter className="border-border-soft flex flex-col gap-4 border-t p-4">
        {/* Theme Selector Tabs */}
        <div className="bg-card/50 border-border-soft flex w-full items-center gap-1 rounded-sm border p-1">
          {(['light', 'dark', 'system'] as const).map((t) => {
            const isActive = currentTheme === t;
            const Icon = t === 'light' ? Sun : t === 'dark' ? Moon : Monitor;
            const label = t.charAt(0).toUpperCase() + t.slice(1);

            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  'flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium transition-all',
                  isActive
                    ? 'bg-primary/10! text-primary! hover:bg-primary/10 hover:text-primary font-semibold'
                    : 'text-text-secondary-65 hover:bg-brand-warm-beige/30 hover:text-text-primary bg-transparent'
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout button */}
        <button
          onClick={() => signOut({ redirectUrl: '/sign-in' })}
          className="group/logout text-text-secondary-65 hover:bg-brand-warm-beige/30 hover:text-text-primary flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-normal transition-all"
        >
          <LogOut className="text-text-secondary-65 group-hover/logout:text-text-primary h-[18px] w-[18px] shrink-0 transition-all duration-200 ease-out group-hover/logout:translate-x-0.5 group-hover/logout:scale-105" />
          <span className="transition-transform duration-200 ease-out group-hover/logout:translate-x-0.5">
            Logout
          </span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};
