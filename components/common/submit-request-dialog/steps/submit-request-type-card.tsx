import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

import { PullRequestTypeConfig } from '../types/submit-request-dialog.types';

interface PullRequestTypeCardProps {
  type: PullRequestTypeConfig;
  isSelected: boolean;
  onSelect: () => void;
}

export function PullRequestTypeCard({ type, isSelected, onSelect }: PullRequestTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all',
        isSelected ? 'border-strong shadow-sm' : 'border-soft hover:border-border hover:bg-muted/50'
      )}
    >
      <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', type.bgClass)}>
        <type.icon className={cn('h-5 w-5', type.colorClass)} />
      </div>
      <div className="flex-1">
        <p className="text-text-primary font-medium">{type.label}</p>
        <p className="text-text-secondary-65 font-mono text-sm">{type.description}</p>
      </div>
      {isSelected && (
        <div className="bg-brand-pink-500 flex h-6 w-6 items-center justify-center rounded-full">
          <Check className="h-3.5 w-3.5 text-white" />
        </div>
      )}
    </button>
  );
}
