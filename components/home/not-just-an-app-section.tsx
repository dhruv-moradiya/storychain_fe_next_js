'use client';

import { motion } from 'framer-motion';
import { BookOpen, Sparkles, GitBranch, Users } from 'lucide-react';
import { storyChainLandingContent } from '@/constants';
import { scrollReveal } from '@/lib/utils';

export const NotJustAnAppSection = () => {
  return (
    <section className="bg-bg-cream relative z-10 px-6 pt-6 pb-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[20px] px-4 py-12 shadow-sm backdrop-blur-sm sm:rounded-[28px] sm:px-6 sm:py-24">
          {/* <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(0,0,0,0.03)_1px,_transparent_1px)] [background-size:24px_24px] opacity-60" /> */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              background:
                'linear-gradient(to bottom, var(--cream-20), transparent, var(--cream-20))',
            }}
          />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.span
              {...scrollReveal.paragraph}
              className="font-yellowtail text-brand-pink-500 mb-5 block text-lg"
            >
              {storyChainLandingContent.notJustAnApp.smallTitle}
            </motion.span>

            <motion.h2
              {...scrollReveal.heading}
              className="font-libre-baskerville text-text-tertiary mb-12 text-3xl leading-[1.2] tracking-tight sm:text-4xl"
            >
              {storyChainLandingContent.notJustAnApp.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </motion.h2>

            <motion.p
              {...scrollReveal.paragraph}
              className="text-text-secondary-70 font-ibm-plex-mono mx-auto mb-12 max-w-xl text-sm leading-[1.85]"
            >
              {storyChainLandingContent.notJustAnApp.description}
            </motion.p>

            {/* Icon row with connecting line */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
              className="relative flex justify-center gap-6"
            >
              {/* Connecting line behind icons */}
              <motion.div
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: {
                    scaleX: 1,
                    opacity: 1,
                    transition: { duration: 0.8, ease: 'easeOut' },
                  },
                }}
                className="absolute top-1/2 right-1/4 left-1/4 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-black/10 to-transparent"
              />

              {[
                { Icon: BookOpen, gradient: 'from-brand-orange to-brand-pink-500' },
                { Icon: Sparkles, gradient: 'from-brand-blue to-brand-pink-400' },
                { Icon: GitBranch, gradient: 'from-brand-pink-500 to-brand-pink-600' },
                { Icon: Users, gradient: 'from-text-tertiary to-text-secondary' },
              ].map(({ Icon, gradient }, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 20 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      },
                    },
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2, // Offset floating for each icon
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${gradient} shadow-brand-pink-shadow25 shadow-sm ring-1 ring-black/5`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
