'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';

export const CreatorToolsSection = () => {
  return (
    <section className="bg-bg-cream relative z-10 px-6 pt-10 pb-16 sm:pt-20 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20"
        style={{
          background: 'linear-gradient(to bottom, var(--cream-80), transparent)',
        }}
      />
      <div className="mx-auto max-w-6xl text-center">
        {/* Image - hidden on mobile */}
        <motion.div {...scrollReveal.image} className="mb-16 hidden justify-center sm:flex">
          <Image
            src={storyChainLandingContent.creatorTools.imageUrl.url}
            alt={storyChainLandingContent.creatorTools.imageUrl.alt}
            width={400}
            height={240}
            className="h-[240px] w-auto"
          />
        </motion.div>

        <motion.span
          {...scrollReveal.paragraph}
          className="font-yellowtail mb-4 block text-lg text-pink-500"
        >
          {storyChainLandingContent.creatorTools.eyebrow}
        </motion.span>

        <motion.h2
          {...scrollReveal.heading}
          className="font-libre-baskerville text-text-tertiary mb-8 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
        >
          {storyChainLandingContent.creatorTools.title.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </motion.h2>

        <motion.p
          {...scrollReveal.paragraph}
          className="text-text-secondary-70 font-ibm-plex-mono mx-auto mb-20 max-w-xl text-sm leading-[1.85]"
        >
          {storyChainLandingContent.creatorTools.description}
        </motion.p>

        {/* App Grid - Light Cards with Corner Crosses */}
        <div className="mx-auto mb-20 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {storyChainLandingContent.captain.apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Light Card */}
              <div className="relative h-full overflow-hidden rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-500 group-hover:border-black/10 group-hover:shadow-lg sm:rounded-2xl sm:p-6 lg:p-8">
                {/* Corner Crosses - hidden on mobile */}
                <div className="absolute top-3 left-3 hidden h-3 w-3 sm:top-4 sm:left-4 sm:block">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>
                <div className="absolute top-3 right-3 hidden h-3 w-3 sm:top-4 sm:right-4 sm:block">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>
                <div className="absolute bottom-3 left-3 hidden h-3 w-3 sm:bottom-4 sm:left-4 sm:block">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>
                <div className="absolute right-3 bottom-3 hidden h-3 w-3 sm:right-4 sm:bottom-4 sm:block">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full min-h-[120px] flex-col sm:min-h-[160px] lg:min-h-[200px]">
                  {/* Title - centered */}
                  <div className="flex flex-1 items-center justify-center">
                    <motion.h3
                      className="font-libre-baskerville text-text-tertiary text-base font-semibold tracking-tight sm:text-lg lg:text-xl"
                      whileHover={{ scale: 1.03 }}
                    >
                      {app.name}
                    </motion.h3>
                  </div>

                  {/* Bottom content */}
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-text-secondary-65 font-ibm-plex-mono line-clamp-2 text-[10px] leading-relaxed sm:line-clamp-none sm:text-xs lg:text-sm lg:leading-loose">
                      {app.description}
                    </p>
                    {/* Additional content for laptop */}
                    <p className="text-text-secondary-50 font-ibm-plex-mono hidden text-xs leading-relaxed lg:block">
                      Click to discover more features and capabilities.
                    </p>
                    <motion.button
                      className="text-text-secondary-75 inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-1 text-[10px] font-medium transition-all sm:px-4 sm:py-1.5 sm:text-xs"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: 'rgba(0,0,0,0.03)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explore
                      <ArrowRight size={12} className="hidden sm:inline-block" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-10 sm:rounded-2xl"
                  style={{ background: app.gradient }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...scrollReveal.paragraph}>
          <motion.button
            className="group bg-brand-pink-500 flex items-center gap-2 rounded-[6px] px-7 py-2.5 text-sm font-medium text-white shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {storyChainLandingContent.creatorTools.cta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
