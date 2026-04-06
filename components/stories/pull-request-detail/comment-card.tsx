import { useState } from 'react';

import { IPRComment } from '@/type';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CommentCardProps {
  comment: IPRComment & { replies?: IPRComment[] };
}

export default function CommentCard({ comment }: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(true);

  const typeColorClasses: Record<string, string> = {
    APPROVAL: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    REQUEST_CHANGES: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
    SUGGESTION: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    QUESTION: 'bg-brand-pink-500/10 text-brand-pink-500 border-brand-pink-500/20',
    GENERAL: 'bg-muted text-muted-foreground border-border',
  };

  const typeClasses = typeColorClasses[comment.commentType] || typeColorClasses.GENERAL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-border bg-card/80 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm"
    >
      {/* Header */}
      <div className="border-border/50 flex items-center gap-3 border-b px-5 py-4">
        <Avatar className="ring-card h-8 w-8 ring-2">
          <AvatarImage src={comment.user?.avatar} />
          <AvatarFallback className="bg-secondary/20 text-secondary">
            {comment.user?.displayName?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <span className="text-foreground font-medium">{comment.user?.displayName}</span>
          <span className="text-muted-foreground ml-2 font-mono text-xs">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
          {comment.isEdited && (
            <span className="text-muted-foreground ml-2 font-mono text-[10px] opacity-60">
              (edited)
            </span>
          )}
        </div>
        <Badge
          variant="outline"
          className={cn('border font-mono text-[10px] tracking-tight uppercase', typeClasses)}
        >
          {comment.commentType.replace('_', ' ')}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-foreground/90 text-sm leading-relaxed">{comment.content}</p>

        {/* Suggestion Block */}
        {comment.suggestion && comment.suggestion.suggestedText && (
          <div className="border-border bg-muted/30 mt-4 overflow-hidden rounded-lg border">
            <div className="text-muted-foreground bg-muted px-4 py-1.5 font-mono text-[10px] font-bold tracking-wider uppercase">
              Suggested Change
            </div>
            <div className="space-y-1 p-4 font-mono text-xs">
              {comment.suggestion.originalText && (
                <div className="bg-destructive/10 text-destructive/80 decoration-destructive/30 rounded p-3 line-through">
                  - {comment.suggestion.originalText}
                </div>
              )}
              <div className="rounded bg-emerald-500/10 p-3 font-bold text-emerald-600">
                + {comment.suggestion.suggestedText}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="border-border/50 border-t">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-muted-foreground hover:bg-muted/50 flex w-full items-center gap-2 px-5 py-3 font-mono text-[11px] transition-colors"
          >
            {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </button>

          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="bg-muted/20 border-border/30 space-y-4 border-t p-5">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="flex gap-3">
                      <Avatar className="ring-card h-6 w-6 ring-1">
                        <AvatarImage src={reply.user?.avatar} />
                        <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                          {reply.user?.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs">
                          <span className="text-foreground font-semibold">
                            {reply.user?.displayName}
                          </span>
                          <span className="text-muted-foreground ml-2 text-[10px] opacity-70">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-foreground/80 mt-1 text-xs leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
