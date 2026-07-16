import { Bubbles } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ITipBannerProps {
  title?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const TipBanner = ({ title, className, icon }: ITipBannerProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md border px-4 py-2 transition-colors',
        // Light mode
        'border-amber-300/60 bg-amber-50',
        // Dark mode
        'dark:border-amber-400/20 dark:bg-amber-400/5',
        className
      )}
    >
      <div className={cn('mt-0.5 shrink-0', 'text-amber-700', 'dark:text-amber-300')}>
        {icon || <Bubbles size={16} />}
      </div>

      <p className={cn('text-xs leading-6', 'text-amber-900', 'dark:text-amber-100/80')}>{title}</p>
    </div>
  );
};
