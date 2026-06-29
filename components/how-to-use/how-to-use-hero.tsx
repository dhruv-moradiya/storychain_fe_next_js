'use client';

import { motion } from 'framer-motion';
import { BookOpen, MapPin, Sparkles, Users, Zap } from 'lucide-react';

import { fadeIn } from '@/lib/utils';

const sections = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'collaboration', label: 'Collaboration & Roles' },
  { id: 'monetization', label: 'In-App Monetization' },
  { id: 'distribution', label: 'Revenue Distribution' },
  { id: 'writing-editing', label: 'Writing & Editing' },
  { id: 'reading', label: 'Reading Experience' },
  { id: 'profile-settings', label: 'Profile & Settings' },
  { id: 'faq', label: 'FAQ' },
];

const stats = [
  { icon: BookOpen, color: 'text-brand-blue', bg: 'bg-brand-blue/10', text: 'Complete guide' },
  {
    icon: Sparkles,
    color: 'text-brand-pink-500',
    bg: 'bg-brand-pink-500/10',
    text: 'Beginner friendly',
  },
  { icon: Users, color: 'text-brand-orange', bg: 'bg-brand-orange/10', text: '8 sections' },
  { icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10', text: '~10 min read' },
];

export function HowToUseHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-12">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.28, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-24 right-1/4 h-60 w-60 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--brand-orange) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          {...fadeIn(0.1)}
          className="border-brand-blue/20 bg-brand-blue/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
        >
          <MapPin className="text-brand-blue h-4 w-4" />
          <span className="text-brand-blue text-sm font-medium">App Guide & Documentation</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeIn(0.2)}
          className="font-libre-baskerville text-text-tertiary mb-5 text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          How StoryChain
          <br />
          <span className="text-brand-blue">Actually Works</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeIn(0.3)}
          className="text-text-secondary-65 mx-auto mb-10 max-w-2xl text-base leading-relaxed"
        >
          A complete guide to creating stories, collaborating with others, earning from your
          writing, and discovering content — everything you need to get the most out of StoryChain.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          {...fadeIn(0.35)}
          className="mb-10 flex flex-wrap items-center justify-center gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.text}
              {...fadeIn(0.4 + index * 0.05)}
              className="text-text-secondary-65 flex items-center gap-2"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <span className="text-sm">{stat.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Section quick-jump pills */}
        <motion.div {...fadeIn(0.5)} className="flex flex-wrap justify-center gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="border-border/50 text-text-secondary-65 hover:border-brand-blue/40 hover:text-brand-blue hover:bg-brand-blue/5 cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200"
            >
              {s.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
