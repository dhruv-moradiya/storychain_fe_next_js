'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function UserProfileNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="border-border/50 bg-cream-95 relative overflow-hidden rounded-xl border p-5"
    >
      {/* Decorative icon top-right */}
      <div className="absolute top-3 right-3 opacity-10">
        <Mail className="text-brand-pink-500 h-16 w-16" />
      </div>

      <h3 className="text-text-primary mb-1 font-semibold">Stay in the loop</h3>
      <p className="text-text-secondary-65 mb-4 text-xs leading-relaxed">
        Get notified about new chapters, stories, and exclusive content.
      </p>

      {subscribed ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-pink-500 py-2 text-sm font-medium"
        >
          🎉 You're subscribed!
        </motion.p>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-border/60 bg-background text-sm"
            required
          />
          <Button
            type="submit"
            className="bg-brand-pink-500 hover:bg-brand-pink-600 w-full text-white"
          >
            Subscribe
          </Button>
        </form>
      )}
    </motion.div>
  );
}

export { UserProfileNewsletter };
