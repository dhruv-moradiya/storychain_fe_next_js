import { Button } from '@/components/ui/button';
import { ResponsiveDialogFooter } from '@/components/ui/responsive-dialog';
import { ChevronLeft, ChevronRight, GitPullRequest } from 'lucide-react';

interface SubmitRequestFooterProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  canProceed: boolean;
  submitLabel: string;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function SubmitRequestFooter({
  isFirstStep,
  isLastStep,
  isSubmitting,
  canProceed,
  submitLabel,
  onBack,
  onNext,
  onSubmit,
}: SubmitRequestFooterProps) {
  return (
    <ResponsiveDialogFooter className="mt-6 gap-2 sm:gap-0">
      {!isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="gap-1 border-black/10 font-mono hover:bg-black/5"
          disabled={isSubmitting}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      )}

      {!isLastStep ? (
        <Button
          type="button"
          onClick={onNext}
          className="bg-brand-blue hover:bg-brand-blue-alt gap-1 font-mono text-white"
          disabled={isSubmitting || !canProceed}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          className="bg-brand-pink-500 hover:bg-brand-pink-400 gap-2 font-mono text-white"
          disabled={isSubmitting}
        >
          <GitPullRequest className="h-4 w-4" />
          {submitLabel}
        </Button>
      )}
    </ResponsiveDialogFooter>
  );
}
