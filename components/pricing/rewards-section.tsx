'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Banknote,
  BookOpenCheck,
  Coins,
  Gift,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

import { storyRoles } from '@/lib/data/coins-data';
import { cn, scrollReveal } from '@/lib/utils';

export function RewardsSection() {
  const platformFee = 20;
  const storyPoolShare = 80;

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5"
          >
            <Gift className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Story Reward Pool
            </span>
          </motion.div>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-foreground mb-3 text-3xl tracking-tight sm:text-4xl"
          >
            Owner-Designed Story Pools
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed"
          >
            When a reader unlocks a chapter,{' '}
            <span className="text-foreground font-semibold">20%</span> covers platform fees while{' '}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">80%</span> goes
            directly into the Story Pool. The Story Owner then decides how to distribute coins to
            contributors.
          </motion.p>
        </div>

        {/* ── Revenue split card: 20% Platform Fee / 80% Story Pool ─────────────────────────── */}
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/50 bg-card mb-8 overflow-hidden rounded-2xl border p-6"
        >
          <p className="text-muted-foreground mb-6 text-center text-xs font-medium tracking-widest uppercase">
            Chapter Purchase Revenue Allocation
          </p>

          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
            {/* Donut Chart */}
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-44 w-44 -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="16"
                  className="stroke-muted/40"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="16"
                  strokeLinecap="round"
                  className="stroke-muted-foreground/40"
                  strokeDasharray={`${(platformFee / 100) * 314.16} 314.16`}
                  initial={{ strokeDashoffset: 314.16 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="16"
                  strokeLinecap="round"
                  className="stroke-emerald-500"
                  strokeDasharray={`${(storyPoolShare / 100) * 314.16} 314.16`}
                  strokeDashoffset={`-${(platformFee / 100) * 314.16}`}
                  initial={{ strokeDashoffset: 314.16 }}
                  whileInView={{ strokeDashoffset: `-${(platformFee / 100) * 314.16}` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-libre-baskerville text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  80%
                </span>
                <span className="text-muted-foreground text-xs font-medium">Story Pool</span>
              </div>
            </div>

            {/* Split detail cards */}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div className="bg-muted/30 border-border/40 rounded-xl border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="bg-muted-foreground/10 flex h-8 w-8 items-center justify-center rounded-lg">
                    <Sparkles className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">Platform Fee</p>
                    <p className="text-muted-foreground text-xs">Infrastructure & AI</p>
                  </div>
                </div>
                <p className="font-libre-baskerville text-foreground text-3xl font-bold">
                  20<span className="text-lg font-medium">%</span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Covers servers, hosting, AI models, security, and Razorpay payment operations.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                    <Coins className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">Story Pool</p>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Distributed by Story Owner
                    </p>
                  </div>
                </div>
                <p className="font-libre-baskerville text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  80<span className="text-lg font-medium">%</span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Added to the story pool. Story Owner configures custom coin distribution for
                  contributors.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...scrollReveal.card(1)}
          className="border-border/50 bg-card mb-8 rounded-2xl border p-6"
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="text-secondary h-5 w-5" />
              <h3 className="text-foreground font-semibold">Owner-Configured Role Distribution</h3>
            </div>
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
              Owner Decides Distribution
            </span>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">
            From the{' '}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              80% Story Pool
            </span>
            , the Story Owner determines how many coins to reward each role in their Story
            Dashboard.
          </p>

          <div className="space-y-3">
            {storyRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className={cn(
                    'group border-border/40 bg-muted/20 flex flex-col gap-3 rounded-xl border p-4 duration-200 sm:flex-row sm:items-center sm:justify-between',
                    'hover:border-primary/30 hover:bg-muted/30'
                  )}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3.5">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
                        role.bgColor
                      )}
                    >
                      <Icon className={cn('h-5 w-5', role.color)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex flex-wrap items-center gap-2">
                        <p className="text-foreground text-sm font-semibold">{role.role}</p>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide',
                            role.bgColor,
                            role.color
                          )}
                        >
                          Owner Configured Rate
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                    <span className="bg-background border-border/60 text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-2xs">
                      <Coins className="h-3.5 w-3.5 text-amber-500" />
                      <span>Custom Coin Share</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── How Payouts Work - Card-based flow ──────────────────────── */}
        <motion.div
          {...scrollReveal.card(2)}
          className="border-border/50 bg-card rounded-2xl border p-6 sm:p-8"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <Sparkles className="text-secondary h-5 w-5" />
            </div>
            <div>
              <h3 className="text-foreground font-libre-baskerville text-lg font-semibold">
                How Story Pools Work
              </h3>
              <p className="text-muted-foreground text-sm">
                Transparent 80/20 split & owner control
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: 1,
                icon: BookOpenCheck,
                title: 'Reader Unlocks Chapter',
                desc: 'A reader purchases a chapter. 20% covers platform fee and 80% is added directly into the Story Pool.',
                color: 'text-secondary',
                bg: 'bg-secondary/10',
                borderColor: 'border-secondary/20',
              },
              {
                step: 2,
                icon: SlidersHorizontal,
                title: 'Owner Configures Rates',
                desc: 'The Story Owner specifies how many coins each role (Author, Co-author, Reviewer, etc.) receives.',
                color: 'text-primary',
                bg: 'bg-primary/10',
                borderColor: 'border-primary/20',
              },
              {
                step: 3,
                icon: Banknote,
                title: 'Automatic Coin Payout',
                desc: 'Coins are automatically credited from the 80% Story Pool directly to contributors’ wallets.',
                color: 'text-emerald-500 dark:text-emerald-400',
                bg: 'bg-emerald-500/10',
                borderColor: 'border-emerald-500/20',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Arrow connector (between cards on sm+) */}
                {i < 2 && (
                  <div className="text-muted-foreground/40 absolute top-1/2 -right-2.5 z-10 hidden -translate-y-1/2 sm:block">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}

                <div
                  className={cn(
                    'relative h-full rounded-xl border p-5 transition-all duration-200 hover:shadow-sm',
                    item.borderColor,
                    'bg-muted/10 hover:bg-muted/20'
                  )}
                >
                  {/* Step number + icon row */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        item.bg
                      )}
                    >
                      <item.icon className={cn('h-5 w-5', item.color)} />
                    </div>
                    <span
                      className={cn(
                        'font-libre-baskerville text-2xl font-bold opacity-20',
                        item.color
                      )}
                    >
                      0{item.step}
                    </span>
                  </div>

                  <h4 className="text-foreground mb-2 text-sm font-semibold">{item.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom highlight bar */}
          <div className="bg-muted/20 mt-6 flex flex-wrap items-center justify-center gap-6 rounded-xl px-6 py-4">
            {[
              { label: '20% Platform Fee', desc: 'Infrastructure & AI' },
              { label: '80% Story Pool', desc: 'Directly into pool' },
              { label: 'Owner Decides', desc: 'Custom coin distribution' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                <span className="text-foreground font-medium">{item.label}</span>
                <span className="text-muted-foreground text-xs">- {item.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
