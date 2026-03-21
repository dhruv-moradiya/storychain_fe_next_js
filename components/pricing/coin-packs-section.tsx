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

// Warm gradient backgrounds per pack — no white, uses cream/brand palette
const cardGradients = [
  'from-bg-cream to-brand-blue/8',
  'from-bg-cream to-brand-blue/12',
  'from-brand-pink-500/8 to-brand-orange/8',
  'from-bg-cream to-brand-orange/12',
  'from-amber-500/8 to-brand-pink-500/8',
];

function CoinPackCard({ pack, index }: { pack: CoinPack; index: number }) {
  const Icon = pack.icon;
  const totalCoins = pack.coins + (pack.bonus ?? 0);
  const valuePerRupee = totalCoins / pack.priceINR;
  const gradient = cardGradients[index] ?? cardGradients[0];

  return (
    <motion.div
      {...scrollReveal.card(index)}
      // No scale on hover — only an animated glowing border
      whileHover={{ borderColor: 'rgba(236,72,153,0.55)' }}
      transition={{ duration: 0.25 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-lg',
        `bg-linear-to-br ${gradient}`,
        pack.highlighted
          ? 'border-brand-pink-500/50 ring-brand-pink-500/20 shadow-md ring-2'
          : 'border-border/60'
      )}
    >
      {/* Shimmering border overlay on hover (only highlighted gets permanent ring) */}
      {!pack.highlighted && (
        <span
          className="ring-brand-pink-500/40 pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      )}

      {/* Best Value badge */}
      {pack.highlighted && (
        <Badge className="bg-brand-pink-500 text-cream-95 absolute -top-3 left-1/2 -translate-x-1/2 gap-1 whitespace-nowrap shadow-sm">
          <TrendingUp className="h-3 w-3" />
          Best Value
        </Badge>
      )}

      {/* Bonus badge */}
      {pack.badge && (
        <span
          className={cn(
            'absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            pack.highlighted
              ? 'bg-brand-pink-500/15 text-brand-pink-500'
              : 'bg-brand-orange/15 text-brand-orange'
          )}
        >
          {pack.badge}
        </span>
      )}

      {/* Icon */}
      <div
        className={cn(
          'mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
          pack.bgColor
        )}
      >
        <Icon className={cn('h-6 w-6', pack.color)} />
      </div>

      {/* Coin count */}
      <div className="mb-1 flex items-end gap-1">
        <span className={cn('font-libre-baskerville text-3xl font-bold', pack.color)}>
          {formatINR(pack.coins)}
        </span>
        <span className="text-text-secondary-65 mb-0.5 text-sm">coins</span>
      </div>

      {/* Bonus line — always reserve space to avoid layout shift */}
      <p className={cn('mb-3 text-xs font-medium', pack.bonus ? 'text-emerald-600' : 'invisible')}>
        {pack.bonus ? `+ ${formatINR(pack.bonus)} bonus coins free!` : '—'}
      </p>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-0.5">
          <span className="text-text-secondary-65 text-sm">₹</span>
          <span className="text-text-primary font-libre-baskerville text-2xl font-bold">
            {formatINR(pack.priceINR)}
          </span>
        </div>
        <p className="text-text-secondary-65 mt-0.5 text-xs">
          ≈ {valuePerRupee.toFixed(1)} coins per ₹1
        </p>
      </div>

      {/* Divider */}
      <div className="border-border/30 mb-4 border-t" />

      {/* Total pill */}
      <div className={cn('mb-5 rounded-xl px-3 py-2.5 text-center', pack.bgColor)}>
        <p className="text-text-secondary-65 text-xs">You receive</p>
        <p className={cn('font-libre-baskerville text-lg font-bold', pack.color)}>
          {formatINR(totalCoins)} coins
        </p>
      </div>

      {/* CTA */}
      <Button
        className={cn(
          'w-full gap-2',
          pack.highlighted
            ? 'bg-brand-pink-500 hover:bg-brand-pink-600 text-cream-95 shadow-md'
            : 'border-border/60 text-text-primary hover:border-brand-pink-500/50'
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
            className="border-brand-orange/25 bg-brand-orange/8 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <Coins className="text-brand-orange h-4 w-4" />
            <span className="text-brand-orange text-sm font-medium">Flexible Coin Packs</span>
          </motion.div>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-text-tertiary mb-3 text-3xl tracking-tight sm:text-4xl"
          >
            Power up with Coins
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="text-text-secondary-65 mx-auto max-w-xl text-sm leading-relaxed"
          >
            Coins are your in-app currency to unlock chapters, create stories, use AI features, and
            much more. Buy once, use anytime — no expiry.
          </motion.p>
        </div>

        {/* Info bar */}
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/40 from-brand-blue/5 to-brand-pink-500/5 mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border bg-linear-to-r px-6 py-4"
        >
          {[
            { label: 'No Expiry', desc: 'Coins never expire' },
            { label: 'Instant Credit', desc: 'Added to your wallet immediately' },
            { label: 'Secure Payments', desc: 'Powered by Razorpay' },
            { label: 'Stack Anytime', desc: 'Buy multiple packs' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <Sparkles className="text-brand-blue h-3.5 w-3.5 shrink-0" />
              <span className="text-text-primary text-sm font-medium">{item.label}</span>
              <span className="text-text-secondary-65 text-xs">— {item.desc}</span>
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
