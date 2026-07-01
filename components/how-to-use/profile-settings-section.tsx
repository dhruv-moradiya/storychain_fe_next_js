'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Smartphone } from 'lucide-react';

import { profileFeatures } from '@/lib/data/how-to-use-data';
import { cn, scrollReveal } from '@/lib/utils';

import { createBadge } from '../common/badge';

export function ProfileSettingsSection() {
  return (
    <section id="profile-settings" className="scroll-mt-6 py-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-10">
        <div className="mb-4 flex w-fit rounded-full border-purple-500/20 bg-purple-500/5 p-1 shadow-2xl">
          {createBadge({
            icon: Smartphone,
            label: 'Profile & Settings',
            color: 'purple',
            className: 'border-none bg-transparent rounded-full shadow-2xl',
            size: 'lg',
          })}
        </div>
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          Your Account & Profile
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          Manage your public profile, notification preferences, achievements, and account security
          all from one place.
        </p>
      </motion.div>

      {/* Feature grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {profileFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              {...scrollReveal.card(index)}
              className="border-border/40 bg-cream-95/60 group rounded-2xl border p-6 transition-all hover:shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl',
                    feature.bgColor
                  )}
                >
                  <Icon className={cn('h-5 w-5', feature.color)} />
                </div>
                <h3 className={cn('font-semibold', feature.color)}>{feature.title}</h3>
              </div>
              <p className="text-text-secondary-65 mb-4 text-sm leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', feature.color)} />
                    <span className="text-text-secondary-65 text-xs leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
