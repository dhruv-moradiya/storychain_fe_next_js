'use client';

import { Control, useController } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { CoinBundleFormInput, SUPPORTED_CURRENCIES } from '../../schema/coin-bundle.schema';

interface PricingSectionProps {
  control: Control<CoinBundleFormInput, unknown>;
}

const currencyLabels: Record<string, string> = {
  INR: '₹ INR – Indian Rupee',
  USD: '$ USD – US Dollar',
};

export function PricingSection({ control }: PricingSectionProps) {
  const { field: inrPriceField, fieldState: inrPriceState } = useController({
    control,
    name: 'inrPrice',
  });

  const { field: usdPriceField, fieldState: usdPriceState } = useController({
    control,
    name: 'usdPrice',
  });

  const { field: currenciesField, fieldState: currenciesState } = useController({
    control,
    name: 'currencies',
  });

  const handleCurrencyChange = (currency: string, checked: boolean) => {
    const current = currenciesField.value ?? [];
    currenciesField.onChange(
      checked ? [...current, currency] : current.filter((c) => c !== currency)
    );
  };

  return (
    <FieldGroup>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* INR Price */}
        <Field>
          <FieldLabel htmlFor="inr-price">
            INR Price (₹) <span className="text-destructive">*</span>
          </FieldLabel>
          <div className="relative">
            <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              ₹
            </span>
            <Input
              id="inr-price"
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              className="pl-7"
              {...inrPriceField}
              value={inrPriceField.value as number}
            />
          </div>
          <FieldError errors={inrPriceState.error ? [inrPriceState.error] : []} />
        </Field>

        {/* USD Price */}
        <Field>
          <FieldLabel htmlFor="usd-price">USD Price ($)</FieldLabel>
          <div className="relative">
            <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              $
            </span>
            <Input
              id="usd-price"
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              className="pl-7"
              {...usdPriceField}
              value={usdPriceField.value as number}
            />
          </div>
          <FieldError errors={usdPriceState.error ? [usdPriceState.error] : []} />
        </Field>
      </div>

      {/* Currencies */}
      <Field>
        <FieldLabel>
          Supported Currencies <span className="text-destructive">*</span>
        </FieldLabel>
        <div className="flex flex-col gap-2 pt-1">
          {SUPPORTED_CURRENCIES.map((currency) => (
            <div key={currency} className="flex items-center gap-2">
              <Checkbox
                id={`currency-${currency}`}
                checked={(currenciesField.value ?? []).includes(currency)}
                onCheckedChange={(checked) => handleCurrencyChange(currency, !!checked)}
              />
              <Label htmlFor={`currency-${currency}`} className="cursor-pointer font-normal">
                {currencyLabels[currency]}
              </Label>
            </div>
          ))}
        </div>
        <FieldError errors={currenciesState.error ? [currenciesState.error] : []} />
      </Field>
    </FieldGroup>
  );
}
