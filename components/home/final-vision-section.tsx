'use client';

import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';
import { motion } from 'framer-motion';

export const FinalVisionSection = () => {
  return (
    <section className="bg-bg-cream relative z-10 px-6 pt-12 pb-12 text-center sm:pt-28 sm:pb-20">
      <motion.span
        {...scrollReveal.paragraph}
        className="font-yellowtail text-brand-blue mb-4 block text-base"
      >
        {storyChainLandingContent.vision.eyebrow}
      </motion.span>

      <motion.h2
        {...scrollReveal.heading}
        className="font-libre-baskerville text-text-tertiary mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
      >
        {storyChainLandingContent.vision.title.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </motion.h2>

      <motion.p
        {...scrollReveal.paragraph}
        className="text-text-secondary-65 font-ibm-plex-mono mx-auto max-w-xl text-sm leading-[1.85]"
      >
        {storyChainLandingContent.vision.description}
      </motion.p>
    </section>
  );
};
