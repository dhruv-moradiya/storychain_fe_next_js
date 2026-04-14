'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap } from 'lucide-react';

import { scrollReveal } from '@/lib/utils';

export function PricingHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-20 right-1/4 h-56 w-56 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-primary/20 bg-primary/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
        >
          <Sparkles className="text-primary h-4 w-4" />
          <span className="text-primary text-sm font-medium">
            Coin-based. Pay for what you use.
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-libre-baskerville text-foreground mb-5 text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Unlock stories,
          <br />
          <span className="text-primary">earn from yours</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base leading-relaxed"
        >
          Buy coins once and spend them your way — unlock chapters, publish stories, use AI tools,
          and earn rewards when readers love your work.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          {...scrollReveal.paragraph}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {[
            {
              icon: Shield,
              color: 'text-green-500 dark:text-green-400',
              bg: 'bg-green-500/10',
              text: 'Secure payments',
            },
            { icon: Zap, color: 'text-secondary', bg: 'bg-secondary/10', text: 'Cancel anytime' },
            {
              icon: Sparkles,
              color: 'text-primary',
              bg: 'bg-primary/10',
              text: '24/7 support',
            },
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="text-muted-foreground flex items-center gap-2"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${badge.bg}`}>
                <badge.icon className={`h-4 w-4 ${badge.color}`} />
              </div>
              <span className="text-sm">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
