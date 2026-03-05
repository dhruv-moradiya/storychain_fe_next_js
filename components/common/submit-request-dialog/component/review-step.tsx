import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useFormContext, Controller } from 'react-hook-form';
import { TSubmitRequestFormData, TSubmitRequestLabel } from '../types/submit-request.schema';
import {
  LABELS,
  SUBMIT_REQUEST_TYPES,
  StoryOption,
  ChapterOption,
} from '../types/submit-request-dialog.types';

interface ReviewStepProps {
  stories: StoryOption[];
  chapters: ChapterOption[];
}

export function ReviewStep({ stories, chapters }: ReviewStepProps) {
  const { watch, setValue } = useFormContext<TSubmitRequestFormData>();
  const formData = watch();

  const toggleLabel = (label: TSubmitRequestLabel) => {
    const currentLabels = formData.labels || [];
    const isSelected = currentLabels.includes(label);
    const newLabels: TSubmitRequestLabel[] = isSelected
      ? currentLabels.filter((l) => l !== label)
      : [...currentLabels, label];
    setValue('labels', newLabels);
  };

  // Derive display info
  const storyTitle = stories.find((s) => s.id === formData.storyId)?.title;
  const isNewChapter = formData.submitRequestType === 'new_chapter';
  const targetId = isNewChapter ? formData.parentChapterSlug : formData.chapterId;
  const targetChapterTitle =
    targetId === 'root' ? 'Story Introduction' : chapters.find((c) => c.id === targetId)?.title;

  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-5"
    >
      {/* Labels */}
      <div className="space-y-3">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Labels
        </Label>
        <div className="flex flex-wrap gap-2">
          {LABELS.map((label) => {
            const isSelected = formData.labels?.includes(label.value);
            return (
              <button
                key={label.value}
                type="button"
                onClick={() => toggleLabel(label.value)}
                className={cn(
                  'rounded-full border px-3 py-1.5 font-mono text-xs transition-all',
                  isSelected
                    ? 'bg-brand-blue border-transparent text-white'
                    : 'text-text-secondary-75 border-black/10 hover:border-black/20'
                )}
              >
                {label.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4 rounded-xl border border-black/5 bg-black/2 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">Create as draft</p>
            <p className="text-text-secondary-65 font-mono text-xs">
              Won't be reviewed until marked ready
            </p>
          </div>
          <Controller
            name="isDraft"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
        <div className="h-px bg-black/5" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">Community auto-approval</p>
            <p className="text-text-secondary-65 font-mono text-xs">
              Auto-approve when vote threshold is reached
            </p>
          </div>
          <Controller
            name="autoApproveEnabled"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-black/5 bg-black/2 p-4">
        <p className="text-text-secondary-65 font-mono text-xs font-medium tracking-wider uppercase">
          Summary
        </p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between font-mono text-sm">
            <span className="text-text-secondary-65">Type</span>
            <span className="text-text-primary">
              {SUBMIT_REQUEST_TYPES.find((t) => t.value === formData.submitRequestType)?.label}
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-sm">
            <span className="text-text-secondary-65">Title</span>
            <span className="text-text-primary max-w-[200px] truncate">{formData.title}</span>
          </div>
          {storyTitle && (
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="text-text-secondary-65">Story</span>
              <span className="text-text-primary max-w-[200px] truncate">{storyTitle}</span>
            </div>
          )}
          {targetChapterTitle && (
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="text-text-secondary-65">{isNewChapter ? 'After' : 'Chapter'}</span>
              <span className="text-text-primary max-w-[200px] truncate">{targetChapterTitle}</span>
            </div>
          )}
          <div className="flex items-center justify-between font-mono text-sm">
            <span className="text-text-secondary-65">Status</span>
            <Badge
              className={cn(
                'border-none font-mono text-xs',
                formData.isDraft
                  ? 'bg-brand-orange/15 text-brand-orange'
                  : 'bg-brand-pink-500/15 text-brand-pink-500'
              )}
            >
              {formData.isDraft ? 'Draft' : 'Ready'}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
