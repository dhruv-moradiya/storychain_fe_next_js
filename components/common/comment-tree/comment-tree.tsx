'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MessageSquare, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { CommentItem } from './comment-item';
import { CommentTreeSkeleton } from './comment-tree-skeleton';
import type { CommentTreeProps } from './comment-tree.types';

// Stagger list animation

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

// Top-level Composer

interface ComposerProps {
  onSubmit: (content: string) => void;
}

function Composer({ onSubmit }: ComposerProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const maxLen = 2000;

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    await Promise.resolve(onSubmit(trimmed));
    setText('');
    setSubmitting(false);
    setIsFocused(false);
  }

  const pct = Math.min(text.length / maxLen, 1);
  const circumference = 2 * Math.PI * 9;

  return (
    <div
      className={cn(
        'ct-composer rounded-2xl p-4 transition-all duration-300 sm:p-5',
        isFocused && 'ct-composer--focused'
      )}
    >
      <Textarea
        id="comment-composer"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => !text && setIsFocused(false)}
        placeholder="Share your thoughts…"
        className="ct-composer-textarea font-lora min-h-15 resize-none border-0 bg-transparent p-0 text-[15px] leading-relaxed shadow-none transition-all focus-visible:ring-0 sm:text-[16px]"
        style={{ minHeight: isFocused ? '100px' : '60px' }}
        maxLength={maxLen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
        }}
      />

      {/* Footer - only visible when focused or has text */}
      <AnimatePresence>
        {(isFocused || text.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ct-composer-footer flex items-center justify-between pt-3">
              {/* Character ring */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <svg width="22" height="22" className="-rotate-90">
                    <circle
                      cx="11"
                      cy="11"
                      r="9"
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="2"
                      className="opacity-30"
                    />
                    <circle
                      cx="11"
                      cy="11"
                      r="9"
                      fill="none"
                      stroke={pct > 0.9 ? 'var(--destructive)' : 'var(--brand-pink-500)'}
                      strokeWidth="2"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - pct)}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>
                <span className="font-ibm-plex-mono ct-meta-text text-[10px] font-bold tracking-tight">
                  {maxLen - text.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-ibm-plex-mono ct-meta-text hidden text-[10px] font-bold tracking-widest uppercase sm:inline">
                  ⌘ + Enter
                </span>
                <Button
                  size="sm"
                  className="bg-brand-pink-500 hover:bg-brand-pink-600 group/btn h-9 rounded-full px-5 text-xs font-bold shadow-sm transition-all active:scale-95 disabled:opacity-40"
                  onClick={handleSubmit}
                  disabled={!text.trim() || submitting || text.length > maxLen}
                >
                  <Send
                    size={14}
                    className="mr-1.5 transition-transform group-hover/btn:translate-x-0.5"
                  />
                  {submitting ? 'Posting…' : 'Post'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Comment Tree
export function CommentTree({
  comments,
  maxDepth = 4,
  onSubmitComment,
  onSubmitReply,
  onUpvote,
  onDownvote,
  totalCount,
  showComposer = true,
  showReplyButton = true,
  isLoading = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
  chapterSlug,
  className,
}: CommentTreeProps) {
  const topLevel = comments.filter((c) => !c.isDeleted || (c.replies ?? []).length > 0);
  const count = totalCount ?? topLevel.length;

  return (
    <section className={cn('ct-section space-y-5', className)} aria-label="Comments section">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="ct-header-icon flex h-9 w-9 items-center justify-center rounded-xl">
            <MessageSquare size={18} className="text-brand-pink-500" />
          </div>
          <h2 className="font-libre-baskerville ct-heading text-lg font-bold sm:text-xl">
            Discussions
          </h2>
        </div>
        {count > 0 && (
          <div className="ct-thread-badge font-ibm-plex-mono flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-tight">
            <span className="ct-thread-count">{count}</span>
            <span className="opacity-50">Threads</span>
          </div>
        )}
      </div>

      {/* Composer */}
      {showComposer && <Composer onSubmit={onSubmitComment ?? (() => {})} />}

      {/* Skeleton for initial load */}
      {isLoading && <CommentTreeSkeleton className="flex flex-col space-y-2" />}

      {/* Thread list */}
      {!isLoading && topLevel.length > 0 ? (
        <>
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <AnimatePresence initial={false}>
              {topLevel.map((comment) => (
                <div key={comment.id} className="group relative">
                  <CommentItem
                    comment={comment}
                    depth={0}
                    maxDepth={maxDepth}
                    chapterSlug={chapterSlug}
                    showReplyButton={showReplyButton}
                    onReply={onSubmitReply}
                    onUpvote={onUpvote}
                    onDownvote={onDownvote}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load more button */}
          {hasNextPage && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onLoadMore}
                disabled={isFetchingNextPage}
                className="ct-load-more-btn group h-9 rounded-full px-6 text-xs font-semibold transition-all hover:shadow-sm active:scale-[0.97] disabled:opacity-50"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    Loading…
                  </>
                ) : (
                  'Load more comments'
                )}
              </Button>
            </div>
          )}

          {/* Skeleton when fetching next page */}
          {isFetchingNextPage && <CommentTreeSkeleton className="flex flex-col space-y-2" />}
        </>
      ) : (
        !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="ct-empty flex flex-col items-center gap-4 rounded-2xl py-14 text-center sm:py-16"
          >
            <div className="ct-empty-icon flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16">
              <MessageSquare size={26} className="text-brand-pink-500/30" />
            </div>
            <div className="space-y-2">
              <p className="font-libre-baskerville ct-heading text-base font-bold">
                Quiet in the archives…
              </p>
              <p className="ct-meta-text mx-auto max-w-64 font-sans text-[13px] leading-relaxed">
                Be the first to leave a mark on this chapter. Your thoughts help shape the story.
              </p>
            </div>
          </motion.div>
        )
      )}
    </section>
  );
}

export default CommentTree;
