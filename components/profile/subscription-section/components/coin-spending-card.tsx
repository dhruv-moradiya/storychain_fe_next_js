'use client';

import type { CoinTransaction } from '@/type/profile-subscription';
import { motion } from 'framer-motion';
import {
  BookOpen,
  GitBranch,
  ImageIcon,
  MessageSquare,
  PenLine,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface CoinSpendingCardProps {
  transactions: CoinTransaction[];
}

const spendCategories = [
  {
    key: 'chapter',
    label: 'Chapter Unlocks',
    icon: BookOpen,
    color: 'text-secondary',
    bgColor: 'bg-secondary',
    lightBg: 'bg-secondary/10',
    keywords: ['Unlocked', 'chapter unlock'],
  },
  {
    key: 'story',
    label: 'Story Creation',
    icon: PenLine,
    color: 'text-primary',
    bgColor: 'bg-primary',
    lightBg: 'bg-primary/10',
    keywords: ['Created new story'],
  },
  {
    key: 'ai',
    label: 'AI Features',
    icon: Sparkles,
    color: 'text-accent',
    bgColor: 'bg-accent',
    lightBg: 'bg-accent/10',
    keywords: ['AI', 'Cover'],
  },
  {
    key: 'boost',
    label: 'Visibility Boost',
    icon: TrendingUp,
    color: 'text-emerald-500 dark:text-emerald-400',
    bgColor: 'bg-emerald-500',
    lightBg: 'bg-emerald-500/10',
    keywords: ['Boost'],
  },
  {
    key: 'branch',
    label: 'Branching',
    icon: GitBranch,
    color: 'text-violet-500 dark:text-violet-400',
    bgColor: 'bg-violet-500',
    lightBg: 'bg-violet-500/10',
    keywords: ['Branch'],
  },
  {
    key: 'social',
    label: 'Social & Other',
    icon: MessageSquare,
    color: 'text-amber-500 dark:text-amber-400',
    bgColor: 'bg-amber-500',
    lightBg: 'bg-amber-500/10',
    keywords: ['comment', 'pin', 'invite'],
  },
] as const;

function categorizeSpend(description: string): string {
  for (const cat of spendCategories) {
    if (cat.keywords.some((kw) => description.toLowerCase().includes(kw.toLowerCase()))) {
      return cat.key;
    }
  }
  return 'social';
}

function formatCoins(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function CoinSpendingCard({ transactions }: CoinSpendingCardProps) {
  const spendTxns = transactions.filter((t) => t.type === 'SPEND' && t.status === 'SUCCESS');
  const totalSpent = spendTxns.reduce((sum, t) => sum + t.coins, 0);

  // Group by category
  const breakdown = spendCategories
    .map((cat) => {
      const coins = spendTxns
        .filter((t) => categorizeSpend(t.description) === cat.key)
        .reduce((sum, t) => sum + t.coins, 0);
      return { ...cat, coins };
    })
    .filter((cat) => cat.coins > 0);

  const maxCoins = Math.max(...breakdown.map((b) => b.coins), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="border-border/50 bg-card rounded-2xl border p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-foreground font-semibold">Spending Breakdown</h3>
          <p className="text-muted-foreground mt-0.5 text-xs">Where your coins go</p>
        </div>
        <div className="bg-muted/30 rounded-lg px-3 py-1.5 text-center">
          <p className="text-muted-foreground text-[10px] tracking-wider uppercase">Total Spent</p>
          <p className="text-foreground font-libre-baskerville text-lg font-bold">
            {formatCoins(totalSpent)}
          </p>
        </div>
      </div>

      {breakdown.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="bg-muted/30 mb-3 rounded-full p-4">
            <ImageIcon className="text-muted-foreground h-6 w-6" />
          </div>
          <p className="text-foreground mb-1 font-medium">No spending yet</p>
          <p className="text-muted-foreground text-sm">
            Start using your coins and your breakdown will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {breakdown.map((cat, index) => {
            const Icon = cat.icon;
            const percentage = totalSpent > 0 ? Math.round((cat.coins / totalSpent) * 100) : 0;

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex items-center gap-3"
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105',
                    cat.lightBg
                  )}
                >
                  <Icon className={cn('h-4 w-4', cat.color)} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-foreground text-sm font-medium">{cat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">{percentage}%</span>
                      <span className={cn('font-libre-baskerville text-sm font-bold', cat.color)}>
                        {formatCoins(cat.coins)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-muted/30 h-1.5 overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.coins / maxCoins) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                      className={cn('h-full rounded-full', cat.bgColor)}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
