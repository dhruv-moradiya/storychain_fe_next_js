'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchAutoSaveDrafts } from '@/services/auto-save/auto-save.query';
import { useSearchChapters } from '@/services/chapters/chapters.query';
import { useGetStoryBasic } from '@/services/stories/stories.query';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GitPullRequestArrow } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { ContentPreviewStep } from './steps/content-preview-step';
import { DetailStep } from './steps/detail-step';
import { ReviewStep } from './steps/review-step';
import { SelectionStep } from './steps/selection/selection-step';
import { STEPS, StepIndicator, StepName } from './steps/step-indicator';
import { TypeStep } from './steps/type-step';
import { ChapterOption, DraftOption, StoryOption } from './types/submit-request-dialog.types';
import {
  SubmitRequestFormSchema,
  TSubmitRequestFormData,
  TSubmitRequestType,
} from './types/submit-request.schema';

// Removed mock data in favor of API integration

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SubmitRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /** Called with the final form data when the user submits. */
  onSubmit?: (data: TSubmitRequestFormData) => void;

  // ── Pre-fill context ──────────────────────────────────────────────────────
  /** Pre-selected story */
  storySlug?: string;
  storyTitle?: string;

  /** Pre-selected chapter context */
  parentChapterSlug?: string;
  parentChapterTitle?: string;
  chapterSlug?: string;

  /** Pre-selected draft */
  draftId?: string;
  draftTitle?: string;
  draftContent?: string;

  /** SR type to pre-select */
  submitRequestType?: TSubmitRequestType;

  // ── Edit mode ─────────────────────────────────────────────────────────────
  /**
   * When provided, the dialog is in "edit" mode and the form is pre-filled
   * with the existing SR data.
   */
  initialData?: Partial<TSubmitRequestFormData>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildDefaultValues(props: SubmitRequestDialogProps): TSubmitRequestFormData {
  return {
    title: props.initialData?.title ?? '',
    description: props.initialData?.description ?? '',
    submitRequestType:
      props.initialData?.submitRequestType ?? props.submitRequestType ?? 'new_chapter',
    storySlug: props.initialData?.storySlug ?? props.storySlug ?? '',
    chapterSlug: props.initialData?.chapterSlug ?? props.chapterSlug ?? '',
    parentChapterSlug: props.initialData?.parentChapterSlug ?? props.parentChapterSlug ?? '',
    draftId: props.initialData?.draftId ?? props.draftId ?? '',
    proposedContent: props.initialData?.proposedContent ?? props.draftContent ?? '',
    labels: props.initialData?.labels ?? [],
    isDraft: props.initialData?.isDraft ?? false,
    autoApproveEnabled: props.initialData?.autoApproveEnabled ?? true,
  };
}

/** Fields that must be valid before leaving each step */
const STEP_VALIDATION_FIELDS: Record<StepName, (keyof TSubmitRequestFormData)[]> = {
  Type: ['submitRequestType'],
  Select: ['storySlug'],
  Details: ['title', 'description'],
  Preview: [],
  Review: [],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SubmitRequestDialog(props: SubmitRequestDialogProps) {
  const { open, onOpenChange, onSubmit, storyTitle } = props;

  /**
   * hasContext: a story was provided via props, so the user doesn't need to
   * pick one from scratch in the Select step.
   */
  const hasContext = Boolean(props.storySlug && props.storyTitle);
  const isEditMode = Boolean(props.initialData);

  const form = useForm<TSubmitRequestFormData>({
    resolver: zodResolver(SubmitRequestFormSchema),
    defaultValues: buildDefaultValues(props),
  });

  const { handleSubmit, watch, reset, trigger, getValues } = form;
  const formData = watch();

  // Reset the form whenever the dialog opens (or props change)
  useEffect(() => {
    if (open) {
      reset(buildDefaultValues(props));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Step navigation state
  const [currentStep, setCurrentStep] = useState(0);

  // Reset step when dialog opens
  useEffect(() => {
    if (open) setCurrentStep(0);
  }, [open]);

  // ---------------------------------------------------------------------------
  // API Queries
  // ---------------------------------------------------------------------------

  const { data: draftsData, isLoading: isLoadingDrafts } = useSearchAutoSaveDrafts(5, {
    enabled: open,
  });

  const { draftsList, drafts } = useMemo(() => {
    const list = draftsData?.data || [];
    const mapped: DraftOption[] = list.map((d) => ({
      id: d._id,
      title: d.title,
      content: props.draftContent ?? '',
      updatedAt: d.lastSavedAt,
      wordCount: d.wordCount,
      storySlug: d.storySlug,
    }));
    return { draftsList: list, drafts: mapped };
  }, [draftsData?.data, props.draftContent]);

  const { data: storyData, isLoading: isLoadingStory } = useGetStoryBasic(formData.storySlug, {
    enabled: open && !!formData.storySlug,
  });
  const fetchedStory = storyData?.data;

  // We only get one story at a time from this API (the one associated with the selected context)
  const stories: StoryOption[] = [];
  if (fetchedStory) {
    stories.push({
      slug: fetchedStory.slug,
      title: fetchedStory.title,
      genre: '', // API doesn't provide these for the basic endpoint
      chapterCount: 0,
    });
  } else if (props.storySlug && props.storyTitle) {
    stories.push({
      slug: props.storySlug,
      title: props.storyTitle,
      genre: '',
      chapterCount: 0,
    });
  }

  const { data: chaptersData, isLoading: isLoadingChapters } = useSearchChapters(
    formData.storySlug,
    {
      enabled: open && !!formData.storySlug,
    }
  );

  const chapters: ChapterOption[] = useMemo(() => {
    const list = chaptersData?.data || [];
    return list.map((c, i) => ({
      slug: c.slug,
      title: c.title,
      order: i,
    }));
  }, [chaptersData?.data]);

  // Auto-fill storySlug and parentChapterSlug/chapterSlug when draftId changes
  useEffect(() => {
    if (formData.draftId && draftsList.length > 0) {
      const selectedDraft = draftsList.find((d) => d._id === formData.draftId);
      if (selectedDraft) {
        if (selectedDraft.storySlug && selectedDraft.storySlug !== formData.storySlug) {
          form.setValue('storySlug', selectedDraft.storySlug, { shouldValidate: true });
        }
      }
    }
  }, [formData.draftId, draftsList, formData.storySlug, form]);

  const handleNext = async () => {
    const stepName = STEPS[currentStep];
    const fields = [...STEP_VALIDATION_FIELDS[stepName]];

    // Add chapter/draft validation to the Select step based on SR type
    if (stepName === 'Select') {
      const type = getValues('submitRequestType');
      if (type === 'new_chapter') {
        fields.push('draftId', 'parentChapterSlug');
      } else if (type === 'edit_chapter') {
        fields.push('draftId', 'chapterSlug');
      } else {
        // delete_chapter
        fields.push('chapterSlug');
      }
    }

    const isValid = await trigger(fields);
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onFormSubmit = (data: TSubmitRequestFormData) => {
    onSubmit?.(data);
    onOpenChange(false);
  };

  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  const renderStep = () => {
    const stepName = STEPS[currentStep];
    switch (stepName) {
      case 'Type':
        return <TypeStep />;
      case 'Select':
        return (
          <SelectionStep
            stories={stories}
            chapters={chapters}
            drafts={drafts}
            isLoadingStories={isLoadingStory}
            isLoadingChapters={isLoadingChapters}
            isLoadingDrafts={isLoadingDrafts}
          />
        );
      case 'Details':
        return <DetailStep hasContext={hasContext} chapters={chapters} stories={stories} />;
      case 'Preview':
        return <ContentPreviewStep chapters={chapters} drafts={drafts} />;
      case 'Review':
        return <ReviewStep stories={stories} chapters={chapters} />;
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="overflow-y-auto border-black/10 bg-white p-0 max-xl:h-[calc(100vh-10rem)] sm:max-w-[600px] xl:max-w-[calc(100vw-50rem)]">
        <div className="p-6">
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle className="text-text-primary flex items-center gap-2 font-serif text-xl">
              <div className="bg-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg">
                <GitPullRequestArrow className="text-brand-pink-500 h-4 w-4" />
              </div>
              {isEditMode ? 'Edit Submit Request' : 'Create Submit Request'}
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

          <StepIndicator steps={STEPS} currentStep={currentStep} />

          <div className="min-h-[350px] py-6">
            <AnimatePresence mode="wait">
              <FormProvider {...form}>{renderStep()}</FormProvider>
            </AnimatePresence>
          </div>

          <ResponsiveDialogFooter className="mt-6 gap-2 sm:gap-0">
            {!isFirstStep && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="gap-1 border-black/10 font-mono hover:bg-black/5"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {!isLastStep ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-brand-blue hover:bg-brand-blue-alt gap-1 font-mono text-white"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit(onFormSubmit)}
                className="bg-brand-pink-500 hover:bg-brand-pink-400 gap-2 font-mono text-white"
              >
                <GitPullRequestArrow className="h-4 w-4" />
                {formData.isDraft ? 'Save as Draft' : isEditMode ? 'Update SR' : 'Submit SR'}
              </Button>
            )}
          </ResponsiveDialogFooter>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
