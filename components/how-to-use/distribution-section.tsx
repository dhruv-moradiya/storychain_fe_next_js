'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock, Coins, Info, TrendingUp, Wallet } from 'lucide-react';

import { scrollReveal } from '@/lib/utils';

const roleShares = [
  { role: 'Owner', percent: 40, color: 'bg-brand-orange', textColor: 'text-brand-orange' },
  { role: 'Co-Author', percent: 25, color: 'bg-brand-blue', textColor: 'text-brand-blue' },
  { role: 'Collaborator', percent: 20, color: 'bg-purple-500', textColor: 'text-purple-500' },
  { role: 'Reviewer', percent: 10, color: 'bg-green-500', textColor: 'text-green-500' },
  { role: 'Moderator', percent: 5, color: 'bg-brand-pink-500', textColor: 'text-brand-pink-500' },
];

const withdrawalSteps = [
  'Go to your Wallet page from the top navigation',
  'Click "Withdraw Coins" or "Request Payout"',
  'Enter the amount you wish to withdraw',
  'Verify your bank account or UPI details (first withdrawal only)',
  'Submit the withdrawal request',
  'Platform admin reviews and processes within 24–48 hours',
  'Funds are transferred to your bank account or UPI',
];

export function DistributionSection() {
  return (
    <section id="distribution" className="scroll-mt-6 py-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5">
          <TrendingUp className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-semibold text-purple-500">Revenue Distribution</span>
        </div>
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          How Earnings Are Distributed
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          Every coin spent by readers is distributed transparently. Here&apos;s exactly where your
          money goes and how to withdraw it.
        </p>
      </motion.div>

      {/* Revenue split visual */}
      <motion.div
        {...scrollReveal.card(0)}
        className="border-border/40 bg-cream-95/60 mb-8 overflow-hidden rounded-2xl border"
      >
        <div className="border-border/30 border-b px-6 py-4">
          <h3 className="text-text-primary text-sm font-semibold">
            Revenue Split per Chapter Unlock
          </h3>
        </div>

        <div className="p-6">
          {/* Big visual: 100 coins → split */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {/* Reader pays */}
            <div className="border-border/30 rounded-xl border p-4 text-center">
              <Coins className="text-brand-orange mx-auto mb-2 h-8 w-8" />
              <p className="text-text-primary text-2xl font-bold">10 coins</p>
              <p className="text-text-secondary-65 text-xs">Reader pays to unlock</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="text-text-secondary-65/30 text-3xl">→</div>
            </div>

            {/* Split */}
            <div className="space-y-2">
              <div className="border-border/30 flex items-center justify-between rounded-xl border bg-white/40 px-4 py-3">
                <div>
                  <p className="text-text-secondary-65 text-xs font-medium">Platform Fee</p>
                  <p className="text-text-primary text-sm font-bold">2 coins (20%)</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-xs font-bold text-gray-500">SC</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-green-700">Story Pool</p>
                  <p className="text-sm font-bold text-green-700">8 coins (80%)</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Stacked bar */}
          <div className="mb-6">
            <div className="text-text-secondary-65 mb-2 flex justify-between text-xs">
              <span>Story Pool (80%)</span>
              <span>Platform (20%)</span>
            </div>
            <div className="flex h-4 w-full overflow-hidden rounded-full">
              <div className="bg-brand-blue h-full" style={{ width: '80%' }} />
              <div className="h-full bg-gray-300" style={{ width: '20%' }} />
            </div>
          </div>

          {/* Role distribution within the 80% */}
          <div className="border-border/30 rounded-xl border p-4">
            <p className="text-text-primary mb-4 text-sm font-semibold">
              Story Pool Distribution by Role
            </p>
            <p className="text-text-secondary-65 mb-4 text-xs">
              The 80% story pool is distributed among the story team based on their role. The Owner
              decides when to trigger the distribution.
            </p>
            <div className="space-y-3">
              {roleShares.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-20 shrink-0 text-xs font-medium ${r.textColor}`}>
                    {r.role}
                  </span>
                  <div className="flex-1">
                    <div className="bg-border/20 h-2 w-full overflow-hidden rounded-full">
                      <motion.div
                        className={`h-full rounded-full ${r.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${r.percent}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                  <span className={`w-10 text-right text-xs font-semibold ${r.textColor}`}>
                    {r.percent}%
                  </span>
                </div>
              ))}
            </div>
            <div className="border-border/20 mt-4 border-t pt-3">
              <p className="text-text-secondary-65 text-[11px]">
                * Percentages apply to the story pool (the 80% after platform fee). Roles that are
                not filled for a story do not receive a share.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Withdrawal flow */}
      <motion.div
        {...scrollReveal.card(1)}
        className="border-border/40 bg-cream-95/60 mb-8 rounded-2xl border p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10">
            <Wallet className="h-4.5 w-4.5 text-green-500" />
          </div>
          <h3 className="text-text-primary font-semibold">How to Withdraw Your Earnings</h3>
        </div>
        <ol className="space-y-3">
          {withdrawalSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-text-secondary-65 text-sm leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        {/* Processing time callout */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div>
            <p className="mb-0.5 text-sm font-semibold text-amber-700">
              Processing Time: 24–48 Hours
            </p>
            <p className="text-xs leading-relaxed text-amber-600">
              All withdrawal requests are reviewed manually by the platform admin before processing.
              You will receive a notification once your withdrawal is approved and transferred.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Important notes */}
      <motion.div {...scrollReveal.card(2)} className="grid gap-4 sm:grid-cols-2">
        <div className="border-brand-blue/20 bg-brand-blue/5 flex items-start gap-3 rounded-xl border p-4">
          <Info className="text-brand-blue mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="text-text-primary mb-1 text-sm font-semibold">
              Owner Controls Distribution
            </p>
            <p className="text-text-secondary-65 text-xs leading-relaxed">
              Only the Story Owner can trigger the earnings distribution to collaborators. Do this
              before requesting a withdrawal.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div>
            <p className="mb-1 text-sm font-semibold text-amber-700">Minimum Withdrawal</p>
            <p className="text-xs leading-relaxed text-amber-600">
              There may be a minimum coin balance required before you can submit a withdrawal
              request. Check your Wallet page for the current threshold.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
