'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';

export const OwnershipSection = () => {
  return (
    <section className="bg-bg-cream relative z-10">
      {/* Image - hidden on mobile */}
      {/* <div className="relative hidden w-full overflow-hidden sm:block">
        <motion.div {...scrollReveal.image} className="relative h-[600px] w-full">
          <Image
            src={storyChainLandingContent.ownership.imageUrl.url}
            alt={storyChainLandingContent.ownership.imageUrl.alt}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-(--bg-cream) via-[rgba(255,245,230,0.6)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-(--bg-cream) via-[rgba(255,245,230,0.6)] to-transparent" />
      </div> */}

      <div className="relative mx-auto max-w-3xl px-6 pt-10 pb-12 text-center sm:pt-16 sm:pb-20">
        <motion.span
          {...scrollReveal.paragraph}
          className="font-yellowtail text-brand-blue mb-5 block text-lg"
        >
          {storyChainLandingContent.ownership.smallTitle}
        </motion.span>

        <motion.h2
          {...scrollReveal.heading}
          className="font-libre-baskerville text-text-tertiary mb-10 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
        >
          {storyChainLandingContent.ownership.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h2>

        <motion.p
          {...scrollReveal.paragraph}
          className="text-text-secondary-70 font-ibm-plex-mono mx-auto mb-12 max-w-xl text-sm leading-[1.85] font-medium"
        >
          {storyChainLandingContent.ownership.description}
        </motion.p>

        <ul className="text-text-secondary-75 font-ibm-plex-mono mx-auto mb-14 max-w-md space-y-4 text-left text-sm">
          {storyChainLandingContent.ownership.points.map((point, i) => (
            <motion.li
              key={point}
              {...scrollReveal.list(i)}
              className="flex items-start gap-3 font-medium"
            >
              <motion.span
                className="bg-brand-blue -shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full"
                whileInView={{ scale: [0, 1.5, 1] }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              />
              {point}
            </motion.li>
          ))}
        </ul>

        <motion.div {...scrollReveal.paragraph}>
          <motion.button
            className="group bg-brand-blue mx-auto flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {storyChainLandingContent.ownership.cta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
