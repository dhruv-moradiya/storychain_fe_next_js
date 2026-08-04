'use client';

import { Coins, Lock, Receipt, RefreshCw, Wallet } from 'lucide-react';

import { cn } from '@/lib/utils';

export type IconName = 'coins' | 'lock' | 'receipt' | 'refresh' | 'wallet';

export interface StatItem {
  title: string;
  value: string;
  trend: string;
  trendType?: 'up' | 'down';
  icon: IconName;
  iconBg: string;
  iconColor: string;
  blurFrom: string;
  blurTo: string;
}

const iconMap = {
  coins: Coins,
  lock: Lock,
  receipt: Receipt,
  refresh: RefreshCw,
  wallet: Wallet,
};

interface TransactionStatsProps {
  stats: StatItem[];
}

export const TransactionStats = ({ stats }: TransactionStatsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];

        return (
          <div
            key={index}
            className="border-border/50 bg-card dark:bg-card/50 group/card hover:border-primary/30 relative cursor-pointer overflow-hidden rounded-xl border p-5 shadow-2xs transition-all duration-300 hover:shadow-xs"
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
                  {stat.title}
                </span>
                <span className="text-text-primary mt-0.5 text-xl font-bold tracking-tight sm:text-2xl">
                  {stat.value}
                </span>
                <span
                  className={cn(
                    'mt-1 flex items-center gap-1 text-xs font-semibold transition-all duration-200',
                    stat.trendType === 'down'
                      ? 'text-rose-500 dark:text-rose-400'
                      : 'text-emerald-500 dark:text-emerald-400'
                  )}
                >
                  <span>{stat.trendType === 'down' ? '↘' : '↗'}</span>
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
