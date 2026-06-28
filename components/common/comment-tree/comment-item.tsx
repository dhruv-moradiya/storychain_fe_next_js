'use client';

import { useMemo, useState } from 'react';

import { IComment } from '@/type/chapter/chapter-response.type';
import { formatDistance } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Loader2, MessageSquareDashed } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
  chapterSlug,
  showReplyButton = true,
  onReply,
  onUpvote,
  onDownvote,
}: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.votes.upvotes);
  const [showReplies, setShowReplies] = useState(false);

  const hasRepliesFromAPI = (comment.replyCount ?? 0) > 0;
  const hasInlineReplies = (comment.replies?.length ?? 0) > 0;
  const shouldFetchReplies = hasRepliesFromAPI && !hasInlineReplies && showReplies && !!chapterSlug;

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
        className="ct-deleted flex items-center gap-3 rounded-xl px-4 py-3"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-current opacity-40">
          <MessageSquareDashed size={12} />
        </div>
        <p className="font-ibm-plex-mono ct-meta-text text-xs italic opacity-60">
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
    setShowReplies((prev) => !prev);
  }

  const totalReplyCount = comment.replyCount ?? comment.replies?.length ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group/comment relative"
      style={{
        paddingLeft: depth > 0 ? `${Math.min(depth * 16, 64)}px` : '0px',
      }}
    >
      {/* Card wrapper */}
      <div className="ct-comment-card rounded-2xl p-4 sm:p-5">
        {/* Depth accent line */}
        {depth > 0 && <div className="ct-depth-line" style={{ background: depthAccent }} />}

        <div className="flex gap-3.5">
          {/* Avatar */}
          <Avatar className="border-border h-9 w-9 shrink-0 border shadow-sm sm:h-10 sm:w-10">
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.displayName} />
            <AvatarFallback
              className="font-ibm-plex-mono text-[10px] font-bold"
              style={{
                background: `linear-gradient(135deg, ${depthAccent}18, ${depthAccent}38)`,
                color: depthAccent,
              }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
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
                  commentId={comment.id}
                  authorName={comment.author.username ?? comment.author.displayName}
                  onSubmit={(content) => {
                    onReply?.(comment.id, content);
                  }}
                  onCancel={() => setShowReply(false)}
                />
              )}
            </AnimatePresence>

            {/* Show / Hide replies button */}
            {totalReplyCount > 0 && canNestDeeper && (
              <div className="mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleReplies}
                  className="ct-show-replies-btn font-ibm-plex-mono text-brand-pink-500 hover:text-brand-pink-600 group/replies h-8 gap-1.5 rounded-full px-3.5 text-[11px] font-semibold transition-all hover:bg-transparent"
                >
                  {showReplies ? (
                    <>
                      <ChevronUp size={13} className="transition-transform" />
                      Hide replies
                    </>
                  ) : (
                    <>
                      <ChevronDown
                        size={13}
                        className="transition-transform group-hover/replies:translate-y-0.5"
                      />
                      {totalReplyCount === 1 ? '1 reply' : `${totalReplyCount} replies`}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Replies section */}
            <AnimatePresence>
              {showReplies && canNestDeeper && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="ct-replies-connector mt-3 space-y-2 overflow-hidden"
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
                    <div className="flex justify-start pt-1 pl-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fetchNextRepliesPage()}
                        disabled={isFetchingMoreReplies}
                        className="ct-load-more-replies-btn font-ibm-plex-mono text-brand-pink-500 hover:text-brand-pink-600 h-7 gap-1.5 rounded-full px-3 text-[11px] font-semibold transition-all hover:bg-transparent disabled:opacity-50"
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
  );
}
