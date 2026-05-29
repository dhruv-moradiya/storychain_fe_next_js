'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const currencies = [
  { key: 'INR', label: 'INR (₹)' },
  { key: 'USD', label: 'USD ($)' },
] as const;

export function CurrencyToggle({
  currency,
  onChange,
}: {
  currency: 'INR' | 'USD';
  onChange: (c: 'INR' | 'USD') => void;
}) {
  return (
    <div className="border-border-soft bg-background relative flex h-11 items-center rounded-xl border p-1 shadow-sm">
      {currencies.map((item) => {
        const active = currency === item.key;
        return (
          <Button
            key={item.key}
            variant="ghost"
            onClick={() => onChange(item.key as 'INR' | 'USD')}
            className={cn(
              'relative z-10 h-9 rounded-lg px-4 text-xs font-semibold transition-colors duration-200',
              active
                ? 'text-brand-pink-500 hover:text-brand-pink-500'
                : 'text-text-secondary-65 hover:text-text-primary hover:bg-transparent'
            )}
          >
            {active && (
              <motion.div
                layoutId="currency-toggle-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="bg-brand-pink-500/10 absolute inset-0 rounded-lg"
              />
            )}
            <motion.span
              animate={{ scale: active ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              {item.label}
            </motion.span>
          </Button>
        );
      })}
    </div>
  );
}
