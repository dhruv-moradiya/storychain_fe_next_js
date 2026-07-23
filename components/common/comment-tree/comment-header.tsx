import { Pencil } from 'lucide-react';

type Props = {
  displayName: string;
  username?: string;
  timeAgo: string;
  isEdited?: boolean;
};

export function CommentHeader({ displayName, username, timeAgo, isEdited }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 sm:gap-x-2">
      <span className="ct-author-name font-libre-baskerville text-[12px] font-semibold sm:text-[14px]">
        {displayName}
      </span>

      {username && (
        <span className="ct-username font-ibm-plex-mono text-[10px] transition-colors sm:text-[11px]">
          @{username}
        </span>
      )}

      <span className="ct-timestamp font-ibm-plex-mono text-[10px] sm:ml-auto sm:text-[11px]">
        {timeAgo}
      </span>

      {isEdited && (
        <span className="ct-edited font-ibm-plex-mono flex items-center gap-0.5 text-[9px] italic sm:gap-1 sm:text-[10px]">
          <Pencil size={8} className="sm:size-2.5" />
          edited
        </span>
      )}
    </div>
  );
}
