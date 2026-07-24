'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookCheck,
  Coins,
  FileText,
  Gavel,
  GitFork,
  Globe,
  Scale,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';

const termsSections = [
  {
    id: 'acceptance',
    number: '01',
    title: 'Acceptance of Terms',
    icon: Scale,
    content: [
      'By accessing, registering for, or using StoryChain ("Platform", "we", "us", or "our"), you confirm that you have read, understood, and agree to be legally bound by these Terms and Conditions.',
      'Eligibility: You must be at least 13 years of age (or the minimum legal age required in your country) to create an account and use StoryChain. Authentication and identity management are securely handled via Clerk.',
      'If you do not agree with any portion of these terms, you must refrain from accessing or using our services.',
    ],
  },
  {
    id: 'accounts',
    number: '02',
    title: 'User Accounts & Security',
    icon: UserCheck,
    content: [
      'Account Integrity: You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      'Accuracy of Information: You agree to provide accurate, current, and complete information during registration and keep your profile details updated.',
      'Unauthorized Use: You must notify StoryChain immediately of any breach of security or unauthorized access to your account. StoryChain will not be liable for losses caused by unauthorized account usage.',
    ],
  },
  {
    id: 'intellectual-property',
    number: '03',
    title: 'Intellectual Property & Content Ownership',
    icon: BookCheck,
    content: [
      'Creator Ownership: You retain full copyright ownership of the original text, characters, world-building, and plot concepts you create and publish on StoryChain.',
      'Platform License Grant: By publishing content on StoryChain, you grant us a worldwide, non-exclusive, royalty-free license to host, store, reformat, index, display, and distribute your content across our platform, mobile interfaces, and promotional channels.',
      'Co-Authoring License: When you contribute a chapter or branch to a collaborative story, you grant fellow co-authors and future branch contributors a perpetual, non-exclusive license to extend the narrative tree within StoryChain.',
    ],
  },
  {
    id: 'collaborative-branching',
    number: '04',
    title: 'Collaborative Story Branching & Tree Governance',
    icon: GitFork,
    content: [
      'Branching Mechanics: StoryChain enables interactive multi-author story trees. Creators can branch off existing chapters to craft alternate paths, continuations, or character perspectives.',
      'Canonical Status: Primary story owners reserve the right to designate official canonical branches while secondary branches remain accessible as alternate storylines.',
      'Attribution Guarantee: Platform records automatically log author contributions for every chapter segment. Modifying, obscuring, or falsifying co-author attribution is strictly prohibited.',
    ],
  },
  {
    id: 'coins-economy',
    number: '05',
    title: 'StoryChain Coins & Virtual Economy',
    icon: Coins,
    content: [
      'Virtual Currency: StoryChain Coins are virtual tokens used within our ecosystem. Coins carry no real-world monetary value outside the Platform, cannot be transferred between accounts, and do not constitute personal property.',
      'Paid Unlocks: Readers may use coins to unlock premium chapters. Unlocking grants perpetual, non-exclusive reading access to the specified chapter on your account.',
      'Creator Monetization & Payouts: Eligible creators who earn coins from unlocked chapters may request financial payouts subject to identity verification, minimum payout thresholds, and payment gateway processing fees.',
      'Refund Policy: All coin purchases and chapter unlocks are final and non-refundable, except where required by applicable consumer protection laws.',
    ],
  },
  {
    id: 'prohibited-conduct',
    number: '06',
    title: 'Prohibited Conduct & Misuse',
    icon: ShieldAlert,
    content: [
      'Platform Abuse: You agree not to engage in automated web scraping, reverse engineering, DDoS attacks, or exploiting system bugs to inflate coin balances or view metrics.',
      'Content Policy Violation: Publishing plagiarized material, hate speech, explicit non-consensual content, or malware will result in immediate content removal.',
      'Fraudulent Activity: Any attempt to manipulate payout systems or initiate fraudulent chargebacks will result in permanent account termination and forfeiture of coin balances.',
    ],
  },
  {
    id: 'disclaimers-liability',
    number: '07',
    title: 'Disclaimers & Limitation of Liability',
    icon: Gavel,
    content: [
      'Provided "As-Is": StoryChain is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including fitness for a particular purpose or uptime availability.',
      'No Financial Guarantee: StoryChain does not guarantee specific earnings or reader engagement levels from story monetization.',
      'Liability Cap: Under no circumstances shall StoryChain, its operators, or affiliates be liable for indirect, incidental, punitive, or consequential damages resulting from your use of the Platform.',
    ],
  },
  {
    id: 'modifications-law',
    number: '08',
    title: 'Modifications to Terms & Jurisdiction',
    icon: Globe,
    content: [
      'Updates to Terms: We reserve the right to revise these Terms and Conditions at any time. Notice of material changes will be published on the Platform.',
      'Continued Use: Your continued use of StoryChain following posted revisions constitutes your acceptance of the updated terms.',
      'Governing Law: These Terms are governed by and construed in accordance with applicable laws, without regard to conflict of law principles.',
    ],
  },
  {
    id: 'contact',
    number: '09',
    title: 'Legal Contact & Notices',
    icon: FileText,
    content: [
      'DMCA & Copyright Takedowns: If you believe your copyrighted work has been infringed on StoryChain, submit a formal DMCA notice to legal@storychain.app.',
      'General Enquiries: For questions regarding these Terms and Conditions, please contact our legal compliance team at legal@storychain.app.',
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

export function TermsAndConditionsContent() {
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
          <div className="font-ibm-plex-mono text-brand-blue inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
            <Scale className="h-3.5 w-3.5" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="font-libre-baskerville text-text-primary text-3xl leading-[1.15] font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Terms & Conditions
          </h1>

          <p className="font-reading text-text-secondary-75 text-base leading-relaxed font-normal sm:text-lg">
            These Terms and Conditions govern your access to and use of StoryChain, including our
            collaborative story branching tools, coin economy, and reader services. Please read them
            carefully before using our platform.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span className="font-ibm-plex-mono text-text-secondary-50 tracking-wide">
              Last updated: July 2026
            </span>
            <span className="text-border/40">•</span>
            <span className="font-ibm-plex-mono text-text-secondary-50 tracking-wide">
              6 min read
            </span>
          </div>

          <div className="border-border/30 border-t pt-4" />
        </motion.header>

        {/* Terms Text Sections */}
        <main className="space-y-14">
          {termsSections.map((section) => {
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
                  <span className="font-ibm-plex-mono text-brand-blue text-sm font-semibold">
                    {section.number}
                  </span>
                  <div className="bg-brand-blue/30 h-3.5 w-[1px]" />
                  <Icon className="text-brand-blue h-4 w-4" />
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
              By continuing to explore and create on StoryChain, you agree to uphold these terms and
              foster a safe, fair community for all storytellers.
            </p>
            <p className="font-reading text-text-secondary-65 text-xs leading-relaxed sm:text-sm">
              If you have any questions regarding these Terms & Conditions, please contact us at{' '}
              <a
                href="mailto:legal@storychain.app"
                className="text-brand-blue font-medium hover:underline"
              >
                legal@storychain.app
              </a>
              .
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}
