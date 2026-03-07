import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: readonly string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mt-4 flex gap-2">
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn(
            'h-1.5 flex-1 rounded-full transition-colors',
            index <= currentStep ? 'bg-brand-blue' : 'bg-black/10'
          )}
          aria-label={`${step} step ${index + 1}`}
        />
      ))}
    </div>
  );
}
