'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard, Sparkles, PenTool, BookOpen } from 'lucide-react';
import { fadeIn } from '@/lib/utils';
import { storyChainLandingContent } from '@/constants';
import { DotsGrid } from './dots-grid';

interface IHeroSectionProps {
  isSignedIn: boolean;
}

export const HeroSection = ({ isSignedIn }: IHeroSectionProps) => {
  return (
    <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 pt-8 pb-20 text-center">
      {/* Decorative elements */}
      <DotsGrid className="top-1/4 left-8 text-white/30" />
      <DotsGrid className="right-8 bottom-1/4 text-white/30" />

      {/* Animated pen icon */}
      <motion.div
        className="absolute top-1/3 left-[15%] hidden lg:block"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PenTool className="h-8 w-8 text-white/20" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-[15%] hidden lg:block"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <BookOpen className="h-10 w-10 text-white/15" />
      </motion.div>

      {/* Eyebrow with sparkle */}
      <motion.span
        {...fadeIn(0.1)}
        className="font-yellowtail mb-4 flex items-center gap-2 text-2xl tracking-wide text-white/85"
      >
        <motion.span
          animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-5 w-5 text-amber-300" />
        </motion.span>
        {storyChainLandingContent.hero.eyebrow}
      </motion.span>

      {/* Title */}
      <motion.h1 className="font-libre-baskerville mb-10 text-4xl leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
        {storyChainLandingContent.hero.title.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.15 + i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--text-primary) 0%, var(--brand-blue) 50%, var(--brand-pink-500) 100%)',
            }}
          >
            {line}
          </motion.div>
        ))}
      </motion.h1>

      {/* Description */}
      <motion.div className="text-text-secondary-75 font-ibm-plex-mono mb-12 flex max-w-xl flex-wrap justify-center gap-x-1.5 text-sm leading-[1.8] font-medium">
        {storyChainLandingContent.hero.description.split(' ').map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.35,
              delay: 0.6 + i * 0.03,
              ease: 'easeOut',
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        {...fadeIn(0.4)}
        className="mb-8 flex flex-wrap items-center justify-center gap-4"
      >
        {isSignedIn ? (
          <Link href="/dashboard">
            <motion.button
              className="group bg-brand-pink-500 shadow-brand-pink-shadow25 flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <LayoutDashboard size={16} />
              Go to Dashboard
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        ) : (
          <>
            <Link href="/sign-up">
              <motion.button
                className="group bg-brand-pink-500 shadow-brand-pink-shadow25 flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {storyChainLandingContent.hero.primaryCta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            <Link href="/sign-in">
              <motion.button
                className="rounded-[6px] border border-white/35 px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                {storyChainLandingContent.hero.secondaryCta}
              </motion.button>
            </Link>
          </>
        )}
      </motion.div>

      {/* Floating badges */}
      <motion.div {...fadeIn(0.6)} className="flex flex-wrap justify-center gap-3">
        {['Free to Start', 'No Credit Card', 'Unlimited Stories'].map((badge, i) => (
          <motion.span
            key={badge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="font-ibm-plex-mono flex cursor-default items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70 backdrop-blur"
          >
            <Sparkles className="h-3 w-3" />
            {badge}
          </motion.span>
        ))}
      </motion.div>

      {/* Animated line below hero */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};
