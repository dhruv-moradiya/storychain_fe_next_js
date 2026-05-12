'use client';

import type { CoinPack } from '@/type/coins';
import { motion } from 'framer-motion';
import { Coins, ShoppingCart, Sparkles, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, scrollReveal } from '@/lib/utils';

interface CoinPacksSectionProps {
  packs: CoinPack[];
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN').format(amount);
}

function CoinPackCard({ pack, index }: { pack: CoinPack; index: number }) {
  const Icon = pack.icon;
  const totalCoins = pack.coins + (pack.bonus ?? 0);
  const valuePerRupee = totalCoins / pack.priceINR;

  return (
    <motion.div
      {...scrollReveal.card(index)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'group relative flex flex-col rounded-2xl border p-6 transition-shadow duration-300',
        'bg-card',
        pack.highlighted
          ? 'border-primary/50 ring-primary/20 shadow-lg ring-2'
          : 'border-border/60 hover:border-primary/30 hover:shadow-md'
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <span
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          pack.highlighted ? 'bg-primary/3' : 'bg-muted/20'
        )}
        aria-hidden
      />

      {/* Best Value badge */}
      {pack.highlighted && (
        <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 gap-1 whitespace-nowrap shadow-sm">
          <TrendingUp className="h-3 w-3" />
          Best Value
        </Badge>
      )}

      {/* Bonus badge */}
      {pack.badge && (
        <span
          className={cn(
            'absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            pack.highlighted ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent'
          )}
        >
          {pack.badge}
        </span>
      )}

      {/* Icon */}
      <div
        className={cn(
          'relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
          pack.bgColor
        )}
      >
        <Icon className={cn('h-6 w-6', pack.color)} />
      </div>

      {/* Coin count */}
      <div className="relative mb-1 flex items-end gap-1">
        <span className={cn('font-libre-baskerville text-3xl font-bold', pack.color)}>
          {formatINR(pack.coins)}
        </span>
        <span className="text-muted-foreground mb-0.5 text-sm">coins</span>
      </div>

      {/* Bonus line */}
      <p
        className={cn(
          'relative mb-3 text-xs font-medium',
          pack.bonus ? 'text-emerald-600 dark:text-emerald-400' : 'invisible'
        )}
      >
        {pack.bonus ? `+ ${formatINR(pack.bonus)} bonus coins free!` : '-'}
      </p>

      {/* Price */}
      <div className="relative mb-4">
        <div className="flex items-baseline gap-0.5">
          <span className="text-muted-foreground text-sm">₹</span>
          <span className="text-foreground font-libre-baskerville text-2xl font-bold">
            {formatINR(pack.priceINR)}
          </span>
        </div>
        <p className="text-muted-foreground mt-0.5 text-xs">
          ≈ {valuePerRupee.toFixed(1)} coins per ₹1
        </p>
      </div>

      {/* Divider */}
      <div className="border-border/30 relative mb-4 border-t" />

      {/* Total pill */}
      <div className={cn('relative mb-5 rounded-xl px-3 py-2.5 text-center', pack.bgColor)}>
        <p className="text-muted-foreground text-xs">You receive</p>
        <p className={cn('font-libre-baskerville text-lg font-bold', pack.color)}>
          {formatINR(totalCoins)} coins
        </p>
      </div>

      {/* CTA */}
      <Button
        className={cn(
          'relative w-full gap-2',
          pack.highlighted
            ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
            : 'border-border/60 text-foreground hover:border-primary/50 hover:bg-muted/30'
        )}
        variant={pack.highlighted ? 'default' : 'outline'}
      >
        <ShoppingCart className="h-4 w-4" />
        Buy Pack
      </Button>
    </motion.div>
  );
}

export function CoinPacksSection({ packs }: CoinPacksSectionProps) {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="border-accent/25 bg-accent/8 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <Coins className="text-accent h-4 w-4" />
            <span className="text-accent text-sm font-medium">Flexible Coin Packs</span>
          </motion.div>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-foreground mb-3 text-3xl tracking-tight sm:text-4xl"
          >
            Power up with Coins
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed"
          >
            Coins are your in-app currency to unlock chapters, create stories, use AI features, and
            much more. Buy once, use anytime - no expiry.
          </motion.p>
        </div>

        {/* Info bar */}
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/40 from-secondary/5 to-primary/5 mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border bg-linear-to-r px-6 py-4"
        >
          {[
            { label: 'No Expiry', desc: 'Coins never expire' },
            { label: 'Instant Credit', desc: 'Added to your wallet immediately' },
            { label: 'Secure Payments', desc: 'Powered by Razorpay' },
            { label: 'Stack Anytime', desc: 'Buy multiple packs' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <Sparkles className="text-secondary h-3.5 w-3.5 shrink-0" />
              <span className="text-foreground text-sm font-medium">{item.label}</span>
              <span className="text-muted-foreground text-xs">- {item.desc}</span>
            </div>
          ))}
        </motion.div>

        {/* Pack cards */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {packs.map((pack, index) => (
            <CoinPackCard key={pack.id} pack={pack} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
