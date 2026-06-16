import * as React from 'react';

import createBadge from '@/components/common/badge';

interface WithdrawalItem {
  dateTime: string;
  amount: string;
  method: 'UPI' | 'Bank Transfer';
  status: 'Completed';
}

const recentWithdrawals: WithdrawalItem[] = [
  {
    dateTime: 'May 10, 2024, 11:20 AM',
    amount: '₹1,000.00',
    method: 'UPI',
    status: 'Completed',
  },
  {
    dateTime: 'May 2, 2024, 04:45 PM',
    amount: '₹200.00',
    method: 'Bank Transfer',
    status: 'Completed',
  },
];

export const RecentWithdrawals = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 overflow-hidden rounded-xl border p-6 shadow-2xs">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-text-primary text-lg font-bold">Recent Withdrawals</h3>
        <button className="border-border/80 bg-background text-text-primary hover:bg-brand-warm-beige/20 flex h-9 cursor-pointer items-center justify-center rounded-lg border px-4 text-xs font-semibold shadow-2xs transition-all duration-200 hover:shadow-xs active:scale-98">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px] border-collapse text-left">
          <thead>
            <tr className="border-border/20 border-b">
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Date &amp; Time</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Amount</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Method</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentWithdrawals.map((txn, index) => {
              return (
                <tr
                  key={index}
                  className="border-border/10 hover:bg-muted/5 border-b transition-colors last:border-0"
                >
                  <td className="text-text-secondary-65 py-3.5 text-sm whitespace-nowrap">
                    {txn.dateTime}
                  </td>
                  <td className="text-text-primary py-3.5 text-sm font-semibold">{txn.amount}</td>
                  <td className="py-3.5">
                    {createBadge({
                      label: txn.method,
                      size: 'sm',
                      color: 'gray',
                      mono: false,
                    })}
                  </td>
                  <td className="py-3.5">
                    {createBadge({
                      label: txn.status,
                      size: 'sm',
                      color: 'emerald',
                      mono: false,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
