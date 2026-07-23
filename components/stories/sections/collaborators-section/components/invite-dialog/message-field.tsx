import { ChevronDown } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MessageFieldProps {
  show: boolean;
  value: string;
  onToggle: () => void;
  onChange: (value: string) => void;
}

export function MessageField({ show, value, onToggle, onChange }: MessageFieldProps) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onToggle}
        className="text-text-secondary-65 hover:text-brand-pink-500 flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform duration-200', show && 'rotate-180')}
        />
        Add personal message (optional)
      </button>

      <div
        className={cn(
          'grid transition-all duration-200',
          show ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write a personalized message to the collaborator..."
            rows={3}
            className="border-border/50 bg-card/60 focus:bg-card text-sm transition-all focus:shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
