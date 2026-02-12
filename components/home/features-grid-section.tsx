'use client';

import { motion } from 'framer-motion';
import { GitBranch, Users, MessageCircle, Zap, Shield, Layers } from 'lucide-react';
import { storyChainLandingContent } from '@/constants';

export const FeaturesGridSection = () => {
  const features = [
    {
      icon: GitBranch,
      title: 'Infinite Branching',
      description: 'Let your story split into countless paths. Every choice creates a new reality.',
      color: 'var(--brand-blue)',
    },
    {
      icon: Users,
      title: 'Collaborative Writing',
      description: 'Invite co-authors into your world. Write together in real-time harmony.',
      color: 'var(--brand-pink-500)',
    },
    {
      icon: MessageCircle,
      title: 'Inline Comments',
      description: 'Discuss moments within the story. Let feedback flow naturally.',
      color: 'var(--brand-orange)',
    },
    {
      icon: Layers,
      title: 'Version History',
      description: "Every revision is remembered. Return to any moment in your story's past.",
      color: '#8b5cf6',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: "See changes as they happen. Stay connected to your story's heartbeat.",
      color: '#f59e0b',
    },
    {
      icon: Shield,
      title: 'Your Story, Your Rules',
      description: 'Control who reads, who writes, and how far your branches grow.',
      color: '#10b981',
    },
  ];

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
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
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
                <div className="relative z-10 flex h-full min-h-[120px] flex-col sm:min-h-[140px] lg:min-h-[160px]">
                  {/* Icon & Title - centered */}
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <motion.div
                      className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg sm:mb-4 sm:h-12 sm:w-12 sm:rounded-xl"
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
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-10 sm:rounded-2xl"
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
