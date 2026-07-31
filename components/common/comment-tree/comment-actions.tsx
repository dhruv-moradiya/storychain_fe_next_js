import { ReportType } from '@/type/reports';
import { CornerDownRight, MessageCircle } from 'lucide-react';

import { ReportButton } from '@/components/common/report-appeal/report-button';

import { LikeButton } from './like-button';

type Props = {
  likes: number;
  isLiked: boolean;
  replyCount: number;
  canReply: boolean;
  onLike: () => void;
  onReplyToggle: () => void;
  commentId?: string;
  chapterSlug?: string;
  storySlug?: string;
};

export function CommentActions({
  likes,
  isLiked,
  replyCount,
  canReply,
  onLike,
  onReplyToggle,
  commentId,
  chapterSlug,
  storySlug,
}: Props) {
  return (
    <div className="mt-2 flex items-center gap-2 sm:mt-3 sm:gap-2.5">
      <LikeButton likes={likes} isLiked={isLiked} onToggle={onLike} />

      {replyCount > 0 && (
        <span className="ct-reply-count font-ibm-plex-mono flex items-center gap-1 text-[10px] font-medium sm:gap-1.5 sm:text-[11px]">
          <MessageCircle size={11} className="sm:size-3" />
          {replyCount}
        </span>
      )}

      {commentId && (
        <ReportButton
          reportType={ReportType.COMMENT}
          relatedCommentId={commentId}
          relatedChapterSlug={chapterSlug}
          relatedStorySlug={storySlug}
          variant="ghost"
          size="icon"
          iconOnly={true}
          className="text-text-secondary-65 h-6 w-6 rounded-full transition-all hover:bg-amber-500/10 hover:text-amber-600"
        />
      )}

      {canReply && (
        <button
          onClick={onReplyToggle}
          className="ct-action-btn font-ibm-plex-mono ml-auto flex h-7 items-center gap-1 px-2.5 text-[10px] font-semibold sm:h-8 sm:gap-1.5 sm:px-3.5 sm:text-[11px]"
        >
          <CornerDownRight size={11} strokeWidth={2.5} className="sm:size-3" />
          <span>Reply</span>
        </button>
      )}
    </div>
  );
}
