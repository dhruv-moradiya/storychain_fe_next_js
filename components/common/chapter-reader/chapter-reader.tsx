import { forwardRef } from 'react';

import { IChapterDetailExtended } from '@/type';
import { Clock, Eye, MessageSquare, ThumbsUp } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_AVATAR_URL, cn } from '@/lib/utils';

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
  ({ chapter, showHeader = true, showStats = true, variant = 'full', className }, ref) => {
    const wordCount = getWordCount(chapter.content);
    const readTime = calculateReadTime(wordCount);

    const isCompact = variant === 'compact';
    const isPreview = variant === 'preview';

    // Normalize author data from different possible types
    const author =
      'clerkId' in chapter.author
        ? {
            username: chapter.author.username,
            avatarUrl: chapter.author.avatarUrl,
            displayName: chapter.author.displayName,
          }
        : {
            username: chapter.author.username || chapter.author.name,
            avatarUrl: chapter.author.avatar,
            displayName: chapter.author.name,
          };

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
        {showHeader && (
          <header className={cn('mb-8 sm:mb-10 md:mb-12 lg:mb-14', isCompact && 'mb-4')}>
            {/* Title */}
            <h1
              className={cn(
                'text-text-primary font-sans font-bold tracking-tight',
                isCompact
                  ? 'text-xl'
                  : 'text-xl leading-tight sm:text-2xl md:text-3xl md:leading-snug lg:text-4xl lg:leading-tight'
              )}
            >
              {chapter.title}
            </h1>

            {/* Meta info */}
            <div
              className={cn(
                'text-text-secondary-65 mt-3 flex items-center gap-3 text-xs sm:mt-4 sm:gap-4 sm:text-sm md:mt-5',
                isCompact && 'mt-2'
              )}
            >
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{readTime} min read</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                  <AvatarImage src={author.avatarUrl || DEFAULT_AVATAR_URL} alt={author.username} />
                  <AvatarFallback className="text-[10px] sm:text-xs">
                    {author.username}
                  </AvatarFallback>
                </Avatar>
                <span>{author.displayName || author.username}</span>
              </div>
            </div>

            {/* Subtle divider */}
            <div className="bg-border/40 mt-6 h-px sm:mt-8 md:mt-10" />
          </header>
        )}

        {/* Content */}
        <article
          className={cn(
            // ========================================
            // 📌 Base Layout
            // ========================================
            'chapter-reader-content',
            'prose dark:prose-invert',
            'max-w-none', // fills parent container — parent handles max width
            'px-0 sm:px-2 md:px-4 lg:px-6',

            // ========================================
            // 📌 Typography — Responsive Paragraph System
            // ========================================
            'prose-p:font-reading',
            'prose-p:text-text-secondary',
            'prose-p:tracking-[0.01em]',

            // Mobile
            'prose-p:text-base',
            'prose-p:leading-[1.8]',
            'prose-p:my-4',

            // sm (≥640px)
            'sm:prose-p:text-[1.0625rem]',
            'sm:prose-p:leading-[1.85]',
            'sm:prose-p:my-5',

            // md (≥768px)
            'md:prose-p:text-[1.125rem]',
            'md:prose-p:leading-[1.9]',
            'md:prose-p:my-6',

            // lg (≥1024px)
            'lg:prose-p:text-[1.1875rem]',
            'lg:prose-p:leading-[1.95]',
            'lg:prose-p:my-7',

            // First paragraph emphasis
            'first:prose-p:text-text-primary',
            'first:prose-p:text-[1.0625rem]',
            'sm:first:prose-p:text-[1.125rem]',
            'md:first:prose-p:text-[1.1875rem]',
            'lg:first:prose-p:text-[1.25rem]',

            // ========================================
            // 📌 Headings — Responsive Hierarchy
            // ========================================
            'prose-headings:font-sans',
            'prose-headings:font-bold',
            'prose-headings:text-text-primary',
            'prose-headings:tracking-tight',

            // H1 — responsive
            'prose-h1:text-[1.75rem] prose-h1:leading-tight prose-h1:mt-0 prose-h1:mb-5',
            'sm:prose-h1:text-[2rem] sm:prose-h1:mb-6',
            'md:prose-h1:text-[2.25rem] md:prose-h1:mb-7',
            'lg:prose-h1:text-[2.5rem] lg:prose-h1:mb-8',

            // H2 — responsive
            'prose-h2:text-[1.375rem] prose-h2:leading-snug prose-h2:mt-10 prose-h2:mb-3',
            'sm:prose-h2:text-[1.5rem] sm:prose-h2:mt-12 sm:prose-h2:mb-4',
            'md:prose-h2:text-[1.625rem] md:prose-h2:mt-14 md:prose-h2:mb-5',
            'lg:prose-h2:text-[1.75rem] lg:prose-h2:mt-16 lg:prose-h2:mb-6',

            // H3 — responsive
            'prose-h3:text-[1.125rem] prose-h3:leading-snug prose-h3:mt-8 prose-h3:mb-2.5',
            'sm:prose-h3:text-[1.25rem] sm:prose-h3:mt-9 sm:prose-h3:mb-3',
            'md:prose-h3:text-[1.375rem] md:prose-h3:mt-10 md:prose-h3:mb-4',

            // H2 section divider
            'prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-2.5',
            'md:prose-h2:pb-3',

            // ========================================
            // 📌 Links (minimal + elegant)
            // ========================================
            'prose-a:text-brand-pink-500',
            'prose-a:no-underline',
            'prose-a:font-medium',
            'prose-a:border-b prose-a:border-brand-pink-500/30',
            'hover:prose-a:border-brand-pink-500',
            'hover:prose-a:text-brand-pink-600',
            'prose-a:transition-all prose-a:duration-200',

            // ========================================
            // 📌 Lists — Responsive spacing
            // ========================================
            'prose-ul:pl-4 prose-ul:my-4',
            'prose-ol:pl-4 prose-ol:my-4',
            'sm:prose-ul:pl-5 sm:prose-ul:my-5',
            'sm:prose-ol:pl-5 sm:prose-ol:my-5',
            'md:prose-ul:my-6 md:prose-ol:my-6',
            'lg:prose-ul:my-7 lg:prose-ol:my-7',

            'prose-ul:space-y-1',
            'prose-ol:space-y-1',
            'sm:prose-ul:space-y-1.5',
            'sm:prose-ol:space-y-1.5',

            // List item text — responsive
            'prose-li:font-reading',
            'prose-li:text-[1rem]',
            'prose-li:leading-[1.8]',
            'prose-li:text-text-secondary',
            'sm:prose-li:text-[1.0625rem]',
            'sm:prose-li:leading-[1.85]',
            'md:prose-li:text-[1.1rem]',

            'prose-li:p:my-0',
            'prose-li:my-0',
            'prose-li:pl-1',
            'prose-li:marker:text-muted-foreground',

            // ========================================
            // 📌 Blockquotes — Responsive premium feel
            // ========================================
            'prose-blockquote:relative',
            'prose-blockquote:border-l-0',
            'prose-blockquote:bg-muted/30',
            'prose-blockquote:rounded-lg',
            'prose-blockquote:px-5 prose-blockquote:py-4',
            'prose-blockquote:my-6',
            'prose-blockquote:text-text-secondary',
            'prose-blockquote:not-italic',

            'sm:prose-blockquote:rounded-xl',
            'sm:prose-blockquote:px-6 sm:prose-blockquote:py-5',
            'sm:prose-blockquote:my-8',
            'md:prose-blockquote:my-10',
            'lg:prose-blockquote:px-8 lg:prose-blockquote:py-6',
            'lg:prose-blockquote:my-12',

            // Left accent bar
            'prose-blockquote:before:absolute',
            'prose-blockquote:before:left-0',
            'prose-blockquote:before:top-4',
            'prose-blockquote:before:bottom-4',
            'prose-blockquote:before:w-[3px]',
            'prose-blockquote:before:bg-brand-pink-500/50',
            'prose-blockquote:before:rounded-full',

            // ========================================
            // 📌 Images — Responsive
            // ========================================
            'prose-img:rounded-lg',
            'prose-img:shadow-sm',
            'prose-img:my-6',
            'sm:prose-img:rounded-xl',
            'sm:prose-img:my-8',
            'md:prose-img:my-10',

            // ========================================
            // 📌 Horizontal Rules (scene breaks)
            // ========================================
            'prose-hr:my-8',
            'prose-hr:border-border/40',
            'sm:prose-hr:my-10',
            'md:prose-hr:my-12',
            'lg:prose-hr:my-14',

            // ========================================
            // 📌 Code
            // ========================================
            'prose-code:text-[0.85rem]',
            'prose-code:bg-muted/60',
            'prose-code:px-1.5',
            'prose-code:py-0.5',
            'prose-code:rounded',
            'prose-code:font-mono',
            'sm:prose-code:text-[0.875rem]',
            'md:prose-code:text-[0.9rem]',

            'prose-pre:bg-muted/50',
            'prose-pre:border prose-pre:border-border/30',
            'prose-pre:rounded-lg',
            'prose-pre:p-3',
            'sm:prose-pre:rounded-xl',
            'sm:prose-pre:p-4',
            'md:prose-pre:p-5',

            // ========================================
            // 📌 Tables — Clean documentation style
            // ========================================
            'prose-table:text-sm',
            'prose-th:text-text-primary prose-th:font-semibold',
            'prose-td:text-text-secondary',
            'prose-th:py-3 prose-td:py-2.5',
            'prose-th:border-border/40 prose-td:border-border/30',

            // ========================================
            // 📌 Strong / Emphasis
            // ========================================
            'prose-strong:text-text-primary prose-strong:font-semibold',
            'prose-em:text-text-secondary',

            // ========================================
            // 📌 Selection
            // ========================================
            'selection:bg-brand-pink-500/20 selection:text-text-primary',

            // ========================================
            // 📌 Compact / Preview modes
            // ========================================
            isCompact &&
              'prose-sm prose-p:text-[0.9375rem] prose-p:leading-[1.7] prose-p:my-3 sm:prose-p:text-base sm:prose-p:my-4',

            isPreview && 'pr-2'
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
