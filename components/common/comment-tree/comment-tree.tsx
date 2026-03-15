'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { CommentItem } from './comment-item';
import type { CommentTreeProps } from './comment-tree.types';

// ─── Stagger list animation ───────────────────────────────────────────────────

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

// ─── Top-level Composer ───────────────────────────────────────────────────────

interface ComposerProps {
  onSubmit: (content: string) => void;
}

function Composer({ onSubmit }: ComposerProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const maxLen = 2000;

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    await Promise.resolve(onSubmit(trimmed));
    setText('');
    setSubmitting(false);
  }

  const pct = Math.min(text.length / maxLen, 1);
  const circumference = 2 * Math.PI * 9; // r=9

  return (
    <div className="bg-card/40 border-border/40 focus-within:border-brand-pink-500/30 focus-within:ring-brand-pink-500/5 space-y-3 rounded-2xl border p-5 shadow-xs backdrop-blur-sm transition-all focus-within:ring-4">
      <Textarea
        id="comment-composer"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your thoughts…"
        className="text-text-primary placeholder:text-muted-foreground/40 font-lora min-h-[100px] resize-none border-0 bg-transparent p-0 text-[16px] leading-relaxed shadow-none focus-visible:ring-0"
        maxLength={maxLen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
        }}
      />
      <div className="border-border/40 flex items-center justify-between border-t pt-4">
        {/* Character ring */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <svg width="24" height="24" className="-rotate-90">
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2.5"
                className="opacity-40"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke={pct > 0.9 ? 'var(--destructive)' : 'var(--brand-pink-500)'}
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - pct)}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <span className="font-ibm-plex-mono absolute text-[8px] font-bold">
              {Math.round(pct * 100)}%
            </span>
          </div>
          <span className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-tight">
            {maxLen - text.length} chars remaining
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-ibm-plex-mono text-muted-foreground/40 hidden text-[10px] font-bold tracking-widest uppercase sm:inline">
            ⌘ + Enter to post
          </span>
          <Button
            size="sm"
            className="bg-brand-pink-500 hover:bg-brand-pink-600 h-9 rounded-full px-6 text-xs font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!text.trim() || submitting || text.length > maxLen}
          >
            {submitting ? 'Posting…' : 'Post Comment'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Comment Tree ─────────────────────────────────────────────────────────────

export function CommentTree({
  comments,
  maxDepth = 4,
  onSubmitComment,
  onSubmitReply,
  onUpvote,
  onDownvote,
  totalCount,
  showComposer = true,
  className,
}: CommentTreeProps) {
  const topLevel = comments.filter((c) => !c.isDeleted || (c.replies ?? []).length > 0);
  const count = totalCount ?? topLevel.length;

  return (
    <section className={cn('space-y-8', className)} aria-label="Comments section">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-9 w-9 items-center justify-center rounded-xl">
            <MessageSquare size={18} className="text-brand-pink-500" />
          </div>
          <h2 className="font-libre-baskerville text-text-primary text-xl font-bold">
            Discussions
          </h2>
        </div>
        {count > 0 && (
          <div className="bg-muted/50 border-border/40 font-ibm-plex-mono text-muted-foreground flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-tight">
            <span className="text-text-primary">{count}</span>
            <span className="opacity-50">Threads</span>
          </div>
        )}
      </div>

      {/* ─── Composer ─── */}
      {showComposer && <Composer onSubmit={onSubmitComment ?? (() => {})} />}

      {/* ─── Thread list ─── */}
      {topLevel.length > 0 ? (
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <AnimatePresence initial={false}>
            {topLevel.map((comment) => (
              <div key={comment.id} className="group relative">
                <CommentItem
                  comment={comment}
                  depth={0}
                  maxDepth={maxDepth}
                  onReply={onSubmitReply}
                  onUpvote={onUpvote}
                  onDownvote={onDownvote}
                />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card/20 border-border/40 flex flex-col items-center gap-4 rounded-3xl border border-dashed py-16 text-center"
        >
          <div className="bg-brand-pink-500/5 flex h-16 w-16 items-center justify-center rounded-2xl">
            <MessageSquare size={28} className="text-brand-pink-500/30" />
          </div>
          <div className="space-y-1">
            <p className="font-libre-baskerville text-text-primary text-base font-bold">
              Quiet in the archives...
            </p>
            <p className="text-muted-foreground mx-auto max-w-[240px] font-sans text-xs leading-relaxed">
              Be the first to leave a mark on this chapter. Your thoughts help shape the story.
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default CommentTree;
