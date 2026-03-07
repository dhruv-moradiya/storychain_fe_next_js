import { FormProvider } from 'react-hook-form';
import { ResponsiveDialog, ResponsiveDialogContent } from '@/components/ui/responsive-dialog';
import { StepIndicator } from './components/step-indicator';
import { SubmitRequestFooter } from './components/submit-request-footer';
import { SubmitRequestHeader } from './components/submit-request-header';
import { SubmitRequestStepRenderer } from './components/submit-request-step-renderer';
import { useSubmitRequestDialog } from './hooks/use-submit-request-dialog';
import { MOCK_DIALOG_CONTEXT, SubmitRequestDialogProps } from './types/submit-request-dialog.types';

export function SubmitRequestDialog(props: SubmitRequestDialogProps) {
  const {
    form,
    formData,
    currentStep,
    steps,
    hasContext,
    isFirstStep,
    isLastStep,
    currentStepConfig,
    next,
    back,
    submit,
    handleOpenChange,
  } = useSubmitRequestDialog(props);

  return (
    <ResponsiveDialog open={props.open} onOpenChange={handleOpenChange}>
      <ResponsiveDialogContent className="overflow-y-auto border-black/10 bg-white p-0 max-xl:h-[calc(100vh-10rem)] sm:max-w-[600px] xl:max-w-[calc(100vw-40rem)]">
        <div className="p-6">
          <SubmitRequestHeader hasContext={hasContext} storyTitle={props.storyTitle} />

          <StepIndicator steps={steps.map((step) => step.name)} currentStep={currentStep} />

          <div className="min-h-[350px] py-6">
            <FormProvider {...form}>
              <SubmitRequestStepRenderer
                step={currentStepConfig}
                context={MOCK_DIALOG_CONTEXT}
                hasContext={hasContext}
              />
            </FormProvider>
          </div>

          <SubmitRequestFooter
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isSubmitting={form.formState.isSubmitting}
            canProceed
            submitLabel={formData.isDraft ? 'Create Draft' : 'Submit Request'}
            onBack={back}
            onNext={next}
            onSubmit={submit}
          />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
