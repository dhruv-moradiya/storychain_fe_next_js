'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Feather } from 'lucide-react';
import Image from 'next/image';
import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';

export const TeamworkSection = () => {
  return (
    <section className="bg-bg-cream relative z-10">
      {/* Image - hidden on mobile */}
      {/* <div className="relative hidden h-[260px] w-full overflow-hidden sm:block">
        <motion.div {...scrollReveal.image} className="relative h-full w-full">
          <Image
            src={storyChainLandingContent.collaboration.imageUrl.url}
            alt={storyChainLandingContent.collaboration.imageUrl.alt}
            fill
            className="object-cover"
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-36"
          style={{
            background: 'linear-gradient(to bottom, var(--bg-cream), var(--cream-75), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
          style={{
            background: 'linear-gradient(to top, var(--bg-cream), var(--cream-75), transparent)',
          }}
        />
      </div> */}

      <div className="mx-auto max-w-4xl px-6 pt-10 pb-12 text-center sm:mb-24 sm:pt-16 sm:pb-20">
        <motion.span
          {...scrollReveal.paragraph}
          className="font-yellowtail text-brand-pink-500 mb-4 block text-lg"
        >
          {storyChainLandingContent.collaboration.eyebrow}
        </motion.span>

        <motion.h2
          {...scrollReveal.heading}
          className="font-libre-baskerville text-text-tertiary mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
        >
          {storyChainLandingContent.collaboration.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h2>

        <motion.p
          {...scrollReveal.paragraph}
          className="text-text-secondary-65 font-ibm-plex-mono mx-auto mb-12 max-w-xl text-sm leading-[1.85]"
        >
          {storyChainLandingContent.collaboration.description}
        </motion.p>

        {/* Collaboration features */}
        <div className="mx-auto mb-12 grid max-w-2xl grid-cols-2 gap-4">
          {storyChainLandingContent.collaboration.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 rounded-xl bg-white/60 px-4 py-3 text-left shadow-sm ring-1 ring-black/5"
            >
              <Feather className="text-brand-pink-500 h-4 w-4 flex-shrink-0" />
              <span className="text-text-secondary-75 font-ibm-plex-mono text-xs">{feature}</span>
            </motion.div>
          ))}
        </div>

        <motion.div {...scrollReveal.paragraph} className="flex justify-center">
          <motion.button
            className="group bg-brand-blue flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {storyChainLandingContent.collaboration.cta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
