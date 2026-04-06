import { IPRReview } from '@/type';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, MessageSquare, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: IPRReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const statusConfig: Record<
    string,
    { icon: React.ComponentType; color: string; label: string; bgColor: string }
  > = {
    APPROVED: {
      icon: CheckCircle,
      label: 'Approved',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
    },
    CHANGES_REQUESTED: {
      icon: AlertTriangle,
      label: 'Changes Requested',
      color: 'text-brand-orange',
      bgColor: 'bg-brand-orange/10',
    },
    COMMENTED: {
      icon: MessageSquare,
      label: 'Commented',
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    PENDING_REVIEW: {
      icon: Star,
      label: 'Pending Review',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
    },
  };

  const config = statusConfig[review.reviewStatus] || statusConfig.COMMENTED;
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-border bg-card/80 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm"
    >
      <div className="border-border/50 bg-muted/20 flex items-center gap-3 border-b px-5 py-4">
        <Avatar className="ring-card h-8 w-8 font-mono text-xs ring-2">
          <AvatarImage src={review.reviewer?.avatar} />
          <AvatarFallback className="bg-secondary/20 text-secondary">
            {review.reviewer?.displayName?.charAt(0) || 'R'}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex flex-wrap items-center gap-2">
            <span className="text-foreground truncate text-sm font-semibold">
              {review.reviewer?.displayName}
            </span>
            <Badge
              variant="outline"
              className={cn(
                'gap-1 border font-mono text-[9px] font-bold tracking-tighter uppercase',
                config.bgColor,
                config.color
              )}
            >
              <StatusIcon />
              {config.label}
            </Badge>
          </div>
          <p className="text-muted-foreground font-mono text-[10px] opacity-70">
            reviewed {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className="p-5">
        {review.summary && (
          <p className="text-foreground/80 border-primary/20 bg-primary/5 rounded-r-lg border-l-2 py-2 pl-4 text-sm leading-relaxed italic">
            "{review.summary}"
          </p>
        )}

        {review.feedback && review.feedback.length > 0 && (
          <div className="mt-6 space-y-4">
            {review.feedback.map((item, idx) => (
              <div key={idx} className="bg-muted/10 border-border/40 rounded-xl border p-4">
                {item.section && (
                  <p className="text-foreground/40 border-border mb-2 border-b pb-1 text-[9px] font-bold tracking-widest uppercase">
                    {item.section}
                  </p>
                )}
                <p className="text-foreground/90 text-sm leading-relaxed">{item.comment}</p>
                {item.rating && (
                  <div className="border-border/10 mt-3 flex items-center gap-1.5 border-t pt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-3 w-3',
                          i < item.rating! ? 'fill-amber-400 text-amber-400' : 'text-muted/30'
                        )}
                      />
                    ))}
                    <span className="text-muted-foreground ml-1 font-mono text-[10px]">
                      {item.rating}/5
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
