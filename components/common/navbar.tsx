'use client';

import { NavItem } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useClerk, useUser } from '@clerk/nextjs';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import {
  Bell,
  Check,
  CoinsIcon,
  Compass,
  Feather,
  HandHeart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { StorychainLogo } from './logo/storychain-logo';

import { NotificationMessage } from '../shared/notification-message';
import { useGetNotifications } from '@/services/notifications/notifications.query';
import { INotification } from '@/type/notification';
import {
  NOTIFICATION_ICONS,
  DEFAULT_NOTIFICATION_ICON,
} from '@/components/notifications/notification-icon-map';

const mobileNavItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/builder', label: 'Builder', icon: Feather },
  { to: '/pricing', label: 'Pricing', icon: CoinsIcon },
  { to: '/how-to-use', label: 'How to use', icon: HandHeart },
];

const NotificationItem = ({ notification }: { notification: INotification }) => {
  const Icon = NOTIFICATION_ICONS[notification.type] ?? DEFAULT_NOTIFICATION_ICON;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors',
        notification.isRead
          ? 'hover:bg-muted/30 bg-transparent'
          : 'bg-brand-pink-500/5 hover:bg-brand-pink-500/10'
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
          notification.isRead
            ? 'bg-muted/50'
            : 'from-brand-pink-500/20 to-brand-orange/20 bg-linear-to-br'
        )}
      >
        <Icon
          className={cn(
            'h-4 w-4',
            notification.isRead ? 'text-text-secondary-65' : 'text-brand-pink-500'
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'font-lora text-sm',
            notification.isRead ? 'text-text-secondary-65' : 'text-text-primary font-medium'
          )}
        >
          <NotificationMessage message={notification.title} />
        </p>
        <p className="font-lora text-text-secondary-65 line-clamp-2 text-xs leading-relaxed">
          <NotificationMessage message={notification.message} />
        </p>
        <p className="text-text-secondary-65/70 mt-1 text-[10px]">
          {new Date(notification.createdAt).toLocaleDateString()}
        </p>
      </div>
      {!notification.isRead && <div className="bg-brand-pink-500 h-2 w-2 shrink-0 rounded-full" />}
    </motion.div>
  );
};

export default function Navbar() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { data: notificationsData } = useGetNotifications({ enabled: !!isSignedIn });
  const notifications = notificationsData?.notifications ?? [];
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide navbar when scrolling down, show when scrolling up
    if (latest > previous && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    // API Call to mark all read
  };

  const handleMobileNavigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed top-0 right-0 left-0 z-40 w-full',
        'border-border/50 border-b',
        'bg-cream-95/95 backdrop-blur-md'
      )}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* LEFT - Logo and Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          {isSignedIn && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 md:hidden"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="border-border/50 bg-cream-95 w-72 p-0">
                <div className="flex h-full flex-col">
                  {/* Mobile Menu Header */}
                  <div className="border-border/50 flex items-center justify-between border-b px-4 py-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <StorychainLogo size="medium" className="h-9 w-auto" />
                    </Link>
                  </div>

                  {/* Mobile Nav Items */}
                  <ScrollArea className="flex-1 py-4">
                    <div className="space-y-1 px-3">
                      {mobileNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.to;
                        return (
                          <motion.button
                            key={item.to}
                            onClick={() => handleMobileNavigate(item.to)}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-all',
                              isActive
                                ? 'bg-brand-pink-500/10 text-brand-pink-500'
                                : 'text-text-secondary-65 hover:bg-cream-90 hover:text-text-primary'
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {/* Mobile Menu Footer - User Section */}
                  <div className="border-border/50 border-t p-4">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="border-border/50 relative h-10 w-10 overflow-hidden rounded-full border">
                        <Image
                          src={
                            user?.imageUrl ||
                            'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg'
                          }
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-text-primary truncate font-medium">
                          {user?.fullName || 'Your Profile'}
                        </p>
                        <p className="text-text-secondary-65 truncate text-xs">
                          {user?.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => handleMobileNavigate('/profile')}
                        className="text-text-secondary-65 hover:bg-cream-90 hover:text-text-primary flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm">Profile</span>
                      </button>
                      <button
                        onClick={() => handleMobileNavigate('/profile/settings')}
                        className="text-text-secondary-65 hover:bg-cream-90 hover:text-text-primary flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span className="text-sm">Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          signOut({ redirectUrl: '/sign-in' });
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-500 transition-colors hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <StorychainLogo size="medium" className="text-text-primary h-9 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav Items */}
        {isSignedIn && (
          <ul className="hidden items-center gap-2 md:flex">
            <NavItem to="/dashboard" label="Dashboard" icon={<LayoutDashboard size={16} />} />
            <NavItem to="/explore" label="Explore" icon={<Compass size={16} />} />
            <NavItem to="/builder" label="Builder" icon={<Feather size={16} />} />
            <NavItem to="/pricing" label="Pricing" icon={<CoinsIcon size={16} />} />
            <NavItem to="/how-to-use" label="How to use" icon={<HandHeart size={16} />} />
          </ul>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {isSignedIn && (
            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-secondary hover:bg-brand-pink-500/10 hover:text-text-primary relative h-9 w-9"
                >
                  <Bell className="h-5 w-5" />
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="bg-brand-pink-500 absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-[0_2px_4px_var(--brand-pink-shadow25)]"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="border-border/50 bg-cream-95 w-80 rounded-xl border p-0 shadow-xl backdrop-blur-xl sm:w-96"
              >
                {/* Header */}
                <div className="border-border/50 flex items-center justify-between border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-text-primary font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-brand-pink-500/10 text-brand-pink-500 rounded-full px-2 py-0.5 text-xs font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-text-secondary-65 hover:text-brand-pink-500 h-7 gap-1 text-xs"
                      onClick={handleMarkAllRead}
                    >
                      <Check className="h-3 w-3" />
                      Mark all read
                    </Button>
                  )}
                </div>

                {/* Notifications List */}
                <ScrollArea className="max-h-[400px]">
                  <div className="p-2">
                    {notifications.length > 0 ? (
                      <div className="space-y-1">
                        {notifications.map((notification) => (
                          <NotificationItem key={notification._id} notification={notification} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="bg-muted/50 flex h-12 w-12 items-center justify-center rounded-xl">
                          <Bell className="text-text-secondary-65 h-6 w-6" />
                        </div>
                        <p className="text-text-secondary mt-3 text-sm font-medium">
                          No notifications
                        </p>
                        <p className="text-text-secondary-65 text-xs">You&apos;re all caught up!</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="border-border/50 border-t p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-pink-500 hover:bg-brand-pink-500/10 hover:text-brand-pink-600 w-full text-sm"
                      onClick={() => {
                        setIsNotificationOpen(false);
                        router.push('/notifications');
                      }}
                    >
                      View all notifications
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          )}

          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'relative h-8 w-8 cursor-pointer overflow-hidden rounded-full',
                    'border-border/50 bg-muted/60 border backdrop-blur-sm'
                  )}
                  role="button"
                  tabIndex={0}
                >
                  <Image
                    src={
                      user?.imageUrl ||
                      'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg'
                    }
                    alt="Profile Pic"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="border-border/50 bg-cream-95 w-56 rounded-xl border p-1 shadow-xl backdrop-blur-xl"
              >
                <DropdownMenuItem className="cursor-default select-none">
                  <div className="flex flex-col">
                    <span className="text-text-primary font-medium">
                      {user?.fullName || 'Your Profile'}
                    </span>
                    <span className="text-text-secondary-65 text-xs">
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push('/profile')}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="text-text-secondary hover:text-text-primary">
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => signOut({ redirectUrl: '/sign-in' })}
                  className="text-destructive focus:text-destructive"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="text-text-secondary hover:text-text-primary text-sm transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
