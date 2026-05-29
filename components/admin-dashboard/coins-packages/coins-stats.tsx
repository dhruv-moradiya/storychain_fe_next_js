import { ArrowUpRight, Coins, Wallet, WalletCards } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: 'Total Coin Packages',
    value: '8',
    subtext: (
      <div className="flex items-center gap-1">
        <span className="text-emerald-500">4 Active</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">4 Inactive</span>
      </div>
    ),
    icon: Coins,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Total Coins in Circulation',
    value: '8,75,450',
    subtext: (
      <div className="flex items-center gap-1">
        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
        <span className="text-emerald-500">12.6%</span>
        <span className="text-muted-foreground">from last 30 days</span>
      </div>
    ),
    icon: Coins,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Total Packages Sold (30d)',
    value: '12,450',
    subtext: (
      <div className="flex items-center gap-1">
        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
        <span className="text-emerald-500">15.3%</span>
        <span className="text-muted-foreground">from last 30 days</span>
      </div>
    ),
    icon: Wallet,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  {
    title: 'Total Revenue (30d)',
    value: '₹3,45,680',
    subtext: (
      <div className="flex items-center gap-1">
        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
        <span className="text-emerald-500">18.6%</span>
        <span className="text-muted-foreground">from last 30 days</span>
      </div>
    ),
    icon: WalletCards,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
];

export function CoinsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="border-border/50 flex flex-row items-center gap-4 p-5 shadow-none"
          >
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                stat.iconBg,
                stat.iconColor
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs font-medium">{stat.title}</span>
              <span className="text-foreground text-2xl leading-none font-bold">{stat.value}</span>
              <div className="mt-1 text-[11px] font-medium">{stat.subtext}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
