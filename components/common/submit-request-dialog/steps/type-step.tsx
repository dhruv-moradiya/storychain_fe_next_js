import { motion } from 'framer-motion';
import { Controller, useFormContext } from 'react-hook-form';
import { SUBMIT_REQUEST_TYPES, SubmitRequestStepProps } from '../types/submit-request-dialog.types';
import { TSubmitRequestFormData } from '../schema/submit-request.form.schema';
import { cn } from '@/lib/utils';

export function TypeStep(_: SubmitRequestStepProps) {
  const { control } = useFormContext<TSubmitRequestFormData>();

  return (
    <Controller
      name="prType"
      control={control}
      render={({ field }) => (
        <motion.div
          key="step-type"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          className="space-y-3"
        >
          <p className="text-text-secondary-65 font-mono text-sm">Select the type of change</p>
          {SUBMIT_REQUEST_TYPES.map((type) => {
            const Icon = type.icon;
            const selected = field.value === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => field.onChange(type.value)}
                className={cn(
                  'w-full rounded-xl border p-4 text-left transition-all',
                  selected
                    ? 'border-brand-blue bg-brand-blue/5'
                    : 'border-black/10 hover:border-black/20'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('rounded-lg p-2', type.bgClass)}>
                    <Icon className={cn('h-4 w-4', type.colorClass)} />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">{type.label}</p>
                    <p className="text-text-secondary-65 mt-0.5 text-sm">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      )}
    />
  );
}
