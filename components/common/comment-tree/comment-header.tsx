import { Pencil } from 'lucide-react';

type Props = {
  displayName: string;
  username?: string;
  timeAgo: string;
  isEdited?: boolean;
};

export function CommentHeader({ displayName, username, timeAgo, isEdited }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
      <span className="font-libre-baskerville text-[13px] font-semibold">{displayName}</span>

      {username && (
        <span className="font-ibm-plex-mono text-muted-foreground text-[11px]">@{username}</span>
      )}

      <span className="font-ibm-plex-mono text-muted-foreground text-[11px]">{timeAgo}</span>

      {isEdited && (
        <span className="font-ibm-plex-mono flex items-center gap-1 text-[10px] italic">
          <Pencil size={9} />
          edited
        </span>
      )}
    </div>
  );
}
