import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { TSubmitRequestFormData } from '../schema/submit-request.form.schema';
import { SubmitRequestStepProps } from '../types/submit-request-dialog.types';

export function ContentPreviewStep({ context }: SubmitRequestStepProps) {
  const { watch } = useFormContext<TSubmitRequestFormData>();
  const data = watch();

  const targetId = data.prType === 'new_chapter' ? data.parentChapterSlug : data.chapterSlug;
  const chapterTitle =
    targetId === 'root'
      ? 'Story Introduction'
      : context.chapters.find((chapter) => chapter.id === targetId)?.title;

  return (
    <motion.div
      key="step-preview"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-4"
    >
      <div className="rounded-xl border border-black/10 bg-black/2 p-4">
        <p className="text-text-secondary-65 font-mono text-xs uppercase">Target</p>
        <p className="text-text-primary mt-1 font-medium">
          {chapterTitle || 'No chapter selected'}
        </p>
      </div>

      {data.prType !== 'delete_chapter' && (
        <div className="space-y-2">
          <p className="text-text-secondary-65 font-mono text-xs uppercase">
            Proposed Content Preview
          </p>
          <div className="max-h-[240px] overflow-y-auto rounded-xl border border-black/10 bg-white/60 p-4">
            <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap">
              {data.proposedContent || 'No proposed content yet'}
            </p>
          </div>
        </div>
      )}

      {data.prType === 'edit_chapter' && (
        <div className="space-y-2">
          <p className="text-text-secondary-65 font-mono text-xs uppercase">
            Original Content Snapshot
          </p>
          <div className="max-h-[240px] overflow-y-auto rounded-xl border border-black/10 bg-black/2 p-4">
            <p className="text-text-secondary-75 text-sm leading-relaxed whitespace-pre-wrap">
              {data.originalContent || 'No original content yet'}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
