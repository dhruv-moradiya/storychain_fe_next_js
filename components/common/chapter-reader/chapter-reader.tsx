import { forwardRef } from 'react';

import { IChapterDetailExtended } from '@/type';
import { formatDate } from 'date-fns';
import { CalendarDays, Clock, Eye, MessageSquare, ThumbsUp } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface ChapterAuthor {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
}

export interface ChapterData {
  id: string;
  title: string;
  content: string;
  author: ChapterAuthor;
  storyTitle?: string;
  chapterNumber?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  wordCount?: number;
  readTime?: number;
  status?: 'draft' | 'published' | 'pending';
  stats?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
  parentChapter?: {
    id: string;
    title: string;
  };
  tags?: string[];
}

interface ChapterReaderProps {
  chapter: IChapterDetailExtended | ChapterData;
  showHeader?: boolean;
  showStats?: boolean;
  variant?: 'full' | 'compact' | 'preview';
  className?: string;
}

function calculateReadTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

function getWordCount(content: string): number {
  const text = content.replace(/<[^>]*>/g, '').trim();
  return text ? text.split(/\s+/).length : 0;
}

const ChapterReader = forwardRef<HTMLDivElement, ChapterReaderProps>(
  ({ chapter, showStats = true, variant = 'full', className }, ref) => {
    const wordCount = getWordCount(chapter.content);
    const readTime = calculateReadTime(wordCount);

    const isCompact = variant === 'compact';

    const normalizedStats = chapter.stats
      ? {
          reads:
            'reads' in chapter.stats
              ? chapter.stats.reads
              : (chapter.stats as { views?: number }).views || 0,
          comments: chapter.stats.comments || 0,
          likes:
            'votes' in chapter
              ? chapter.votes.upvotes
              : (chapter.stats as { likes?: number }).likes || 0,
        }
      : null;

    return (
      <div ref={ref} className={cn('chapter-reader', className)}>
        {/* Header - Clean and minimal */}
        {true && (
          <header className="mb-10 space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold sm:text-4xl">{chapter.title}</h1>

            {/* Meta */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left side */}
              <div className="text-text-secondary-65 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} min read</span>
                </div>

                <span className="text-border">•</span>

                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(new Date(), 'MMM dd, yyyy')}</span>
                </div>
              </div>

              {/* Author */}
              <div className="bg-muted/40 flex items-center gap-3 rounded-xl border px-3 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>

                <div className="flex flex-col leading-tight">
                  <span className="text-text-primary text-sm font-medium">
                    {chapter.author.username}
                  </span>
                  <span className="text-text-secondary-65 text-xs">Author</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="bg-border/50 h-px w-full" />
          </header>
        )}

        {/* Content */}
        <article
          className={cn(
            'font-reading text-base leading-relaxed sm:text-lg',

            // Paragraphs
            '[&_p]:mb-4 [&_p]:text-justify',

            // Headings
            '[&_h1]:mt-6 [&_h1]:mb-4 [&_h1]:font-sans [&_h1]:text-3xl [&_h1]:leading-tight [&_h1]:font-bold [&_h1]:tracking-tight',
            '[&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:font-bold [&_h2]:tracking-tight',
            '[&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:leading-tight [&_h3]:font-bold [&_h3]:tracking-tight',
            '[&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:font-sans [&_h4]:text-lg [&_h4]:leading-tight [&_h4]:font-bold [&_h4]:tracking-tight',
            '[&_h5]:font-sans [&_h5]:text-base [&_h5]:leading-tight [&_h5]:font-bold [&_h5]:tracking-tight',
            '[&_h6]:font-sans [&_h6]:text-sm [&_h6]:leading-tight [&_h6]:font-bold [&_h6]:tracking-tight',

            // Blockquote
            '[&_blockquote]:border-primary [&_blockquote]:text-muted-foreground [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic',

            // Lists
            '[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6',
            '[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6',
            '[&_li]:mb-1',

            // Inline styles
            '[&_strong]:font-semibold',
            '[&_em]:italic',
            '[&_u]:underline',

            // Code
            '[&_code]:bg-muted [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm',
            '[&_pre]:bg-muted [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4',

            // Links
            '[&_a]:text-primary [&_a]:underline [&_a:hover]:opacity-80',

            // Horizontal line
            '[&_hr]:border-muted [&_hr]:my-6',

            // Images
            '[&_img]:my-4 [&_img]:rounded-lg',

            // Tables (optional but nice)
            '[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse',
            '[&_th]:bg-muted [&_th]:border [&_th]:p-2 [&_th]:text-left',
            '[&_td]:border [&_td]:p-2'
          )}
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />

        {/* Stats Footer */}
        {showStats && normalizedStats && !isCompact && (
          <>
            <Separator className="my-6" />
            <div className="text-muted-foreground flex items-center gap-6 text-sm">
              {normalizedStats.reads !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{normalizedStats.reads.toLocaleString()} reads</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4" />
                <span>{normalizedStats.likes} likes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span>{normalizedStats.comments} comments</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

ChapterReader.displayName = 'ChapterReader';

export { ChapterReader };
