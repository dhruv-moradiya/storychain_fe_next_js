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
import { ChevronLeft, ChevronRight, GitPullRequest } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ContentPreviewStep } from './component/content-preview-step';
import { DetailStep } from './component/detail-step';
import { ReviewStep } from './component/review-step';
import { SelectionStep } from './component/selection/selection-step';
import { StepIndicator } from './component/step-indiacator';
import { TypeStep } from './component/type-step';
import { ChapterOption, DraftOption, StoryOption } from './types/submit-request-dialog.types';
import { SubmitRequestFormSchema, TSubmitRequestFormData } from './types/submit-request.schema';

interface SubmitRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: TSubmitRequestFormData) => void;
  storyId?: string;
  storyTitle?: string;
  storySlug?: string;
  parentChapterSlug?: string;
  parentChapterTitle?: string;
  draftId?: string;
  draftTitle?: string;
  draftContent?: string;
  chapterId?: string;
  submitRequestType?: 'new_chapter' | 'edit_chapter' | 'delete_chapter';
}

// --- MOCK DATA ---
const MOCK_STORIES: StoryOption[] = [
  {
    id: 's1',
    title: 'The Whispering Woods',
    slug: 'whispering-woods',
    genre: 'Fantasy',
    chapterCount: 4,
  },
  {
    id: 's2',
    title: 'Neon Shadows',
    slug: 'neon-shadows',
    genre: 'Cyberpunk',
    chapterCount: 2,
  },
];

const MOCK_CHAPTERS: ChapterOption[] = [
  { id: 'root', title: 'Story Introduction', order: 0 },
  { id: 'c1', title: 'The Silent Grove', order: 1 },
];

const MOCK_DRAFTS: DraftOption[] = [
  {
    id: 'd1',
    title: 'New Chapter Draft',
    content: 'The woods were darker than usual today...',
    updatedAt: '2024-03-04',
    wordCount: 156,
    storySlug: 'whispering-woods',
  },
];

export function SubmitRequestDialog(props: SubmitRequestDialogProps) {
  const { open, onOpenChange, onSubmit } = props;
  const [currentStep, setCurrentStep] = useState(0);

  const hasContext = useMemo(
    () => Boolean(props.storyId && props.storyTitle),
    [props.storyId, props.storyTitle]
  );

  const steps = useMemo(() => {
    return hasContext
      ? ['Type', 'Details', 'Preview', 'Review']
      : ['Type', 'Select', 'Details', 'Preview', 'Review'];
  }, [hasContext]);

  const form = useForm<TSubmitRequestFormData>({
    resolver: zodResolver(SubmitRequestFormSchema),
    defaultValues: {
      title: '',
      description: '',
      submitRequestType: props.submitRequestType || 'new_chapter',
      storyId: props.storyId || '',
      chapterId: props.chapterId || '',
      parentChapterSlug: props.parentChapterSlug || '',
      draftId: props.draftId || '',
      proposedContent: props.draftContent || 'Placeholder content',
      labels: [],
      isDraft: false,
      autoApproveEnabled: true,
    },
  });

  const { handleSubmit, watch, reset, trigger } = form;
  const formData = watch();

  useEffect(() => {
    if (open) {
      reset({
        title: '',
        description: '',
        submitRequestType: props.submitRequestType || 'new_chapter',
        storyId: props.storyId || '',
        chapterId: props.chapterId || '',
        parentChapterSlug: props.parentChapterSlug || '',
        draftId: props.draftId || '',
        proposedContent: props.draftContent || 'Placeholder content',
        labels: [],
        isDraft: false,
        autoApproveEnabled: true,
      });
      setCurrentStep(0);
    }
  }, [open, props, reset]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof TSubmitRequestFormData)[] = [];
    const currentStepName = steps[currentStep];

    if (currentStepName === 'Type') {
      fieldsToValidate = ['submitRequestType'];
    } else if (currentStepName === 'Select') {
      fieldsToValidate = ['storyId'];
      if (formData.submitRequestType === 'new_chapter') {
        fieldsToValidate.push('draftId', 'parentChapterSlug');
      } else {
        fieldsToValidate.push('chapterId');
      }
    } else if (currentStepName === 'Details') {
      fieldsToValidate = ['title', 'description'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onFormSubmit = (data: TSubmitRequestFormData) => {
    onSubmit?.(data);
    onOpenChange(false);
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const renderStepContent = () => {
    const stepName = steps[currentStep];
    switch (stepName) {
      case 'Type':
        return <TypeStep />;
      case 'Select':
        return (
          <SelectionStep stories={MOCK_STORIES} chapters={MOCK_CHAPTERS} drafts={MOCK_DRAFTS} />
        );
      case 'Details':
        return (
          <DetailStep hasContext={hasContext} chapters={MOCK_CHAPTERS} stories={MOCK_STORIES} />
        );
      case 'Preview':
        return <ContentPreviewStep chapters={MOCK_CHAPTERS} drafts={MOCK_DRAFTS} />;
      case 'Review':
        return <ReviewStep stories={MOCK_STORIES} chapters={MOCK_CHAPTERS} />;
      default:
        return null;
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="overflow-y-auto border-black/10 bg-white p-0 max-xl:h-[calc(100vh-10rem)] sm:max-w-[600px] xl:max-w-[calc(100vw-40rem)]">
        <div className="p-6">
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
                    {props.storyTitle}
                  </span>
                </>
              ) : (
                'Select a story and chapter to submit a change request'
              )}
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="min-h-[350px] py-6">
            <AnimatePresence mode="wait">
              <FormProvider {...form}>{renderStepContent()}</FormProvider>
            </AnimatePresence>
          </div>

          <ResponsiveDialogFooter className="mt-6 gap-2 sm:gap-0">
            {!isFirstStep && (
              <Button
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
                onClick={handleNext}
                className="bg-brand-blue hover:bg-brand-blue-alt gap-1 font-mono text-white"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit(onFormSubmit)}
                className="bg-brand-pink-500 hover:bg-brand-pink-400 gap-2 font-mono text-white"
              >
                <GitPullRequest className="h-4 w-4" />
                {formData.isDraft ? 'Create Draft' : 'Submit Request'}
              </Button>
            )}
          </ResponsiveDialogFooter>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
