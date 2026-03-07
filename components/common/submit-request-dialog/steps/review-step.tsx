import { motion } from 'framer-motion';
import { Controller, useFormContext } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { TSubmitRequestFormData } from '../schema/submit-request.form.schema';
import {
  LABELS,
  SUBMIT_REQUEST_TYPES,
  SubmitRequestStepProps,
} from '../types/submit-request-dialog.types';

export function ReviewStep(_: SubmitRequestStepProps) {
  const { watch, setValue, control } = useFormContext<TSubmitRequestFormData>();
  const data = watch();

  const toggleLabel = (value: (typeof LABELS)[number]['value']) => {
    const nextLabels = data.labels.includes(value)
      ? data.labels.filter((item) => item !== value)
      : [...data.labels, value];
    setValue('labels', nextLabels, { shouldDirty: true });
  };

  return (
    <motion.div
      key="step-review"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-5"
    >
      <div className="space-y-3">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Labels
        </Label>
        <div className="flex flex-wrap gap-2">
          {LABELS.map((label) => {
            const selected = data.labels.includes(label.value);
            return (
              <button
                key={label.value}
                type="button"
                onClick={() => toggleLabel(label.value)}
                className={cn(
                  'rounded-full border px-3 py-1.5 font-mono text-xs transition-all',
                  selected
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

      <div className="space-y-4 rounded-xl border border-black/5 bg-black/2 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">Create as draft</p>
            <p className="text-text-secondary-65 font-mono text-xs">
              Will not enter review immediately
            </p>
          </div>
          <Controller
            name="isDraft"
            control={control}
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
              Enable community threshold merge
            </p>
          </div>
          <Controller
            name="autoApproveEnabled"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className="rounded-xl border border-black/5 bg-black/2 p-4">
        <p className="text-text-secondary-65 font-mono text-xs uppercase">Summary</p>
        <div className="mt-3 flex items-center justify-between font-mono text-sm">
          <span className="text-text-secondary-65">Type</span>
          <span>{SUBMIT_REQUEST_TYPES.find((type) => type.value === data.prType)?.label}</span>
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-sm">
          <span className="text-text-secondary-65">Status</span>
          <Badge
            className={
              data.isDraft
                ? 'bg-brand-orange/15 text-brand-orange'
                : 'bg-brand-pink-500/15 text-brand-pink-500'
            }
          >
            {data.isDraft ? 'Draft' : 'Ready'}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}
