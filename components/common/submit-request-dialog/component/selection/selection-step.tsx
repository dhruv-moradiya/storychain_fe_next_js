import { motion } from 'framer-motion';
import { ChapterSelection } from './chapter-selection';
import { DraftSelection } from './draft-section';
import { SelectionSection } from './selection-section';
import { StorySelection } from './story-selection';
import { useFormContext, Controller } from 'react-hook-form';
import { TSubmitRequestFormData } from '../../types/submit-request.schema';
import { ChapterOption, DraftOption, StoryOption } from '../../types/submit-request-dialog.types';

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

  const isNewChapter = formData.submitRequestType === 'new_chapter';
  const needsDraft = isNewChapter || formData.submitRequestType === 'edit_chapter';

  // Determine current active sub-step
  const getCurrentSubStep = (): SelectionSubStep => {
    if (needsDraft && !formData.draftId) return 'draft';
    if (!formData.storyId) return 'story';
    return 'chapter';
  };

  const currentSubStep = getCurrentSubStep();

  // Derived labels
  const selectedDraftTitle = drafts.find((d) => d.id === formData.draftId)?.title;
  const selectedStoryTitle = stories.find((s) => s.id === formData.storyId)?.title;

  const targetId = isNewChapter ? formData.parentChapterSlug : formData.chapterId;
  const selectedChapterTitle =
    targetId === 'root' ? 'Story Introduction' : chapters.find((c) => c.id === targetId)?.title;

  const getStepNumber = (step: SelectionSubStep): number => {
    if (needsDraft) return step === 'draft' ? 1 : step === 'story' ? 2 : 3;
    return step === 'story' ? 1 : 2;
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
      {/* Draft Selection */}
      {needsDraft && (
        <Controller
          name="draftId"
          control={control}
          render={({ field }) => (
            <SelectionSection
              stepNumber={getStepNumber('draft')}
              title="Select Draft"
              isActive={currentSubStep === 'draft'}
              isCompleted={Boolean(field.value)}
              selectedLabel={selectedDraftTitle}
              onEdit={() => {
                field.onChange('');
                setValue('storyId', '');
                setValue('chapterId', '');
                setValue('parentChapterSlug', '');
              }}
            >
              <DraftSelection
                drafts={drafts}
                selectedDraftId={field.value || ''}
                onSelect={field.onChange}
                isLoading={isLoadingDrafts}
              />
            </SelectionSection>
          )}
        />
      )}

      {/* Story Selection */}
      <Controller
        name="storyId"
        control={control}
        render={({ field }) => (
          <SelectionSection
            stepNumber={getStepNumber('story')}
            title="Select Story"
            isActive={currentSubStep === 'story'}
            isCompleted={Boolean(field.value)}
            isDisabled={needsDraft && !formData.draftId}
            selectedLabel={selectedStoryTitle}
            onEdit={() => {
              field.onChange('');
              setValue('chapterId', '');
              setValue('parentChapterSlug', '');
            }}
          >
            <StorySelection
              stories={stories}
              selectedStoryId={field.value || ''}
              onSelect={field.onChange}
              isLoading={isLoadingStories}
            />
          </SelectionSection>
        )}
      />

      {/* Chapter Selection */}
      <Controller
        name={isNewChapter ? 'parentChapterSlug' : 'chapterId'}
        control={control}
        render={({ field }) => (
          <SelectionSection
            stepNumber={getStepNumber('chapter')}
            title={isNewChapter ? 'Insert After Chapter' : 'Select Chapter'}
            isActive={currentSubStep === 'chapter'}
            isCompleted={Boolean(field.value)}
            isDisabled={!formData.storyId}
            selectedLabel={selectedChapterTitle}
            onEdit={() => field.onChange('')}
          >
            <ChapterSelection
              chapters={chapters}
              selectedChapterId={field.value || ''}
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
