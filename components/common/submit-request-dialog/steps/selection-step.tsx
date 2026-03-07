import { motion } from 'framer-motion';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TSubmitRequestFormData } from '../schema/submit-request.form.schema';
import { SubmitRequestStepProps } from '../types/submit-request-dialog.types';

export function SelectionStep({ context }: SubmitRequestStepProps) {
  const { control, watch } = useFormContext<TSubmitRequestFormData>();
  const prType = watch('prType');

  return (
    <motion.div
      key="step-selection"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Story
        </Label>
        <Controller
          name="storyId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="border-black/10 bg-white/50 font-mono">
                <SelectValue placeholder="Select story" />
              </SelectTrigger>
              <SelectContent>
                {context.stories.map((story) => (
                  <SelectItem key={story.id} value={story.id}>
                    {story.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {(prType === 'edit_chapter' || prType === 'new_chapter') && (
        <div className="space-y-2">
          <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
            Draft
          </Label>
          <Controller
            name="draftId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-black/10 bg-white/50 font-mono">
                  <SelectValue placeholder="Select draft" />
                </SelectTrigger>
                <SelectContent>
                  {context.drafts.map((draft) => (
                    <SelectItem key={draft.id} value={draft.id}>
                      {draft.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          {prType === 'new_chapter' ? 'Insert After' : 'Target Chapter'}
        </Label>
        <Controller
          name={prType === 'new_chapter' ? 'parentChapterSlug' : 'chapterSlug'}
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="border-black/10 bg-white/50 font-mono">
                <SelectValue placeholder="Select chapter" />
              </SelectTrigger>
              <SelectContent>
                {prType === 'new_chapter' && (
                  <SelectItem value="root">Story Introduction</SelectItem>
                )}
                {context.chapters.map((chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </motion.div>
  );
}
