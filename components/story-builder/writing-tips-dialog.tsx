'use client';

import { useState } from 'react';
import {
  Lightbulb,
  Type,
  Quote,
  ListOrdered,
  Code,
  AlignCenter,
  Sparkles,
  Heading,
  Minus,
  BookOpen,
  PenTool,
  Keyboard,
} from 'lucide-react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface WritingTip {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: React.ReactNode;
}

const writingTips: WritingTip[] = [
  {
    icon: <Type className="size-5" />,
    title: 'Bold for Key Moments',
    description:
      'Highlight character names, revelations, or pivotal details that readers should remember.',
    example: (
      <p className="font-reading text-text-secondary text-sm leading-relaxed">
        The ancient door groaned open, revealing{' '}
        <strong className="text-text-primary font-semibold">the Crown of Eternal Shadows</strong>{' '}
        suspended in a beam of moonlight.
      </p>
    ),
  },
  {
    icon: <Sparkles className="size-5" />,
    title: 'Italics for Inner Voice',
    description:
      'Express internal thoughts, dreams, memories, or whispered secrets that add depth.',
    example: (
      <p className="font-reading text-text-secondary text-sm leading-relaxed">
        He forced a smile, but his mind raced.{' '}
        <em className="text-text-secondary-75 font-serif">She knows. She&apos;s always known.</em>
      </p>
    ),
  },
  {
    icon: <Quote className="size-5" />,
    title: 'Blockquotes for Impact',
    description:
      'Perfect for prophecies, letters, song lyrics, or memorable dialogue that deserves spotlight.',
    example: (
      <blockquote className="border-brand-pink-500 from-cream-30 text-text-secondary-70 rounded-r-lg border-l-3 bg-linear-to-r to-transparent py-2.5 pr-3 pl-4 font-serif text-sm italic">
        &ldquo;When the last star falls and shadows rise, only the forgotten heir shall break the
        ties.&rdquo;
      </blockquote>
    ),
  },
  {
    icon: <AlignCenter className="size-5" />,
    title: 'Centered Text for Drama',
    description: 'Create scene breaks, time jumps, or dramatic emphasis with centered formatting.',
    example: (
      <div className="py-2 text-center">
        <p className="text-brand-pink-500/60 text-lg tracking-widest">⁂</p>
        <p className="text-text-primary mt-1 font-serif text-sm font-semibold tracking-wide uppercase">
          Three Years Later
        </p>
      </div>
    ),
  },
  {
    icon: <Heading className="size-5" />,
    title: 'Headings for Structure',
    description:
      'Break long chapters into sections with clear headings to guide readers through your story.',
    example: (
      <div className="space-y-1">
        <h3 className="text-text-primary font-serif text-base font-semibold">
          Part II: The Awakening
        </h3>
        <p className="font-reading text-text-secondary-65 text-sm">
          The morning sun painted gold across the valley...
        </p>
      </div>
    ),
  },
  {
    icon: <ListOrdered className="size-5" />,
    title: 'Lists for Clarity',
    description: 'Present rules, clues, inventories, or step-by-step moments in an organized way.',
    example: (
      <div className="text-sm">
        <p className="text-text-secondary mb-1.5">The ancient tome listed three conditions:</p>
        <ul className="text-text-secondary-75 marker:text-brand-pink-500 list-disc space-y-0.5 pl-5">
          <li>The seeker must travel alone</li>
          <li>The path reveals itself at midnight</li>
          <li>Only truth may unlock the gate</li>
        </ul>
      </div>
    ),
  },
  {
    icon: <Minus className="size-5" />,
    title: 'Horizontal Rules for Scenes',
    description: 'Mark scene transitions, time jumps, or perspective changes with a visual break.',
    example: (
      <div className="py-1">
        <p className="font-reading text-text-secondary-65 mb-2 text-sm">
          ...and with that, she vanished into the mist.
        </p>
        <div className="from-brand-pink-400/60 via-brand-blue/40 to-brand-pink-400/60 mx-auto h-0.5 w-24 rounded-full bg-linear-to-r"></div>
        <p className="font-reading text-text-secondary-65 mt-2 text-sm">
          Miles away, the prince awoke with a start.
        </p>
      </div>
    ),
  },
  {
    icon: <Code className="size-5" />,
    title: 'Code for Special Terms',
    description: 'Highlight system messages, sci-fi tech, or unique magical terminology.',
    example: (
      <p className="font-reading text-text-secondary text-sm">
        The hologram flickered:{' '}
        <code className="border-border bg-cream-50 text-text-primary rounded border px-1.5 py-0.5 font-mono text-xs font-medium">
          NEURAL_LINK_ESTABLISHED
        </code>
      </p>
    ),
  },
];

const proTips = [
  {
    icon: <PenTool className="size-4" />,
    title: 'Pacing with Paragraphs',
    tip: 'Short, punchy paragraphs build tension. Longer ones slow the pace for reflection, description, or emotional depth.',
  },
  {
    icon: <BookOpen className="size-4" />,
    title: "Show, Don't Tell",
    tip: 'Instead of "She was scared," try "Her hands trembled as cold sweat traced down her spine."',
  },
  {
    icon: <Quote className="size-4" />,
    title: 'Dynamic Dialogue',
    tip: 'Give each character a unique voice. Mix dialogue with action beats instead of relying on "said."',
  },
  {
    icon: <Sparkles className="size-4" />,
    title: 'Sensory Immersion',
    tip: 'Engage all five senses. What does your scene smell like? Sound like? Feel like?',
  },
  {
    icon: <Lightbulb className="size-4" />,
    title: 'Chapter Hooks',
    tip: 'End chapters with questions, cliffhangers, or revelations that compel readers to continue.',
  },
];

const shortcuts = [
  { keys: 'Ctrl + B', action: 'Bold', icon: '𝐁' },
  { keys: 'Ctrl + I', action: 'Italic', icon: '𝐼' },
  { keys: 'Ctrl + U', action: 'Underline', icon: 'U̲' },
  { keys: 'Ctrl + Shift + 1', action: 'Heading 1', icon: 'H1' },
  { keys: 'Ctrl + Shift + 2', action: 'Heading 2', icon: 'H2' },
  { keys: 'Ctrl + Shift + B', action: 'Bullet List', icon: '•' },
  { keys: 'Ctrl + Shift + O', action: 'Numbered List', icon: '1.' },
  { keys: 'Ctrl + Shift + .', action: 'Blockquote', icon: '"' },
];

function WritingTipsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-text-secondary-65 hover:text-text-primary hover:bg-cream-50 gap-2"
        >
          <Lightbulb className="size-4" />
          <span className="hidden sm:inline">Writing Tips</span>
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="max-w-2xl p-0" sheetHeight="85%" showCloseButton={true}>
        {/* Header with gradient */}
        <ResponsiveDialogHeader className="from-cream-80 via-cream-60 border-border/50 space-y-1 border-b bg-linear-to-br to-transparent px-6 pt-6 pb-4">
          <ResponsiveDialogTitle className="flex items-center justify-center gap-2.5 sm:justify-start">
            <div className="from-brand-pink-500 to-brand-orange flex size-8 items-center justify-center rounded-lg bg-linear-to-br shadow-sm">
              <Lightbulb className="size-4.5 text-white" />
            </div>
            <span className="font-serif text-xl">Craft Your Story</span>
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription className="text-text-secondary-65">
            Master these formatting techniques to create captivating chapters
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ScrollArea className="max-h-[calc(85vh-140px)] sm:max-h-[70vh]">
          <div className="space-y-8 p-6">
            {/* Formatting Techniques */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-brand-pink-500/10 flex size-6 items-center justify-center rounded-md">
                  <Type className="text-brand-pink-500 size-3.5" />
                </div>
                <h3 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                  Formatting Techniques
                </h3>
              </div>

              <div className="grid gap-3">
                {writingTips.map((tip, index) => (
                  <div
                    key={index}
                    className="group border-border/60 hover:border-brand-pink-400/40 rounded-xl border bg-white/55 p-4 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="from-brand-pink-500/15 to-brand-orange/10 text-brand-pink-600 group-hover:from-brand-pink-500/25 group-hover:to-brand-orange/20 shrink-0 rounded-lg bg-linear-to-br p-2.5 transition-colors">
                        {tip.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-text-primary mb-0.5 font-semibold">{tip.title}</h4>
                        <p className="text-text-secondary-65 mb-3 text-sm">{tip.description}</p>
                        <div className="bg-bg-cream border-border/40 rounded-lg border p-3">
                          {tip.example}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pro Writing Tips */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-brand-blue/10 flex size-6 items-center justify-center rounded-md">
                  <BookOpen className="text-brand-blue size-3.5" />
                </div>
                <h3 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                  Pro Writing Tips
                </h3>
              </div>

              <div className="grid gap-2.5">
                {proTips.map((tip, index) => (
                  <div
                    key={index}
                    className="from-cream-40 border-border/50 flex items-start gap-3 rounded-lg border bg-linear-to-r to-white/80 p-3.5"
                  >
                    <div className="bg-brand-blue flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-text-primary mb-0.5 flex items-center gap-2 text-sm font-medium">
                        {tip.icon}
                        {tip.title}
                      </div>
                      <p className="text-text-secondary-70 text-sm leading-relaxed">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-brand-orange/10 flex size-6 items-center justify-center rounded-md">
                  <Keyboard className="text-brand-orange size-3.5" />
                </div>
                <h3 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                  Keyboard Shortcuts
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="bg-cream-40/50 border-border/30 flex items-center justify-between rounded-lg border px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="bg-brand-pink-500/10 text-brand-pink-600 flex size-6 items-center justify-center rounded text-xs font-bold">
                        {shortcut.icon}
                      </span>
                      <span className="text-text-secondary text-sm">{shortcut.action}</span>
                    </div>
                    <kbd className="bg-bg-cream border-border text-text-primary rounded-md border px-2 py-1 font-mono text-xs shadow-sm">
                      {shortcut.keys}
                    </kbd>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer Note */}
            <div className="border-border/50 from-brand-pink-500/5 via-brand-blue/5 to-brand-orange/5 rounded-xl border bg-linear-to-r p-4 text-center">
              <p className="text-text-secondary-65 text-sm">
                ✨ Great stories are crafted with care. Take your time, experiment with styles, and
                let your creativity flow!
              </p>
            </div>
          </div>
        </ScrollArea>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export { WritingTipsDialog };
