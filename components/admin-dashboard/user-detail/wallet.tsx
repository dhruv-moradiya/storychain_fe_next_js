'use client';

import { useParams } from 'next/navigation';
import * as React from 'react';

import { CircleDot } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useGetUserTransactions } from '@/services/transactions/transactions.query';

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  isLoading?: boolean;
}

const SummaryItem = ({ label, value, iconBgColor, iconColor, isLoading }: SummaryItemProps) => {
  return (
    <div className="border-border/20 flex items-center justify-between border-b py-3.5 last:border-0">
      <span className="text-text-secondary-65 text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
            iconBgColor
          )}
        >
          <CircleDot className={cn('h-3.5 w-3.5', iconColor)} />
        </div>
        {isLoading ? (
          <Skeleton className="h-5 w-16" />
        ) : (
          <span className="text-text-primary text-sm font-semibold">{value}</span>
        )}
      </div>
    </div>
  );
};

export const WalletSummary = () => {
  const params = useParams();
  const userId = (params?.id as string) || '';

  const { data: responseData, isLoading, isError } = useGetUserTransactions(userId);
  const summary = responseData?.data?.summary;

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return '₹0.00';
    return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatCoins = (val?: number) => {
    if (val === undefined || val === null) return '0';
    return val.toLocaleString();
  };

  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 flex flex-col justify-between overflow-hidden rounded-xl border p-6 shadow-2xs">
      <div>
        <h3 className="text-text-primary mb-5 text-lg font-bold">Wallet &amp; Financial Summary</h3>

        {isError ? (
          <div className="py-6 text-center text-xs font-medium text-rose-500">
            Failed to load wallet summary.
          </div>
        ) : (
          <div className="flex flex-col">
            <SummaryItem
              label="Current Coin Balance"
              value={formatCoins(summary?.currentCoinBalance)}
              iconBgColor="bg-amber-500/10 dark:bg-amber-500/20"
              iconColor="text-amber-500"
              isLoading={isLoading}
            />
            <SummaryItem
              label="Total Coins Purchased"
              value={formatCoins(summary?.totalCoinsPurchased)}
              iconBgColor="bg-emerald-500/10 dark:bg-emerald-500/20"
              iconColor="text-emerald-500"
              isLoading={isLoading}
            />
            <SummaryItem
              label="Total Coins Spent"
              value={formatCoins(summary?.totalCoinsSpent)}
              iconBgColor="bg-emerald-500/10 dark:bg-emerald-500/20"
              iconColor="text-emerald-500"
              isLoading={isLoading}
            />
            <SummaryItem
              label="Total Amount Spent"
              value={formatCurrency(summary?.totalAmountSpent)}
              iconBgColor="bg-teal-500/10 dark:bg-teal-500/20"
              iconColor="text-teal-500"
              isLoading={isLoading}
            />
            <SummaryItem
              label="Total Withdrawn"
              value={formatCurrency(summary?.totalWithdrawn)}
              iconBgColor="bg-blue-500/10 dark:bg-blue-500/20"
              iconColor="text-blue-500"
              isLoading={isLoading}
            />
            <SummaryItem
              label="Pending Withdrawals"
              value={formatCurrency(summary?.pendingWithdrawals)}
              iconBgColor="bg-slate-500/10 dark:bg-slate-500/20"
              iconColor="text-slate-500 dark:text-slate-400"
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};
