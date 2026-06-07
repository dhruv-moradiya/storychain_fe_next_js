'use client';

import { Control, useController, useWatch } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CoinBundleFormInput, RESTRICTION_TYPES } from '../../schema/coin-bundle.schema';

interface RestrictionsSectionProps {
  control: Control<CoinBundleFormInput, unknown>;
}

const restrictionTypeLabels: Record<string, string> = {
  unlimited: 'Unlimited – No purchase restrictions',
  one_time: 'One Time Only',
  daily: 'Daily Limit',
  monthly: 'Monthly Limit',
  lifetime: 'Lifetime Limit',
};

export function RestrictionsSection({ control }: RestrictionsSectionProps) {
  const { field: restrictionTypeField, fieldState: restrictionTypeState } = useController({
    control,
    name: 'restrictions.type',
  });

  const { field: dailyLimitField, fieldState: dailyLimitState } = useController({
    control,
    name: 'restrictions.dailyLimit',
  });

  const { field: monthlyLimitField, fieldState: monthlyLimitState } = useController({
    control,
    name: 'restrictions.monthlyLimit',
  });

  const { field: lifetimeLimitField, fieldState: lifetimeLimitState } = useController({
    control,
    name: 'restrictions.lifetimeLimit',
  });

  const { field: perUserLimitField, fieldState: perUserLimitState } = useController({
    control,
    name: 'restrictions.perUserLimit',
  });

  const restrictionType = useWatch({ control, name: 'restrictions.type' });

  return (
    <FieldGroup>
      {/* Restriction Type */}
      <Field>
        <FieldLabel htmlFor="restriction-type">Restriction Type</FieldLabel>
        <Select
          onValueChange={restrictionTypeField.onChange}
          defaultValue={restrictionTypeField.value}
        >
          <SelectTrigger id="restriction-type" className="w-full">
            <SelectValue placeholder="Select restriction type" />
          </SelectTrigger>
          <SelectContent>
            {RESTRICTION_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {restrictionTypeLabels[type] ?? type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError errors={restrictionTypeState.error ? [restrictionTypeState.error] : []} />
      </Field>

      {/* Conditional limit fields – hidden for unlimited and one_time */}
      {restrictionType !== 'unlimited' && restrictionType !== 'one_time' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {restrictionType === 'daily' && (
            <Field>
              <FieldLabel htmlFor="daily-limit">Daily Limit</FieldLabel>
              <Input
                id="daily-limit"
                type="number"
                min={1}
                placeholder="e.g. 1"
                {...dailyLimitField}
                value={(dailyLimitField.value as number | undefined) ?? ''}
              />
              <FieldError errors={dailyLimitState.error ? [dailyLimitState.error] : []} />
            </Field>
          )}

          {restrictionType === 'monthly' && (
            <Field>
              <FieldLabel htmlFor="monthly-limit">Monthly Limit</FieldLabel>
              <Input
                id="monthly-limit"
                type="number"
                min={1}
                placeholder="e.g. 3"
                {...monthlyLimitField}
                value={(monthlyLimitField.value as number | undefined) ?? ''}
              />
              <FieldError errors={monthlyLimitState.error ? [monthlyLimitState.error] : []} />
            </Field>
          )}

          {restrictionType === 'lifetime' && (
            <Field>
              <FieldLabel htmlFor="lifetime-limit">Lifetime Limit</FieldLabel>
              <Input
                id="lifetime-limit"
                type="number"
                min={1}
                placeholder="e.g. 5"
                {...lifetimeLimitField}
                value={(lifetimeLimitField.value as number | undefined) ?? ''}
              />
              <FieldError errors={lifetimeLimitState.error ? [lifetimeLimitState.error] : []} />
            </Field>
          )}
        </div>
      )}

      {/* Per-User Limit – shown for all non-unlimited types */}
      {restrictionType !== 'unlimited' && (
        <Field>
          <FieldLabel htmlFor="per-user-limit">Per-User Limit</FieldLabel>
          <Input
            id="per-user-limit"
            type="number"
            min={1}
            placeholder="Max purchases per user (optional)"
            {...perUserLimitField}
            value={(perUserLimitField.value as number | undefined) ?? ''}
          />
          <FieldError errors={perUserLimitState.error ? [perUserLimitState.error] : []} />
        </Field>
      )}

      {/* One-Time Only notice */}
      {restrictionType === 'one_time' && (
        <div className="bg-muted/30 rounded-md border px-4 py-3">
          <p className="text-xs font-medium">One-Time Purchase</p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Each user can only purchase this bundle once.
          </p>
        </div>
      )}
    </FieldGroup>
  );
}
