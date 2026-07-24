'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Coins,
  CreditCard,
  Info,
  Lock,
  ShoppingCart,
  TrendingUp,
  Unlock,
  Wallet,
} from 'lucide-react';

import { scrollReveal } from '@/lib/utils';

import { createBadge } from '../common/badge';

const readerSteps = [
  {
    icon: Wallet,
    label: 'Top up your wallet',
    desc: 'Buy a coin pack from Wallet → Buy Coins using UPI, card, or net banking.',
  },
  {
    icon: BookOpen,
    label: 'Find a story you love',
    desc: 'Browse the Explore page and open a story with coin-gated chapters.',
  },
  {
    icon: Lock,
    label: 'See a locked chapter',
    desc: 'Locked chapters show a padlock icon and the coin price set by the author.',
  },
  {
    icon: ShoppingCart,
    label: 'Unlock the chapter',
    desc: 'Click "Unlock for X coins". The coins are deducted from your wallet instantly.',
  },
  {
    icon: Unlock,
    label: 'Read forever',
    desc: 'The chapter is permanently unlocked in your account. No re-purchasing needed.',
  },
];

const creatorSteps = [
  {
    icon: BookOpen,
    label: 'Create your story',
    desc: 'Set up a story and write chapters using the editor.',
  },
  {
    icon: Lock,
    label: 'Set chapter price',
    desc: 'In the chapter editor, toggle "Coin-Gated" and enter a coin price (minimum 1 coin).',
  },
  {
    icon: TrendingUp,
    label: 'Earn as readers unlock',
    desc: "80% of every unlock goes into your story's earnings pool (after 20% platform fee).",
  },
  {
    icon: Wallet,
    label: 'Distribute & withdraw',
    desc: 'From your story dashboard, distribute earnings to collaborators and request a withdrawal.',
  },
];

const coinPacks = [
  { coins: '100', bonus: '0', price: '₹100', highlight: false },
  { coins: '500', bonus: '+25', price: '₹500', highlight: false },
  { coins: '1,000', bonus: '+100', price: '₹1,000', highlight: true },
  { coins: '5,000', bonus: '+750', price: '₹5,000', highlight: false },
  { coins: '10,000', bonus: '+2,000', price: '₹10,000', highlight: false },
];

export function MonetizationSection() {
  return (
    <section id="monetization" className="scroll-mt-6 py-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-10">
        <div className="border-brand-orange/20 bg-brand-orange/5 mb-4 flex w-fit rounded-full p-1 shadow-2xl">
          {createBadge({
            icon: Coins,
            label: 'In-App Monetization',
            color: 'orange',
            className: 'border-none bg-transparent rounded-full shadow-2xl',
            size: 'lg',
          })}
        </div>
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          Coins, Unlocks & Earnings
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          StoryChain uses an in-app coin system. Readers buy coins to unlock premium chapters, and
          creators earn coins every time their content is unlocked.
        </p>
      </motion.div>

      {/* Two-column: Reader vs Creator */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        {/* For Readers */}
        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/40 bg-cream-95/60 rounded-2xl border p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="bg-brand-blue/10 flex h-9 w-9 items-center justify-center rounded-xl">
              <BookOpen className="text-brand-blue h-4.5 w-4.5" />
            </div>
            <h3 className="text-text-primary font-semibold">For Readers: How to Unlock Chapters</h3>
          </div>
          <ol className="space-y-4">
            {readerSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li key={i} {...scrollReveal.list(i)} className="flex items-start gap-3">
                  <div className="bg-brand-blue/10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="text-brand-blue h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-text-primary mb-0.5 text-sm font-medium">{step.label}</p>
                    <p className="text-text-secondary-65 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>

        {/* For Creators */}
        <motion.div
          {...scrollReveal.card(1)}
          className="border-border/40 bg-cream-95/60 rounded-2xl border p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="bg-brand-orange/10 flex h-9 w-9 items-center justify-center rounded-xl">
              <TrendingUp className="text-brand-orange h-4.5 w-4.5" />
            </div>
            <h3 className="text-text-primary font-semibold">For Creators: How to Earn</h3>
          </div>
          <ol className="space-y-4">
            {creatorSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li key={i} {...scrollReveal.list(i)} className="flex items-start gap-3">
                  <div className="bg-brand-orange/10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="text-brand-orange h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-text-primary mb-0.5 text-sm font-medium">{step.label}</p>
                    <p className="text-text-secondary-65 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </div>

      {/* Coin packs table */}
      <motion.div
        {...scrollReveal.card(2)}
        className="border-border/40 bg-cream-95/60 mb-8 overflow-hidden rounded-2xl border"
      >
        <div className="border-border/30 flex items-center gap-3 border-b px-5 py-4">
          <div className="bg-brand-orange/10 flex h-7 w-7 items-center justify-center rounded-lg">
            <CreditCard className="text-brand-orange h-4 w-4" />
          </div>
          <h3 className="text-text-primary text-sm font-semibold">Available Coin Packs</h3>
        </div>
        <div className="divide-border/20 divide-y">
          {coinPacks.map((pack, i) => (
            <motion.div
              key={i}
              {...scrollReveal.list(i)}
              className={`flex items-center justify-between px-5 py-3.5 ${
                pack.highlight ? 'bg-brand-orange/5' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-brand-orange/10 flex h-7 w-7 items-center justify-center rounded-lg">
                  <Coins className="text-brand-orange h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="text-text-primary text-sm font-semibold">
                    {pack.coins} Coins
                  </span>
                  {pack.bonus !== '0' && (
                    <span className="ml-2 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                      {pack.bonus} BONUS
                    </span>
                  )}
                  {pack.highlight && (
                    <span className="bg-brand-orange/10 text-brand-orange ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold">
                      BEST VALUE
                    </span>
                  )}
                </div>
              </div>
              <span className="text-text-primary text-sm font-semibold">{pack.price}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Info callout */}
      <motion.div
        {...scrollReveal.card(3)}
        className="border-brand-blue/20 bg-brand-blue/5 flex items-start gap-3 rounded-2xl border p-5"
      >
        <Info className="text-brand-blue mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="text-text-primary mb-1 text-sm font-semibold">Coins never expire</p>
          <p className="text-text-secondary-65 text-xs leading-relaxed">
            Once purchased, coins stay in your wallet indefinitely. You can top up at any time and
            stack multiple packs. Payments are processed securely via Razorpay and support UPI,
            credit/debit cards, net banking, and popular wallets.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
