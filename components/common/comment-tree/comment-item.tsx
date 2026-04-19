'use client';

import { useState } from 'react';

import { formatDistance } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  Heart,
  MessageCircle,
  MessageSquareDashed,
  Pencil,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

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

// depth-based accent colors (cycles through brand palette)
const DEPTH_ACCENT_COLORS = [
  'var(--brand-pink-500)',
  'var(--brand-blue)',
  'var(--brand-orange)',
  'var(--brand-pink-600)',
  'var(--brand-blue-alt)',
];

function getDepthAccent(depth: number): string {
  return DEPTH_ACCENT_COLORS[depth % DEPTH_ACCENT_COLORS.length];
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
      className="mt-3 overflow-hidden"
    >
      <div className="ct-reply-box space-y-3 rounded-xl p-4">
        <p className="font-ibm-plex-mono ct-meta-text text-[10px] font-bold tracking-widest uppercase">
          Replying to <span className="text-brand-pink-500">@{authorName}</span>
        </p>
        {/* <Textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reply..."
          className="ct-reply-textarea font-lora min-h-[80px] resize-none border-0 bg-transparent p-0 text-[15px] leading-relaxed shadow-none focus-visible:ring-0"
          maxLength={2000}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
            if (e.key === 'Escape') onCancel();
          }}
        /> */}
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="block-end-textarea">Textarea</FieldLabel>
            <InputGroup>
              <InputGroupTextarea id="block-end-textarea" placeholder="Write a comment..." />
              <InputGroupAddon align="block-end">
                <InputGroupText>0/280</InputGroupText>
                <InputGroupButton variant="default" size="sm" className="ml-auto">
                  Post
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Footer positioned below the textarea.</FieldDescription>
          </Field>
        </FieldGroup>
        <div className="ct-reply-footer flex items-center justify-between pt-2">
          <span className="font-ibm-plex-mono ct-meta-text text-[9px] font-bold">
            {text.length} / 2000
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="ct-btn-ghost h-8 rounded-full px-4 text-[11px] font-bold uppercase transition-all"
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

// ─── Like Button ────────────────────────────────────────────────────────────

interface LikeButtonProps {
  likes: number;
  isLiked: boolean;
  onToggle: () => void;
}

function LikeButton({ likes, isLiked, onToggle }: LikeButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onToggle}
      className={cn(
        'ct-action-btn flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all',
        isLiked && 'ct-action-btn--active'
      )}
      aria-label={isLiked ? 'Unlike comment' : 'Like comment'}
    >
      <Heart
        size={13}
        strokeWidth={isLiked ? 0 : 2}
        className={cn(
          'transition-all duration-200',
          isLiked ? 'fill-brand-pink-500 text-brand-pink-500' : ''
        )}
      />
      {likes > 0 && (
        <span className={cn('font-ibm-plex-mono', isLiked && 'text-brand-pink-500')}>{likes}</span>
      )}
    </motion.button>
  );
}

// ─── Comment Item ─────────────────────────────────────────────────────────────

export function CommentItem({
  comment,
  depth,
  maxDepth,
  showReplyButton = true,
  onReply,
  onUpvote,
  onDownvote,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(depth < 1);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.votes.upvotes);

  if (comment.isDeleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="ct-comment-deleted flex items-center gap-3 rounded-lg px-3 py-2.5"
      >
        <div className="ct-deleted-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          <MessageSquareDashed size={11} className="opacity-50" />
        </div>
        <p className="font-ibm-plex-mono ct-meta-text text-xs italic">[Comment removed]</p>
      </motion.div>
    );
  }

  const timeAgo = formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true });
  const initials = getInitials(comment.author.displayName);
  const hasReplies = (comment.replies?.length ?? 0) > 0;
  const replyCount = comment.replies?.length ?? 0;
  const canNestDeeper = depth < maxDepth;
  const depthAccent = getDepthAccent(depth);

  function handleLikeToggle() {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((c) => c - 1);
      onDownvote?.(comment.id);
    } else {
      setIsLiked(true);
      setLikeCount((c) => c + 1);
      onUpvote?.(comment.id);
    }
  }

  // Indentation: each depth adds padding (no border lines)
  const indentPadding = depth > 0 ? `${depth * 20}px` : '0px';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="ct-comment-node group relative"
      style={{ paddingLeft: indentPadding }}
    >
      {/* Depth accent indicator - subtle dot instead of border */}
      {depth > 0 && (
        <div
          className="ct-depth-indicator absolute top-4"
          style={{
            left: `${depth * 20 - 10}px`,
            backgroundColor: depthAccent,
          }}
        />
      )}

      <div className="ct-comment-card rounded-xl p-3 transition-all sm:p-4">
        {/* ── Avatar + Content Row ── */}
        <div className="flex gap-3">
          {/* Avatar */}
          <Avatar className="ct-avatar h-8 w-8 shrink-0 sm:h-9 sm:w-9">
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.displayName} />
            <AvatarFallback
              className="font-ibm-plex-mono text-[10px] font-semibold"
              style={{
                background: `linear-gradient(135deg, ${depthAccent}22, ${depthAccent}44)`,
                color: depthAccent,
              }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Content Column */}
          <div className="min-w-0 flex-1">
            {/* Author header - row with name, username, time */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-libre-baskerville ct-author-name text-[13px] leading-snug font-semibold">
                {comment.author.displayName}
              </span>
              {comment.author.username && (
                <span className="font-ibm-plex-mono ct-username text-[11px]">
                  @{comment.author.username}
                </span>
              )}
              <span className="font-ibm-plex-mono ct-timestamp text-[11px]">{timeAgo}</span>
              {comment.isEdited && (
                <span className="font-ibm-plex-mono ct-edited flex items-center gap-0.5 text-[10px] italic">
                  <Pencil size={9} />
                  edited
                </span>
              )}
            </div>

            {/* Body text */}
            <p className="ct-comment-body font-lora mt-1.5 text-[14px] leading-relaxed whitespace-pre-wrap antialiased sm:text-[15px]">
              {comment.content}
            </p>

            {/* Action row - like, reply count, reply button */}
            <div className="mt-2.5 flex items-center gap-1.5 sm:gap-2">
              <LikeButton likes={likeCount} isLiked={isLiked} onToggle={handleLikeToggle} />

              {/* Reply count indicator */}
              {replyCount > 0 && (
                <span className="ct-reply-count font-ibm-plex-mono flex items-center gap-1 text-[11px] font-medium">
                  <MessageCircle size={12} />
                  {replyCount}
                </span>
              )}

              {/* Reply button */}
              {showReplyButton && canNestDeeper && (
                <button
                  onClick={() => setShowReply((p) => !p)}
                  className="ct-action-btn font-ibm-plex-mono ml-auto flex h-7 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold transition-all"
                  aria-label="Reply to this comment"
                >
                  <CornerDownRight size={12} strokeWidth={2.5} />
                  <span className="hidden sm:inline">Reply</span>
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
      </div>

      {/* ── Nested replies ── */}
      {hasReplies && (
        <div className="mt-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReplies((p) => !p)}
            className="ct-toggle-replies font-ibm-plex-mono mb-1 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all"
            aria-expanded={showReplies}
            style={{ marginLeft: `${(depth + 1) * 20 + 12}px` }}
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
                <div className="space-y-1 pt-1">
                  {comment.replies!.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      depth={depth + 1}
                      maxDepth={maxDepth}
                      showReplyButton={showReplyButton}
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
