'use client';

import * as React from 'react';

import { Coins, UserCheck, UserPlus, Users } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  blurFrom: string;
  blurTo: string;
}

const statsData: StatItem[] = [
  {
    label: 'Total Users',
    value: '12,458',
    trend: '+8.2%',
    icon: Users,
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    iconColor: 'text-blue-500 dark:text-blue-400',
    blurFrom: 'from-blue-500/10',
    blurTo: 'to-cyan-500/10',
  },
  {
    label: 'Active Users',
    value: '9,876',
    trend: '+6.4%',
    icon: UserCheck,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    blurFrom: 'from-emerald-500/10',
    blurTo: 'to-teal-500/10',
  },
  {
    label: 'New Users (30d)',
    value: '1,234',
    trend: '+12.7%',
    icon: UserPlus,
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
    iconColor: 'text-purple-500 dark:text-purple-400',
    blurFrom: 'from-purple-500/10',
    blurTo: 'to-indigo-500/10',
  },
  {
    label: 'Total Coins Purchased',
    value: '2,45,680',
    trend: '+15.3%',
    icon: Coins,
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
    iconColor: 'text-amber-500 dark:text-amber-400',
    blurFrom: 'from-amber-500/10',
    blurTo: 'to-orange-500/10',
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="border-border/50 bg-cream-95/80 dark:bg-card/50 group/card hover:border-primary/30 relative cursor-pointer overflow-hidden rounded-xl border p-5 shadow-2xs transition-all duration-300 hover:shadow-xs"
          >
            {/* Background dynamic glow */}
            <div
              className={cn(
                'absolute -top-6 -right-6 h-24 w-24 rounded-full bg-linear-to-br opacity-80 blur-2xl transition-transform duration-300 group-hover/card:scale-110',
                stat.blurFrom,
                stat.blurTo
              )}
            />

            <div className="relative flex items-center gap-4">
              {/* Left Side: Styled Icon */}
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300',
                  stat.iconBg
                )}
              >
                <Icon className={cn('h-6 w-6', stat.iconColor)} />
              </div>

              {/* Right Side: Values */}
              <div className="flex flex-col">
                <span className="text-text-secondary-65 text-xs font-medium tracking-wide">
                  {stat.label}
                </span>
                <span className="text-text-primary mt-0.5 text-xl font-bold tracking-tight sm:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-500 transition-all duration-200 dark:text-emerald-400">
                  <span>↗</span>
                  <span>{stat.trend}</span>
                  <span className="text-text-secondary-50 font-normal">from last 30 days</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
