'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  GitBranch,
  Users,
  Sparkles,
  MessageCircle,
  Feather,
} from 'lucide-react';
import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';
import { FloatingParticles } from './floating-particles';

export const DarkCtaSection = () => {
  return (
    <section className="bg-bg-dark relative z-10 overflow-hidden py-16 sm:py-32">
      {/* Animated gradient mesh background - simplified on mobile */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary gradient orb - smaller on mobile */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-[250px] w-[250px] rounded-full blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(107, 124, 255, 0.19))',
          }}
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary gradient orb - hidden on mobile */}
        <motion.div
          className="absolute right-1/4 bottom-1/4 hidden h-[400px] w-[400px] rounded-full blur-[100px] sm:block"
          style={{
            background:
              'linear-gradient(225deg, rgba(107, 124, 255, 0.22), rgba(244, 114, 182, 0.16))',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Accent orb - smaller on mobile */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] sm:h-[300px] sm:w-[300px] sm:blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.13), transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid pattern overlay - hidden on mobile */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.03] sm:block"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles - fewer on mobile */}
      <div className="hidden sm:block">
        <FloatingParticles count={25} color="rgba(255,255,255,0.12)" />
      </div>
      <div className="sm:hidden">
        <FloatingParticles count={10} color="rgba(255,255,255,0.12)" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Decorative Story Branch Visualization - simplified on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center sm:mb-16"
        >
          <div className="relative h-[140px] w-full max-w-xs sm:h-[200px] sm:max-w-lg">
            {/* Central node - the story */}
            <motion.div
              className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl shadow-2xl sm:h-20 sm:w-20 sm:rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--brand-pink-500), var(--brand-blue))',
                  boxShadow:
                    '0 0 40px rgba(236, 72, 153, 0.31), 0 0 60px rgba(107, 124, 255, 0.19)',
                }}
              >
                <BookOpen className="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
            </motion.div>

            {/* Orbiting branch nodes - fewer on mobile, show only 3 */}
            {[
              {
                Icon: GitBranch,
                angle: 0,
                delay: 0,
                size: 'h-9 w-9 sm:h-12 sm:w-12',
                iconSize: 'h-4 w-4 sm:h-5 sm:w-5',
                showOnMobile: true,
              },
              {
                Icon: Users,
                angle: 72,
                delay: 0.5,
                size: 'h-8 w-8 sm:h-10 sm:w-10',
                iconSize: 'h-3 w-3 sm:h-4 sm:w-4',
                showOnMobile: false,
              },
              {
                Icon: Sparkles,
                angle: 144,
                delay: 1,
                size: 'h-8 w-8 sm:h-11 sm:w-11',
                iconSize: 'h-3 w-3 sm:h-4 sm:w-4',
                showOnMobile: true,
              },
              {
                Icon: MessageCircle,
                angle: 216,
                delay: 1.5,
                size: 'h-8 w-8 sm:h-10 sm:w-10',
                iconSize: 'h-3 w-3 sm:h-4 sm:w-4',
                showOnMobile: false,
              },
              {
                Icon: Feather,
                angle: 288,
                delay: 2,
                size: 'h-9 w-9 sm:h-12 sm:w-12',
                iconSize: 'h-4 w-4 sm:h-5 sm:w-5',
                showOnMobile: true,
              },
            ].map(({ Icon, angle, delay, size, iconSize, showOnMobile }, i) => (
              <motion.div
                key={i}
                className={`absolute top-1/2 left-1/2 ${!showOnMobile ? 'hidden sm:block' : ''}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: delay }}
              >
                {/* Connecting line */}
                <motion.div
                  className="absolute top-1/2 left-1/2 h-px origin-left"
                  style={{
                    width: '50px',
                    background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.38), transparent)',
                    transform: `rotate(${angle}deg)`,
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: delay }}
                />
                {/* Node */}
                <motion.div
                  className={`absolute ${size} flex items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm sm:rounded-xl`}
                  style={{
                    left: `${Math.cos((angle * Math.PI) / 180) * 60}px`,
                    top: `${Math.sin((angle * Math.PI) / 180) * 60}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: delay, ease: 'easeInOut' }}
                >
                  <Icon className={`${iconSize} text-white/70`} />
                </motion.div>
              </motion.div>
            ))}

            {/* Pulsing ring effect - smaller on mobile */}
            <motion.div
              className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-32 sm:w-32"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:block"
              animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="text-center">
          <motion.span
            {...scrollReveal.paragraph}
            className="font-yellowtail text-brand-pink-400 mb-3 block text-lg sm:mb-4 sm:text-xl"
          >
            {storyChainLandingContent.darkCta.eyebrow}
          </motion.span>

          <motion.h2
            {...scrollReveal.heading}
            className="font-libre-baskerville text-text-light mb-4 text-2xl leading-[1.15] tracking-tight sm:mb-6 sm:text-4xl lg:text-5xl"
          >
            {storyChainLandingContent.darkCta.title.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.h2>

          <motion.p
            {...scrollReveal.paragraph}
            className="font-ibm-plex-mono mx-auto mb-8 max-w-xl text-xs leading-[1.9] text-white/60 sm:mb-12 sm:text-sm"
          >
            {storyChainLandingContent.darkCta.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...scrollReveal.paragraph}
            className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
          >
            <motion.button
              className="group flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-lg sm:w-auto sm:px-8 sm:py-3"
              style={{
                background: 'linear-gradient(135deg, var(--brand-pink-500), var(--brand-pink-600))',
                boxShadow: '0 10px 40px -10px rgba(236, 72, 153, 0.5)',
              }}
              whileHover={{
                scale: 1.03,
                y: -3,
                boxShadow: '0 20px 50px -10px rgba(236, 72, 153, 0.56)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {storyChainLandingContent.darkCta.primaryCta}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 backdrop-blur-sm sm:w-auto sm:px-7 sm:py-3"
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {storyChainLandingContent.darkCta.secondaryCta}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
