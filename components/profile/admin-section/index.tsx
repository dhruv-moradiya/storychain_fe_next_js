'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Banknote, Info, Shield, ShieldAlert, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const adminTabs = [
  { key: 'users', label: 'Users', path: '', icon: Users },
  { key: 'reports', label: 'Reports', path: 'reports', icon: ShieldAlert },
  { key: 'payouts', label: 'Payouts', path: 'payouts', icon: Banknote },
  { key: 'roles', label: 'Role Info', path: 'roles', icon: Info },
];

// Mock stats - in real app would come from API
const stats = {
  pendingReports: 2,
  pendingPayouts: 3,
};

export function AdminSection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathParts = pathname?.split('/') || [];
  const lastPart = pathParts[pathParts.length - 1];

  const getActiveTab = () => {
    if (lastPart === 'reports') return 'reports';
    if (lastPart === 'payouts') return 'payouts';
    if (lastPart === 'roles') return 'roles';
    return 'users'; // Default if admin root
  };

  const activeTab = getActiveTab();

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="from-primary/20 to-accent/20 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br">
          <Shield className="text-primary h-5 w-5" />
        </div>
        <div>
          <h1 className="text-foreground text-lg font-semibold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground text-sm">
            Manage platform users, roles, reports, and payouts
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-border/50 bg-muted/30 inline-flex items-center gap-1 rounded-lg p-1">
        {adminTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const badgeCount =
            tab.key === 'reports'
              ? stats.pendingReports
              : tab.key === 'payouts'
                ? stats.pendingPayouts
                : 0;
          const showBadge = badgeCount > 0;
          const href = tab.path ? `/profile/admin/${tab.path}` : '/profile/admin';

          return (
            <Link
              key={tab.key}
              href={href}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {showBadge && (
                <Badge
                  variant={isActive ? 'secondary' : 'destructive'}
                  className={cn(
                    'ml-1 h-5 px-1.5',
                    isActive && 'bg-primary-foreground/20 text-primary-foreground'
                  )}
                >
                  {badgeCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      {children}
    </section>
  );
}

export default AdminSection;
