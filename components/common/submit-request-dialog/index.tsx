'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { formatDistanceToNow } from 'date-fns';
import {
  BookOpen,
  Clock,
  FileText,
  GitPullRequestArrow,
  Layers,
  Loader2,
  Sparkles,
} from 'lucide-react';

import { toast } from '@/components/shared/toast/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchAutoSaveDrafts } from '@/services/auto-save/auto-save.query';
import { useCreatePullRequestFromAutoSave } from '@/services/pull-requests/pull-requests.mutation';
import { useGetStoryBasic } from '@/services/stories/stories.query';

import {
  SubmitRequestFormSchema,
  TPullRequestType,
  TSubmitRequestFormData,
} from './types/submit-request.schema';

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
  PullRequestType?: TPullRequestType;

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

function generateDetailedTitle({
  chapterTitle,
  storyTitle,
  parentChapterTitle,
  prType,
}: {
  chapterTitle?: string;
  storyTitle?: string;
  parentChapterTitle?: string;
  prType?: string;
}): string {
  const cleanChapter = chapterTitle?.trim() || 'New Chapter';
  const cleanStory = storyTitle?.trim();
  const prLabel =
    prType === 'edit'
      ? 'Edit Request'
      : prType === 'continuation'
        ? 'Continuation'
        : 'New Branch Proposal';

  const storySuffix = cleanStory ? ` - ${cleanStory}` : '';

  if (parentChapterTitle && parentChapterTitle !== 'root') {
    return `[PR] ${prLabel}: ${cleanChapter} (After: ${parentChapterTitle})${storySuffix}`;
  }

  return `[PR] ${prLabel}: ${cleanChapter}${storySuffix}`;
}

function buildDefaultValues(props: SubmitRequestDialogProps): TSubmitRequestFormData {
  const rawTitle = props.initialData?.title ?? props.draftTitle;
  const initialTitle = props.initialData?.title
    ? props.initialData.title
    : rawTitle
      ? generateDetailedTitle({
          chapterTitle: rawTitle,
          storyTitle: props.storyTitle,
          parentChapterTitle: props.parentChapterTitle,
          prType: props.PullRequestType ?? 'new_branch',
        })
      : '';

  return {
    title: initialTitle,
    description: props.initialData?.description ?? '',
    PullRequestType: props.initialData?.PullRequestType ?? props.PullRequestType ?? 'new_branch',
    storySlug: props.initialData?.storySlug ?? props.storySlug ?? '',
    chapterSlug: props.initialData?.chapterSlug ?? props.chapterSlug ?? '',
    parentChapterSlug: props.initialData?.parentChapterSlug ?? props.parentChapterSlug ?? '',
    draftId: props.initialData?.draftId ?? props.draftId ?? '',
    proposedContent: props.initialData?.proposedContent ?? props.draftContent ?? '',
    isDraft: props.initialData?.isDraft ?? false,
    autoApproveEnabled: props.initialData?.autoApproveEnabled ?? true,
  };
}

function resolvePRType(
  rawType?: string,
  autoSaveType?: string,
  chapterSlug?: string
): 'new_branch' | 'continuation' | 'edit' {
  if (rawType === 'new_branch' || rawType === 'continuation' || rawType === 'edit') {
    return rawType;
  }
  if (rawType === 'edit_chapter' || autoSaveType === 'update_chapter' || Boolean(chapterSlug)) {
    return 'edit';
  }
  return 'new_branch';
}

// ---------------------------------------------------------------------------
// Single-Step Component
// ---------------------------------------------------------------------------

export function SubmitRequestDialog(props: SubmitRequestDialogProps) {
  const { open, onOpenChange, onSubmit, storyTitle } = props;

  const isEditMode = Boolean(props.initialData);

  const form = useForm<TSubmitRequestFormData>({
    resolver: zodResolver(SubmitRequestFormSchema),
    defaultValues: buildDefaultValues(props),
  });

  const { reset, setValue, control } = form;
  const formData = useWatch({ control }) || form.getValues();

  const [userHasEditedTitle, setUserHasEditedTitle] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) {
      setUserHasEditedTitle(false);
    }
  }

  // Reset the form whenever the dialog opens
  useEffect(() => {
    if (open) {
      reset(buildDefaultValues(props));
    }
  }, [open, reset, props]);

  // Fetch autosave drafts
  const { data: draftsData, isLoading: isLoadingDrafts } = useSearchAutoSaveDrafts(10, {
    enabled: open,
  });

  const draftsList = useMemo(() => {
    return draftsData?.data || [];
  }, [draftsData?.data]);

  // Fetch story details if storySlug is known
  const effectiveStorySlug = formData.storySlug || props.storySlug;
  const { data: storyData } = useGetStoryBasic(effectiveStorySlug || '', {
    enabled: open && !!effectiveStorySlug,
  });
  const fetchedStory = storyData?.data;

  // Currently selected draft details
  const selectedDraft = useMemo(() => {
    return draftsList.find((d) => d._id === formData.draftId);
  }, [draftsList, formData.draftId]);

  const displayStoryTitle = storyTitle || fetchedStory?.title || '';

  // Generate detailed title fallback (e.g. "[PR] New Branch Proposal: Chapter 4 — Story Title")
  const autoGeneratedTitle = useMemo(() => {
    const rawChapterTitle =
      selectedDraft?.title?.trim() || props.draftTitle?.trim() || 'New Chapter';
    const validPRType = resolvePRType(
      formData.PullRequestType,
      selectedDraft?.autoSaveType,
      formData.chapterSlug || props.chapterSlug || selectedDraft?.chapterSlug || undefined
    );

    return generateDetailedTitle({
      chapterTitle: rawChapterTitle,
      storyTitle: displayStoryTitle,
      parentChapterTitle: props.parentChapterTitle || props.parentChapterSlug,
      prType: validPRType,
    });
  }, [
    selectedDraft?.title,
    selectedDraft?.autoSaveType,
    selectedDraft?.chapterSlug,
    props.draftTitle,
    props.parentChapterTitle,
    props.parentChapterSlug,
    props.chapterSlug,
    displayStoryTitle,
    formData.PullRequestType,
    formData.chapterSlug,
  ]);

  // Auto-select draftId and pre-fill detailed title if not set
  useEffect(() => {
    if (open && draftsList.length > 0) {
      const activeDraft = props.draftId
        ? draftsList.find((d) => d._id === props.draftId) || draftsList[0]
        : draftsList[0];

      if (activeDraft && (!formData.draftId || formData.draftId !== activeDraft._id)) {
        setValue('draftId', activeDraft._id, { shouldValidate: true });
        if (activeDraft.storySlug) {
          setValue('storySlug', activeDraft.storySlug, { shouldValidate: true });
        }
      }
    }
  }, [open, formData.draftId, draftsList, props.draftId, setValue]);

  // Keep title updated with detailed title if user hasn't edited it manually
  useEffect(() => {
    if (open && !userHasEditedTitle && autoGeneratedTitle) {
      setValue('title', autoGeneratedTitle);
    }
  }, [open, autoGeneratedTitle, userHasEditedTitle, setValue]);

  const { mutate: createPullRequestFromAutoSave, isPending: isSubmitting } =
    useCreatePullRequestFromAutoSave();

  const onFormSubmit = (data: TSubmitRequestFormData) => {
    const targetStorySlug = data.storySlug || props.storySlug || selectedDraft?.storySlug;
    const targetAutoSaveId = data.draftId || props.draftId || selectedDraft?._id;

    if (!targetStorySlug) {
      toast.error('Target story slug is required');
      return;
    }
    if (!targetAutoSaveId) {
      toast.error('Autosave draft ID is required');
      return;
    }

    const finalTitle = data.title?.trim() || autoGeneratedTitle;
    const parentChapterSlug =
      data.parentChapterSlug ||
      props.parentChapterSlug ||
      selectedDraft?.parentChapterSlug ||
      'root';

    const validPRType = resolvePRType(
      data.PullRequestType,
      selectedDraft?.autoSaveType,
      data.chapterSlug || props.chapterSlug || selectedDraft?.chapterSlug || undefined
    );

    createPullRequestFromAutoSave(
      {
        storySlug: targetStorySlug,
        payload: {
          autoSaveId: targetAutoSaveId,
          title: finalTitle,
          description: data.description || '',
          parentChapterSlug,
          prType: validPRType,
          isDraft: data.isDraft ?? false,
        },
      },
      {
        onSuccess: (response) => {
          if (response.data.success) {
            onSubmit?.(data);
            onOpenChange(false);
            reset();
          }
        },
      }
    );
  };

  const previewHtml = props.draftContent || formData.proposedContent || '';

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="border-border bg-card max-h-[90vh] overflow-y-auto p-0 sm:max-w-155">
        <div className="p-6">
          {/* Header */}
          <ResponsiveDialogHeader className="pb-2">
            <ResponsiveDialogTitle className="text-foreground font-libre-baskerville flex items-center gap-2.5 text-xl font-bold">
              <div className="bg-brand-pink-500/15 flex h-9 w-9 items-center justify-center rounded-xl shadow-xs">
                <GitPullRequestArrow className="text-brand-pink-500 h-5 w-5" />
              </div>
              {isEditMode ? 'Edit Submit Request' : 'Create Submit Request'}
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="text-muted-foreground mt-1 text-sm">
              Review details from your autosaved draft and submit your pull request to the story.
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>

          {/* Single-Step Main Content */}
          <div className="space-y-5 py-5">
            {/* Story & Context Header Banner */}
            <div className="from-brand-pink-500/10 via-brand-purple/10 to-brand-teal/10 relative overflow-hidden rounded-xl border bg-linear-to-r p-4 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="bg-background/80 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border shadow-xs backdrop-blur-xs">
                    <BookOpen size={16} className="text-brand-pink-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                      Target Story
                    </p>
                    <h4 className="font-libre-baskerville text-foreground truncate text-sm font-bold sm:text-base">
                      {displayStoryTitle}
                    </h4>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className="bg-background/80 font-ibm-plex-mono border-brand-pink-500/30 text-brand-pink-500 shrink-0 text-xs font-semibold backdrop-blur-xs"
                >
                  <Sparkles size={12} className="mr-1 inline-block" />
                  Autosave Sync
                </Badge>
              </div>
            </div>

            {/* Title Input Field */}
            <div className="space-y-1.5">
              <label className="text-muted-foreground flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
                <span>Submit Request Title</span>
                <span className="text-muted-foreground font-mono text-[10px]">
                  {formData.title?.trim() ? 'Custom Title' : 'Auto-generated'}
                </span>
              </label>
              <Input
                value={formData.title}
                onChange={(e) => {
                  setUserHasEditedTitle(true);
                  setValue('title', e.target.value);
                }}
                placeholder={autoGeneratedTitle}
                className="w-full rounded-lg border text-sm font-medium"
              />
            </div>

            {/* Autosave Draft Selector (if multiple drafts exist) */}
            {draftsList.length > 1 && (
              <div className="space-y-1.5">
                <label className="text-muted-foreground flex items-center justify-between text-xs font-medium tracking-wider uppercase">
                  <span className="flex items-center gap-1.5">
                    <Layers size={13} className="text-brand-teal" /> Select Autosave Record
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {draftsList.length} drafts found
                  </span>
                </label>

                <Select
                  value={formData.draftId || selectedDraft?._id}
                  onValueChange={(val) => {
                    setValue('draftId', val, { shouldValidate: true });
                    const chosen = draftsList.find((d) => d._id === val);
                    if (chosen?.storySlug) {
                      setValue('storySlug', chosen.storySlug, { shouldValidate: true });
                    }
                    setUserHasEditedTitle(false);
                  }}
                >
                  <SelectTrigger className="w-full rounded-lg border font-medium">
                    <SelectValue placeholder="Choose an autosaved draft" />
                  </SelectTrigger>
                  <SelectContent>
                    {draftsList.map((d) => (
                      <SelectItem key={d._id} value={d._id} className="cursor-pointer">
                        <div className="flex w-full items-center justify-between gap-4">
                          <span className="truncate font-medium">
                            {d.title || 'Untitled Draft'}
                          </span>
                          <span className="text-muted-foreground text-[10px]">
                            {d.wordCount || 0} words
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Autosave Details Card */}
            <div className="border-border bg-card space-y-3.5 rounded-xl border p-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                <div>
                  <h4 className="font-libre-baskerville text-foreground text-base font-bold">
                    {selectedDraft?.title || formData.title || props.draftTitle || 'Untitled Draft'}
                  </h4>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    Ready to submit to branch universe
                  </p>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                <div className="bg-muted/50 border-border/60 flex items-center gap-3 rounded-lg border p-2.5">
                  <Clock size={16} className="text-brand-teal shrink-0" />
                  <div className="min-w-0 space-y-1">
                    <p className="text-muted-foreground font-mono text-[9px] uppercase">
                      Last Saved
                    </p>
                    <p className="text-foreground truncate font-medium">
                      {selectedDraft?.lastSavedAt
                        ? `${formatDistanceToNow(new Date(selectedDraft.lastSavedAt))} ago`
                        : 'Just now'}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 border-border/60 flex items-center gap-3 rounded-lg border p-2.5">
                  <FileText size={16} className="text-brand-pink-500 shrink-0" />
                  <div className="min-w-0 space-y-1">
                    <p className="text-muted-foreground font-mono text-[9px] uppercase">Length</p>
                    <p className="text-foreground font-medium">
                      {selectedDraft?.wordCount ??
                        (formData.proposedContent?.split(/\s+/).length || 0)}{' '}
                      words
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 border-border/60 col-span-2 flex items-center gap-3 rounded-lg border p-2.5 sm:col-span-1">
                  <Layers size={16} className="text-brand-purple shrink-0" />
                  <div className="min-w-0 space-y-1">
                    <p className="text-muted-foreground font-mono text-[9px] uppercase">Type</p>
                    <p className="text-foreground truncate font-medium">
                      {selectedDraft?.chapterSlug ? 'Chapter Update' : 'New Chapter Branch'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Draft Content Preview Box */}
            <div className="border-border bg-card space-y-2 rounded-xl border p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                  <FileText size={13} className="text-brand-pink-500" /> Content Preview
                </span>
                <span className="text-muted-foreground font-mono text-[10px]">
                  {isLoadingDrafts ? 'Loading...' : `${selectedDraft?.wordCount || 0} words`}
                </span>
              </div>

              <div className="bg-muted/30 text-foreground/90 max-h-45 max-w-none overflow-y-auto rounded-lg border p-3.5 font-serif text-xs leading-relaxed [&>p]:mb-2">
                {previewHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                ) : (
                  <span className="text-muted-foreground font-sans text-xs italic">
                    Content preview loaded from auto-save record.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <ResponsiveDialogFooter className="flex flex-row items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline-editorial" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => onFormSubmit(form.getValues())}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GitPullRequestArrow className="h-4 w-4" />
              )}
              {isSubmitting ? 'Submitting PR...' : 'Submit Pull Request'}
            </Button>
          </ResponsiveDialogFooter>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
