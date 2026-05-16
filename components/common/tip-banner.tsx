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
        'flex items-center gap-2 rounded-md border border-amber-200 bg-yellow-200/5 px-4 py-2',
        className
      )}
    >
      <div className="text-text-secondary-65 mt-0.5 shrink-0">{icon || <Bubbles size={16} />}</div>

      <p className="text-text-secondary-65 text-xs leading-6">{title}</p>
    </div>
  );
};
