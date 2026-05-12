import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  likes: number;
  isLiked: boolean;
  onToggle: () => void;
}

export function LikeButton({ likes, isLiked, onToggle }: LikeButtonProps) {
  return (
    <div className="border-border bg-background flex items-center gap-0 rounded-full border py-1 transition-colors [&_button]:h-4 [&_button]:px-1.5">
      <Button
        variant="ghost"
        className={cn(
          'p-0 hover:bg-transparent',
          isLiked ? 'text-brand-pink-500' : 'text-muted-foreground'
        )}
        onClick={onToggle}
      >
        <ArrowBigUp
          strokeWidth={1.8}
          className="transition-colors"
          fill={isLiked ? 'currentColor' : 'none'}
        />
      </Button>

      <span className="text-foreground text-sm font-medium">{likes}</span>

      <Button
        variant="ghost"
        className={cn(
          'p-0 hover:bg-transparent',
          !isLiked ? 'text-brand-pink-500' : 'text-muted-foreground'
        )}
        onClick={onToggle}
      >
        <ArrowBigDown
          strokeWidth={1.8}
          className="transition-colors"
          fill={!isLiked ? 'currentColor' : 'none'}
        />
      </Button>
    </div>
  );
}
