import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { getDynamicFields, getSteps } from '../config/submit-request-steps';
import { mapFormToSubmitRequest } from '../schema/submit-request.mapper';
import {
  SubmitRequestFormSchema,
  TSubmitRequestFormData,
} from '../schema/submit-request.form.schema';
import { SubmitRequestDialogProps } from '../types/submit-request-dialog.types';

function getDefaultValues(props: SubmitRequestDialogProps): TSubmitRequestFormData {
  return {
    title: '',
    description: '',
    prType: props.submitRequestType ?? 'new_chapter',
    storyId: props.storyId ?? '',
    labels: [],
    isDraft: false,
    proposedContent: props.draftContent ?? '',
    originalContent: '',
    autoApproveEnabled: true,
    draftId: props.draftId ?? '',
    chapterSlug: props.chapterId ?? '',
    parentChapterSlug: props.parentChapterSlug ?? '',
  };
}

export function useSubmitRequestDialog(props: SubmitRequestDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const hasContext = Boolean(props.storyId && props.storyTitle);
  const steps = useMemo(() => getSteps(hasContext), [hasContext]);
  const defaultValues = useMemo(() => getDefaultValues(props), [props]);

  const form = useForm<TSubmitRequestFormData>({
    resolver: zodResolver(SubmitRequestFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const formData = useWatch({ control: form.control });
  const currentStepConfig = steps[currentStep];

  const next = useCallback(async () => {
    const staticFields = currentStepConfig.fields;
    const dynamicFields = getDynamicFields(currentStepConfig.name, form.getValues());
    const fields = (dynamicFields.length > 0 ? dynamicFields : staticFields).slice();

    const valid = await form.trigger(fields);
    if (valid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, currentStepConfig.fields, currentStepConfig.name, form, steps.length]);

  const back = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const reset = useCallback(() => {
    form.reset(defaultValues);
    setCurrentStep(0);
  }, [defaultValues, form]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        reset();
      }
      props.onOpenChange(nextOpen);
    },
    [props, reset]
  );

  const submit = form.handleSubmit((data) => {
    const payload = mapFormToSubmitRequest(data);
    props.onSubmit?.(payload);
    props.onOpenChange(false);
  });

  return {
    form,
    formData,
    currentStep,
    steps,
    hasContext,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    currentStepConfig,
    next,
    back,
    reset,
    submit,
    handleOpenChange,
  };
}
