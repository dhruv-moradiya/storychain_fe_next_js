'use client';

import { useState } from 'react';

import type { CoinTransaction } from '@/type/profile-subscription';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  Coins,
  CreditCard,
  Download,
  Gift,
  Plus,
  Receipt,
  Smartphone,
  Wallet,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CoinTransactionHistoryProps {
  transactions: CoinTransaction[];
}

type TransactionFilter = 'all' | 'PURCHASE' | 'SPEND' | 'EARN' | 'BONUS';

const typeConfig: Record<
  CoinTransaction['type'],
  { icon: typeof Coins; color: string; bg: string; label: string; sign: string }
> = {
  PURCHASE: {
    icon: Plus,
    color: 'text-primary',
    bg: 'bg-primary/10',
    label: 'Purchase',
    sign: '+',
  },
  SPEND: {
    icon: ArrowUpRight,
    color: 'text-accent',
    bg: 'bg-accent/10',
    label: 'Spent',
    sign: '-',
  },
  EARN: {
    icon: ArrowDownLeft,
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    label: 'Earned',
    sign: '+',
  },
  BONUS: {
    icon: Gift,
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    label: 'Bonus',
    sign: '+',
  },
};

const methodIcons: Record<string, typeof CreditCard> = {
  CARD: CreditCard,
  UPI: Smartphone,
  NET_BANKING: Building2,
  WALLET: Wallet,
};

const filters: { key: TransactionFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'PURCHASE', label: 'Purchases' },
  { key: 'SPEND', label: 'Spent' },
  { key: 'EARN', label: 'Earned' },
  { key: 'BONUS', label: 'Bonus' },
];

function formatAmount(amount: number, currency: 'INR' | 'USD'): string {
  const value = amount / 100;
  if (currency === 'INR') {
    return `₹${new Intl.NumberFormat('en-IN').format(value)}`;
  }
  return `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(value)}`;
}

function formatCoins(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function CoinTransactionHistory({ transactions }: CoinTransactionHistoryProps) {
  const [filter, setFilter] = useState<TransactionFilter>('all');

  const sorted = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());
  const filtered = filter === 'all' ? sorted : sorted.filter((t) => t.type === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-border/50 bg-card rounded-2xl border p-6"
    >
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground font-semibold">Transaction History</h3>
          <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
            {transactions.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="border-border/40 bg-muted/20 mb-4 inline-flex flex-wrap items-center gap-1 rounded-xl border px-1.5 py-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
              filter === f.key
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transactions list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="bg-muted/30 mb-3 rounded-full p-4">
            <Receipt className="text-muted-foreground h-6 w-6" />
          </div>
          <p className="text-foreground mb-1 font-medium">No transactions found</p>
          <p className="text-muted-foreground text-sm">
            {filter === 'all'
              ? 'Your coin transactions will appear here'
              : `No ${filter.toLowerCase()} transactions yet`}
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[360px]">
          <div className="space-y-2 pr-4">
            {filtered.map((txn, index) => {
              const config = typeConfig[txn.type];
              const TypeIcon = config.icon;

              return (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group border-border/40 bg-muted/10 hover:border-border/60 hover:bg-muted/20 flex items-center gap-3 rounded-xl border p-3.5 transition-all duration-200"
                >
                  {/* Type icon */}
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
                      config.bg
                    )}
                  >
                    <TypeIcon className={cn('h-5 w-5', config.color)} />
                  </div>

                  {/* Description */}
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {txn.description}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <span>{format(txn.date, 'MMM dd, yyyy')}</span>
                      {txn.method && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            {(() => {
                              const MethodIcon = methodIcons[txn.method];
                              return MethodIcon ? <MethodIcon className="h-3 w-3" /> : null;
                            })()}
                            {txn.method.replace('_', ' ')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="shrink-0 text-right">
                    <div
                      className={cn(
                        'font-libre-baskerville flex items-center gap-1 text-sm font-bold',
                        config.color
                      )}
                    >
                      <span>{config.sign}</span>
                      <Coins className="h-3.5 w-3.5 text-amber-500" />
                      <span>{formatCoins(txn.coins)}</span>
                    </div>
                    {txn.amountPaid != null && txn.currency && (
                      <p className="text-muted-foreground text-xs">
                        {formatAmount(txn.amountPaid, txn.currency)}
                      </p>
                    )}
                  </div>

                  {/* Invoice download */}
                  {txn.invoiceUrl && txn.status === 'SUCCESS' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </motion.div>
  );
}
