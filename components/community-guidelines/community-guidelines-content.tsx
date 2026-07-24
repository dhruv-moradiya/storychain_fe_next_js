'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Coins,
  FileCheck,
  HeartHandshake,
  MessageSquareWarning,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';

const guidelinesSections = [
  {
    id: 'respectful-collaboration',
    number: '01',
    title: 'Respectful Collaboration & Co-Authorship',
    icon: Users,
    content: [
      'StoryChain is built on collaborative storytelling. Every branch, character, and plot development represents a shared creative effort between writers.',
      'Respect canonical branches: When branching off another author’s storyline, honor the core world-building, tone, and character dynamics established in prior chapters unless writing an explicitly tagged alternate universe (AU).',
      'Constructive feedback: Maintain a supportive and constructive tone in pull requests, branch suggestions, and author comments. Avoid derogatory comments or malicious edits aimed at sabotaging another writer’s narrative.',
    ],
  },
  {
    id: 'content-standards',
    number: '02',
    title: 'Content Standards & Safety',
    icon: Shield,
    content: [
      'We support freedom of creative expression across diverse genres, but creative expression must operate within safe community standards.',
      'Mandatory Content Warnings: Chapters containing mature themes, intense violence, graphic descriptions, or sensitive topics must be explicitly tagged with appropriate Content Warnings (CW) or NSFW flags before publishing.',
      'Prohibited Content: Harassment, hate speech targeting protected groups, non-consensual explicit content, doxxing, self-harm encouragement, or promotion of illegal activities will lead to immediate removal and permanent account suspension.',
    ],
  },
  {
    id: 'originality-ip',
    number: '03',
    title: 'Originality & Intellectual Property',
    icon: FileCheck,
    content: [
      'Publish work that belongs to you. Plagiarism—whether copying published books, digital stories, or another user’s uncredited writing—is strictly forbidden on StoryChain.',
      'Shared Credits: When co-authoring a story chain, proper attribution is automatically logged by our platform. Altering co-author credits or claiming sole ownership of a joint story chain is prohibited.',
      'Fan Fiction & Derivative Works: Fan fiction is allowed provided it complies with public fair use standards and does not infringe on registered commercial trademarks or proprietary assets.',
    ],
  },
  {
    id: 'monetization-integrity',
    number: '04',
    title: 'Monetization & Coin Integrity',
    icon: Coins,
    content: [
      'StoryChain allows creators to monetize premium chapters through reader coin unlocks. We maintain strict standards of economic fairness.',
      'No Coin Manipulation: Any attempt to exploit system vulnerabilities, automate fake reader views, or manipulate coin payouts will result in account forfeiture and payout cancellation.',
      'Honest Value: Paid chapters should deliver genuine narrative value. Intentionally publishing empty, repetitive, or clickbait chapters behind coin paywalls is considered a violation of reader trust.',
    ],
  },
  {
    id: 'community-interactions',
    number: '05',
    title: 'Community Interaction & Reviews',
    icon: HeartHandshake,
    content: [
      'Reader reviews and chapter discussions are vital for writer growth. Keep reviews honest, thoughtful, and respectful.',
      'Zero Spam: Spamming story comment sections, self-promoting unrelated services, or flooding author feeds with unsolicited links is prohibited.',
      'Civil Discourse: Debating story arcs and character decisions is welcomed, but keep debates focused on the fiction—never make personal attacks on fellow community members.',
    ],
  },
  {
    id: 'enforcement-reporting',
    number: '06',
    title: 'Enforcement & Reporting Process',
    icon: MessageSquareWarning,
    content: [
      'Reporting Violations: If you encounter a chapter, comment, or user violating these guidelines, use the "Report" option available on every chapter page or contact our moderation team.',
      'Fair Review & Appeals: Our moderation team reviews every report impartially. If your content receives a warning or action, you may submit an appeal via your moderator appeal dashboard.',
      'Graduated Enforcement: Violations result in actions ranging from content warnings and mandatory edits to story removal, coin forfeiture, or permanent account ban depending on severity.',
    ],
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: customDelay },
  }),
};

export function CommunityGuidelinesContent() {
  return (
    <div className="bg-bg-cream min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* Back Link */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          custom={0}
          className="mb-8"
        >
          <Link
            href="/"
            className="text-text-secondary-65 hover:text-text-primary inline-flex items-center gap-2 font-sans text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          custom={0.1}
          className="mb-14 space-y-4"
        >
          <div className="font-ibm-plex-mono text-brand-pink-500 inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>StoryChain Safety & Ethics</span>
          </div>

          <h1 className="font-libre-baskerville text-text-primary text-3xl leading-[1.15] font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Community Guidelines
          </h1>

          <p className="font-reading text-text-secondary-75 text-base leading-relaxed font-normal sm:text-lg">
            Welcome to StoryChain. Our platform thrives when storytellers and readers collaborate
            with respect, creativity, and trust. These guidelines outline how we protect our
            community and foster a sanctuary for imaginative storytelling.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span className="font-ibm-plex-mono text-text-secondary-50 tracking-wide">
              Last updated: July 2026
            </span>
            <span className="text-border/40">•</span>
            <span className="font-ibm-plex-mono text-text-secondary-50 tracking-wide">
              4 min read
            </span>
          </div>

          <div className="border-border/30 border-t pt-4" />
        </motion.header>

        {/* Guidelines Text Sections */}
        <main className="space-y-14">
          {guidelinesSections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUpVariant}
                custom={0.05}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-ibm-plex-mono text-brand-pink-500 text-sm font-semibold">
                    {section.number}
                  </span>
                  <div className="bg-brand-pink-500/30 h-3.5 w-[1px]" />
                  <Icon className="text-brand-pink-500 h-4 w-4" />
                  <h2 className="font-libre-baskerville text-text-primary text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-3.5 pl-7">
                  {section.content.map((paragraph, pIdx) => (
                    <motion.p
                      key={pIdx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-20px' }}
                      variants={fadeUpVariant}
                      custom={0.05 + pIdx * 0.04}
                      className="font-reading text-text-secondary-75 text-sm leading-relaxed font-normal sm:text-base"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </motion.section>
            );
          })}

          {/* Closing Statement */}
          <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            variants={fadeUpVariant}
            custom={0.1}
            className="border-border/30 space-y-4 border-t pt-10"
          >
            <p className="text-text-primary font-serif text-base leading-relaxed font-medium italic sm:text-lg">
              Thank you for being a vital part of StoryChain. Together, we are crafting stories that
              connect, inspire, and endure across generations.
            </p>
            <p className="font-reading text-text-secondary-65 text-xs leading-relaxed sm:text-sm">
              Have questions or concerns about these guidelines? Reach out to our community support
              team at{' '}
              <a
                href="mailto:support@storychain.app"
                className="text-brand-pink-500 font-medium hover:underline"
              >
                support@storychain.app
              </a>
              .
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}
