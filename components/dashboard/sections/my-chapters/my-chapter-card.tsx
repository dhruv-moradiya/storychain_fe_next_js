'use client';

import {
  ArrowRight,
  BookOpen,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  FileEdit,
  MessageSquare,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Static chapter type for mock data
export interface StaticChapter {
  id: string;
  title: string;
  storyTitle: string;
  storySlug: string;
  status: 'published' | 'pending_approval' | 'rejected' | 'draft' | 'deleted';
  stats: {
    reads: number;
    comments: number;
    childBranches: number;
  };
  updatedAt: string;
}

interface MyChapterCardProps {
  chapter: StaticChapter;
}

const STATUS_CONFIG = {
  published: {
    icon: CheckCircle,
    label: 'Published',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  pending_approval: {
    icon: Clock,
    label: 'Pending',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  rejected: {
    icon: XCircle,
    label: 'Rejected',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  deleted: {
    icon: FileEdit,
    label: 'Deleted',
    color: 'text-gray-500',
    bg: 'bg-gray-50',
  },
  draft: {
    icon: FileEdit,
    label: 'Draft',
    color: 'text-gray-500',
    bg: 'bg-gray-50',
  },
} as const;

// Helper to format numbers
function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

// Format relative time
function getRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export function MyChapterCard({ chapter }: MyChapterCardProps) {
  const statusConfig = STATUS_CONFIG[chapter.status] || STATUS_CONFIG.published;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group/chapter-card bg-card/50 hover:bg-card/50 relative cursor-pointer overflow-hidden rounded-[14px] p-1.5 transition-all duration-300">
      {/* ✨ HOVER GRADIENT OVERLAY */}
      <div className="from-primary/5 via-secondary/10 to-primary/10 pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover/chapter-card:opacity-100" />

      {/* CARD CONTENT */}
      <div className="relative flex flex-1 flex-col justify-between gap-2 rounded-[12px] border p-3 shadow">
        {/* TOP ACCENT */}
        <div className="bg-secondary absolute inset-x-16 top-0 h-[2px] rounded-b-full" />

        {/* STORY TITLE */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border">
              <BookOpen size={16} className="text-muted-foreground" />
            </div>
            <div className="text-muted-foreground min-w-0 truncate text-sm">
              {chapter.storyTitle || 'Unknown Story'}
            </div>
          </div>
        </div>

        {/* STATUS + TITLE */}
        <div className="mb-2 flex flex-col gap-1">
          <span
            className={cn(
              'inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium',
              statusConfig.color,
              statusConfig.bg
            )}
          >
            <StatusIcon size={10} />
            {statusConfig.label}
          </span>
          <h3 className="line-clamp-2 text-[15px] leading-tight font-medium">{chapter.title}</h3>
        </div>

        {/* STATS ROW */}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
          <div className="text-muted-foreground flex items-center gap-1">
            <Eye size={12} />
            {formatNumber(chapter.stats.reads)}
          </div>
          <div className="text-muted-foreground flex items-center gap-1">
            <MessageSquare size={12} />
            {formatNumber(chapter.stats.comments)}
          </div>
          {chapter.stats.childBranches > 0 && (
            <div className="text-muted-foreground flex items-center gap-1">
              <GitBranch size={12} />
              {chapter.stats.childBranches}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative mt-1.5 h-5 overflow-hidden">
        <span className="text-muted-foreground absolute top-0 left-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/chapter-card:-translate-x-[calc(100%+4px)]">
          Updated {getRelativeTime(chapter.updatedAt)}
        </span>

        <span className="absolute top-0 right-0 flex translate-x-full items-center gap-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/chapter-card:-translate-x-2">
          Open Chapter <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}

export default MyChapterCard;
