'use client';

import Link from 'next/link';

import type { CoinWallet } from '@/type/profile-subscription';
import { motion } from 'framer-motion';
import { ArrowRight, Coins, Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CoinWalletCardProps {
  wallet: CoinWallet;
}

function formatCoins(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}

const statCards = [
  {
    key: 'lifetimePurchased' as const,
    label: 'Purchased',
    icon: Plus,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    key: 'totalEarned' as const,
    label: 'Earned',
    icon: TrendingUp,
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    key: 'totalSpent' as const,
    label: 'Spent',
    icon: TrendingDown,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
];

export function CoinWalletCard({ wallet }: CoinWalletCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-border/50 bg-card rounded-2xl border p-6"
    >
      {/* Balance header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl">
            <Wallet className="text-primary h-7 w-7" />
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5 text-sm">Available Balance</p>
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              <span className="text-foreground font-libre-baskerville text-3xl font-bold">
                {formatCoins(wallet.balance)}
              </span>
              <span className="text-muted-foreground text-sm">coins</span>
            </div>
          </div>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Link href="/pricing">
            <Plus className="h-4 w-4" />
            Buy Coins
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid gap-3 sm:grid-cols-3">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const value = wallet[stat.key];
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className={cn(
                'border-border/40 bg-muted/20 group rounded-xl border p-4 transition-all duration-200',
                'hover:border-border/60 hover:bg-muted/30'
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105',
                    stat.bg
                  )}
                >
                  <Icon className={cn('h-4 w-4', stat.color)} />
                </div>
                <span className="text-muted-foreground text-xs font-medium">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={cn('font-libre-baskerville text-xl font-bold', stat.color)}>
                  {formatCoins(value)}
                </span>
                <span className="text-muted-foreground text-xs">coins</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
