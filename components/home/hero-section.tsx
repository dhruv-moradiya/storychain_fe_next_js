'use client';

import Link from 'next/link';

import { storyChainLandingContent } from '@/constants';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

import { fadeIn } from '@/lib/utils';

interface IHeroSectionProps {
  isSignedIn: boolean;
}

export const HeroSection = ({ isSignedIn }: IHeroSectionProps) => {
  return (
    <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 pt-16 pb-24 text-center">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Eyebrow */}
        <motion.div
          {...fadeIn(0.1)}
          className="font-yellowtail text-brand-pink-500 inline-flex items-center gap-2 text-xl tracking-wide sm:text-2xl dark:text-amber-200/90"
        >
          <motion.span
            animate={{ rotate: [0, 15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Sparkles className="text-brand-pink-500 h-4 w-4 dark:text-amber-300/90" />
          </motion.span>
          <span>{storyChainLandingContent.hero.eyebrow}</span>
        </motion.div>

        {/* Main Headline - Primary Visual Focus */}
        <motion.h1 className="font-libre-baskerville text-text-primary text-3xl leading-[1.18] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl dark:text-white">
          {storyChainLandingContent.hero.title.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="from-text-primary via-text-primary to-text-secondary bg-linear-to-b bg-clip-text text-transparent dark:from-white dark:via-white/95 dark:to-white/80"
            >
              {line}
            </motion.div>
          ))}
        </motion.h1>

        {/* Subtitle Description */}
        <motion.div className="font-ibm-plex-mono text-text-secondary-75 mx-auto max-w-xl text-sm leading-[1.8] font-normal dark:text-neutral-400">
          {storyChainLandingContent.hero.description.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 0.3,
                delay: 0.5 + i * 0.02,
                ease: 'easeOut',
              }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeIn(0.4)}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-4"
        >
          {isSignedIn ? (
            <Link href="/stories">
              <motion.button
                className="group flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:shadow-lg dark:hover:bg-neutral-100"
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen size={16} />
                <span>Go to Stories</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          ) : (
            <>
              <Link href="/sign-up">
                <motion.button
                  className="group flex items-center gap-2.5 rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:shadow-lg dark:hover:bg-neutral-100"
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{storyChainLandingContent.hero.primaryCta}</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>

              <Link href="/sign-in">
                <motion.button
                  className="border-border/60 text-text-primary hover:border-border/80 rounded-full border bg-white/70 px-6 py-3 text-sm font-medium backdrop-blur-md transition-all duration-200 hover:bg-white/90 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:border-white/25 dark:hover:bg-white/10"
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{storyChainLandingContent.hero.secondaryCta}</span>
                </motion.button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Reduced Weight Badges */}
        <motion.div {...fadeIn(0.6)} className="flex flex-wrap justify-center gap-2.5 pt-2">
          {['Free to Start', 'No Credit Card', 'Unlimited Stories'].map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              whileHover={{ y: -1 }}
              className="font-ibm-plex-mono border-border/30 bg-cream-80/70 text-text-secondary-65 hover:border-border/60 hover:text-text-primary flex cursor-default items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-normal backdrop-blur-md transition-all dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:border-white/20 dark:hover:text-white/80"
            >
              <Sparkles className="text-brand-pink-500 h-3 w-3 dark:text-amber-300/70" />
              <span>{badge}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="from-text-secondary-40 h-5 w-px bg-linear-to-b to-transparent dark:from-white/30" />
          <div className="bg-text-secondary-40 h-1 w-1 rounded-full dark:bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};
