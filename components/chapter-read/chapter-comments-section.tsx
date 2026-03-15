'use client';

import type { IComment } from '@/type/chapter/chapter-detail.type';

import { CommentTree } from '@/components/common/comment-tree';
import type { ICommentNode } from '@/components/common/comment-tree';

interface ChapterCommentsSectionProps {
  comments: IComment[];
  chapterSlug: string;
  totalCount?: number;
}

/** Map domain IComment → generic ICommentNode for the CommentTree */
function mapComment(c: IComment): ICommentNode {
  return {
    id: c._id,
    author: {
      id: c.userId,
      displayName: c.user?.displayName ?? 'Unknown',
      username: c.user?.username,
      avatarUrl: c.user?.avatarUrl,
    },
    content: c.content,
    votes: { upvotes: c.votes.upvotes, downvotes: c.votes.downvotes },
    createdAt: c.createdAt,
    isEdited: c.isEdited,
    editedAt: c.editedAt,
    isDeleted: c.isDeleted,
    reportCount: c.reportCount,
    replies: c.replies?.map(mapComment),
  };
}

export function ChapterCommentsSection({
  comments,
  chapterSlug: _chapterSlug,
  totalCount,
}: ChapterCommentsSectionProps) {
  const nodes = comments.map(mapComment);

  return (
    <CommentTree
      comments={nodes}
      maxDepth={4}
      totalCount={totalCount}
      showComposer
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
