'use client';

import type { StoryRole } from '@/type/coins';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Banknote,
  BookOpenCheck,
  Gift,
  Percent,
  PieChart,
  Sparkles,
  Users,
} from 'lucide-react';

import { cn, scrollReveal } from '@/lib/utils';

interface RewardsSectionProps {
  roles: StoryRole[];
}

export function RewardsSection({ roles }: RewardsSectionProps) {
  const appShare = 40;
  const creatorShare = 60;

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        {/* ── Section header ────────────────────────── */}
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5"
          >
            <Gift className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Creator Rewards Program
            </span>
          </motion.div>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-foreground mb-3 text-3xl tracking-tight sm:text-4xl"
          >
            Earn from your stories
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed"
          >
            Every time a reader unlocks a chapter in your story, the revenue is shared between the
            platform and all contributors — automatically, transparently, via Razorpay Payouts.
          </motion.p>
        </div>

        {/* ── Revenue split — Donut visual ─────────────────────────── */}
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/50 bg-card mb-8 overflow-hidden rounded-2xl border p-6"
        >
          <p className="text-muted-foreground mb-6 text-center text-xs font-medium tracking-widest uppercase">
            Chapter Unlock Revenue Split
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
                  strokeDasharray={`${(appShare / 100) * 314.16} 314.16`}
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
                  className="stroke-primary"
                  strokeDasharray={`${(creatorShare / 100) * 314.16} 314.16`}
                  strokeDashoffset={`-${(appShare / 100) * 314.16}`}
                  initial={{ strokeDashoffset: 314.16 }}
                  whileInView={{ strokeDashoffset: `-${(appShare / 100) * 314.16}` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-foreground font-libre-baskerville text-2xl font-bold">
                  {creatorShare}%
                </span>
                <span className="text-muted-foreground text-xs">Creators</span>
              </div>
            </div>

            {/* Split detail cards */}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="bg-muted-foreground/10 flex h-8 w-8 items-center justify-center rounded-lg">
                    <Sparkles className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">StoryChain Platform</p>
                    <p className="text-muted-foreground text-xs">Infrastructure & Growth</p>
                  </div>
                </div>
                <p className="font-libre-baskerville text-foreground text-3xl font-bold">
                  {appShare}
                  <span className="text-lg font-medium">%</span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Covers servers, AI, payments, and platform development.
                </p>
              </div>
              <div className="bg-primary/5 rounded-xl p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="bg-primary/12 flex h-8 w-8 items-center justify-center rounded-lg">
                    <Users className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">Story Contributors</p>
                    <p className="text-primary text-xs">Distributed by role</p>
                  </div>
                </div>
                <p className="text-primary font-libre-baskerville text-3xl font-bold">
                  {creatorShare}
                  <span className="text-lg font-medium">%</span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Split among all contributors based on their story role and contribution.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Role reward breakdown ──────────────────── */}
        <motion.div
          {...scrollReveal.card(1)}
          className="border-border/50 bg-card mb-8 rounded-2xl border p-6"
        >
          <div className="mb-2 flex items-center gap-2">
            <Percent className="text-secondary h-5 w-5" />
            <h3 className="text-foreground font-semibold">Role-Based Reward Distribution</h3>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">
            The <span className="text-primary font-medium">{creatorShare}% creator share</span> is
            split proportionally among contributors based on their role.
          </p>

          <div className="space-y-2">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className={cn(
                    'group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all duration-200',
                    'hover:border-border/60 hover:bg-muted/30'
                  )}
                >
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
                          'rounded-full px-2 py-0.5 text-xs font-medium',
                          role.bgColor,
                          role.color
                        )}
                      >
                        {role.rewardShare}% of creator pool
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                  <div className="hidden w-28 shrink-0 sm:block">
                    <div className="border-border/30 bg-muted/30 h-1.5 overflow-hidden rounded-full border">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(role.rewardShare / 40) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: index * 0.07, ease: 'easeOut' }}
                        className={cn('h-full rounded-full', role.bgColor)}
                      />
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <span className={cn('font-libre-baskerville text-sm font-bold', role.color)}>
                      {role.rewardShare}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── How Payouts Work — Card-based flow ──────────────────────── */}
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
                How Payouts Work
              </h3>
              <p className="text-muted-foreground text-sm">Simple, transparent, and automatic</p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: 1,
                icon: BookOpenCheck,
                title: 'Reader Unlocks Chapter',
                desc: 'A reader spends coins to unlock a premium chapter in your story. The transaction is instant and secure.',
                color: 'text-secondary',
                bg: 'bg-secondary/10',
                borderColor: 'border-secondary/20',
              },
              {
                step: 2,
                icon: PieChart,
                title: 'Revenue is Split',
                desc: '40% goes to StoryChain for infrastructure. 60% is automatically divided among story contributors based on role.',
                color: 'text-primary',
                bg: 'bg-primary/10',
                borderColor: 'border-primary/20',
              },
              {
                step: 3,
                icon: Banknote,
                title: 'Earnings Deposited',
                desc: 'Your share is transferred directly to your linked bank account via Razorpay Payouts. No manual action needed.',
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
              { label: 'Automatic', desc: 'No manual claims' },
              { label: 'Transparent', desc: 'Track every payout' },
              { label: 'Instant', desc: 'Via Razorpay' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                <span className="text-foreground font-medium">{item.label}</span>
                <span className="text-muted-foreground text-xs">— {item.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
