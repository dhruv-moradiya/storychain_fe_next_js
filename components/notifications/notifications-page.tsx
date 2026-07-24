'use client';

import { useMemo, useState } from 'react';

import {
  Bell,
  BookOpen,
  CheckCheck,
  GitPullRequest,
  type LucideIcon,
  Mail,
  MessageSquare,
  Settings,
  Star,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sortNotificationsByDate } from '@/lib/date-utils';
import { useGetNotifications } from '@/services/notifications/notifications.query';

import { NotificationRow } from './notification-row';

// ── Types ─────────────────────────────────────────────────────────────────────

type NotificationSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  comments: boolean;
  pullRequests: boolean;
  followers: boolean;
  stars: boolean;
  collaborations: boolean;
  marketing: boolean;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  comments: true,
  pullRequests: true,
  followers: true,
  stars: false,
  collaborations: true,
  marketing: false,
};

// ── Sub-components ────────────────────────────────────────────────────────────

interface SettingRowProps {
  icon: LucideIcon;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: () => void;
}

function SettingRow({ icon: Icon, label, description, checked, onCheckedChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <div className="bg-brand-pink-500/10 rounded-lg p-2">
          <Icon className="text-brand-pink-500 h-4 w-4" />
        </div>
        <div>
          <Label htmlFor={label} className="text-text-primary cursor-pointer text-sm font-medium">
            {label}
          </Label>
          <p className="text-text-secondary-65 text-sm">{description}</p>
        </div>
      </div>
      <Switch id={label} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function NotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 mb-4 rounded-full p-4">
        <Bell className="text-text-secondary-65 h-8 w-8" />
      </div>
      <h3 className="text-text-primary mb-1 font-medium">No notifications</h3>
      <p className="text-text-secondary-65 text-sm">You&apos;re all caught up! Check back later.</p>
    </div>
  );
}

function NotificationsLoader() {
  return (
    <div className="flex justify-center py-12">
      <div className="border-brand-pink-500 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function NotificationsPageContent() {
  const { data, isLoading } = useGetNotifications();
  const rawNotifications = data?.notifications ?? [];
  const notifications = useMemo(
    () => sortNotificationsByDate(rawNotifications),
    [rawNotifications]
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);

  const handleSettingChange = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preferences saved');
  };

  const handleMarkAllAsRead = () => {
    // TODO: wire up API when endpoint is available
    toast.success('All notifications marked as read');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br">
          <Bell className="text-brand-pink-500 h-5 w-5" />
        </div>
        <div>
          <h1 className="text-text-primary text-xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-text-secondary-65 text-sm">
            Manage your notifications and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList className="bg-muted/30">
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-brand-pink-500 gap-2 data-[state=active]:text-white"
          >
            <Bell className="h-4 w-4" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-brand-pink-500 gap-2 data-[state=active]:text-white"
          >
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* ── Notifications tab ──────────────────────────────────────────── */}
        <TabsContent value="notifications" className="mt-6">
          <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-text-primary text-base font-semibold">Activity</h2>
                <p className="text-text-secondary-65 text-sm">
                  {unreadCount > 0
                    ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                    : 'All caught up!'}
                </p>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Mark all read
                </Button>
              )}
            </div>

            {isLoading ? (
              <NotificationsLoader />
            ) : notifications.length > 0 ? (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <NotificationRow key={notification._id} notification={notification} />
                ))}
              </div>
            ) : (
              <NotificationsEmptyState />
            )}
          </div>
        </TabsContent>

        {/* ── Settings tab ───────────────────────────────────────────────── */}
        <TabsContent value="settings" className="mt-6 space-y-6">
          <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
            <div className="mb-4">
              <h2 className="text-text-primary text-base font-semibold">Delivery Methods</h2>
              <p className="text-text-secondary-65 text-sm">
                Choose how you want to receive notifications
              </p>
            </div>
            <div className="space-y-4">
              <SettingRow
                icon={Mail}
                label="Email Notifications"
                description="Receive notifications via email"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleSettingChange('emailNotifications')}
              />
              <SettingRow
                icon={Bell}
                label="Push Notifications"
                description="Receive push notifications in your browser"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleSettingChange('pushNotifications')}
              />
            </div>
          </div>

          <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
            <div className="mb-4">
              <h2 className="text-text-primary text-base font-semibold">Notification Types</h2>
              <p className="text-text-secondary-65 text-sm">
                Choose which notifications you want to receive
              </p>
            </div>
            <div className="space-y-4">
              <SettingRow
                icon={MessageSquare}
                label="Comments"
                description="When someone comments on your stories"
                checked={settings.comments}
                onCheckedChange={() => handleSettingChange('comments')}
              />
              <SettingRow
                icon={GitPullRequest}
                label="Pull Requests"
                description="Updates on your chapter submissions"
                checked={settings.pullRequests}
                onCheckedChange={() => handleSettingChange('pullRequests')}
              />
              <SettingRow
                icon={Users}
                label="Followers"
                description="When someone follows you"
                checked={settings.followers}
                onCheckedChange={() => handleSettingChange('followers')}
              />
              <SettingRow
                icon={Star}
                label="Stars"
                description="When your stories receive stars"
                checked={settings.stars}
                onCheckedChange={() => handleSettingChange('stars')}
              />
              <SettingRow
                icon={BookOpen}
                label="Collaborations"
                description="Collaboration invites and updates"
                checked={settings.collaborations}
                onCheckedChange={() => handleSettingChange('collaborations')}
              />
            </div>
          </div>

          <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
            <div className="mb-4">
              <h2 className="text-text-primary text-base font-semibold">Marketing & Updates</h2>
              <p className="text-text-secondary-65 text-sm">Stay updated with news and features</p>
            </div>
            <SettingRow
              icon={Mail}
              label="Marketing Emails"
              description="Receive news, updates, and promotional content"
              checked={settings.marketing}
              onCheckedChange={() => handleSettingChange('marketing')}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
