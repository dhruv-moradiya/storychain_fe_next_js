import { AnimatePresence, motion } from 'framer-motion';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

import { cn } from '@/lib/utils';

interface LikeButtonProps {
  likes: number;
  isLiked: boolean;
  onToggle: () => void;
}

export function LikeButton({ likes, isLiked, onToggle }: LikeButtonProps) {
  return (
    <div className="ct-vote-capsule">
      <button
        className={cn('ct-vote-btn', isLiked && 'ct-vote-btn--active')}
        onClick={onToggle}
        aria-label="Upvote"
      >
        <ArrowBigUp
          size={16}
          strokeWidth={1.8}
          fill={isLiked ? 'currentColor' : 'none'}
          className="transition-all"
        />
      </button>

      <AnimatePresence mode="wait">
        <motion.span
          key={likes}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="ct-vote-count font-ibm-plex-mono"
        >
          {likes}
        </motion.span>
      </AnimatePresence>

      <button
        className={cn('ct-vote-btn', !isLiked && likes > 0 && 'ct-vote-btn--active')}
        onClick={onToggle}
        aria-label="Downvote"
      >
        <ArrowBigDown
          size={16}
          strokeWidth={1.8}
          fill={!isLiked && likes > 0 ? 'currentColor' : 'none'}
          className="transition-all"
        />
      </button>
    </div>
  );
}
