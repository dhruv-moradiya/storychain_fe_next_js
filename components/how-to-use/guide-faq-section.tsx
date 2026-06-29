'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, HelpCircle, Mail, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { guideFaqs } from '@/lib/data/how-to-use-data';
import { cn, scrollReveal } from '@/lib/utils';

const categories = [
  { key: 'all', label: 'All Questions' },
  { key: 'general', label: 'General' },
  { key: 'collaboration', label: 'Collaboration' },
  { key: 'monetization', label: 'Monetization' },
  { key: 'reading', label: 'Reading' },
] as const;

type Category = (typeof categories)[number]['key'];

export function GuideFAQSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all' ? guideFaqs : guideFaqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="scroll-mt-6 py-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-8">
        <div className="border-brand-blue/20 bg-brand-blue/5 mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
          <HelpCircle className="text-brand-blue h-4 w-4" />
          <span className="text-brand-blue text-sm font-semibold">FAQ</span>
        </div>
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          Still have questions? Browse the most common ones below, or reach out to our support team.
        </p>
      </motion.div>

      {/* Category filter */}
      <motion.div {...scrollReveal.paragraph} className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setOpenIndex(null);
            }}
            className={cn(
              'rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200',
              activeCategory === cat.key
                ? 'border-brand-blue bg-brand-blue text-white'
                : 'border-border/50 text-text-secondary-65 hover:border-brand-blue/40 hover:text-brand-blue hover:bg-brand-blue/5'
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* FAQ accordion */}
      <motion.div
        {...scrollReveal.card(0)}
        className="border-border/40 bg-cream-95/60 mb-8 overflow-hidden rounded-2xl border"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={`${activeCategory}-${index}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className={cn(
                  'border-border/20 border-b last:border-0',
                  isOpen ? 'bg-brand-blue/3' : ''
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors',
                      isOpen ? 'bg-brand-blue text-white' : 'bg-brand-blue/10 text-brand-blue'
                    )}
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </div>
                  <span
                    className={cn(
                      'flex-1 text-sm font-medium transition-colors',
                      isOpen ? 'text-brand-blue' : 'text-text-primary group-hover:text-brand-blue'
                    )}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'text-text-secondary-65 h-4 w-4 shrink-0 transition-transform duration-200',
                      isOpen ? 'text-brand-blue rotate-180' : ''
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary-65 px-5 pb-5 pl-16 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Still have questions? */}
      <motion.div
        {...scrollReveal.card(1)}
        className="border-border/40 from-brand-blue/5 to-brand-pink-500/5 rounded-2xl border bg-gradient-to-br p-8 text-center"
      >
        <div className="bg-brand-blue/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
          <Mail className="text-brand-blue h-7 w-7" />
        </div>
        <h3 className="text-text-primary mb-2 text-lg font-semibold">Still have questions?</h3>
        <p className="text-text-secondary-65 mb-6 text-sm">
          Our support team is happy to help. Reach out and we&apos;ll get back to you within 24
          hours.
        </p>
        <Button className="bg-brand-blue hover:bg-brand-blue/90 gap-2 text-white">
          <MessageCircle className="h-4 w-4" />
          Contact Support
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
