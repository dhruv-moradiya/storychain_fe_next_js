'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { motion } from 'framer-motion';

import { ChapterOption, DraftOption, StoryOption } from '../../types/submit-request-dialog.types';
import { TSubmitRequestFormData } from '../../types/submit-request.schema';
import { ChapterSelection } from './chapter-selection';
import { DraftSelection } from './draft-selection';
import { SelectionSection } from './selection-section';
import { StorySelection } from './story-selection';

type SelectionSubStep = 'draft' | 'story' | 'chapter';

interface SelectionStepProps {
  stories: StoryOption[];
  chapters: ChapterOption[];
  drafts: DraftOption[];
  isLoadingStories?: boolean;
  isLoadingChapters?: boolean;
  isLoadingDrafts?: boolean;
}

export function SelectionStep({
  stories,
  chapters,
  drafts,
  isLoadingStories,
  isLoadingChapters,
  isLoadingDrafts,
}: SelectionStepProps) {
  const { watch, control, setValue } = useFormContext<TSubmitRequestFormData>();
  const formData = watch();

  const isNewChapter = formData.PullRequestType === 'new_chapter';
  // new_chapter and edit_chapter both need a draft
  const needsDraft = isNewChapter || formData.PullRequestType === 'edit_chapter';

  // Determine the currently active sub-step
  const currentSubStep = ((): SelectionSubStep => {
    if (needsDraft && !formData.draftId) return 'draft';
    if (!formData.storySlug) return 'story';
    return 'chapter';
  })();

  // Derived display labels
  const selectedDraftTitle = drafts.find((d) => d.id === formData.draftId)?.title;
  const selectedStoryTitle = stories.find((s) => s.slug === formData.storySlug)?.title;

  const activeChapterSlug = isNewChapter ? formData.parentChapterSlug : formData.chapterSlug;
  const selectedChapterTitle =
    activeChapterSlug === 'root'
      ? 'Story Introduction'
      : chapters.find((c) => c.slug === activeChapterSlug)?.title;

  const getSubStepNumber = (sub: SelectionSubStep): number => {
    if (needsDraft) return sub === 'draft' ? 1 : sub === 'story' ? 2 : 3;
    return sub === 'story' ? 1 : 2;
  };

  return (
    <motion.div
      key="story-selection"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-3"
    >
      {/* Draft Selection (new_chapter / edit_chapter only) */}
      {needsDraft && (
        <Controller
          name="draftId"
          control={control}
          render={({ field }) => (
            <SelectionSection
              stepNumber={getSubStepNumber('draft')}
              title="Select Draft"
              isActive={currentSubStep === 'draft'}
              isCompleted={Boolean(field.value)}
              selectedLabel={selectedDraftTitle}
              onEdit={() => {
                field.onChange('');
                setValue('storySlug', '');
                setValue('chapterSlug', '');
                setValue('parentChapterSlug', '');
              }}
            >
              <DraftSelection
                drafts={drafts}
                selectedDraftId={field.value ?? ''}
                onSelect={field.onChange}
                isLoading={isLoadingDrafts}
              />
            </SelectionSection>
          )}
        />
      )}

      {/* Story Selection */}
      <Controller
        name="storySlug"
        control={control}
        render={({ field }) => (
          <SelectionSection
            stepNumber={getSubStepNumber('story')}
            title="Select Story"
            isActive={currentSubStep === 'story'}
            isCompleted={Boolean(field.value)}
            isDisabled={needsDraft && !formData.draftId}
            selectedLabel={selectedStoryTitle}
            onEdit={() => {
              field.onChange('');
              setValue('chapterSlug', '');
              setValue('parentChapterSlug', '');
            }}
          >
            <StorySelection
              stories={stories}
              selectedStorySlug={field.value ?? ''}
              onSelect={field.onChange}
              isLoading={isLoadingStories}
            />
          </SelectionSection>
        )}
      />

      {/* Chapter Selection */}
      <Controller
        name={isNewChapter ? 'parentChapterSlug' : 'chapterSlug'}
        control={control}
        render={({ field }) => (
          <SelectionSection
            stepNumber={getSubStepNumber('chapter')}
            title={isNewChapter ? 'Insert After Chapter' : 'Select Chapter'}
            isActive={currentSubStep === 'chapter'}
            isCompleted={Boolean(field.value)}
            isDisabled={!formData.storySlug}
            selectedLabel={selectedChapterTitle}
            onEdit={() => field.onChange('')}
          >
            <ChapterSelection
              chapters={chapters}
              selectedChapterSlug={field.value ?? ''}
              onSelect={field.onChange}
              showRootOption={isNewChapter}
              isLoading={isLoadingChapters}
            />
          </SelectionSection>
        )}
      />
    </motion.div>
  );
}
