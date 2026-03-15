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
          <header className={cn('mb-10', isCompact && 'mb-4')}>
            {/* Title */}
            <h1
              className={cn(
                'text-text-primary font-playfair font-semibold tracking-tight',
                isCompact ? 'text-xl' : 'text-2xl sm:text-3xl'
              )}
            >
              {chapter.title}
            </h1>

            {/* Simple meta - just read time and author */}
            <div
              className={cn(
                'text-text-secondary-65 mt-4 flex items-center gap-4 text-sm',
                isCompact && 'mt-2'
              )}
            >
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={author.avatarUrl || DEFAULT_AVATAR_URL} alt={author.username} />
                  <AvatarFallback className="text-xs">
                    {author.username
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                <span>{author.displayName || author.username}</span>
              </div>
            </div>
          </header>
        )}

        {/* Content */}
        <article
          className={cn(
            // Chapter reader content class for font override
            'chapter-reader-content',
            // Base typography - optimized for reading
            'prose prose-lg prose-gray dark:prose-invert',
            'mx-auto max-w-none',

            // Typography settings for better readability
            'prose-p:text-[1rem] prose-p:leading-[1.9] prose-p:tracking-[0.01em]',
            'prose-p:text-text-secondary prose-p:my-6',

            // Headings
            'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-text-primary',
            'prose-h2:mt-12 prose-h2:mb-5 prose-h2:text-xl',
            'prose-h3:mt-10 prose-h3:mb-4',

            // Links
            'prose-a:text-brand-pink-500 prose-a:font-medium prose-a:no-underline',
            'hover:prose-a:underline',

            // Lists
            'prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1',
            'prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1',
            'prose-li:text-[1.125rem] prose-li:leading-[1.9]',

            // Blockquotes - elegant italic style
            'prose-blockquote:border-l-4',
            'prose-blockquote:border-l-brand-pink-500/40',
            'prose-blockquote:pl-6 prose-blockquote:py-1',
            'prose-blockquote:italic',
            'prose-blockquote:text-text-secondary-65',

            'selection:bg-primary selection:text-muted text-sm',

            // Compact / preview
            isCompact && 'prose-base prose-p:text-base prose-p:leading-[1.75] prose-p:my-4',
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
