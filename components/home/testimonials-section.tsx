'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TestimonialCard } from './testimonial-card';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        'Story Chain transformed how I write. The branching system lets my readers choose their own adventure.',
      author: 'Sarah Chen',
      role: 'Fantasy Writer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      quote:
        'Finally, a platform that understands collaborative storytelling. My writing group loves it.',
      author: 'Marcus Johnson',
      role: 'Fiction Author',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      quote: 'The community here is incredible. Every story feels alive with reader interactions.',
      author: 'Elena Rodriguez',
      role: 'Interactive Fiction Creator',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ];

  return (
    <section className="bg-bg-cream relative z-10 px-6 py-10 sm:py-20">
      {/* Decorative quote marks */}
      <motion.div
        className="absolute top-32 left-[10%] hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
      >
        <Quote className="text-brand-pink-500 h-24 w-24" />
      </motion.div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span className="font-yellowtail text-brand-pink-500 mb-4 block text-lg">
            Loved by writers
          </motion.span>
          <h2 className="font-libre-baskerville text-text-tertiary text-3xl leading-tight tracking-tight sm:text-4xl">
            <div>Stories from</div>
            <div>our community</div>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.author} {...testimonial} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
