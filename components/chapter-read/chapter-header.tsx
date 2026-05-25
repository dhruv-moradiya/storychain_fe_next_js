'use client';

import { IChapterDetailExtended } from '@/type';
import { formatDistance } from 'date-fns';
import { Clock, Flag, GitMerge, GitPullRequest } from 'lucide-react';

import { chapterStatusBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInitials } from '@/lib/utils';

import { Separator } from '../ui/separator';

interface ChapterHeaderProps {
  chapter: IChapterDetailExtended;
}

export function ChapterHeader({ chapter }: ChapterHeaderProps) {
  const updatedAt = formatDistance(new Date(chapter.updatedAt), new Date(), { addSuffix: true });
  const createdAt = formatDistance(new Date(chapter.createdAt), new Date(), { addSuffix: true });

  const authorInitials = getInitials(chapter.author?.displayName, '??');

  const normalizedStatus = (chapter.status || 'DRAFT').toUpperCase();

  return (
    <div className="space-y-8">
      {/* Title & Status Row */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            {chapterStatusBadge(normalizedStatus, { size: 'sm', shape: 'pill' })}

            {chapter.isEnding && (
              <Badge
                variant="outline"
                className="bg-brand-pink-500/5 border-brand-pink-500/20 text-brand-pink-600 h-6 gap-1 rounded-full px-3 text-[10px] font-bold tracking-wider uppercase"
              >
                <Flag size={10} /> Ending
              </Badge>
            )}

            {chapter.pullRequest.isPR && (
              <Badge
                variant="outline"
                className="h-6 gap-1.5 rounded-full border-amber-200 bg-amber-50/50 px-3 text-[10px] font-bold tracking-wider text-amber-700 uppercase"
              >
                <GitPullRequest size={10} />
                PR · {chapter.pullRequest.status}
              </Badge>
            )}
          </div>

          <div className="bg-muted/40 font-ibm-plex-mono text-muted-foreground ml-auto flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            <span className="text-primary/70">Version</span>
            <span className="text-text-primary">v{chapter.version}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-libre-baskerville text-text-primary text-3xl leading-[1.15] font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {chapter.title}
        </h1>

        {/* Chapter number & branch info */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <div className="bg-brand-blue/5 border-brand-blue/10 flex items-center gap-2 rounded-lg border px-3 py-1.5">
            <span className="font-ibm-plex-mono text-brand-blue text-[11px] font-bold tracking-widest uppercase">
              Chapter {chapter.chapterNumber}
            </span>
            <Separator orientation="vertical" className="bg-brand-blue/20 h-3" />
            <span className="font-ibm-plex-mono text-text-secondary text-[11px] font-bold tracking-widest uppercase">
              Branch #{chapter.branchIndex}
            </span>
          </div>

          {chapter.ancestorSlugs.length > 0 && (
            <div className="text-muted-foreground flex items-center gap-1.5 font-sans text-xs">
              <GitMerge size={13} className="text-primary/50" />
              <span className="font-medium">{chapter.ancestorSlugs.length} ancestors in path</span>
            </div>
          )}
        </div>
      </div>

      {/* Author & Meta Row */}
      <div className="border-border/40 bg-card/30 flex flex-wrap items-center justify-between gap-6 rounded-2xl border p-4 backdrop-blur-xs">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <Avatar className="ring-brand-pink-500/10 h-11 w-11 border-2 border-white shadow-sm ring-4">
              <AvatarImage
                src={chapter.author?.avatarUrl}
                alt={chapter.author?.displayName || 'Author'}
              />
              <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-600 text-xs font-bold">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-text-primary text-base leading-tight font-bold">
              {chapter.author?.displayName || 'Unknown Author'}
            </span>
            {chapter.author?.username && (
              <span className="text-muted-foreground/80 font-ibm-plex-mono text-[11px] font-medium tracking-wide">
                @{chapter.author.username}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground/50 font-ibm-plex-mono text-[9px] font-bold tracking-widest uppercase">
              Published
            </span>
            <div className="text-text-secondary flex items-center gap-1.5 text-[13px] font-medium">
              <Clock size={13} className="text-brand-blue/70" />
              {createdAt}
            </div>
          </div>

          {chapter.updatedAt !== chapter.createdAt && (
            <>
              <Separator orientation="vertical" className="bg-border/40 hidden h-8 sm:block" />
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground/50 font-ibm-plex-mono text-[9px] font-bold tracking-widest uppercase">
                  Last Edit
                </span>
                <div className="text-text-secondary flex items-center gap-1.5 text-[13px] font-medium">
                  <Clock size={13} className="text-brand-pink-500/70" />
                  {updatedAt}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterHeader;
