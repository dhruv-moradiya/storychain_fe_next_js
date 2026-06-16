import * as React from 'react';

import { CircleDot, Receipt } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

const SummaryItem = ({ label, value, iconBgColor, iconColor }: SummaryItemProps) => {
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
        <span className="text-text-primary text-sm font-semibold">{value}</span>
      </div>
    </div>
  );
};

export const WalletSummary = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 flex flex-col justify-between overflow-hidden rounded-xl border p-6 shadow-2xs">
      <div>
        <h3 className="text-text-primary mb-5 text-lg font-bold">Wallet &amp; Financial Summary</h3>

        <div className="flex flex-col">
          <SummaryItem
            label="Current Coin Balance"
            value="1,250"
            iconBgColor="bg-amber-500/10 dark:bg-amber-500/20"
            iconColor="text-amber-500"
          />
          <SummaryItem
            label="Total Coins Purchased"
            value="5,650"
            iconBgColor="bg-emerald-500/10 dark:bg-emerald-500/20"
            iconColor="text-emerald-500"
          />
          <SummaryItem
            label="Total Coins Spent"
            value="4,400"
            iconBgColor="bg-emerald-500/10 dark:bg-emerald-500/20"
            iconColor="text-emerald-500"
          />
          <SummaryItem
            label="Total Amount Spent"
            value="₹2,450.00"
            iconBgColor="bg-teal-500/10 dark:bg-teal-500/20"
            iconColor="text-teal-500"
          />
          <SummaryItem
            label="Total Withdrawn"
            value="₹1,200.00"
            iconBgColor="bg-blue-500/10 dark:bg-blue-500/20"
            iconColor="text-blue-500"
          />
          <SummaryItem
            label="Pending Withdrawals"
            value="₹0.00"
            iconBgColor="bg-slate-500/10 dark:bg-slate-500/20"
            iconColor="text-slate-500 dark:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
};
