'use client';

import { motion } from 'framer-motion';
import { BookOpen, Sparkles, GitBranch, Users } from 'lucide-react';
import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';

export const NotJustAnAppSection = () => {
  return (
    <section className="bg-bg-cream relative z-10 px-6 pt-8 pb-10 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="bg-bg-cream-light relative overflow-hidden rounded-[20px] px-4 py-16 shadow-sm backdrop-blur-sm sm:rounded-[28px] sm:px-6 sm:py-32">
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(0,0,0,0.03)_1px,_transparent_1px)] [background-size:24px_24px] opacity-60" />
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              background:
                'linear-gradient(to bottom, var(--cream-20), transparent, var(--cream-20))',
            }}
          />

          {/* Decorative corner elements */}
          <div className="border-brand-pink-500 absolute top-6 left-6 h-12 w-12 rounded-tl-lg border-t-2 border-l-2 opacity-10" />
          <div className="border-brand-blue absolute right-6 bottom-6 h-12 w-12 rounded-br-lg border-r-2 border-b-2 opacity-10" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.span
              {...scrollReveal.paragraph}
              className="font-yellowtail mb-5 block text-lg text-pink-500"
            >
              {storyChainLandingContent.notJustAnApp.smallTitle}
            </motion.span>

            <motion.h2
              {...scrollReveal.heading}
              className="font-libre-baskerville text-text-tertiary mb-12 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            >
              {storyChainLandingContent.notJustAnApp.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </motion.h2>

            <motion.p
              {...scrollReveal.paragraph}
              className="text-text-secondary-70 font-ibm-plex-mono mx-auto mb-12 max-w-xl text-sm leading-[1.85]"
            >
              {storyChainLandingContent.notJustAnApp.description}
            </motion.p>

            {/* Icon row with connecting line */}
            <motion.div {...scrollReveal.paragraph} className="relative flex justify-center gap-6">
              {/* Connecting line behind icons */}
              <div className="absolute top-1/2 right-1/4 left-1/4 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

              {[
                { Icon: BookOpen, color: 'var(--brand-orange)' },
                { Icon: Sparkles, color: 'var(--brand-blue)' },
                { Icon: GitBranch, color: 'var(--brand-pink-500)' },
                { Icon: Users, color: 'var(--text-tertiary)' },
              ].map(({ Icon, color }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5"
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
