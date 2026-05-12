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
            // Base typography — Literata for body, generous line-height for long-form reading
            'font-reading text-foreground/90 text-[17px] leading-[1.85] tracking-[0.01em] sm:text-[19px] sm:leading-[1.9]',

            // Paragraphs — generous spacing, slight hyphens for justified text
            '[&_p]:mb-6 [&_p]:text-justify [&_p]:hyphens-auto',

            // First paragraph emphasis — slightly larger
            '[&_p:first-of-type]:text-[18px] [&_p:first-of-type]:leading-[1.8] sm:[&_p:first-of-type]:text-[20px]',

            // Drop cap on the first letter of the first paragraph
            '[&_p:first-of-type]:first-letter:float-left [&_p:first-of-type]:first-letter:text-[3.4em]',
            '[&_p:first-of-type]:first-letter:font-libre-baskerville [&_p:first-of-type]:first-letter:leading-[0.85]',
            '[&_p:first-of-type]:first-letter:mr-2 [&_p:first-of-type]:first-letter:font-bold',
            '[&_p:first-of-type]:first-letter:text-brand-pink-500',

            // Headings — Libre Baskerville for an editorial/literary feel
            '[&_h1]:font-libre-baskerville [&_h1]:text-foreground [&_h1]:mt-12 [&_h1]:mb-5 [&_h1]:text-[28px] [&_h1]:leading-[1.25] [&_h1]:font-bold [&_h1]:tracking-[-0.02em] sm:[&_h1]:text-[32px]',
            '[&_h2]:font-libre-baskerville [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-[24px] [&_h2]:leading-[1.3] [&_h2]:font-bold [&_h2]:tracking-[-0.015em] sm:[&_h2]:text-[26px]',
            '[&_h3]:font-libre-baskerville [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[20px] [&_h3]:leading-[1.35] [&_h3]:font-bold [&_h3]:tracking-[-0.01em] sm:[&_h3]:text-[22px]',
            '[&_h4]:font-libre-baskerville [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-[18px] [&_h4]:leading-[1.4] [&_h4]:font-bold sm:[&_h4]:text-[19px]',
            '[&_h5]:font-libre-baskerville [&_h5]:text-foreground/90 [&_h5]:mt-4 [&_h5]:mb-2 [&_h5]:text-[16px] [&_h5]:leading-[1.4] [&_h5]:font-bold',
            '[&_h6]:font-libre-baskerville [&_h6]:text-foreground/75 [&_h6]:mt-4 [&_h6]:mb-1 [&_h6]:text-[14px] [&_h6]:leading-[1.4] [&_h6]:font-semibold [&_h6]:tracking-wide [&_h6]:uppercase',

            // Blockquote — branded accent, subtle background
            '[&_blockquote]:border-brand-pink-400 [&_blockquote]:my-8 [&_blockquote]:border-l-[3px]',
            '[&_blockquote]:bg-brand-pink-50/50 [&_blockquote]:rounded-r-lg [&_blockquote]:px-6 [&_blockquote]:py-4',
            '[&_blockquote]:text-foreground/80 [&_blockquote]:font-serif [&_blockquote]:italic',
            '[&_blockquote]:text-[17px] [&_blockquote]:leading-[1.75] sm:[&_blockquote]:text-[18px]',

            // Lists — proper reading spacing
            '[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-7',
            '[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-7',
            '[&_li]:mb-1.5 [&_li]:pl-1 [&_li]:leading-[1.7]',
            '[&_li_p]:mb-2',

            // Inline styles
            '[&_strong]:text-foreground [&_strong]:font-bold',
            '[&_em]:italic',
            '[&_u]:decoration-brand-pink-300 [&_u]:underline [&_u]:decoration-2 [&_u]:underline-offset-4',

            // Code — refined mono style
            '[&_code]:bg-muted/70 [&_code]:font-ibm-plex-mono [&_code]:text-brand-pink-600 [&_code]:rounded-md [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em]',
            '[&_pre]:bg-muted/50 [&_pre]:border-border/50 [&_pre]:mb-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:p-5',
            '[&_pre_code]:text-foreground/85 [&_pre_code]:bg-transparent [&_pre_code]:p-0',

            // Links — brand-colored with smooth transition
            '[&_a]:text-brand-pink-500 [&_a]:decoration-brand-pink-300/50 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-200',
            '[&_a:hover]:text-brand-pink-600 [&_a:hover]:decoration-brand-pink-500',

            // Horizontal rule — elegant separator
            '[&_hr]:via-border [&_hr]:my-10 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:to-transparent',

            // Images — slightly elevated with shadow
            '[&_img]:my-8 [&_img]:w-full [&_img]:rounded-xl [&_img]:object-cover [&_img]:shadow-md',

            // Tables — refined editorial style
            '[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[15px]',
            '[&_th]:bg-muted/50 [&_th]:border-border/60 [&_th]:text-foreground [&_th]:border [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold',
            '[&_td]:border-border/40 [&_td]:border [&_td]:px-4 [&_td]:py-2.5',

            // Selection color
            '[&_::selection]:bg-brand-pink-100 [&_::selection]:text-foreground'
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
