'use client';

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
import { ChevronRight, GitPullRequest } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { SelectionStep } from './component/selection-step';
import { StepIndicator } from './component/step-indiacator';
import { TypeStep } from './component/type-step';
import { SubmitRequestFormSchema, TSubmitRequestFormData } from './types/submit-request.schema';

interface SubmitRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storyId?: string;
  storyTitle?: string;
  storySlug?: string;
  parentChapterId?: string;
  parentChapterTitle?: string;
  draftId?: string;
  draftTitle?: string;
  draftContent?: string;
}

export function SubmitRequestDialog({ open, onOpenChange }: SubmitRequestDialogProps) {
  // const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<TSubmitRequestFormData>({
    resolver: zodResolver(SubmitRequestFormSchema),
    defaultValues: {
      title: '',
      description: '',
      submitRequestType: 'new_chapter',
      storyId: '',
      storyTitle: '',
      storySlug: '',
      chapterId: '',
      parentChapterId: '',
      parentChapterTitle: '',
      draftId: '',
      draftTitle: '',
      draftContent: '',
      proposedContent: '',
      labels: [],
      isDraft: false,
      autoApproveEnabled: false,
    },
  });

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="overflow-y-auto p-4 max-xl:h-[calc(100vh-10rem)] xl:max-w-[calc(100vw-40rem)]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            <div className="bg-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg">
              <GitPullRequest className="text-brand-pink-500 h-4 w-4" />
            </div>
            Create Submit Request
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription className="font-ibm-plex-mono">
            Propose your changes to be merged into the story.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <StepIndicator steps={['1', '2', '3', '4', '5']} currentStep={0} />

        <div className="min-h-[300px] py-4">
          <AnimatePresence mode="wait">
            <FormProvider {...form}>
              <TypeStep />

              <SelectionStep />
            </FormProvider>
          </AnimatePresence>
        </div>

        <ResponsiveDialogFooter>
          <Button className="bg-brand-blue hover:bg-brand-blue-alt gap-1 font-mono text-white">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
