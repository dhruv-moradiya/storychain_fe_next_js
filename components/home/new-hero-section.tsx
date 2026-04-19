'use client';

import Link from 'next/link';

import { storyChainLandingContent } from '@/constants';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

import { fadeIn } from '@/lib/utils';

import { Button } from '../ui/button';
import { HeroFlow } from './hero-flow';

interface INewHeroSectionProps {
  isSignedIn: boolean;
}

export const NewHeroSection = ({ isSignedIn }: INewHeroSectionProps) => {
  return (
    <section className="relative z-10 flex min-h-[88vh] w-full items-center justify-center px-6 pb-16">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* ─── Left Side ─── */}
        <div className="flex flex-col items-start text-left">
          {/* Eyebrow tag line */}
          <motion.span
            {...fadeIn(0.1)}
            className="font-yellowtail mb-4 flex items-center gap-2 text-2xl tracking-wide"
          >
            <motion.span
              animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-amber-300" />
            </motion.span>
            {storyChainLandingContent.hero.eyebrow}
          </motion.span>

          {/* Main heading - clean, no gradient */}
          <motion.h1
            {...fadeIn(0.2)}
            className="font-libre-baskerville text-text-primary mb-5 text-4xl leading-[1.15] sm:text-5xl md:text-6xl"
          >
            {storyChainLandingContent.hero.title.map((line) => (
              <div
                key={line}
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--text-primary) 0%, var(--brand-blue) 50%, var(--brand-pink-500) 100%)',
                }}
              >
                {line}
              </div>
            ))}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            {...fadeIn(0.3)}
            className="font-ibm-plex-mono text-text-secondary-75 mb-8 max-w-md text-sm leading-relaxed font-medium md:text-[15px]"
          >
            {storyChainLandingContent.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeIn(0.4)} className="flex flex-wrap items-center gap-3">
            {isSignedIn ? (
              <Link href="/stories">
                <Button className="cursor-pointer rounded-sm">
                  <BookOpen size={16} />
                  Go to Stories
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="shadow-brand-pink-shadow25 group bg-brand-pink-500 flex items-center gap-2 rounded-lg px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all"
                  >
                    {storyChainLandingContent.hero.primaryCta}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </motion.button>
                </Link>
                <Link href="/sign-in">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-text-secondary-75 rounded-lg border border-black/10 px-6 py-3 text-sm font-medium transition-all hover:border-black/20 hover:bg-black/3"
                  >
                    {storyChainLandingContent.hero.secondaryCta}
                  </motion.button>
                </Link>
              </>
            )}
          </motion.div>

          {/* Trust badges */}
          <motion.div {...fadeIn(0.5)} className="mt-8 flex flex-wrap gap-2">
            {['Free to Start', 'No Credit Card', 'Unlimited Stories'].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-text-secondary-65 font-ibm-plex-mono flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-black/3 px-3 py-1 text-xs"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ─── Right Side: React Flow - no border, no box, blends into bg ─── */}
        <motion.div {...fadeIn(0.4)} className="relative h-[440px] w-full lg:h-[530px]">
          <HeroFlow />
        </motion.div>
      </div>
    </section>
  );
};
