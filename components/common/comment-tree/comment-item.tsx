'use client';

import { useMemo, useState } from 'react';

import { IComment } from '@/type/chapter/chapter-response.type';
import { formatDistance } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Loader2, MessageSquare, MessageSquareDashed } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useGetInfiniteReplies } from '@/services/chapters/chapters.query';

import { CommentActions } from './comment-actions';
import { CommentContent } from './comment-content';
import { CommentHeader } from './comment-header';
import { CommentTreeSkeleton } from './comment-tree-skeleton';
import type { CommentItemProps, ICommentNode } from './comment-tree.types';
import { getDepthAccent, getInitials } from './comment.utils';
import { ReplyBox } from './reply-box';

/** Map API IComment → ICommentNode (same mapper used elsewhere) */
function mapReplyComment(c: IComment): ICommentNode {
  return {
    id: c._id,
    author: {
      id: c.userId,
      displayName: c.author?.username ?? 'Unknown',
      username: c.author?.username,
      avatarUrl: c.author?.avatarUrl,
    },
    content: c.content,
    votes: { upvotes: c.votes.upvotes, downvotes: c.votes.downvotes },
    createdAt: c.createdAt,
    isEdited: c.isEdited,
    isDeleted: c.isDeleted,
    reportCount: c.reportCount,
    replyCount: c.replyCount,
    replies: c.replies?.map(mapReplyComment),
  };
}

export function CommentItem({
  comment,
  depth,
  maxDepth,
  variant = 'default',
  chapterSlug,
  showReplyButton = true,
  onReply,
  onUpvote,
  onDownvote,
}: CommentItemProps) {
  const isMobile = useIsMobile();
  const [showReply, setShowReply] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.votes.upvotes);
  const [showReplies, setShowReplies] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasRepliesFromAPI = (comment.replyCount ?? 0) > 0;
  const hasInlineReplies = (comment.replies?.length ?? 0) > 0;
  const shouldFetchReplies =
    hasRepliesFromAPI && !hasInlineReplies && (showReplies || isDialogOpen) && !!chapterSlug;

  const {
    data: repliesData,
    fetchNextPage: fetchNextRepliesPage,
    hasNextPage: hasMoreReplies,
    isFetchingNextPage: isFetchingMoreReplies,
    isPending: isLoadingReplies,
  } = useGetInfiniteReplies(
    {
      chapterSlug: chapterSlug ?? '',
      parentCommentId: comment.id,
      limit: 5,
    },
    {
      enabled: shouldFetchReplies,
    }
  );

  // eslint-disable-next-line
  const fetchedReplies = useMemo<ICommentNode[]>(() => {
    if (!repliesData?.pages) return [];
    return repliesData.pages.flatMap((page) => page.data.docs.map(mapReplyComment));
  }, [repliesData?.pages]);

  // Use inline replies if available, otherwise use fetched replies
  const visibleReplies = hasInlineReplies ? comment.replies! : fetchedReplies;

  if (comment.isDeleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="ct-deleted flex items-center gap-3 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-current opacity-40 sm:h-7 sm:w-7">
          <MessageSquareDashed size={12} />
        </div>
        <p className="font-ibm-plex-mono ct-meta-text text-[11px] italic opacity-60 sm:text-xs">
          [Comment removed]
        </p>
      </motion.div>
    );
  }

  const timeAgo = formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true });
  const initials = getInitials(comment.author.displayName);
  const depthAccent = getDepthAccent(depth);
  const canNestDeeper = depth < maxDepth;

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

  function handleToggleReplies() {
    // On mobile, ALL nested replies open in ResponsiveDialog bottom sheet
    if (isMobile) {
      setIsDialogOpen(true);
      if (hasRepliesFromAPI && !hasInlineReplies) {
        setShowReplies(true);
      }
    } else {
      setShowReplies((prev) => !prev);
    }
  }

  const totalReplyCount = comment.replyCount ?? comment.replies?.length ?? 0;

  const paddingLeftVal = isMobile ? '0px' : depth > 0 ? `${Math.min(depth * 16, 64)}px` : '0px';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="group/comment relative overflow-hidden"
        style={{ paddingLeft: paddingLeftVal }}
      >
        {/* Card wrapper — flat style for dialog/lists to remove heavy card background layers */}
        <div
          className={cn(
            'p-3 sm:p-5',
            variant === 'flat'
              ? 'border-border/25 border-b bg-transparent shadow-none'
              : 'ct-comment-card rounded-xl sm:rounded-2xl'
          )}
        >
          <div className="flex min-w-0 gap-2.5 sm:gap-3.5">
            {/* Avatar */}
            <Avatar className="border-border h-8 w-8 shrink-0 border shadow-xs sm:h-10 sm:w-10">
              <AvatarImage src={comment.author.avatarUrl} alt={comment.author.displayName} />
              <AvatarFallback
                className="font-ibm-plex-mono text-[9px] font-bold sm:text-[10px]"
                style={{
                  background: `linear-gradient(135deg, ${depthAccent}18, ${depthAccent}38)`,
                  color: depthAccent,
                }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 overflow-hidden">
              <CommentHeader
                displayName={comment.author.displayName}
                username={comment.author.username}
                timeAgo={timeAgo}
                isEdited={comment.isEdited}
              />

              <CommentContent content={comment.content} />

              <CommentActions
                likes={likeCount}
                isLiked={isLiked}
                replyCount={totalReplyCount}
                canReply={showReplyButton && canNestDeeper}
                onLike={handleLikeToggle}
                onReplyToggle={() => setShowReply((p) => !p)}
              />

              {/* Reply box */}
              <AnimatePresence>
                {showReply && (
                  <ReplyBox
                    variant={variant === 'flat' ? 'flat' : 'default'}
                    commentId={comment.id}
                    authorName={comment.author.username ?? comment.author.displayName}
                    onSubmit={(content) => {
                      return onReply?.(comment.id, content);
                    }}
                    onCancel={() => setShowReply(false)}
                  />
                )}
              </AnimatePresence>

              {/* Show / Hide replies button */}
              {totalReplyCount > 0 && canNestDeeper && (
                <div className="mt-2 sm:mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleReplies}
                    className="ct-show-replies-btn font-ibm-plex-mono text-brand-pink-500 hover:text-brand-pink-600 group/replies h-7 gap-1 rounded-full px-2.5 text-[10px] font-semibold transition-all hover:bg-transparent sm:h-8 sm:gap-1.5 sm:px-3.5 sm:text-[11px]"
                  >
                    {(!isMobile && showReplies) || (isMobile && isDialogOpen) ? (
                      <>
                        <ChevronUp size={12} className="transition-transform sm:size-3.5" />
                        Hide replies
                      </>
                    ) : (
                      <>
                        <ChevronDown
                          size={12}
                          className="transition-transform group-hover/replies:translate-y-0.5 sm:size-3.5"
                        />
                        {totalReplyCount === 1 ? '1 reply' : `${totalReplyCount} replies`}
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Desktop ONLY inline replies section */}
              <AnimatePresence>
                {showReplies && !isMobile && canNestDeeper && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="ct-replies-connector mt-2 space-y-2 overflow-hidden sm:mt-3"
                  >
                    {/* Loading skeleton for replies */}
                    {shouldFetchReplies && isLoadingReplies && (
                      <CommentTreeSkeleton className="flex flex-col space-y-2" />
                    )}

                    {/* Render replies */}
                    {visibleReplies.map((reply) => (
                      <CommentItem
                        key={reply.id}
                        comment={reply}
                        depth={depth + 1}
                        maxDepth={maxDepth}
                        chapterSlug={chapterSlug}
                        showReplyButton={showReplyButton}
                        onReply={onReply}
                        onUpvote={onUpvote}
                        onDownvote={onDownvote}
                      />
                    ))}

                    {/* Load more replies button */}
                    {hasMoreReplies && (
                      <div className="flex justify-start pt-1 pl-3 sm:pl-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => fetchNextRepliesPage()}
                          disabled={isFetchingMoreReplies}
                          className="ct-load-more-replies-btn font-ibm-plex-mono text-brand-pink-500 hover:text-brand-pink-600 h-7 gap-1 rounded-full px-2.5 text-[10px] font-semibold transition-all hover:bg-transparent disabled:opacity-50 sm:text-[11px]"
                        >
                          {isFetchingMoreReplies ? (
                            <>
                              <Loader2 size={12} className="animate-spin" />
                              Loading…
                            </>
                          ) : (
                            'Load more replies'
                          )}
                        </Button>
                      </div>
                    )}

                    {/* Skeleton when fetching more replies */}
                    {isFetchingMoreReplies && (
                      <CommentTreeSkeleton className="flex flex-col space-y-2" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Responsive Dialog for ALL nested comment threads on mobile */}
      {isMobile && (
        <ResponsiveDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <ResponsiveDialogContent className="max-h-[85vh] p-4 sm:max-w-lg">
            <ResponsiveDialogHeader className="border-border/30 mb-3 border-b pb-3 text-left">
              <ResponsiveDialogTitle className="flex items-center gap-2 text-sm font-bold sm:text-base">
                <MessageSquare size={16} className="text-brand-pink-500" />
                Thread Replies
              </ResponsiveDialogTitle>
              <ResponsiveDialogDescription className="text-xs">
                Replies to @{comment.author.username ?? comment.author.displayName}
              </ResponsiveDialogDescription>
            </ResponsiveDialogHeader>

            <ResponsiveDialogBody className="max-h-[65vh] space-y-3 overflow-y-auto py-1">
              {/* Target parent comment summary - clean divider style, no heavy card box fill */}
              <div className="border-border/30 border-b pt-1 pb-3">
                <CommentHeader
                  displayName={comment.author.displayName}
                  username={comment.author.username}
                  timeAgo={timeAgo}
                  isEdited={comment.isEdited}
                />
                <CommentContent content={comment.content} />
              </div>

              <div className="text-text-secondary-65 font-ibm-plex-mono pt-1 text-[10px] font-bold tracking-wider uppercase">
                Replies ({totalReplyCount})
              </div>

              {/* Loading skeleton */}
              {shouldFetchReplies && isLoadingReplies && (
                <CommentTreeSkeleton className="flex flex-col space-y-2" />
              )}

              {/* Render replies with variant="flat" inside dialog so they don't have nested card box backgrounds */}
              <div className="space-y-1">
                {visibleReplies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    depth={0}
                    variant="flat"
                    maxDepth={maxDepth}
                    chapterSlug={chapterSlug}
                    showReplyButton={showReplyButton}
                    onReply={onReply}
                    onUpvote={onUpvote}
                    onDownvote={onDownvote}
                  />
                ))}
              </div>

              {/* Load more replies inside dialog */}
              {hasMoreReplies && (
                <div className="flex justify-center pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fetchNextRepliesPage()}
                    disabled={isFetchingMoreReplies}
                    className="text-brand-pink-500 h-7 text-xs font-semibold"
                  >
                    {isFetchingMoreReplies ? 'Loading…' : 'Load more replies'}
                  </Button>
                </div>
              )}

              {/* Reply box inside dialog */}
              <div className="pt-2">
                <ReplyBox
                  variant="flat"
                  commentId={comment.id}
                  authorName={comment.author.username ?? comment.author.displayName}
                  onSubmit={(content) => {
                    return onReply?.(comment.id, content);
                  }}
                  onCancel={() => {}}
                />
              </div>
            </ResponsiveDialogBody>
          </ResponsiveDialogContent>
        </ResponsiveDialog>
      )}
    </>
  );
}
