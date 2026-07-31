'use client';

import { useState } from 'react';

import { ReportReason, ReportType } from '@/type/reports';
import { Flag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCreateReportMutation } from '@/services/reports';

import { ReportDialog } from './report-dialog';

interface ReportButtonProps {
  reportType: ReportType;
  relatedChapterSlug?: string;
  relatedCommentId?: string;
  relatedUserId?: string;
  relatedStorySlug?: string;
  relatedTitle?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  iconOnly?: boolean;
}

export function ReportButton({
  reportType,
  relatedChapterSlug,
  relatedCommentId,
  relatedUserId,
  relatedStorySlug,
  relatedTitle,
  variant = 'ghost',
  size = 'icon',
  className,
  iconOnly = true,
}: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const createReportMutation = useCreateReportMutation();

  const handleSubmit = async (data: { reason: ReportReason; description: string }) => {
    await createReportMutation.mutateAsync({
      reportType,
      relatedChapterSlug,
      relatedCommentId,
      relatedUserId,
      relatedStorySlug,
      reason: data.reason,
      description: data.description,
    });
  };

  const getLabel = () => {
    switch (reportType) {
      case 'CHAPTER':
        return 'Report Chapter';
      case 'COMMENT':
        return 'Report Comment';
      case 'USER':
        return 'Report User';
      case 'STORY':
        return 'Report Story';
      default:
        return 'Report';
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size={size}
              className={className}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              <Flag className="h-3.5 w-3.5" />
              {!iconOnly && <span className="ml-1.5">{getLabel()}</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">
            <p>{getLabel()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ReportDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        reportType={reportType}
        relatedTitle={relatedTitle}
        isLoading={createReportMutation.isPending}
      />
    </>
  );
}

export default ReportButton;
