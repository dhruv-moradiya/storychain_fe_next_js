'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface SpotlightQuote {
  quote: string;
  author: string;
}

interface UserProfileSpotlightProps {
  spotlight: SpotlightQuote;
}

function UserProfileSpotlight({ spotlight }: UserProfileSpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-5"
    >
      <h3 className="text-text-primary mb-3 font-semibold">Writer's Spotlight</h3>

      <blockquote className="space-y-3">
        <p className="text-text-secondary text-sm leading-relaxed italic">"{spotlight.quote}"</p>
        <footer className="text-text-secondary-65 text-xs">— {spotlight.author}</footer>
      </blockquote>

      {/* Stars */}
      <div className="mt-3 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === 0 ? 'bg-brand-pink-500 w-4' : 'bg-border w-1.5'}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export { UserProfileSpotlight };
