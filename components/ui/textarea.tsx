import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
        'flex min-h-24 w-full resize-none rounded-lg border px-3 py-2.5 text-base transition-all duration-200 outline-none md:text-sm',
        // Background and text
        'bg-cream-90 border-text-secondary/15 text-text-primary placeholder:text-text-secondary-65',
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

export { Textarea };
