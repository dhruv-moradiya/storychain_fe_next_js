'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { BookOpen } from 'lucide-react';

import { gettingStartedSteps } from '@/lib/data/how-to-use-data';
import { cn, scrollReveal } from '@/lib/utils';

function SectionLabel({
  icon: Icon,
  label,
  color,
  bg,
}: {
  icon: LucideIcon;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={cn('mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5', bg)}>
      <Icon className={cn('h-4 w-4', color)} />
      <span className={cn('text-sm font-semibold', color)}>{label}</span>
    </div>
  );
}

export function GettingStartedSection() {
  return (
    <section id="getting-started" className="scroll-mt-6 py-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-10">
        <SectionLabel
          icon={BookOpen}
          label="Getting Started"
          color="text-brand-pink-500"
          bg="border-brand-pink-500/20 bg-brand-pink-500/5"
        />
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          From Zero to Published
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          Follow these six steps to create your first story on StoryChain — from account setup to
          your first published chapter.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-6">
        {gettingStartedSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              {...scrollReveal.card(index)}
              className="border-border/40 bg-cream-95/60 group relative rounded-2xl border p-6 transition-all hover:shadow-sm"
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
                      'flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm',
                      step.number === 1
                        ? 'bg-brand-pink-500'
                        : step.number === 2
                          ? 'bg-brand-blue'
                          : step.number === 3
                            ? 'bg-brand-orange'
                            : step.number === 4
                              ? 'bg-purple-500'
                              : step.number === 5
                                ? 'bg-green-500'
                                : 'bg-amber-500'
                    )}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <div
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-lg',
                        step.bgColor
                      )}
                    >
                      <Icon className={cn('h-4 w-4', step.color)} />
                    </div>
                    <h3 className={cn('font-semibold transition-colors', step.color)}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-text-secondary-65 mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Sub-steps */}
                  <ul className="space-y-1.5">
                    {step.subSteps.map((sub, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', step.color)} />
                        <span className="text-text-secondary-65 text-xs leading-relaxed">
                          {sub}
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
