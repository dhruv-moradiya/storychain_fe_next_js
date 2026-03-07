import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TSubmitRequestFormData } from '../schema/submit-request.form.schema';
import { SubmitRequestStepProps } from '../types/submit-request-dialog.types';

export function DetailStep(_: SubmitRequestStepProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TSubmitRequestFormData>();

  const prType = watch('prType');

  return (
    <motion.div
      key="step-details"
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
        <Input placeholder="e.g., Improve chapter pacing" {...register('title')} />
        {errors.title && <p className="font-mono text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Description
        </Label>
        <Textarea
          rows={3}
          placeholder="Explain why this request is needed..."
          {...register('description')}
        />
        {errors.description && (
          <p className="font-mono text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {prType !== 'delete_chapter' && (
        <div className="space-y-2">
          <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
            Proposed Content
          </Label>
          <Textarea rows={8} placeholder="Proposed content" {...register('proposedContent')} />
          {errors.proposedContent && (
            <p className="font-mono text-xs text-red-500">{errors.proposedContent.message}</p>
          )}
        </div>
      )}

      {prType === 'edit_chapter' && (
        <div className="space-y-2">
          <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
            Original Content
          </Label>
          <Textarea
            rows={6}
            placeholder="Original content snapshot"
            {...register('originalContent')}
          />
          {errors.originalContent && (
            <p className="font-mono text-xs text-red-500">{errors.originalContent.message}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
