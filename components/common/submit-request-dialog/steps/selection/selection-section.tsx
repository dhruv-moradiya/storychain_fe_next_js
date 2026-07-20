'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SelectionSectionProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isDisabled?: boolean;
  selectedLabel?: string;
  onEdit: () => void;
  children: React.ReactNode;
}

export function SelectionSection({
  stepNumber,
  title,
  isActive,
  isCompleted,
  isDisabled,
  selectedLabel,
  onEdit,
  children,
}: SelectionSectionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border transition-all',
        isActive
          ? 'border-border bg-card shadow-sm'
          : isCompleted
            ? 'border-soft bg-muted/50'
            : 'border-soft bg-muted/20',
        isDisabled && 'pointer-events-none opacity-50'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3',
          isCompleted && !isActive && 'hover:bg-muted/50 cursor-pointer'
        )}
        onClick={isCompleted && !isActive ? onEdit : undefined}
      >
        {/* Step number / check */}
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-all',
            isCompleted
              ? 'bg-brand-pink-500 text-white'
              : isActive
                ? 'bg-brand-blue text-white'
                : 'text-text-secondary-65 bg-muted'
          )}
        >
          {isCompleted ? <Check className="h-3.5 w-3.5" /> : stepNumber}
        </div>

        {/* Title and selected value */}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'text-sm font-medium',
              isActive ? 'text-text-primary' : 'text-text-secondary-75'
            )}
          >
            {title}
          </p>
          {isCompleted && selectedLabel && (
            <p className="text-text-secondary-65 truncate font-mono text-xs">{selectedLabel}</p>
          )}
        </div>

        {/* Edit indicator */}
        {isCompleted && !isActive && (
          <ChevronDown className="text-text-secondary-65 h-4 w-4 rotate-180" />
        )}
      </div>

      {/* Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-1 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
