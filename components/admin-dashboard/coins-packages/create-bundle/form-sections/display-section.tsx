'use client';

import { Control, useController } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { CoinBundleFormInput } from '../../schema/coin-bundle.schema';

interface DisplaySectionProps {
  control: Control<CoinBundleFormInput, unknown>;
}

export function DisplaySection({ control }: DisplaySectionProps) {
  const { field: badgeField, fieldState: badgeState } = useController({
    control,
    name: 'promotionalBadge',
  });

  const { field: taglineField, fieldState: taglineState } = useController({
    control,
    name: 'marketingTagline',
  });

  const { field: displayOrderField, fieldState: displayOrderState } = useController({
    control,
    name: 'displayOrder',
  });

  const { field: isFeaturedField } = useController({ control, name: 'isFeatured' });
  const { field: isPopularField } = useController({ control, name: 'isPopular' });

  return (
    <FieldGroup>
      {/* Promotional Badge */}
      <Field>
        <FieldLabel htmlFor="promotional-badge">Promotional Badge</FieldLabel>
        <Input
          id="promotional-badge"
          placeholder="e.g. 🔥 Hot Deal"
          maxLength={50}
          {...badgeField}
        />
        <FieldError errors={badgeState.error ? [badgeState.error] : []} />
      </Field>

      {/* Marketing Tagline */}
      <Field>
        <FieldLabel htmlFor="marketing-tagline">Marketing Tagline</FieldLabel>
        <Input
          id="marketing-tagline"
          placeholder="e.g. Best value for power readers!"
          maxLength={150}
          {...taglineField}
        />
        <FieldError errors={taglineState.error ? [taglineState.error] : []} />
      </Field>

      {/* Display Order */}
      <Field>
        <FieldLabel htmlFor="display-order">Display Order</FieldLabel>
        <Input
          id="display-order"
          type="number"
          min={0}
          placeholder="0"
          {...displayOrderField}
          value={displayOrderField.value as number}
        />
        <FieldError errors={displayOrderState.error ? [displayOrderState.error] : []} />
      </Field>

      {/* Toggles */}
      <div className="space-y-3 rounded-md border p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is-featured" className="cursor-pointer">
              Featured
            </Label>
            <p className="text-muted-foreground text-xs">Show in featured section on homepage</p>
          </div>
          <Switch
            id="is-featured"
            checked={isFeaturedField.value}
            onCheckedChange={isFeaturedField.onChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="is-popular" className="cursor-pointer">
              Most Popular
            </Label>
            <p className="text-muted-foreground text-xs">
              Highlight this as the most popular bundle
            </p>
          </div>
          <Switch
            id="is-popular"
            checked={isPopularField.value}
            onCheckedChange={isPopularField.onChange}
          />
        </div>
      </div>
    </FieldGroup>
  );
}
