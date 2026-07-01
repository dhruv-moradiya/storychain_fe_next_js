'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, PenTool } from 'lucide-react';

import { writingFeatures } from '@/lib/data/how-to-use-data';
import { cn, scrollReveal } from '@/lib/utils';

import { createBadge } from '../common/badge';

export function WritingEditingSection() {
  return (
    <section id="writing-editing" className="scroll-mt-6 py-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-10">
        <div className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-4 flex w-fit rounded-full p-1 shadow-2xl">
          {createBadge({
            icon: PenTool,
            label: 'Writing & Editing',
            color: 'pink',
            className: 'border-none bg-transparent rounded-full shadow-2xl',
            size: 'lg',
          })}
        </div>
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          The Writing Experience
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          StoryChain gives you a distraction-free writing environment with everything you need to
          craft, manage, and publish your stories.
        </p>
      </motion.div>

      {/* Feature rows */}
      <div className="space-y-6">
        {writingFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              {...scrollReveal.card(index)}
              className="border-border/40 bg-cream-95/60 group rounded-2xl border p-6 transition-all hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                {/* Left: Icon + title */}
                <div className="flex items-start gap-4 sm:w-56 sm:shrink-0">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                      feature.bgColor
                    )}
                  >
                    <Icon className={cn('h-5 w-5', feature.color)} />
                  </div>
                  <div>
                    <h3 className={cn('font-semibold transition-colors', feature.color)}>
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary-65 mt-1 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-border/30 hidden border-l sm:block" />

                {/* Right: Tips */}
                <div className="flex-1">
                  <p className="text-text-secondary-65/70 mb-3 text-[10px] font-semibold tracking-wider uppercase">
                    Tips & Best Practices
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {feature.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', feature.color)}
                        />
                        <span className="text-text-secondary-65 text-xs leading-relaxed">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
