'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { storyChainLandingContent } from '@/constants';

interface IHeroActionsProps {
  isSignedIn: boolean;
}

export const HeroActions = ({ isSignedIn }: IHeroActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
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
  );
};
