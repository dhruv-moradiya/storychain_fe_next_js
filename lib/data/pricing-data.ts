import type { FAQ, Plan, PlanFeature } from '@/type/pricing';
import { BookOpen, Crown, Zap } from 'lucide-react';

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started with storytelling',
    monthlyPriceINR: 0,
    yearlyPriceINR: 0,
    monthlyPriceUSD: 0,
    yearlyPriceUSD: 0,
    icon: BookOpen,
    color: 'text-text-secondary-65',
    bgColor: 'bg-muted/30',
    borderColor: 'border-border/50',
    features: [
      '3 Stories',
      '10 Chapters per Story',
      '5 Branches/month',
      '2 Collaborators',
      'Basic Analytics',
      'Community Support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious writers and small teams',
    monthlyPriceINR: 79900,
    yearlyPriceINR: 767000,
    monthlyPriceUSD: 999,
    yearlyPriceUSD: 9590,
    icon: Zap,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/5',
    borderColor: 'border-brand-blue/30',
    highlighted: true,
    features: [
      '15 Stories',
      '50 Chapters per Story',
      '25 Branches/month',
      '10 Collaborators',
      'AI Writing Assistance (Basic)',
      'Advanced Analytics',
      'PDF Export',
      '3 Custom Badges',
      'Ad-Free Experience',
      'Email Support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlimited power for professional creators',
    monthlyPriceINR: 149900,
    yearlyPriceINR: 1439000,
    monthlyPriceUSD: 1999,
    yearlyPriceUSD: 19190,
    icon: Crown,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/5',
    borderColor: 'border-brand-orange/30',
    features: [
      'Unlimited Stories',
      'Unlimited Chapters',
      'Unlimited Branches',
      'Unlimited Collaborators',
      'AI Writing Assistance (Advanced)',
      'Premium Analytics',
      'All Export Formats',
      'Unlimited Custom Badges',
      'Ad-Free Experience',
      '24/7 Priority Support',
    ],
  },
];

export const featureComparison: PlanFeature[] = [
  { name: 'Stories Created', free: '3', pro: '15', premium: 'Unlimited' },
  { name: 'Chapters per Story', free: '10', pro: '50', premium: 'Unlimited' },
  { name: 'Branch Creation', free: '5/month', pro: '25/month', premium: 'Unlimited' },
  { name: 'Collaborators', free: '2', pro: '10', premium: 'Unlimited' },
  { name: 'AI Writing Assistance', free: false, pro: 'Basic', premium: 'Advanced' },
  { name: 'Analytics Dashboard', free: 'Basic', pro: 'Advanced', premium: 'Premium' },
  { name: 'Export Options', free: false, pro: 'PDF', premium: 'All Formats' },
  { name: 'Custom Badges', free: false, pro: '3', premium: 'Unlimited' },
  { name: 'Ad-Free Experience', free: false, pro: true, premium: true },
  { name: 'Priority Support', free: false, pro: 'Email', premium: '24/7 Chat' },
];

export const faqs: FAQ[] = [
  {
    question: 'What are coins and how do they work?',
    answer:
      "Coins are StoryChain's in-app currency. You can purchase them in USD ($) or INR (₹) and spend them across the platform — unlock premium chapters, create story pools, use AI tools, boost story visibility, and more. Coins never expire and are credited instantly to your wallet.",
  },
  {
    question: 'How does chapter purchase revenue & the Story Pool work?',
    answer:
      'Whenever a reader purchases or unlocks a chapter, 20% covers platform fees (infrastructure, hosting, AI models & security) and 80% is added directly into the story pool. The Story Owner then determines how many coins to distribute from the pool to each contributor role.',
  },
  {
    question: 'Who designs how coins are distributed in a Story Pool?',
    answer:
      'The Story Owner holds full control: they design how many coins each role (Authors, Co-Authors, Collaborators, Reviewers, and Moderators) receives from the 80% Story Pool in their Story Dashboard.',
  },
  {
    question: 'How do contributors earn coins from a story?',
    answer:
      'Contributors (co-authors, reviewers, illustrators, and branch creators) earn coins directly from the 80% Story Pool according to the coin distribution rates configured by the Story Owner whenever chapters are published & unlocked.',
  },
  {
    question: 'Can Story Owners adjust coin distribution rates later?',
    answer:
      'Yes! Story Owners can update their story pool allocation settings and role coin reward rates in the Story Dashboard at any time before publishing new chapters or milestones.',
  },
  {
    question: 'What payment methods and currencies are supported?',
    answer:
      'We support payments in both USD ($) and INR (₹). You can pay via credit/debit cards, UPI, net banking, Paytm, Google Pay, and international cards — powered securely by Razorpay.',
  },
  {
    question: 'Do coins in the Story Pool or wallet expire?',
    answer:
      'No. Coins in user wallets and funded Story Pools never expire. They stay safely allocated until earned by contributors or spent on platform features.',
  },
  {
    question: 'Can I use AI features with coins?',
    answer:
      'Yes. AI Voice Narration, AI Writing Assist, and AI Story Cover generation can be used with coins on a pay-per-use basis — no monthly subscription required.',
  },
];
