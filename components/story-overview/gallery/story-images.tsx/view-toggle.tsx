import { motion } from 'framer-motion';
import { Grid2x2, List } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IViewToggleProps {
  view: 'grid' | 'list';
  onChange?: (view: 'grid' | 'list') => void;
}

const items = [
  {
    key: 'grid',
    icon: Grid2x2,
  },
  {
    key: 'list',
    icon: List,
  },
] as const;

export const ViewToggle = ({ view, onChange }: IViewToggleProps) => {
  return (
    <div className="border-soft bg-background relative flex h-11 items-center rounded-xl border p-1 shadow-sm">
      {items.map((item) => {
        const Icon = item.icon;
        const active = view === item.key;

        return (
          <Button
            key={item.key}
            size="icon"
            variant="ghost"
            onClick={() => onChange?.(item.key)}
            className={cn(
              'relative z-10 h-9 w-9 rounded-lg transition-colors duration-200',
              active ? 'text-brand-pink-500' : 'text-text-secondary-65 hover:text-text-primary'
            )}
          >
            {/* Active Background */}
            {active && (
              <motion.div
                layoutId="view-toggle-bg"
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                }}
                className="bg-brand-pink-500/10 absolute inset-0 rounded-lg"
              />
            )}

            {/* Icon */}
            <motion.div
              animate={{
                scale: active ? 1.05 : 1,
              }}
              transition={{
                duration: 0.2,
              }}
              className="relative z-10"
            >
              <Icon size={18} />
            </motion.div>
          </Button>
        );
      })}
    </div>
  );
};
