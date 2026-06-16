import createBadge from '@/components/common/badge';
import { cn } from '@/lib/utils';

interface TransactionItem {
  dateTime: string;
  type: 'Purchase' | 'Read';
  details: string;
  coins: string;
  amount: string;
  status: 'Completed';
}

const recentTransactions: TransactionItem[] = [
  {
    dateTime: 'May 16, 2024, 10:30 AM',
    type: 'Purchase',
    details: 'Starter Pack',
    coins: '+600',
    amount: '₹199.00',
    status: 'Completed',
  },
  {
    dateTime: 'May 15, 2024, 09:15 PM',
    type: 'Read',
    details: 'The Hidden Cargo - Ch. 8',
    coins: '-10',
    amount: '₹0.00',
    status: 'Completed',
  },
  {
    dateTime: 'May 15, 2024, 08:20 PM',
    type: 'Purchase',
    details: 'Mini Pack',
    coins: '+250',
    amount: '₹99.00',
    status: 'Completed',
  },
  {
    dateTime: 'May 14, 2024, 07:10 PM',
    type: 'Read',
    details: 'Whispers at Docks - Ch. 3',
    coins: '-10',
    amount: '₹0.00',
    status: 'Completed',
  },
  {
    dateTime: 'May 14, 2024, 06:05 PM',
    type: 'Purchase',
    details: 'Pro Pack',
    coins: '+1,500',
    amount: '₹399.00',
    status: 'Completed',
  },
];

export const RecentTransactions = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-8 overflow-hidden rounded-xl border p-6 shadow-2xs">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-text-primary text-lg font-bold">Recent Transactions</h3>
        <button className="border-border/80 bg-background text-text-primary hover:bg-brand-warm-beige/20 flex h-9 cursor-pointer items-center justify-center rounded-lg border px-4 text-xs font-semibold shadow-2xs transition-all duration-200 hover:shadow-xs active:scale-98">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-left">
          <thead>
            <tr className="border-border/20 border-b">
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Date &amp; Time</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Type</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Details</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Coins</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Amount</th>
              <th className="text-text-secondary-65 pb-3 text-xs font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((txn, index) => {
              const isPurchase = txn.type === 'Purchase';

              return (
                <tr
                  key={index}
                  className="border-border/10 hover:bg-muted/5 border-b transition-colors last:border-0"
                >
                  <td className="text-text-secondary-65 py-3.5 text-sm whitespace-nowrap">
                    {txn.dateTime}
                  </td>
                  <td className="py-3.5">
                    {createBadge({
                      label: txn.type,
                      size: 'sm',
                      color: isPurchase ? 'gray' : 'rose',
                      mono: true,
                    })}
                  </td>
                  <td className="text-text-primary py-3.5 text-sm font-semibold whitespace-nowrap">
                    {txn.details}
                  </td>
                  <td
                    className={cn(
                      'py-3.5 text-sm font-bold',
                      isPurchase
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : 'text-rose-500 dark:text-rose-400'
                    )}
                  >
                    {txn.coins}
                  </td>
                  <td className="text-text-secondary-65 py-3.5 text-sm font-semibold">
                    {txn.amount}
                  </td>
                  <td className="py-3.5">
                    {createBadge({
                      label: txn.status,
                      size: 'sm',
                      color: 'emerald',
                      mono: true,
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
