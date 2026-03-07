'use client';

import { motion } from 'framer-motion';
import { Controller, useFormContext } from 'react-hook-form';
import { SUBMIT_REQUEST_TYPES } from '../types/submit-request-dialog.types';
import { TSubmitRequestFormData } from '../types/submit-request.schema';
import { SubmitRequestTypeCard } from './submit-request-type-card';

/**
 * Step 1 — Type
 * The user picks whether this SR is a new chapter, an edit, or a deletion.
 */
export function TypeStep() {
  const { control } = useFormContext<TSubmitRequestFormData>();

  return (
    <Controller
      name="submitRequestType"
      control={control}
      render={({ field }) => (
        <motion.div
          key="type"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          className="space-y-3"
        >
          <p className="text-text-secondary-65 font-mono text-sm">
            Select the type of submit request
          </p>
          {SUBMIT_REQUEST_TYPES.map((type) => (
            <SubmitRequestTypeCard
              key={type.value}
              type={type}
              isSelected={field.value === type.value}
              onSelect={() => field.onChange(type.value)}
            />
          ))}
        </motion.div>
      )}
    />
  );
}
