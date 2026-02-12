'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';

export const FinalVisionSection = () => {
  return (
    <section className="bg-bg-cream relative z-10 px-6 pt-12 pb-12 text-center sm:pt-28 sm:pb-20">
      {/* Image - hidden on mobile */}
      <motion.div {...scrollReveal.image} className="mb-20 hidden justify-center sm:flex">
        <div className="relative h-[200px] w-[400px] overflow-hidden rounded-[100px]">
          <Image
            src="https://res.cloudinary.com/dpji4qfnu/image/upload/v1767521223/Gemini_Generated_Image_qg7ks4qg7ks4qg7k_bin6n6.png"
            alt="Exploring a new frontier"
            fill
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16"
            style={{
              background:
                'linear-gradient(to bottom, var(--bg-cream), var(--cream-80), transparent)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{
              background: 'linear-gradient(to top, var(--bg-cream), var(--cream-80), transparent)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20"
            style={{
              background:
                'linear-gradient(to right, var(--bg-cream), var(--cream-80), transparent)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-20"
            style={{
              background: 'linear-gradient(to left, var(--bg-cream), var(--cream-80), transparent)',
            }}
          />
        </div>
      </motion.div>

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
