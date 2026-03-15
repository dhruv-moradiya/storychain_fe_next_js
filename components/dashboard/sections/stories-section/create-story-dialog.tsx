'use client';

import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, BookOpen, Send } from 'lucide-react';
import { Loader2 } from 'lucide-react';

import { toast } from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { getErrorMessage, getFieldErrorMap } from '@/lib/error';
import { StoryFormSchema, type TStoryFormValues } from '@/lib/schemas/story.schema';
import { useCreateStory } from '@/services/stories/stories.mutation';

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
  const { mutate: createStory, isPending } = useCreateStory();

  const methods = useForm<TStoryFormValues>({
    resolver: zodResolver(StoryFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit, reset, trigger, setError } = methods;

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
    createStory(data, {
      onSuccess: (res) => {
        if (res.data.success) {
          handleOpenChange(false);
          resetForm();
        }
      },
      onError: (error) => {
        // Handle field-level validation errors
        const fieldErrors = getFieldErrorMap(error);
        if (Object.keys(fieldErrors).length > 0) {
          Object.entries(fieldErrors).forEach(([field, message]) => {
            setError(field as keyof TStoryFormValues, {
              type: 'server',
              message: message,
            });
          });
        } else {
          // If no specific field errors, show a general toast
          toast.error(getErrorMessage(error));
        }
      },
    });
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
            isPending={isPending}
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
  isPending,
}: {
  onSubmit: () => void;
  onClose: () => void;
  trigger: (fields?: (keyof TStoryFormValues)[]) => Promise<boolean>;
  isPending: boolean;
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
      <ResponsiveDialogHeader className="border-border/50 relative space-y-4 rounded-t-2xl border-b bg-white/50 px-6 py-5">
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
      <ResponsiveDialogFooter className="border-border/50 gap-3 rounded-b-2xl border-t bg-white/50 px-6 py-4">
        {step === 1 ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 px-5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={isPending}
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
              disabled={isPending}
              className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 gap-2 px-5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isPending}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 min-w-[140px] gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Create Story
                </>
              )}
            </Button>
          </>
        )}
      </ResponsiveDialogFooter>
    </>
  );
}

export default CreateStoryDialog;
