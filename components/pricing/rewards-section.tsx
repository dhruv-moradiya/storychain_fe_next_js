'use client';

import type { StoryRole } from '@/type/coins';
import { motion } from 'framer-motion';
import { Gift, IndianRupee, Percent, Sparkles, TrendingUp, Users } from 'lucide-react';

import { cn, scrollReveal } from '@/lib/utils';

interface RewardsSectionProps {
  roles: StoryRole[];
}

export function RewardsSection({ roles }: RewardsSectionProps) {
  const appShare = 40;
  const creatorShare = 60;

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-5xl">
        {/* ── Section header ────────────────────────── */}
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5"
          >
            <Gift className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">Creator Rewards Program</span>
          </motion.div>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-text-tertiary mb-3 text-3xl tracking-tight sm:text-4xl"
          >
            Earn from your stories
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="text-text-secondary-65 mx-auto max-w-xl text-sm leading-relaxed"
          >
            Every time a reader unlocks a chapter in your story, the revenue is shared between the
            platform and all contributors — automatically, transparently, via Razorpay Payouts.
          </motion.p>
        </div>

        {/* ── Revenue split ─────────────────────────── */}
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/50 from-bg-cream to-bg-cream-blend mb-8 overflow-hidden rounded-2xl border bg-linear-to-br p-6"
        >
          <p className="text-text-secondary-65 mb-5 text-center text-xs font-medium tracking-widest uppercase">
            Chapter Unlock Revenue Split
          </p>

          {/* Animated bar */}
          <div className="mb-6 flex h-10 overflow-hidden rounded-xl">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${appShare}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="from-text-secondary/30 to-text-secondary/50 text-cream-80 flex items-center justify-center bg-linear-to-r text-xs font-bold"
            >
              {appShare}% App
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${creatorShare}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
              className="from-brand-pink-500 to-brand-orange text-cream-95 flex items-center justify-center bg-linear-to-r text-xs font-bold"
            >
              {creatorShare}% Creators
            </motion.div>
          </div>

          {/* Two columns */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Platform card */}
            <div className="from-text-secondary/5 to-text-secondary/10 rounded-xl bg-linear-to-br p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-text-secondary-65/10 flex h-8 w-8 items-center justify-center rounded-lg">
                  <TrendingUp className="text-text-secondary-65 h-4 w-4" />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-semibold">StoryChain Platform</p>
                  <p className="text-text-secondary-65 text-xs">Infrastructure &amp; Growth</p>
                </div>
              </div>
              <p className="font-libre-baskerville text-text-primary text-3xl font-bold">
                {appShare}
                <span className="text-lg font-medium">%</span>
              </p>
              <p className="text-text-secondary-65 mt-1 text-xs">
                Covers servers, AI, payments, and platform development.
              </p>
            </div>

            {/* Creator card */}
            <div className="from-brand-pink-500/8 to-brand-orange/8 rounded-xl bg-linear-to-br p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-brand-pink-500/12 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Users className="text-brand-pink-500 h-4 w-4" />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-semibold">Story Contributors</p>
                  <p className="text-brand-pink-500 text-xs">Distributed by role</p>
                </div>
              </div>
              <p className="text-brand-pink-500 font-libre-baskerville text-3xl font-bold">
                {creatorShare}
                <span className="text-lg font-medium">%</span>
              </p>
              <p className="text-text-secondary-65 mt-1 text-xs">
                Split among all contributors based on their story role and contribution.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Role reward breakdown ──────────────────── */}
        <motion.div
          {...scrollReveal.card(1)}
          className="border-border/50 from-bg-cream to-bg-cream-blend mb-8 rounded-2xl border bg-linear-to-br p-6"
        >
          <div className="mb-2 flex items-center gap-2">
            <Percent className="text-brand-blue h-5 w-5" />
            <h3 className="text-text-primary font-semibold">Role-Based Reward Distribution</h3>
          </div>
          <p className="text-text-secondary-65 mb-6 text-sm">
            The{' '}
            <span className="text-brand-pink-500 font-medium">{creatorShare}% creator share</span>{' '}
            is split proportionally among contributors based on their role.
          </p>

          <div className="space-y-2">
            {roles.map((role, index) => {
              const Icon = role.icon;
              const shareOfTotal = (role.rewardShare / 100) * creatorShare;

              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className={cn(
                    'group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all duration-200',
                    'hover:border-border/60 hover:bg-bg-cream-blend/60'
                  )}
                >
                  {/* Role icon */}
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
                      role.bgColor
                    )}
                  >
                    <Icon className={cn('h-5 w-5', role.color)} />
                  </div>

                  {/* Role name + desc */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                      <p className="text-text-primary text-sm font-semibold">{role.role}</p>
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
                    <p className="text-text-secondary-65 text-xs leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="hidden w-28 shrink-0 sm:block">
                    <div className="border-border/30 h-1.5 overflow-hidden rounded-full border bg-black/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(role.rewardShare / 40) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: index * 0.07, ease: 'easeOut' }}
                        className={cn('h-full rounded-full', role.bgColor)}
                      />
                    </div>
                  </div>

                  {/* ₹ share badge */}
                  <div className="flex shrink-0 items-center gap-0.5">
                    <IndianRupee className={cn('h-3 w-3', role.color)} />
                    <span className={cn('font-libre-baskerville text-sm font-bold', role.color)}>
                      {shareOfTotal.toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── How payouts work ──────────────────────── */}
        <motion.div
          {...scrollReveal.card(2)}
          className="border-brand-blue/20 from-brand-blue/6 via-brand-pink-500/5 to-brand-orange/6 rounded-2xl border bg-linear-to-br p-6"
        >
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="text-brand-blue h-5 w-5" />
            <h3 className="text-text-primary font-semibold">How Payouts Work</h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Reader Unlocks Chapter',
                desc: 'A reader spends coins to unlock a premium chapter in your story.',
                color: 'text-brand-blue',
                bg: 'bg-brand-blue/10',
              },
              {
                step: '02',
                title: 'Revenue is Split',
                desc: '40% goes to StoryChain. 60% is divided among story contributors by role.',
                color: 'text-brand-pink-500',
                bg: 'bg-brand-pink-500/10',
              },
              {
                step: '03',
                title: 'Razorpay Payout',
                desc: 'Your earnings are automatically transferred to your bank via Razorpay Payouts.',
                color: 'text-brand-orange',
                bg: 'bg-brand-orange/10',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div
                  className={cn('flex h-10 w-10 items-center justify-center rounded-xl', item.bg)}
                >
                  <span className={cn('font-libre-baskerville text-sm font-bold', item.color)}>
                    {item.step}
                  </span>
                </div>
                <div>
                  <p className="text-text-primary mb-1 text-sm font-semibold">{item.title}</p>
                  <p className="text-text-secondary-65 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
