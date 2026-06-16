import Image from 'next/image';

import { CircleCheck } from 'lucide-react';

import { ActivityOverview } from '@/components/admin-dashboard/user-detail/activity';
import { DeviceLoginDetails } from '@/components/admin-dashboard/user-detail/device';
import { UserInfo } from '@/components/admin-dashboard/user-detail/info';
import {
  BadgesPanel,
  ReadingStats,
  TopGenres,
} from '@/components/admin-dashboard/user-detail/reading-insights';
import { UserStats } from '@/components/admin-dashboard/user-detail/stats';
import { RecentTransactions } from '@/components/admin-dashboard/user-detail/transactions';
import { WalletSummary } from '@/components/admin-dashboard/user-detail/wallet';
import { RecentWithdrawals } from '@/components/admin-dashboard/user-detail/withdrawals';
import createBadge from '@/components/common/badge';
import { ContentLayout } from '@/components/dashboard';

export default function UserDetailPage() {
  return (
    <ContentLayout maxWidth="9xl" centered={true} className="w-full space-y-6">
      {/* Left: Title & Subtitle */}
      <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative overflow-hidden rounded-xl border p-5 shadow-2xs">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="border-border/60 relative h-24 w-24 shrink-0 overflow-hidden rounded-full border shadow-xs">
            <Image
              src="https://i.pinimg.com/736x/c4/cf/77/c4cf77c049226340d430cbe8a4391c69.jpg"
              alt="Aarav"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h2 className="text-text-primary text-xl font-bold tracking-tight sm:text-2xl">
                Aarav Sharma
              </h2>
              {createBadge({
                label: 'verified',
                size: 'sm',
                color: 'emerald',
                icon: CircleCheck,
                mono: true,
              })}
            </div>
            <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-2">
              <span className="text-text-secondary-65 font-medium">aarav.sharma@gmail.com</span>
              <span className="text-text-secondary-30 hidden sm:inline">•</span>
              <span className="text-text-secondary-50 font-normal">+91 9876543210</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {createBadge({
                label: 'User ID: USR-100',
                size: 'sm',
                color: 'gray',
                mono: true,
              })}
              {createBadge({
                label: 'Joined: May 2025',
                size: 'sm',
                color: 'gray',
                mono: true,
              })}
              {createBadge({
                label: 'Last Active: May 2025',
                size: 'sm',
                color: 'gray',
                mono: true,
              })}
            </div>
          </div>
        </div>
      </div>
      <UserStats />

      <div className="grid grid-cols-12 gap-6">
        {/* USER INFORMATION */}
        <UserInfo />

        {/* Activity Overview */}
        <ActivityOverview />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* WALLATE AND FINACIAL SUMMARY */}

        {/* RECENT TRANSACTION */}
        <RecentTransactions />
        <WalletSummary />
      </div>

      {/* BOTTOM ROW */}
      <div className="grid grid-cols-12 gap-6">
        <RecentWithdrawals />
        <ReadingStats />
        <TopGenres />
        <DeviceLoginDetails />
        <BadgesPanel />
      </div>
    </ContentLayout>
  );
}
