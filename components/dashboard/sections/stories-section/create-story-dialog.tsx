'use client';

import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookOpen, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
} from '@/components/ui/responsive-dialog';
import { Button } from '@/components/ui/button';

import { StoryFormSchema, type TStoryFormValues } from '@/lib/schemas/story.schema';
import { BasicInfoStep, SettingsStep, StepIndicator } from './story-form';

interface CreateStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Default form values
const defaultValues: TStoryFormValues = {
  title: '',
  slug: '',
  description: '',
  tags: [],
  status: 'draft',
  settings: {
    isPublic: true,
    allowBranching: true,
    requireApproval: false,
    allowComments: true,
    allowVoting: true,
    genres: [],
    contentRating: 'general',
  },
};

export function CreateStoryDialog({ open, onOpenChange }: CreateStoryDialogProps) {
  const methods = useForm<TStoryFormValues>({
    resolver: zodResolver(StoryFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit, reset, trigger } = methods;

  const resetForm = useCallback(() => {
    reset(defaultValues);
  }, [reset]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        resetForm();
      }
    },
    [onOpenChange, resetForm]
  );

  const onSubmit = (data: TStoryFormValues) => {
    console.log('Create story:', data);
    handleOpenChange(false);
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialogContent
        className="bg-bg-cream flex flex-col gap-0 p-0 sm:max-w-[520px]"
        showCloseButton={false}
        sheetHeight="90%"
      >
        <FormProvider {...methods}>
          <CreateStoryDialogContent
            onSubmit={handleSubmit(onSubmit)}
            onClose={() => handleOpenChange(false)}
            trigger={trigger}
          />
        </FormProvider>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

// Inner component to use step state
function CreateStoryDialogContent({
  onSubmit,
  onClose,
  trigger,
}: {
  onSubmit: () => void;
  onClose: () => void;
  trigger: (fields?: (keyof TStoryFormValues)[]) => Promise<boolean>;
}) {
  const [step, setStep] = React.useState(1);

  const handleNext = useCallback(async () => {
    // Validate step 1 fields before proceeding
    const isValid = await trigger(['title', 'slug', 'description', 'tags']);
    if (isValid) {
      setStep(2);
    }
  }, [trigger]);

  const handleBack = useCallback(() => {
    setStep(1);
  }, []);

  return (
    <>
      {/* Header */}
      <ResponsiveDialogHeader className="border-border/50 relative space-y-4 border-b bg-white/50 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-11 w-11 items-center justify-center rounded-xl">
            <BookOpen className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold tracking-tight">
              Create New Story
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="text-text-secondary-65 text-sm">
              {step === 1 ? 'Start with the basics' : 'Configure your story settings'}
            </ResponsiveDialogDescription>
          </div>
        </div>
        <StepIndicator currentStep={step} />
      </ResponsiveDialogHeader>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {step === 1 ? <BasicInfoStep /> : <SettingsStep />}
      </div>

      {/* Footer */}
      <ResponsiveDialogFooter className="border-border/50 gap-3 border-t bg-white/50 px-6 py-4">
        {step === 1 ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 px-5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
            >
              Next Step
              <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 gap-2 px-5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              type="button"
              onClick={onSubmit}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 min-w-[140px] gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
            >
              <Send className="h-4 w-4" />
              Create Story
            </Button>
          </>
        )}
      </ResponsiveDialogFooter>
    </>
  );
}

export default CreateStoryDialog;
