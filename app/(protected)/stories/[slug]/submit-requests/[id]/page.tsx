import { ArrowLeft, Copy, Edit2, FileText, Flag, MoreHorizontal } from 'lucide-react';

import { PR_STATUS_CONFIG } from '@/components/stories/pull-request-detail/pr-status-configs';
import { PR_TYPE_CONFIG } from '@/components/stories/pull-request-detail/pr-type-config';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default async function Page() {
  const statusConfig = PR_STATUS_CONFIG['APPROVED'];
  const typeConfig = PR_TYPE_CONFIG['NEW_CHAPTER'];
  const StatusIcon = statusConfig.icon;
  const TypeIcon = typeConfig.icon;

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="text-text-secondary-75 mb-6 gap-2 font-mono text-sm hover:bg-white/60"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Submit Requests
      </Button>

      {/* Header Card */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-start gap-4">
          {/* Status Icon */}
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
              statusConfig.bgColorLight
            )}
          >
            <StatusIcon className={cn('h-6 w-6', statusConfig.color)} />
          </div>

          {/* Title & Meta */}
          <div className="min-w-0 flex-1">
            <h1 className="text-text-primary font-serif text-2xl leading-tight font-bold">
              Add Gojo's Past Chapter
              <span className="text-text-secondary-65 ml-2 font-mono text-lg font-normal">
                #pr-1
              </span>
            </h1>

            {/* Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge
                className={cn('gap-1 border-0 font-mono text-xs text-white', statusConfig.bgColor)}
              >
                <StatusIcon className="h-3 w-3" />
                {statusConfig.label}
              </Badge>

              <Badge variant="outline" className={cn('gap-1 font-mono text-xs', typeConfig.color)}>
                <TypeIcon className="h-3 w-3" />
                {typeConfig.label}
              </Badge>

              <Badge variant="secondary" className="gap-1 font-mono text-xs">
                <FileText className="h-3 w-3" />
                Draft
              </Badge>
            </div>

            {/* Author Line */}
            <p className="text-text-secondary-70 mt-3 font-mono text-sm">
              <span className="text-text-primary font-medium">Gojo Satoru</span> wants to merge into{' '}
              <span className="bg-brand-blue/15 text-brand-blue rounded px-1.5 py-0.5 font-medium">
                Add Gojo's Past Chapter
              </span>
            </p>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 border-black/10 hover:bg-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2 font-mono text-sm">
                <Edit2 className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 font-mono text-sm">
                <Copy className="h-4 w-4" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-brand-orange gap-2 font-mono text-sm">
                <Flag className="h-4 w-4" />
                Flag for Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
