import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        'h-10 w-full min-w-0 rounded-lg border px-3 py-2 text-base transition-all duration-200 outline-none md:text-sm',
        // Background and text
        'bg-cream-90 border-text-secondary/15 text-text-primary placeholder:text-text-secondary-65',
        // File input styles
        'file:bg-brand-pink-500/10 file:text-brand-pink-600 file:mr-3 file:h-7 file:rounded-md file:border-0 file:px-3 file:text-sm file:font-medium',
        // Selection styles
        'selection:bg-brand-pink-500/20 selection:text-text-primary',
        // Focus styles - brand pink
        'focus-visible:border-brand-pink-500/50 focus-visible:ring-brand-pink-ring30 focus-visible:ring-2',
        // Hover state
        'hover:border-text-secondary/25',
        // Error state
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        // Disabled state
        'disabled:bg-cream-60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Input };
