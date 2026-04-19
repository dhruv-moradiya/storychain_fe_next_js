'use client';

import { useMemo, useState } from 'react';

import type { CoinUsageFeature } from '@/type/coins';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { BookOpen, Coins, Filter, PenLine, Sparkles, Users } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, scrollReveal } from '@/lib/utils';

interface CoinUsageSectionProps {
  features: CoinUsageFeature[];
}

type Category = 'all' | 'reading' | 'writing' | 'ai' | 'social';
type Currency = 'INR' | 'USD';

const COIN_TO_INR = 1;
const INR_TO_USD = 0.012;

const categoryConfig: Record<
  Category,
  { label: string; icon: React.ElementType; color: string; bg: string; activeGradient: string }
> = {
  all: {
    label: 'All',
    icon: Filter,
    color: 'text-foreground',
    bg: 'bg-muted/40',
    activeGradient: 'from-muted/50 to-muted/30',
  },
  reading: {
    label: 'Reading',
    icon: BookOpen,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    activeGradient: 'from-secondary/20 to-secondary/8',
  },
  writing: {
    label: 'Writing',
    icon: PenLine,
    color: 'text-primary',
    bg: 'bg-primary/10',
    activeGradient: 'from-primary/20 to-primary/8',
  },
  ai: {
    label: 'AI Features',
    icon: Sparkles,
    color: 'text-accent',
    bg: 'bg-accent/10',
    activeGradient: 'from-accent/20 to-accent/8',
  },
  social: {
    label: 'Social',
    icon: Users,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    activeGradient: 'from-emerald-500/20 to-emerald-500/8',
  },
};

const categoryOrder: Category[] = ['all', 'reading', 'writing', 'ai', 'social'];

function formatPrice(coins: number, currency: Currency): string {
  const inr = coins * COIN_TO_INR;
  if (currency === 'INR') {
    return `₹${inr}`;
  }
  const usd = inr * INR_TO_USD;
  return `$${usd.toFixed(2)}`;
}

function getUsageColumns(currency: Currency): ColumnDef<CoinUsageFeature>[] {
  return [
    {
      id: 'feature',
      header: 'Feature',
      cell: ({ row }) => {
        const feature = row.original;
        const Icon = feature.icon;
        const catCfg = categoryConfig[feature.category];
        return (
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                catCfg.bg
              )}
            >
              <Icon className={cn('h-4 w-4', catCfg.color)} />
            </div>
            <div className="min-w-0">
              <span className="text-foreground line-clamp-1 text-sm font-semibold">
                {feature.feature}
              </span>
              <span
                className={cn(
                  'mt-0.5 hidden rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:inline-block',
                  catCfg.bg,
                  catCfg.color
                )}
              >
                {catCfg.label}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <p className="text-muted-foreground line-clamp-2 max-w-[280px] text-xs leading-relaxed">
          {row.original.description}
        </p>
      ),
    },
    {
      id: 'coins',
      header: 'Coins',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15">
            <Coins className="h-3 w-3 text-amber-500" />
          </div>
          <span className="text-foreground font-libre-baskerville text-sm font-bold">
            {row.original.coinsRequired}
          </span>
        </div>
      ),
    },
    {
      id: 'price',
      header: () => <span>{currency === 'INR' ? 'Price (₹)' : 'Price ($)'}</span>,
      cell: ({ row }) => (
        <span className="text-foreground text-sm font-medium">
          {formatPrice(row.original.coinsRequired, currency)}
        </span>
      ),
    },
    {
      id: 'perUnit',
      header: 'Unit',
      cell: ({ row }) =>
        row.original.perUnit ? (
          <span className="bg-muted/50 text-muted-foreground ring-border/30 inline-block rounded-lg px-2 py-0.5 text-xs ring-1">
            {row.original.perUnit}
          </span>
        ) : null,
    },
  ];
}

export function CoinUsageSection({ features }: CoinUsageSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [currency, setCurrency] = useState<Currency>('INR');

  const filtered = useMemo(
    () =>
      activeCategory === 'all' ? features : features.filter((f) => f.category === activeCategory),
    [activeCategory, features]
  );

  const columns = useMemo(() => getUsageColumns(currency), [currency]);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="border-primary/20 bg-primary/5 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <Coins className="text-primary h-4 w-4" />
            <span className="text-primary text-sm font-medium">What can you do with Coins?</span>
          </motion.div>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-foreground mb-3 text-3xl tracking-tight sm:text-4xl"
          >
            Coin Usage Guide
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed"
          >
            Spend your coins on a wide range of features - from unlocking chapters and creating
            stories to AI-powered tools and community boosts.
          </motion.p>
        </div>

        {/* Controls: Category tabs + Currency toggle */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category filter tabs */}
          <div className="border-border/40 bg-card inline-flex flex-wrap items-center gap-1.5 rounded-2xl border px-3 py-2">
            {categoryOrder.map((key) => {
              const cfg = categoryConfig[key];
              const TabIcon = cfg.icon;
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={cn(
                    'relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                    isActive ? cfg.color : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="usage-tab-pill"
                      className={cn(
                        'absolute inset-0 rounded-xl bg-linear-to-br',
                        cfg.activeGradient
                      )}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <TabIcon className="h-3.5 w-3.5" />
                    {cfg.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Currency toggle */}
          <div className="border-border/40 bg-card inline-flex items-center gap-1 rounded-xl border px-1.5 py-1">
            {(['INR', 'USD'] as const).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
                  currency === cur
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {cur === 'INR' ? '₹ INR' : '$ USD'}
              </button>
            ))}
          </div>
        </div>

        {/* TanStack Table */}
        <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-border/50 hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-muted-foreground font-libre-baskerville h-12 text-xs font-semibold tracking-wider uppercase"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-border/30 hover:bg-muted/20 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3.5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-muted-foreground h-24 text-center"
                    >
                      No features found in this category.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer summary */}
          <div className="border-border/40 flex items-center justify-between border-t px-5 py-3">
            <span className="text-muted-foreground text-xs">
              Showing {filtered.length} feature{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' && ` in ${categoryConfig[activeCategory].label}`}
            </span>
            <span className="text-muted-foreground text-xs">
              Prices shown in {currency === 'INR' ? 'Indian Rupees' : 'US Dollars'}
            </span>
          </div>
        </div>

        {/* Earn coins callout */}
        <motion.div
          {...scrollReveal.card(1)}
          className="border-secondary/20 from-secondary/6 via-primary/5 to-accent/6 mt-10 rounded-2xl border bg-linear-to-br p-6 text-center"
        >
          <div className="bg-secondary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
            <Sparkles className="text-secondary h-6 w-6" />
          </div>
          <h3 className="text-foreground font-libre-baskerville mb-1 text-lg font-semibold">
            Earn coins too!
          </h3>
          <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
            Get rewarded when readers unlock your story chapters.{' '}
            <span className="text-primary font-medium">60% of revenue</span> goes back to story
            contributors based on their role.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
