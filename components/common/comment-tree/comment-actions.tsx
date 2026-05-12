import { CornerDownRight, MessageCircle } from 'lucide-react';

import { LikeButton } from './like-button';

type Props = {
  likes: number;
  isLiked: boolean;
  replyCount: number;
  canReply: boolean;
  onLike: () => void;
  onReplyToggle: () => void;
};

export function CommentActions({
  likes,
  isLiked,
  replyCount,
  canReply,
  onLike,
  onReplyToggle,
}: Props) {
  return (
    <div className="mt-2.5 flex items-center gap-2">
      <LikeButton likes={likes} isLiked={isLiked} onToggle={onLike} />

      {replyCount > 0 && (
        <span className="font-ibm-plex-mono flex items-center gap-1 text-[11px] font-medium">
          <MessageCircle size={12} />
          {replyCount}
        </span>
      )}

      {canReply && (
        <button
          onClick={onReplyToggle}
          className="font-ibm-plex-mono ml-auto flex h-7 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold transition-all"
        >
          <CornerDownRight size={12} strokeWidth={2.5} />
          <span className="hidden sm:inline">Reply</span>
        </button>
      )}
    </div>
  );
}
