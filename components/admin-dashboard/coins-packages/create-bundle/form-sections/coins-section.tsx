'use client';

import { Control, useController, useWatch } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { CoinBundleFormInput } from '../../schema/coin-bundle.schema';

interface CoinsSectionProps {
  control: Control<CoinBundleFormInput, unknown>;
}

export function CoinsSection({ control }: CoinsSectionProps) {
  const { field: baseCoinsField, fieldState: baseCoinsState } = useController({
    control,
    name: 'baseCoins',
  });

  const { field: bonusCoinsField, fieldState: bonusCoinsState } = useController({
    control,
    name: 'bonusCoins',
  });

  const baseCoins = useWatch({ control, name: 'baseCoins' });
  const bonusCoins = useWatch({ control, name: 'bonusCoins' });

  const totalCoins = (Number(baseCoins) || 0) + (Number(bonusCoins) || 0);

  return (
    <FieldGroup>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Base Coins */}
        <Field>
          <FieldLabel htmlFor="base-coins">
            Base Coins <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="base-coins"
            type="number"
            min={1}
            placeholder="e.g. 1000"
            {...baseCoinsField}
            value={baseCoinsField.value as number}
          />
          <FieldError errors={baseCoinsState.error ? [baseCoinsState.error] : []} />
        </Field>

        {/* Bonus Coins */}
        <Field>
          <FieldLabel htmlFor="bonus-coins">Bonus Coins</FieldLabel>
          <Input
            id="bonus-coins"
            type="number"
            min={0}
            placeholder="e.g. 200"
            {...bonusCoinsField}
            value={bonusCoinsField.value as number}
          />
          <FieldError errors={bonusCoinsState.error ? [bonusCoinsState.error] : []} />
        </Field>
      </div>

      {/* Total Coins (read-only derived) */}
      <div className="bg-muted/30 rounded-md border border-dashed px-4 py-3">
        <p className="text-muted-foreground text-xs">Total Coins (computed)</p>
        <p className="mt-1 text-2xl font-bold text-amber-500">
          {totalCoins > 0 ? totalCoins.toLocaleString() : '—'}
        </p>
      </div>
    </FieldGroup>
  );
}
