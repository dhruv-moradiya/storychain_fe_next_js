import {
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { GitPullRequest } from 'lucide-react';

interface SubmitRequestHeaderProps {
  hasContext: boolean;
  storyTitle?: string;
}

export function SubmitRequestHeader({ hasContext, storyTitle }: SubmitRequestHeaderProps) {
  return (
    <ResponsiveDialogHeader>
      <ResponsiveDialogTitle className="text-text-primary flex items-center gap-2 font-serif text-xl">
        <div className="bg-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg">
          <GitPullRequest className="text-brand-pink-500 h-4 w-4" />
        </div>
        Create Submit Request
      </ResponsiveDialogTitle>
      <ResponsiveDialogDescription className="text-text-secondary-70 mt-1 font-mono text-sm">
        {hasContext ? (
          <>
            Submit a change request for{' '}
            <span className="bg-brand-blue/15 text-brand-blue rounded px-1.5 py-0.5 font-medium">
              {storyTitle}
            </span>
          </>
        ) : (
          'Select a story and chapter to submit a change request'
        )}
      </ResponsiveDialogDescription>
    </ResponsiveDialogHeader>
  );
}
