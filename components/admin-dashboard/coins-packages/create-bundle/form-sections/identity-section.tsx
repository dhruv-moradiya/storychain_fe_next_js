'use client';

import { Control, UseFormSetValue, useController } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { BUNDLE_TYPES, CoinBundleFormInput } from '../../schema/coin-bundle.schema';

interface IdentitySectionProps {
  control: Control<CoinBundleFormInput, unknown>;
  setValue: UseFormSetValue<CoinBundleFormInput>;
}

const bundleTypeLabels: Record<string, string> = {
  standard: 'Standard',
  seasonal: 'Seasonal',
  festival: 'Festival',
  limited_time: 'Limited Time',
  launch_event: 'Launch Event',
  anniversary: 'Anniversary',
  creator_partnership: 'Creator Partnership',
  flash_sale: 'Flash Sale',
  first_purchase: 'First Purchase',
  referral_reward: 'Referral Reward',
};

export function IdentitySection({ control, setValue }: IdentitySectionProps) {
  const { field: nameField, fieldState: nameState } = useController({ control, name: 'name' });
  const { field: slugField, fieldState: slugState } = useController({ control, name: 'slug' });
  const { field: bundleTypeField, fieldState: bundleTypeState } = useController({
    control,
    name: 'bundleType',
  });
  const { field: descriptionField, fieldState: descriptionState } = useController({
    control,
    name: 'description',
  });

  const handleNameChange = (value: string) => {
    nameField.onChange(value);
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    setValue('slug', slug, { shouldValidate: true });
  };

  return (
    <FieldGroup>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="bundle-name">
            Bundle Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="bundle-name"
            placeholder="e.g. Mega Pack"
            {...nameField}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <FieldError errors={nameState.error ? [nameState.error] : []} />
        </Field>

        {/* Slug */}
        <Field>
          <FieldLabel htmlFor="bundle-slug">
            Slug <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="bundle-slug" placeholder="e.g. mega-pack" {...slugField} />
          <FieldError errors={slugState.error ? [slugState.error] : []} />
        </Field>
      </div>

      {/* Bundle Type */}
      <Field>
        <FieldLabel htmlFor="bundle-type">
          Bundle Type <span className="text-destructive">*</span>
        </FieldLabel>
        <Select onValueChange={bundleTypeField.onChange} defaultValue={bundleTypeField.value}>
          <SelectTrigger id="bundle-type" className="w-full">
            <SelectValue placeholder="Select bundle type" />
          </SelectTrigger>
          <SelectContent>
            {BUNDLE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {bundleTypeLabels[type] ?? type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError errors={bundleTypeState.error ? [bundleTypeState.error] : []} />
      </Field>

      {/* Description */}
      <Field>
        <FieldLabel htmlFor="bundle-description">Description</FieldLabel>
        <Textarea
          id="bundle-description"
          placeholder="Short description shown to users (max 500 chars)"
          className="resize-none"
          rows={3}
          {...descriptionField}
        />
        <FieldError errors={descriptionState.error ? [descriptionState.error] : []} />
      </Field>
    </FieldGroup>
  );
}
