'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import {
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  MessageSquareDashed,
  Pencil,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
import type { CommentItemProps } from './comment-tree.types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ─── Reply Box ────────────────────────────────────────────────────────────────

interface ReplyBoxProps {
  commentId: string;
  authorName: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

function ReplyBox({ authorName, onSubmit, onCancel }: ReplyBoxProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    await Promise.resolve(onSubmit(trimmed));
    setText('');
    setSubmitting(false);
    onCancel();
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="mt-4 overflow-hidden"
    >
      <div className="bg-muted/30 border-brand-pink-500/10 space-y-3 rounded-2xl border p-4 backdrop-blur-sm">
        <p className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
          Replying to <span className="text-brand-pink-600">@{authorName}</span>
        </p>
        <Textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reply..."
          className="placeholder:text-muted-foreground/30 text-text-primary font-lora min-h-[90px] resize-none border-0 bg-transparent p-0 text-[15px] leading-relaxed shadow-none focus-visible:ring-0"
          maxLength={2000}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
            if (e.key === 'Escape') onCancel();
          }}
        />
        <div className="border-border/20 flex items-center justify-between border-t pt-3">
          <span className="font-ibm-plex-mono text-muted-foreground/40 text-[9px] font-bold">
            {text.length} / 2000
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted h-8 rounded-full px-4 text-[11px] font-bold uppercase transition-all"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-brand-pink-500 hover:bg-brand-pink-600 h-8 rounded-full px-5 text-[11px] font-bold shadow-sm transition-all active:scale-95"
              onClick={handleSubmit}
              disabled={!text.trim() || submitting}
            >
              {submitting ? 'Posting…' : 'Reply'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Vote Pill ──────────────────────────────────────────────────────────────

interface VotePillProps {
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
  onUpvote: () => void;
  onDownvote: () => void;
}

function VotePill({ upvotes, downvotes, userVote, onUpvote, onDownvote }: VotePillProps) {
  const score = upvotes - downvotes;

  const scoreColor =
    score > 0 ? 'text-brand-pink-600' : score < 0 ? 'text-destructive' : 'text-muted-foreground/80';

  return (
    <div className="bg-card border-brand-pink-500/10 inline-flex items-center rounded-full border shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onUpvote}
        className={cn(
          'flex h-7 items-center justify-center rounded-l-full px-2.5 transition-colors',
          userVote === 'up'
            ? 'bg-brand-pink-500/15 text-brand-pink-600'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-brand-pink-500'
        )}
        aria-label="Upvote comment"
      >
        <ThumbsUp
          size={13}
          strokeWidth={userVote === 'up' ? 2.5 : 2}
          className={cn('transition-transform', userVote === 'up' && 'fill-brand-pink-500')}
        />
      </motion.button>

      <span
        className={cn(
          'font-ibm-plex-mono min-w-[28px] text-center text-[11px] font-bold',
          scoreColor
        )}
      >
        {score > 0 ? `+${score}` : score}
      </span>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDownvote}
        className={cn(
          'flex h-7 items-center justify-center rounded-r-full px-2.5 transition-colors',
          userVote === 'down'
            ? 'bg-red-500/15 text-red-600'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-red-500'
        )}
        aria-label="Downvote comment"
      >
        <ThumbsDown
          size={13}
          strokeWidth={userVote === 'down' ? 2.5 : 2}
          className={cn('transition-transform', userVote === 'down' && 'fill-red-500')}
        />
      </motion.button>
    </div>
  );
}

// ─── Comment Item ─────────────────────────────────────────────────────────────

export function CommentItem({
  comment,
  depth,
  maxDepth,
  onReply,
  onUpvote,
  onDownvote,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(depth < 1);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState({ ...comment.votes });

  if (comment.isDeleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="flex gap-3 py-2"
      >
        <div className="border-border/60 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed">
          <MessageSquareDashed size={11} className="text-muted-foreground/40" />
        </div>
        <p className="font-ibm-plex-mono text-muted-foreground/50 pt-1 text-xs italic">
          [Comment deleted]
        </p>
      </motion.div>
    );
  }

  const timeAgo = formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true });
  const initials = getInitials(comment.author.displayName);
  const hasReplies = (comment.replies?.length ?? 0) > 0;
  const replyCount = comment.replies?.length ?? 0;
  const canNestDeeper = depth < maxDepth;

  function handleUpvote() {
    if (userVote === 'up') {
      setUserVote(null);
      setVotes((v) => ({ ...v, upvotes: v.upvotes - 1 }));
    } else {
      setVotes((v) => ({
        upvotes: v.upvotes + 1,
        downvotes: userVote === 'down' ? v.downvotes - 1 : v.downvotes,
      }));
      setUserVote('up');
    }
    onUpvote?.(comment.id);
  }

  function handleDownvote() {
    if (userVote === 'down') {
      setUserVote(null);
      setVotes((v) => ({ ...v, downvotes: v.downvotes - 1 }));
    } else {
      setVotes((v) => ({
        downvotes: v.downvotes + 1,
        upvotes: userVote === 'up' ? v.upvotes - 1 : v.upvotes,
      }));
      setUserVote('down');
    }
    onDownvote?.(comment.id);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative"
    >
      <div className="flex gap-3">
        {/* ── Avatar column with thread line ── */}
        <div className="flex flex-col items-center">
          <Avatar className="border-border/60 h-7 w-7 shrink-0 border shadow-xs">
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.displayName} />
            <AvatarFallback className="bg-accent text-accent-foreground font-ibm-plex-mono text-[10px] font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Vertical thread connector line — refined style */}
          {(hasReplies && showReplies) || showReply ? (
            <div className="bg-brand-pink-500/20 mt-2 w-[2px] flex-1 rounded-full shadow-sm" />
          ) : null}
        </div>

        {/* ── Content ── */}
        <div className="min-w-0 flex-1 pb-1">
          {/* Author header */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-libre-baskerville text-text-primary text-[13px] leading-snug font-semibold">
              {comment.author.displayName}
            </span>
            {comment.author.username && (
              <span className="font-ibm-plex-mono text-muted-foreground text-[11px]">
                @{comment.author.username}
              </span>
            )}
            <span className="font-ibm-plex-mono text-muted-foreground/50 ml-auto text-[11px]">
              {timeAgo}
            </span>
            {comment.isEdited && (
              <span className="font-ibm-plex-mono text-muted-foreground/40 flex items-center gap-0.5 text-[10px] italic">
                <Pencil size={9} />
                edited
              </span>
            )}
          </div>

          {/* Body text styling updated to look more like story text */}
          <p className="text-text-primary/90 font-lora mt-2 text-[15px] leading-relaxed whitespace-pre-wrap antialiased">
            {comment.content}
          </p>

          {/* Action row */}
          <div className="mt-3 flex items-center gap-3">
            <VotePill
              upvotes={votes.upvotes}
              downvotes={votes.downvotes}
              userVote={userVote}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />

            {canNestDeeper && (
              <button
                onClick={() => setShowReply((p) => !p)}
                className="font-ibm-plex-mono text-muted-foreground hover:bg-muted/50 hover:text-text-primary ml-1 flex h-7 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold transition-all hover:shadow-sm"
                aria-label="Reply to this comment"
              >
                <CornerDownRight size={12} strokeWidth={2.5} />
                Reply
              </button>
            )}
          </div>

          {/* Inline reply composer */}
          <AnimatePresence>
            {showReply && (
              <ReplyBox
                commentId={comment.id}
                authorName={comment.author.username ?? comment.author.displayName}
                onSubmit={(content) => {
                  onReply?.(comment.id, content);
                }}
                onCancel={() => setShowReply(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Nested replies ── */}
      {hasReplies && (
        <div className="mt-1 ml-3.5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReplies((p) => !p)}
            className="font-ibm-plex-mono text-muted-foreground hover:bg-muted hover:text-primary mb-1.5 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] transition-colors"
            aria-expanded={showReplies}
          >
            {showReplies ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            {showReplies ? 'Hide' : 'Show'} {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
          </motion.button>

          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="border-brand-pink-500/20 ml-6 space-y-4 border-l-2 pt-2 pl-6">
                  {comment.replies!.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      depth={depth + 1}
                      maxDepth={maxDepth}
                      onReply={onReply}
                      onUpvote={onUpvote}
                      onDownvote={onDownvote}
                    />
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
