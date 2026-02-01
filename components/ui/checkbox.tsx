'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base styles
        'peer size-[18px] shrink-0 rounded-[5px] border-2 transition-all duration-200 outline-none',
        // Unchecked state - cream themed
        'bg-cream-90 border-text-secondary/25',
        // Hover state
        'hover:border-brand-pink-500/50 hover:bg-cream-80',
        // Checked state - brand pink
        'data-[state=checked]:bg-brand-pink-500 data-[state=checked]:border-brand-pink-500 data-[state=checked]:text-white',
        // Focus styles
        'focus-visible:ring-brand-pink-ring30 focus-visible:ring-offset-bg-cream focus-visible:ring-2 focus-visible:ring-offset-1',
        // Error state
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        // Disabled state
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <CheckIcon className="size-3.5 stroke-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
