'use client';

import { motion } from 'framer-motion';
import {
  Quote,
  Sparkles,
  PenTool,
  Keyboard,
  Users,
  Feather,
  ArrowRight,
  Heart,
  Map,
  MessageCircle,
  Eye,
  Palette,
  Wand2,
  Globe,
  Theater,
  Zap,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { cn, scrollReveal } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Story craft categories with unique content
const storyCraftSections = [
  {
    id: 'character',
    icon: Users,
    title: 'Character Mastery',
    subtitle: 'Breathe life into your characters',
    color: 'brand-pink-500',
    tips: [
      {
        title: 'The Flaw That Defines',
        description:
          "Every memorable character has a flaw that drives their arc. The hero's weakness creates their journey.",
        quote: 'A perfect hero is a forgotten hero.',
      },
      {
        title: 'Desire vs. Need',
        description:
          'What your character wants vs. what they truly need creates the tension that propels your story.',
        quote: 'We chase what we want, we find what we need.',
      },
      {
        title: 'Voice Through Action',
        description:
          'How a character enters a room, picks up a cup, or responds to silence—these reveal more than dialogue.',
        quote: 'Actions paint the soul.',
      },
    ],
  },
  {
    id: 'world',
    icon: Map,
    title: 'World Building',
    subtitle: 'Craft immersive realms',
    color: 'brand-blue',
    tips: [
      {
        title: 'The Iceberg Principle',
        description:
          'Show 10% of your world, know 100%. Readers sense the depth beneath the surface.',
        quote: 'Not everything must be written to exist.',
      },
      {
        title: 'Sensory Anchors',
        description:
          'Ground your world in specific sensory details—the smell of rain on cobblestones, the taste of copper in the air.',
        quote: 'Details create magic.',
      },
      {
        title: 'Rules and Consequences',
        description:
          'Every world has rules. Magic, technology, society—establish them early, then explore their consequences.',
        quote: 'Every world has its laws.',
      },
    ],
  },
  {
    id: 'dialogue',
    icon: MessageCircle,
    title: 'Dialogue Craft',
    subtitle: 'Make conversations sing',
    color: 'brand-orange',
    tips: [
      {
        title: 'Subtext is Everything',
        description:
          "What characters don't say is often more powerful than what they do. Let silence carry weight.",
        quote: 'The unsaid speaks loudest.',
      },
      {
        title: 'Unique Rhythms',
        description:
          'Each character should have their own speech patterns. Close your eyes—can you tell who is speaking?',
        quote: 'Every voice is a world.',
      },
      {
        title: 'The Interrupted Truth',
        description:
          'Characters rarely say exactly what they mean on the first try. Let them circle, hesitate, stumble toward honesty.',
        quote: 'Truth reveals itself in fragments.',
      },
    ],
  },
];

// Famous author wisdom
const authorWisdom = [
  {
    quote: 'Start writing, no matter what. The water does not flow until the faucet is turned on.',
    author: "Louis L'Amour",
    accent: 'brand-pink-500',
  },
  {
    quote: 'The first draft is just you telling yourself the story.',
    author: 'Terry Pratchett',
    accent: 'brand-blue',
  },
  {
    quote: "You can always edit a bad page. You can't edit a blank page.",
    author: 'Jodi Picoult',
    accent: 'brand-orange',
  },
];

// Scene crafting techniques
const sceneTechniques = [
  {
    icon: Eye,
    title: 'The Opening Hook',
    description: 'Begin in the middle—in medias res. Drop readers into tension, then orient them.',
    example: (
      <div className="space-y-2 text-sm">
        <p className="text-text-secondary-65 italic">Instead of:</p>
        <p className="text-text-secondary-65">
          &ldquo;It was a sunny morning when Maria woke up...&rdquo;
        </p>
        <p className="text-brand-pink-500 mt-2 italic">Try:</p>
        <p className="text-text-primary font-medium">
          &ldquo;The letter had been sitting unopened for three days. Maria knew, somehow, that
          reading it would change everything.&rdquo;
        </p>
      </div>
    ),
  },
  {
    icon: Theater,
    title: 'Scene Beats',
    description:
      'Every scene needs a turning point—a moment where something shifts emotionally or in the plot.',
    example: (
      <div className="space-y-1 text-center">
        <p className="text-text-secondary-65 text-xs tracking-wider uppercase">The Turn</p>
        <div className="from-brand-blue/60 via-brand-pink-400/40 to-brand-blue/60 mx-auto h-0.5 w-16 rounded-full bg-linear-to-r" />
        <p className="font-yellowtail text-brand-pink-500 mt-2 text-lg">
          &ldquo;Everything changed in that moment&rdquo;
        </p>
      </div>
    ),
  },
  {
    icon: Palette,
    title: 'Mood Through Setting',
    description: "Let your environment mirror or contrast your character's emotional state.",
    example: (
      <div className="space-y-2 text-sm">
        <p className="from-text-secondary to-text-secondary-65 bg-linear-to-r bg-clip-text text-transparent italic">
          The garden had once been her mother&apos;s pride—roses climbing toward the sky, lavender
          humming with bees. Now the roses were wild tangles, the lavender just dry stalks. Like
          grief, she thought. Neglect looks the same from the outside.
        </p>
      </div>
    ),
  },
  {
    icon: Wand2,
    title: 'The Resonant Ending',
    description: 'End scenes with an image, question, or line that echoes forward into the story.',
    example: (
      <div className="text-center">
        <p className="text-text-primary font-serif text-sm leading-relaxed italic">
          She closed the door softly behind her.
        </p>
        <p className="text-text-primary mt-1 font-serif text-sm leading-relaxed italic">
          Some doors, once closed, never open again.
        </p>
        <div className="mt-3 flex justify-center gap-1">
          <span className="bg-brand-pink-500/40 size-1 rounded-full" />
          <span className="bg-brand-blue/40 size-1 rounded-full" />
          <span className="bg-brand-orange/40 size-1 rounded-full" />
        </div>
      </div>
    ),
  },
];

// Scene Break Styles - Different decorative HR styles with contextual examples
const sceneBreakStyles = [
  {
    title: 'Gradient Flow',
    description: 'Smooth transition for seamless scene changes',
    style: 'gradient',
    preview: (
      <div className="space-y-2 py-3">
        <p className="text-text-secondary-65 text-center text-xs italic">
          ...and she walked away into the mist.
        </p>
        <div className="from-brand-pink-400/60 via-brand-blue/40 to-brand-pink-400/60 mx-auto h-0.5 w-24 rounded-full bg-linear-to-r" />
        <p className="text-text-secondary-65 text-center text-xs italic">
          The next morning brought clarity.
        </p>
      </div>
    ),
  },
  {
    title: 'Triple Star',
    description: 'Classic manga and light novel style',
    style: 'stars',
    preview: (
      <div className="space-y-2 py-3">
        <p className="text-text-secondary-65 text-center text-xs italic">
          &ldquo;I&apos;ll never forget you,&rdquo; he whispered.
        </p>
        <p className="text-brand-pink-500/70 text-center text-base tracking-[0.4em]">✦ ✦ ✦</p>
        <p className="text-text-secondary-65 text-center text-xs italic">Five years later...</p>
      </div>
    ),
  },
  {
    title: 'Dot Cluster',
    description: 'Subtle pause for minor scene shifts',
    style: 'dots',
    preview: (
      <div className="space-y-2 py-3">
        <p className="text-text-secondary-65 text-center text-xs italic">She closed her eyes.</p>
        <div className="flex items-center justify-center gap-1.5 py-1">
          <span className="bg-brand-blue/40 size-1.5 rounded-full" />
          <span className="bg-brand-pink-400/60 size-2 rounded-full" />
          <span className="bg-brand-blue/40 size-1.5 rounded-full" />
        </div>
        <p className="text-text-secondary-65 text-center text-xs italic">A memory surfaced.</p>
      </div>
    ),
  },
  {
    title: 'Diamond Break',
    description: 'Elegant divider for dramatic reveals',
    style: 'diamond',
    preview: (
      <div className="space-y-2 py-3">
        <p className="text-text-secondary-65 text-center text-xs italic">
          The truth hit him like a wave.
        </p>
        <div className="flex items-center justify-center gap-2 py-1">
          <div className="from-brand-orange/50 h-px w-10 bg-linear-to-l to-transparent" />
          <span className="text-brand-orange/70 text-xs">◆</span>
          <div className="from-brand-orange/50 h-px w-10 bg-linear-to-r to-transparent" />
        </div>
        <p className="text-text-secondary-65 text-center text-xs italic">
          Everything made sense now.
        </p>
      </div>
    ),
  },
  {
    title: 'Wave Pattern',
    description: 'For dream sequences or flashbacks',
    style: 'wave',
    preview: (
      <div className="space-y-2 py-3">
        <p className="text-text-secondary-65 text-center text-xs italic">Sleep finally came...</p>
        <p className="text-brand-blue/60 text-center text-xs tracking-widest">～ ～ ～ ～ ～</p>
        <p className="text-text-secondary-65 text-center text-xs italic">
          In the dream, she was young again.
        </p>
      </div>
    ),
  },
  {
    title: 'Chapter Mark',
    description: 'Bold separator for major transitions',
    style: 'chapter',
    preview: (
      <div className="space-y-1 py-3">
        <div className="via-brand-pink-500/40 mx-auto h-px w-full bg-linear-to-r from-transparent to-transparent" />
        <p className="text-brand-pink-500/60 text-center text-[10px] font-medium tracking-widest uppercase">
          part two
        </p>
        <div className="via-brand-pink-500/40 mx-auto h-px w-full bg-linear-to-r from-transparent to-transparent" />
      </div>
    ),
  },
];

// Multilingual Writing Examples - Show how to use different languages in chapters
const multilingualExamples = [
  {
    language: 'English',
    flag: '🇬🇧',
    color: 'brand-pink-500',
    quote: 'THE TRUTH SET HER FREE.',
    context: 'Bold capitals for impact moments',
    example: (
      <div className="space-y-2 text-center">
        <p className="text-text-secondary-65 text-xs italic">
          She stared at the letter, hands trembling. And then—
        </p>
        <p className="text-text-primary text-sm font-bold tracking-wide">THE TRUTH SET HER FREE.</p>
      </div>
    ),
  },
  {
    language: 'Hindi',
    flag: '🇮🇳',
    color: 'brand-orange',
    quote: 'सच्चा प्यार कभी नहीं मरता।',
    translation: 'True love never dies.',
    context: 'Poetic lines for emotional depth',
    example: (
      <div className="space-y-2 text-center">
        <p className="text-text-secondary-65 text-xs italic">His final words echoed—</p>
        <p className="text-text-primary font-serif text-sm font-semibold italic">
          सच्चा प्यार कभी नहीं मरता।
        </p>
        <p className="text-text-secondary-65/70 text-[10px]">(True love never dies.)</p>
      </div>
    ),
  },
  {
    language: 'Japanese',
    flag: '🇯🇵',
    color: 'brand-blue',
    quote: '運命は変えられる。',
    translation: 'Fate can be changed.',
    context: 'Manga-style dramatic moments',
    example: (
      <div className="space-y-2 text-center">
        <p className="text-text-secondary-65 text-xs italic">She gripped her sword tighter—</p>
        <p className="text-text-primary text-sm font-bold">運命は変えられる。</p>
        <p className="text-text-secondary-65/70 text-[10px]">(Fate can be changed.)</p>
      </div>
    ),
  },
  {
    language: 'Gujarati',
    flag: '🇮🇳',
    color: 'brand-pink-400',
    quote: 'દિલની વાત દિલ જાણે.',
    translation: 'The heart knows what the heart knows.',
    context: 'Cultural wisdom and proverbs',
    example: (
      <div className="space-y-2 text-center">
        <p className="text-text-secondary-65 text-xs italic">Grandmother always said—</p>
        <p className="text-text-primary font-serif text-sm font-semibold italic">
          દિલની વાત દિલ જાણે.
        </p>
        <p className="text-text-secondary-65/70 text-[10px]">
          (The heart knows what the heart knows.)
        </p>
      </div>
    ),
  },
  {
    language: 'Korean',
    flag: '🇰🇷',
    color: 'brand-blue',
    quote: '사랑은 시간을 초월한다.',
    translation: 'Love transcends time.',
    context: 'K-drama style romance',
    example: (
      <div className="space-y-2 text-center">
        <p className="text-text-secondary-65 text-xs italic">
          Across centuries, their souls found each other—
        </p>
        <p className="text-text-primary text-sm font-bold">사랑은 시간을 초월한다.</p>
        <p className="text-text-secondary-65/70 text-[10px]">(Love transcends time.)</p>
      </div>
    ),
  },
  {
    language: 'Hinglish',
    flag: '🌏',
    color: 'brand-orange',
    quote: 'Dil ka scene kya hai, bro?',
    translation: "What's the heart situation, bro?",
    context: 'Modern casual dialogue',
    example: (
      <div className="space-y-2 text-center">
        <p className="text-text-secondary-65 text-xs italic">Raj leaned back and asked—</p>
        <p className="text-text-primary text-sm font-medium">
          &ldquo;Dil ka scene kya hai, bro?&rdquo;
        </p>
        <p className="text-text-secondary-65/70 text-[10px]">
          (What&apos;s the heart situation, bro?)
        </p>
      </div>
    ),
  },
];

// Keyboard shortcuts
const shortcuts = [
  { keys: 'Ctrl + B', action: 'Bold', icon: '𝐁' },
  { keys: 'Ctrl + I', action: 'Italic', icon: '𝐼' },
  { keys: 'Ctrl + U', action: 'Underline', icon: 'U̲' },
  { keys: 'Ctrl + Shift + 1', action: 'Heading 1', icon: 'H1' },
  { keys: 'Ctrl + Shift + B', action: 'Bullet List', icon: '•' },
  { keys: 'Ctrl + Shift + .', action: 'Blockquote', icon: '"' },
];

export default function WritingTipsPage() {
  return (
    <div className="bg-bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--brand-pink-500) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.25, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-20 right-1/4 h-56 w-56 rounded-full opacity-15 blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
          >
            <Feather className="text-brand-pink-500 h-4 w-4" />
            <span className="text-brand-pink-500 text-sm font-medium">The Art of Storytelling</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-libre-baskerville text-text-tertiary mb-5 text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Craft Stories That
            <br />
            <span className="text-brand-pink-500">Resonate</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-secondary-65 mx-auto mb-8 max-w-2xl text-base leading-relaxed"
          >
            Beyond formatting—discover the techniques that transform words into worlds, characters
            into companions, and stories into experiences that linger long after the final page.
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { icon: Globe, text: 'Write in Any Language', color: 'brand-pink-500' },
              { icon: Zap, text: 'Manga & Webtoon Style', color: 'brand-blue' },
              { icon: Star, text: 'Visual Storytelling', color: 'brand-orange' },
            ].map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`border-${badge.color}/20 bg-${badge.color}/5 flex items-center gap-2 rounded-full border px-3 py-1.5`}
              >
                <badge.icon className={`text-${badge.color} size-3.5`} />
                <span className={`text-${badge.color} text-xs font-medium`}>{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Author Wisdom Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {authorWisdom.map((wisdom, index) => (
              <motion.div
                key={wisdom.author}
                {...scrollReveal.card(index)}
                className={cn(
                  'group relative overflow-hidden rounded-2xl p-px transition-all duration-300',
                  'from-border/60 via-border/30 to-border/60 bg-linear-to-br'
                )}
              >
                <div className="bg-card/95 relative h-full rounded-[15px] p-5 backdrop-blur-sm">
                  <Quote className={`text-${wisdom.accent}/30 mb-3 h-6 w-6`} />
                  <p className="text-text-secondary-70 mb-4 font-serif text-sm leading-relaxed italic">
                    &ldquo;{wisdom.quote}&rdquo;
                  </p>
                  <p className={`text-${wisdom.accent} text-xs font-medium`}>— {wisdom.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Craft Sections */}
      {storyCraftSections.map((section, sectionIndex) => (
        <section key={section.id} className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            {/* Section Header */}
            <div className="mb-10 text-center">
              <motion.div
                {...scrollReveal.paragraph}
                className={`border-${section.color}/30 bg-${section.color}/10 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2`}
              >
                <section.icon className={`text-${section.color} h-4 w-4`} />
                <span className={`text-${section.color} text-sm font-semibold`}>
                  {section.subtitle}
                </span>
              </motion.div>
              <motion.h2
                {...scrollReveal.heading}
                className="font-libre-baskerville text-text-primary text-2xl tracking-tight sm:text-3xl md:text-4xl"
              >
                {section.title}
              </motion.h2>
            </div>

            {/* Tips Grid */}
            <div className="grid gap-5 md:grid-cols-3">
              {section.tips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  {...scrollReveal.card(index + sectionIndex * 3)}
                  whileHover={{ y: -3 }}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl p-px transition-all duration-300',
                    'from-border/60 via-border/30 to-border/60 bg-linear-to-br',
                    `hover:from-${section.color}/50 hover:via-${section.color}/30 hover:to-${section.color}/50`
                  )}
                >
                  <div className="bg-card/95 relative flex h-full flex-col rounded-[15px] p-5 backdrop-blur-sm">
                    <h3
                      className={`text-text-primary group-hover:text-${section.color} mb-2 font-semibold transition-colors`}
                    >
                      {tip.title}
                    </h3>
                    <p className="text-text-secondary-65 mb-4 flex-1 text-sm leading-relaxed">
                      {tip.description}
                    </p>

                    {/* Quote */}
                    <div className="border-border/40 bg-cream-40 rounded-lg border p-3">
                      <p className="text-text-primary text-center font-serif text-sm italic">
                        &ldquo;{tip.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Scene Crafting Section */}
      <section className="bg-cream-95 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.div
              {...scrollReveal.paragraph}
              className="border-brand-pink-500/30 bg-brand-pink-500/10 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            >
              <PenTool className="text-brand-pink-500 h-4 w-4" />
              <span className="text-brand-pink-500 text-sm font-semibold">Scene by scene</span>
            </motion.div>
            <motion.h2
              {...scrollReveal.heading}
              className="font-libre-baskerville text-text-primary text-2xl tracking-tight sm:text-3xl md:text-4xl"
            >
              Scene Crafting Techniques
            </motion.h2>
            <motion.p
              {...scrollReveal.paragraph}
              className="text-text-secondary-65 mx-auto mt-3 max-w-lg text-sm"
            >
              Every scene is a story in miniature
            </motion.p>
          </div>

          {/* Techniques Grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {sceneTechniques.map((technique, index) => (
              <motion.div
                key={technique.title}
                {...scrollReveal.card(index)}
                whileHover={{ y: -3 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl p-px transition-all duration-300',
                  'from-border/60 via-border/30 to-border/60 bg-linear-to-br'
                )}
              >
                <div className="bg-card/95 relative flex h-full gap-4 rounded-[15px] p-5 backdrop-blur-sm">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="from-brand-pink-500/20 to-brand-blue/10 relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br shadow-sm"
                  >
                    <technique.icon className="text-brand-pink-500 size-6" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-text-primary mb-1.5 font-semibold">{technique.title}</h3>
                    <p className="text-text-secondary-65 mb-4 text-sm leading-relaxed">
                      {technique.description}
                    </p>
                    <div className="border-border/40 bg-cream-40 rounded-lg border p-4">
                      {technique.example}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scene Break Styles Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.div
              {...scrollReveal.paragraph}
              className="border-brand-blue/30 bg-brand-blue/10 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            >
              <Sparkles className="text-brand-blue h-4 w-4" />
              <span className="text-brand-blue text-sm font-semibold">Visual Dividers</span>
            </motion.div>
            <motion.h2
              {...scrollReveal.heading}
              className="font-libre-baskerville text-text-primary text-2xl tracking-tight sm:text-3xl md:text-4xl"
            >
              Scene Break Styles
            </motion.h2>
            <motion.p
              {...scrollReveal.paragraph}
              className="text-text-secondary-65 mx-auto mt-3 max-w-lg text-sm"
            >
              Add visual breaks to your story with these decorative dividers <br />
              <span className="text-brand-blue font-medium">Available in the editor toolbar!</span>
            </motion.p>
          </div>

          {/* Break Styles Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sceneBreakStyles.map((breakStyle, index) => (
              <motion.div
                key={breakStyle.title}
                {...scrollReveal.card(index)}
                whileHover={{ y: -3 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl p-px transition-all duration-300',
                  'from-border/60 via-border/30 to-border/60 bg-linear-to-br',
                  'hover:from-brand-blue/50 hover:via-brand-blue/30 hover:to-brand-blue/50'
                )}
              >
                <div className="bg-card/95 relative flex h-full flex-col rounded-[15px] p-5 backdrop-blur-sm">
                  <h3 className="text-text-primary group-hover:text-brand-blue mb-1 font-semibold transition-colors">
                    {breakStyle.title}
                  </h3>
                  <p className="text-text-secondary-65 mb-3 text-xs">{breakStyle.description}</p>

                  {/* Preview */}
                  <div className="border-border/40 bg-cream-40 flex-1 rounded-lg border">
                    {breakStyle.preview}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pro tip */}
          <motion.div {...scrollReveal.paragraph} className="mt-8 text-center">
            <p className="text-text-secondary-65 text-sm">
              <span className="text-brand-blue font-medium">Pro tip:</span> Use the{' '}
              <kbd className="bg-cream-50 border-border rounded px-1.5 py-0.5 font-mono text-xs">
                Scene Break
              </kbd>{' '}
              dropdown in the editor toolbar to insert these dividers directly into your story!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Multilingual Writing Section */}
      <section className="bg-cream-95 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.div
              {...scrollReveal.paragraph}
              className="border-brand-orange/30 bg-brand-orange/10 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            >
              <Globe className="text-brand-orange h-4 w-4" />
              <span className="text-brand-orange text-sm font-semibold">Write in Any Language</span>
            </motion.div>
            <motion.h2
              {...scrollReveal.heading}
              className="font-libre-baskerville text-text-primary text-2xl tracking-tight sm:text-3xl md:text-4xl"
            >
              Multilingual Storytelling
            </motion.h2>
            <motion.p
              {...scrollReveal.paragraph}
              className="text-text-secondary-65 mx-auto mt-3 max-w-lg text-sm"
            >
              Add depth to your chapters with poetic lines in different languages
            </motion.p>
          </div>

          {/* Language Examples Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {multilingualExamples.map((langExample, index) => (
              <motion.div
                key={langExample.language}
                {...scrollReveal.card(index)}
                whileHover={{ y: -3 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl p-px transition-all duration-300',
                  'from-border/60 via-border/30 to-border/60 bg-linear-to-br',
                  `hover:from-${langExample.color}/50 hover:via-${langExample.color}/30 hover:to-${langExample.color}/50`
                )}
              >
                <div className="bg-card/95 relative flex h-full flex-col rounded-[15px] p-5 backdrop-blur-sm">
                  {/* Header with flag and language */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{langExample.flag}</span>
                      <h3
                        className={`text-text-primary group-hover:text-${langExample.color} font-semibold transition-colors`}
                      >
                        {langExample.language}
                      </h3>
                    </div>
                    <span
                      className={`bg-${langExample.color}/10 text-${langExample.color} rounded-full px-2 py-0.5 text-[10px] font-medium`}
                    >
                      {langExample.context}
                    </span>
                  </div>

                  {/* Example */}
                  <div className="border-border/40 bg-cream-40 flex-1 rounded-lg border p-4">
                    {langExample.example}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pro tip */}
          <motion.div {...scrollReveal.paragraph} className="mt-8 text-center">
            <p className="text-text-secondary-65 text-sm">
              <span className="text-brand-orange font-medium">Tip:</span> Mix languages naturally in
              dialogue or inner thoughts. Always include translations for accessibility!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Keyboard Shortcuts - Compact */}
      <section className="bg-cream-95 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <motion.div
              {...scrollReveal.paragraph}
              className="border-brand-orange/30 bg-brand-orange/10 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            >
              <Keyboard className="text-brand-orange h-4 w-4" />
              <span className="text-brand-orange text-sm font-semibold">Quick reference</span>
            </motion.div>
            <motion.h2
              {...scrollReveal.heading}
              className="font-libre-baskerville text-text-primary text-xl tracking-tight sm:text-2xl"
            >
              Essential Shortcuts
            </motion.h2>
          </div>

          <motion.div {...scrollReveal.card(0)} className="flex flex-wrap justify-center gap-3">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.action}
                className="border-border/40 bg-card/95 flex items-center gap-2 rounded-lg border px-3 py-2"
              >
                <span className="bg-brand-orange/10 text-brand-orange flex size-6 items-center justify-center rounded text-xs font-bold">
                  {shortcut.icon}
                </span>
                <span className="text-text-secondary-65 text-sm">{shortcut.action}</span>
                <kbd className="bg-cream-50 text-text-secondary-65 rounded px-1.5 py-0.5 font-mono text-[10px]">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            {...scrollReveal.card(0)}
            className="border-border/50 from-brand-pink-500/5 to-brand-blue/5 relative overflow-hidden rounded-2xl border bg-linear-to-br via-white/50 p-8 text-center"
          >
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                className="bg-brand-pink-500/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-brand-pink-500/10 mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl"
              >
                <Heart className="text-brand-pink-500 size-8" />
              </motion.div>

              <h2 className="font-libre-baskerville text-text-tertiary mb-4 text-2xl tracking-tight sm:text-3xl">
                Your Story Awaits
              </h2>

              <p className="text-text-secondary-65 mx-auto mb-8 max-w-md text-sm leading-relaxed">
                The world needs your story. Start with a single word, a fleeting thought, a
                character who won&apos;t leave you alone. The rest will follow.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white"
                >
                  <Link href="/builder">
                    <PenTool className="size-4" />
                    Begin Writing
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-brand-pink-500/30 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/5 gap-2"
                >
                  <Link href="/explore">
                    <Globe className="size-4" />
                    Explore Stories
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
