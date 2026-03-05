import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext, Controller } from 'react-hook-form';
import { TSubmitRequestFormData } from '../types/submit-request.schema';
import { ChapterOption, StoryOption } from '../types/submit-request-dialog.types';

interface DetailStepProps {
  hasContext: boolean;
  chapters: ChapterOption[];
  stories: StoryOption[];
}

export function DetailStep({ hasContext, chapters, stories }: DetailStepProps) {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<TSubmitRequestFormData>();

  const submitRequestType = watch('submitRequestType');
  const isNewChapter = submitRequestType === 'new_chapter';

  const storyId = watch('storyId');
  const parentChapterSlug = watch('parentChapterSlug');
  const chapterId = watch('chapterId');

  const storyTitle = stories.find((s) => s.id === storyId)?.title;
  const targetId = isNewChapter ? parentChapterSlug : chapterId;
  const targetChapterTitle =
    targetId === 'root' ? 'Story Introduction' : chapters.find((c) => c.id === targetId)?.title;

  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Title
        </Label>
        <Input
          placeholder="e.g., Add new backstory chapter"
          {...register('title')}
          className="border-black/10 bg-white/50 font-mono focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
        />
        {errors.title && <p className="font-mono text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Description
        </Label>
        <Textarea
          placeholder="Describe the changes you're proposing..."
          {...register('description')}
          rows={3}
          className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
        />
        {errors.description && (
          <p className="font-mono text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {hasContext && (
        <div className="space-y-2">
          <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
            {isNewChapter ? 'Insert After' : 'Target Chapter'}
          </Label>
          <Controller
            name={isNewChapter ? 'parentChapterSlug' : 'chapterId'}
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={(field.value as string) || ''}>
                <SelectTrigger className="border-black/10 bg-white/50 font-mono">
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {isNewChapter && (
                    <SelectItem value="root">
                      <span className="flex items-center gap-2 font-mono">
                        <BookOpen className="text-brand-blue h-3.5 w-3.5" />
                        Story Introduction
                      </span>
                    </SelectItem>
                  )}
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id} className="font-mono">
                      {chapter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}

      {!hasContext && targetChapterTitle && (
        <div className="rounded-xl border border-black/5 bg-black/2 p-3">
          <p className="text-text-secondary-65 mb-1 font-mono text-xs uppercase">
            {isNewChapter ? 'Insert After' : 'Target Chapter'}
          </p>
          <p className="text-text-primary font-medium">{targetChapterTitle}</p>
          <p className="text-text-secondary-65 mt-0.5 font-mono text-xs">in {storyTitle}</p>
        </div>
      )}
    </motion.div>
  );
}
