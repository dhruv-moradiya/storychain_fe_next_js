'use client';

import { useMemo } from 'react';

import { IComment } from '@/type/chapter/chapter-response.type';

import { useGetInfiniteComments } from '@/services/chapters/chapters.query';

import CommentTree from '../common/comment-tree/comment-tree';
import { ICommentNode } from '../common/comment-tree/comment-tree.types';

interface ChapterCommentsSectionProps {
  chapterSlug: string;
  totalCount?: number;
}

/** Map API IComment → generic ICommentNode for the CommentTree */
function mapComment(c: IComment): ICommentNode {
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
    replies: c.replies?.map(mapComment),
  };
}

export function ChapterCommentsSection({ chapterSlug, totalCount }: ChapterCommentsSectionProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetInfiniteComments({
      chapterSlug,
      limit: 10,
    });

  // eslint-disable-next-line
  const nodes = useMemo<ICommentNode[]>(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.data.docs.map(mapComment));
  }, [data?.pages]);

  return (
    <CommentTree
      comments={nodes}
      maxDepth={4}
      totalCount={totalCount}
      showComposer
      isLoading={isPending}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onLoadMore={fetchNextPage}
      chapterSlug={chapterSlug}
      onSubmitComment={(content) => {
        // TODO: wire up to API with chapterSlug
        console.log('New comment:', content);
      }}
      onSubmitReply={(parentId, content) => {
        // TODO: wire up to API
        console.log('Reply to', parentId, ':', content);
      }}
    />
  );
}

export default ChapterCommentsSection;
