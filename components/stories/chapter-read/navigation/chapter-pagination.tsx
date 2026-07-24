'use client';

import { IChapterNavInfo } from '@/type/chapter/chapter-response.type';
import { Layers, MoveLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';

interface ChapterPaginationProps {
  previousChapters?: IChapterNavInfo[];
  nextChapters?: IChapterNavInfo[];
  onNavigate: (slug: string) => void;
}

export function ChapterPagination({
  previousChapters = [],
  nextChapters = [],
  onNavigate,
}: ChapterPaginationProps) {
  const hasMultiplePrev = previousChapters.length > 1;
  const hasMultipleNext = nextChapters.length > 1;

  const renderPrevButton = () => {
    if (hasMultiplePrev) {
      return (
        <ResponsiveDialog>
          <ResponsiveDialogTrigger asChild>
            <Button
              variant="ghost"
              className="border-border/50 hover:border-brand-pink-500/30 hover:bg-brand-pink-500/5 group flex h-auto flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors"
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-text-secondary-65 flex items-center gap-2 text-xs">
                  <MoveLeft className="size-3.5" />
                  Previous
                </span>
                <Layers className="text-brand-pink-500/40 group-hover:text-brand-pink-500 size-3.5 transition-colors" />
              </div>
              <span className="text-text-primary line-clamp-1 font-medium">Multiple Paths</span>
            </Button>
          </ResponsiveDialogTrigger>
          <ResponsiveDialogContent className="bg-bg-cream border-border/50 flex flex-col gap-0 p-0 sm:max-w-[480px]">
            <ResponsiveDialogHeader className="border-border/50 relative space-y-4 rounded-t-2xl border-b bg-white/50 px-6 py-5 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-brand-pink-500/10 flex h-11 w-11 items-center justify-center rounded-xl">
                  <Layers className="text-brand-pink-500 h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold tracking-tight">
                    Previous Chapters
                  </ResponsiveDialogTitle>
                  <ResponsiveDialogDescription className="text-text-secondary-65 text-sm">
                    Select a previous path to revisit
                  </ResponsiveDialogDescription>
                </div>
              </div>
            </ResponsiveDialogHeader>
            <ResponsiveDialogBody className="grid gap-2 px-6 py-6">
              {previousChapters.map((chapter) => (
                <Button
                  key={chapter.slug}
                  variant="outline"
                  className="border-border/50 hover:bg-brand-pink-50 hover:border-brand-pink-500/30 dark:hover:bg-brand-pink-500/10 h-auto justify-start p-4 text-left transition-all"
                  onClick={() => onNavigate(chapter.slug)}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-text-primary text-sm font-medium">{chapter.title}</span>
                    <span className="text-text-secondary-65 text-xs">
                      Path {chapter.slug.split('-').pop()}
                    </span>
                  </div>
                </Button>
              ))}
            </ResponsiveDialogBody>
          </ResponsiveDialogContent>
        </ResponsiveDialog>
      );
    }

    if (previousChapters[0]) {
      return (
        <Button
          variant="ghost"
          className="border-border/50 hover:border-brand-pink-500/30 hover:bg-brand-pink-500/5 flex h-auto flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors"
          onClick={() => onNavigate(previousChapters[0].slug)}
        >
          <span className="text-text-secondary-65 flex items-center gap-2 text-xs">
            <MoveLeft className="size-3.5" />
            Previous
          </span>
          <span className="text-text-primary line-clamp-1 font-medium">
            {previousChapters[0].title}
          </span>
        </Button>
      );
    }

    return <div />;
  };

  const renderNextButton = () => {
    if (hasMultipleNext) {
      return (
        <ResponsiveDialog>
          <ResponsiveDialogTrigger asChild>
            <Button
              variant="ghost"
              className="border-border/50 hover:border-brand-pink-500/30 hover:bg-brand-pink-500/5 group flex h-auto flex-col items-end gap-1 rounded-xl border p-4 text-right transition-colors"
            >
              <div className="flex w-full items-center justify-between">
                <Layers className="text-brand-pink-500/40 group-hover:text-brand-pink-500 size-3.5 transition-colors" />
                <span className="text-text-secondary-65 text-xs">Next →</span>
              </div>
              <span className="text-text-primary line-clamp-1 font-medium">Branching Paths</span>
            </Button>
          </ResponsiveDialogTrigger>
          <ResponsiveDialogContent className="bg-bg-cream border-border/50 flex flex-col gap-0 p-0 sm:max-w-[480px]">
            <ResponsiveDialogHeader className="border-border/50 relative space-y-4 rounded-t-2xl border-b bg-white/50 px-6 py-5 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-brand-pink-500/10 flex h-11 w-11 items-center justify-center rounded-xl">
                  <Layers className="text-brand-pink-500 h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold tracking-tight">
                    Continue Story
                  </ResponsiveDialogTitle>
                  <ResponsiveDialogDescription className="text-text-secondary-65 text-sm">
                    Choose which path to follow
                  </ResponsiveDialogDescription>
                </div>
              </div>
            </ResponsiveDialogHeader>
            <ResponsiveDialogBody className="grid gap-2 px-6 py-6">
              {nextChapters.map((chapter) => (
                <Button
                  key={chapter.slug}
                  variant="outline"
                  className="border-border/50 hover:bg-brand-pink-50 hover:border-brand-pink-500/30 dark:hover:bg-brand-pink-500/10 h-auto justify-start p-4 text-left transition-all"
                  onClick={() => onNavigate(chapter.slug)}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-text-primary text-sm font-medium">{chapter.title}</span>
                    <span className="text-text-secondary-65 text-xs">
                      Branch {chapter.slug.split('-').pop()}
                    </span>
                  </div>
                </Button>
              ))}
            </ResponsiveDialogBody>
          </ResponsiveDialogContent>
        </ResponsiveDialog>
      );
    }

    if (nextChapters[0]) {
      return (
        <Button
          variant="ghost"
          className="border-border/50 hover:border-brand-pink-500/30 hover:bg-brand-pink-500/5 flex h-auto flex-col items-end gap-1 rounded-xl border p-4 text-right transition-colors"
          onClick={() => onNavigate(nextChapters[0].slug)}
        >
          <span className="text-text-secondary-65 text-xs">Next →</span>
          <span className="text-text-primary line-clamp-1 font-medium">
            {nextChapters[0].title}
          </span>
        </Button>
      );
    }

    return <div />;
  };

  return (
    <div className="mt-12 grid grid-cols-2 gap-4">
      {renderPrevButton()}
      {renderNextButton()}
    </div>
  );
}
