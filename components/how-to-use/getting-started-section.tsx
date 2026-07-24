'use client';

import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2 } from 'lucide-react';

import { gettingStartedSteps } from '@/lib/data/how-to-use-data';
import { cn, scrollReveal } from '@/lib/utils';

import { createBadge } from '../common/badge';

export function GettingStartedSection() {
  return (
    <section id="getting-started" className="scroll-mt-6 pb-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-10">
        <div className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-4 flex w-fit rounded-full p-1">
          {createBadge({
            icon: BookOpen,
            label: 'Getting Started',
            color: 'pink',
            className: 'border-none bg-transparent rounded-full shadow-2xl',
            size: 'lg',
          })}
        </div>
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          From Zero to Published
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          Follow these six steps to create your first story on StoryChain - from account setup to
          your first published chapter.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-6">
        {gettingStartedSteps.map((step, index) => {
          return (
            <motion.div
              key={step.number}
              {...scrollReveal.card(index)}
              className="border-border/40 bg-cream-95/60 group relative rounded-2xl border p-6 hover:shadow-sm"
            >
              {/* Connector line */}
              {index < gettingStartedSteps.length - 1 && (
                <div className="bg-border/40 absolute bottom-0 left-10 h-6 w-px translate-y-full" />
              )}

              <div className="flex gap-4">
                {/* Step number + icon */}
                <div className="flex shrink-0 flex-col items-center gap-1">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-md text-sm font-bold shadow-sm',
                      step.bgColor,
                      step.color
                    )}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className={cn('font-semibold transition-colors', step.color)}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-text-secondary-65 font-reading mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Sub-steps */}
                  <ul className="space-y-1.5">
                    {step.subSteps.map((sub, i) => (
                      <motion.li
                        key={i}
                        {...scrollReveal.list(i)}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', step.color)} />
                        <span className="text-text-secondary-65 font-reading text-xs leading-relaxed">
                          {sub}
                        </span>
                      </motion.li>
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
