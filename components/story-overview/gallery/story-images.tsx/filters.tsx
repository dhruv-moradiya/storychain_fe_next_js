import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IFilterItem {
  label: string;
  count: number;
  value: string;
}

interface IFiltersProps {
  items: IFilterItem[];
  activeFilter: string;
  onChange?: (value: string) => void;
}

export const Filters = ({ items, activeFilter, onChange }: IFiltersProps) => {
  return (
    <div className="scrollbar-hide flex items-center gap-3 overflow-x-auto">
      {items.map((item) => {
        const isActive = activeFilter === item.value;

        return (
          <div key={item.value} className="relative flex-none">
            {/* Shared Animated Background */}
            {isActive && (
              <motion.div
                layoutId="active-filter"
                className="border-brand-pink-500/30 bg-brand-pink-500/10 absolute inset-0 z-10 rounded-md border"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 38,
                  mass: 0.8,
                }}
              />
            )}

            <Button
              variant="ghost"
              onClick={() => onChange?.(item.value)}
              className={cn(
                'relative h-11 rounded-md border px-5',
                'border-soft bg-background hover:bg-muted/60',
                'text-text-secondary-65 text-sm font-medium transition-colors duration-200',
                isActive && 'bg-brand-pink-500/10 text-brand-pink-500'
              )}
            >
              {item.label} ({item.count})
            </Button>
          </div>
        );
      })}
    </div>
  );
};
