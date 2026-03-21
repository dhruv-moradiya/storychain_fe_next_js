'use client';

import { useState } from 'react';

import type { CoinUsageFeature } from '@/type/coins';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Coins, Filter, PenLine, Sparkles, Users } from 'lucide-react';

import { cn, scrollReveal } from '@/lib/utils';

interface CoinUsageSectionProps {
  features: CoinUsageFeature[];
}

type Category = 'all' | 'reading' | 'writing' | 'ai' | 'social';

const categoryConfig: Record<
  Category,
  { label: string; icon: React.ElementType; color: string; bg: string; activeGradient: string }
> = {
  all: {
    label: 'All',
    icon: Filter,
    color: 'text-text-primary',
    bg: 'bg-text-secondary-65/10',
    activeGradient: 'from-text-secondary/20 to-text-secondary/10',
  },
  reading: {
    label: 'Reading',
    icon: BookOpen,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
    activeGradient: 'from-brand-blue/20 to-brand-blue/8',
  },
  writing: {
    label: 'Writing',
    icon: PenLine,
    color: 'text-brand-pink-500',
    bg: 'bg-brand-pink-500/10',
    activeGradient: 'from-brand-pink-500/20 to-brand-pink-500/8',
  },
  ai: {
    label: 'AI Features',
    icon: Sparkles,
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
    activeGradient: 'from-brand-orange/20 to-brand-orange/8',
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

function FeatureCard({ feature, index }: { feature: CoinUsageFeature; index: number }) {
  const Icon = feature.icon;
  const catCfg = categoryConfig[feature.category];

  return (
    <motion.div
      layout
      key={feature.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.04, 0.24) }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border p-5 transition-shadow duration-300 hover:shadow-md',
        'border-border/55 from-bg-cream to-bg-cream-blend bg-linear-to-br',
        // Animated border on hover
        'hover:border-transparent'
      )}
    >
      {/* Hover border ring */}
      <span
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 transition-opacity duration-300 group-hover:opacity-100',
          `ring-[${catCfg.color.replace('text-', '')}]/40`
        )}
        aria-hidden
      />

      {/* Subtle top-gradient accent strip on hover */}
      <span
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          `bg-linear-to-r ${catCfg.activeGradient}`
        )}
        aria-hidden
      />

      {/* Icon + category badge */}
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
            catCfg.bg
          )}
        >
          <Icon className={cn('h-5 w-5', catCfg.color)} />
        </div>
        <span
          className={cn('rounded-full px-2 py-0.5 text-xs font-medium', catCfg.bg, catCfg.color)}
        >
          {catCfg.label}
        </span>
      </div>

      {/* Name & description */}
      <h3 className="text-text-primary mb-1 text-sm font-semibold">{feature.feature}</h3>
      <p className="text-text-secondary-65 mb-4 flex-1 text-xs leading-relaxed">
        {feature.description}
      </p>

      {/* Coin cost */}
      <div className="border-border/35 flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15">
            <Coins className="h-3.5 w-3.5 text-amber-500" />
          </div>
          <span className="text-text-primary font-libre-baskerville text-base font-bold">
            {feature.coinsRequired}
          </span>
          <span className="text-text-secondary-65 text-xs">coins</span>
        </div>
        {feature.perUnit && (
          <span className="text-text-secondary-65 bg-bg-cream ring-border/40 rounded-lg px-2 py-0.5 text-xs ring-1">
            {feature.perUnit}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function CoinUsageSection({ features }: CoinUsageSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered =
    activeCategory === 'all' ? features : features.filter((f) => f.category === activeCategory);

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <Coins className="text-brand-pink-500 h-4 w-4" />
            <span className="text-brand-pink-500 text-sm font-medium">
              What can you do with Coins?
            </span>
          </motion.div>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-text-tertiary mb-3 text-3xl tracking-tight sm:text-4xl"
          >
            Coin Usage Guide
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="text-text-secondary-65 mx-auto max-w-xl text-sm leading-relaxed"
          >
            Spend your coins on a wide range of features — from unlocking chapters and creating
            stories to AI-powered tools and community boosts.
          </motion.p>
        </div>

        {/* Category filter tabs — sliding pill indicator */}
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/40 from-bg-cream to-bg-cream-blend mb-8 inline-flex w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border bg-linear-to-br px-4 py-3"
        >
          {categoryOrder.map((key) => {
            const cfg = categoryConfig[key];
            const TabIcon = cfg.icon;
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={cn(
                  'relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200',
                  isActive ? cfg.color : 'text-text-secondary-65 hover:text-text-primary'
                )}
              >
                {/* Sliding background */}
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
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
        </motion.div>

        {/* Feature cards grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Earn coins callout */}
        <motion.div
          {...scrollReveal.card(1)}
          className="border-brand-blue/20 from-brand-blue/6 via-brand-pink-500/5 to-brand-orange/6 mt-10 rounded-2xl border bg-linear-to-br p-6 text-center"
        >
          <div className="bg-brand-blue/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
            <Sparkles className="text-brand-blue h-6 w-6" />
          </div>
          <h3 className="text-text-primary font-libre-baskerville mb-1 text-lg font-semibold">
            Earn coins too!
          </h3>
          <p className="text-text-secondary-65 mx-auto max-w-sm text-sm leading-relaxed">
            Get rewarded when readers unlock your story chapters.{' '}
            <span className="text-brand-pink-500 font-medium">60% of revenue</span> goes back to
            story contributors based on their role.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
