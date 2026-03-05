'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { IChapterVersion } from '@/type/chapter/chapter-detail.type';
import { formatDistance } from 'date-fns';
import { CheckCircle2, Clock, GitMerge, History, Pencil } from 'lucide-react';

interface VersionHistoryDialogProps {
  versions: IChapterVersion[];
  currentVersion: number;
}

const EDIT_TYPE_CONFIG: Record<
  IChapterVersion['editType'],
  { label: string; color: string; icon: React.ReactNode }
> = {
  manual_edit: {
    label: 'Refinement',
    color: 'border-blue-200 bg-blue-50/50 text-blue-700',
    icon: <Pencil size={10} />,
  },
  pr_merge: {
    label: 'Contribution',
    color: 'border-brand-pink-500/20 bg-brand-pink-500/5 text-brand-pink-600',
    icon: <GitMerge size={10} />,
  },
  auto_save: {
    label: 'Auto-Save',
    color: 'border-gray-200 bg-gray-50/50 text-gray-500',
    icon: <Clock size={10} />,
  },
  initial_create: {
    label: 'Genesis',
    color: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
    icon: <CheckCircle2 size={10} />,
  },
};

function VersionItem({
  version,
  isCurrent,
  isLast,
}: {
  version: IChapterVersion;
  isCurrent: boolean;
  isLast: boolean;
}) {
  const editConfig = EDIT_TYPE_CONFIG[version.editType] ?? EDIT_TYPE_CONFIG.manual_edit;
  const timeAgo = formatDistance(new Date(version.createdAt), new Date(), {
    addSuffix: true,
  });

  const editorInitials = version.editedByUser
    ? version.editedByUser.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <div className="relative pb-6 last:pb-0">
      {!isLast && (
        <div className="bg-border/30 absolute top-10 bottom-0 left-[18px] w-0.5 rounded-full" />
      )}

      <div
        className={cn(
          'group relative space-y-3 rounded-2xl border p-4 transition-all duration-200',
          isCurrent
            ? 'border-brand-pink-500/30 bg-brand-pink-500/5 ring-brand-pink-500/5 ring-4'
            : 'bg-card/40 border-border/40 hover:border-border hover:bg-white/60'
        )}
      >
        {/* Version row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                'font-ibm-plex-mono flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-bold shadow-xs transition-transform group-hover:scale-110',
                isCurrent
                  ? 'bg-brand-pink-500 text-white'
                  : 'bg-muted/80 border-border/40 text-muted-foreground border'
              )}
            >
              v{version.version}
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    'h-5 gap-1.5 px-2 text-[9px] font-bold tracking-wider uppercase',
                    editConfig.color
                  )}
                >
                  {editConfig.icon}
                  {editConfig.label}
                </Badge>
                {isCurrent && (
                  <Badge className="h-5 border-none bg-emerald-500/10 px-2 text-[9px] font-bold tracking-wider text-emerald-600 uppercase hover:bg-emerald-500/20">
                    Active
                  </Badge>
                )}
              </div>
              <span className="text-muted-foreground/60 font-ibm-plex-mono text-[10px] font-bold tracking-tight">
                {timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Edit reason / summary */}
        {(version.editReason || version.changesSummary) && (
          <div className="bg-muted/30 border-border/40 rounded-xl border border-dashed p-3">
            <p className="text-text-secondary text-xs leading-relaxed">
              {version.editReason || version.changesSummary}
            </p>
          </div>
        )}

        {/* Editor & Stats Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="ring-border/20 h-6 w-6 border-2 border-white shadow-xs ring-1">
                <AvatarImage
                  src={version.editedByUser?.avatarUrl}
                  alt={version.editedByUser?.displayName}
                />
                <AvatarFallback className="bg-muted text-[8px] font-bold">
                  {editorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border border-white bg-emerald-500" />
            </div>
            <span className="text-muted-foreground/80 font-ibm-plex-mono text-[10px] font-bold">
              {version.editedByUser?.displayName || version.editedBy}
            </span>
          </div>

          {version.changeMetadata && (
            <div className="bg-muted/50 font-ibm-plex-mono flex items-center gap-2.5 rounded-lg px-2 py-1 text-[10px] font-bold">
              {version.changeMetadata.wordCountDelta !== undefined && (
                <span
                  className={cn(
                    (version.changeMetadata.wordCountDelta ?? 0) >= 0
                      ? 'text-emerald-600'
                      : 'text-red-500'
                  )}
                >
                  {(version.changeMetadata.wordCountDelta ?? 0) >= 0 ? '+' : ''}
                  {version.changeMetadata.wordCountDelta}w
                </span>
              )}
              <span className="text-muted-foreground/40 text-[8px]">•</span>
              <span className="text-muted-foreground/60">
                {(version.changeMetadata.characterCountDelta ?? 0) >= 0 ? '+' : ''}
                {version.changeMetadata.characterCountDelta}c
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VersionHistoryDialog({ versions, currentVersion }: VersionHistoryDialogProps) {
  const isMobile = useIsMobile();
  const sortedVersions = [...versions].sort((a, b) => b.version - a.version);

  const trigger = (
    <Button
      variant="outline"
      size="sm"
      className="bg-card/40 border-border/40 hover:border-border h-10 gap-2.5 rounded-full px-5 text-xs font-bold shadow-xs backdrop-blur-xs transition-all hover:bg-white/60 active:scale-95"
      aria-label="View version history"
    >
      <History size={14} className="text-brand-pink-500" />
      <span className="text-text-primary">Revision Log</span>
      <Badge
        variant="secondary"
        className="bg-brand-pink-500 hover:bg-brand-pink-500 font-ibm-plex-mono h-5 min-w-[20px] rounded-full px-1.5 text-[9px] font-bold text-white"
      >
        {versions.length}
      </Badge>
    </Button>
  );

  const title = (
    <div className="flex items-center gap-3">
      <div className="bg-brand-pink-500/10 flex h-9 w-9 items-center justify-center rounded-xl">
        <History size={18} className="text-brand-pink-500" />
      </div>
      <div className="flex flex-col gap-0.5 text-left">
        <h2 className="font-libre-baskerville text-base font-bold">Manuscript Revisions</h2>
        <p className="text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
          Timeline of iterative growth
        </p>
      </div>
    </div>
  );

  const content = (
    <div className="flex flex-col gap-6 pt-4 pb-8">
      <ScrollArea className="max-h-[60vh] px-1">
        <div className="pr-4 pb-2">
          {sortedVersions.map((version, index) => (
            <VersionItem
              key={version._id}
              version={version}
              isCurrent={version.version === currentVersion}
              isLast={index === sortedVersions.length - 1}
            />
          ))}

          {versions.length === 0 && (
            <div className="bg-card/20 border-border/40 flex flex-col items-center gap-3 rounded-2xl border border-dashed py-12 text-center">
              <History size={24} className="text-muted-foreground/30" />
              <p className="text-muted-foreground font-ibm-plex-mono text-xs font-bold">
                No archived revisions yet.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="bg-muted/30 border-border/40 flex items-center justify-center rounded-xl border border-dashed py-2.5">
        <p className="text-muted-foreground/60 font-ibm-plex-mono text-[10px] font-bold tracking-widest uppercase">
          End of history log · {versions.length} versions total
        </p>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="max-h-[85vh] px-4">
          <DrawerHeader className="px-0">
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-border/40 bg-card/95 backdrop-blur-xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

export default VersionHistoryDialog;
