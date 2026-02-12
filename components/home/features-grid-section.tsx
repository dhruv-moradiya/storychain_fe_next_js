'use client';

import { storyChainLandingContent } from '@/constants';
import { features } from '@/constants/content/home/features';
import { motion } from 'framer-motion';

export const FeaturesGridSection = () => {
  return (
    <section className="bg-bg-cream relative z-10 px-6 py-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.span className="font-yellowtail text-brand-blue mb-4 block text-lg">
            Everything you need
          </motion.span>
          <h2 className="font-libre-baskerville text-text-tertiary text-3xl leading-tight tracking-tight sm:text-4xl">
            {storyChainLandingContent.features.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </h2>
        </motion.div>

        {/* Features Row - Cards with Corner Crosses */}
        <div className="grid grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Light Card with Corner Crosses */}
              <div className="relative h-full border p-4 shadow-sm transition-all duration-500 group-hover:border-black/10 group-hover:shadow-lg">
                {/* Corner Crosses - hidden on mobile */}
                {/* Top Left */}
                <div className="absolute top-0 left-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>

                {/* Top Right */}
                <div className="absolute top-0 right-0 h-4 w-4 translate-x-1/2 -translate-y-1/2">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>

                {/* Bottom Left */}
                <div className="absolute bottom-0 left-0 h-4 w-4 -translate-x-1/2 translate-y-1/2">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>

                {/* Bottom Right */}
                <div className="absolute right-0 bottom-0 h-4 w-4 translate-x-1/2 translate-y-1/2">
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-black/20" />
                  <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-black/20" />
                </div>
                {/* Content */}
                <div className="relative z-10 flex h-full min-h-[120px] flex-col sm:min-h-[140px] lg:min-h-[160px]">
                  {/* Icon & Title - centered */}
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <motion.div
                      className="mb-2 flex h-9 w-9 items-center justify-center sm:mb-4 sm:h-12 sm:w-12"
                      style={{ backgroundColor: `${feature.color}12` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon
                        className="h-4 w-4 sm:h-6 sm:w-6"
                        style={{ color: feature.color }}
                      />
                    </motion.div>
                    <motion.h3
                      className="font-libre-baskerville text-text-tertiary text-sm font-semibold tracking-tight sm:text-base lg:text-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      {feature.title}
                    </motion.h3>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary-65 font-ibm-plex-mono line-clamp-2 text-center text-[10px] leading-relaxed sm:line-clamp-none sm:text-xs">
                    {feature.description}
                  </p>
                </div>

                {/* Hover gradient effect */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                  style={{ background: `linear-gradient(135deg, ${feature.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
