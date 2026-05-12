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
      <div className="flex items-center gap-3 rounded-lg">
        <div className="flex h-6 w-6 items-center justify-center rounded-full">
          <MessageSquareDashed size={11} className="opacity-50" />
        </div>

        <p className="font-ibm-plex-mono text-xs italic">[Comment removed]</p>
      </div>
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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="group border-border relative rounded-2xl border"
      style={{
        paddingLeft: depth > 0 ? `${depth * 20}px` : '0px',
      }}
    >
      <div className="rounded-xl p-3 sm:p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 shrink-0 sm:h-9 sm:w-9">
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.displayName} />

            <AvatarFallback
              className="font-ibm-plex-mono border-border border text-[10px] font-semibold"
              style={{
                background: `linear-gradient(135deg, ${depthAccent}22, ${depthAccent}44)`,
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
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleReplies}
                  className="ct-show-replies-btn font-ibm-plex-mono text-brand-pink-500 hover:text-brand-pink-600 group/replies h-7 gap-1.5 rounded-full px-3 text-[11px] font-semibold transition-all hover:bg-transparent"
                >
                  {showReplies ? (
                    <>
                      <ChevronUp size={13} className="transition-transform" />
                      Hide replies
                    </>
                  ) : (
                    <>
                      <ChevronDown size={13} className="transition-transform" />
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
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="mt-2 space-y-2 overflow-hidden"
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
