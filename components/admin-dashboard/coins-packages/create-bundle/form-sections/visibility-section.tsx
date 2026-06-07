'use client';

import * as React from 'react';
import { Control, useController } from 'react-hook-form';

import { format, isValid, parse } from 'date-fns';
import { CalendarIcon, ClockIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

import { CoinBundleFormInput } from '../../schema/coin-bundle.schema';

interface VisibilitySectionProps {
  control: Control<CoinBundleFormInput, unknown>;
}

const TIMEZONES = [
  'Asia/Kolkata',
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
];

// Converts a "YYYY-MM-DD" string to a Date object (or undefined)
function parseDateString(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsed) ? parsed : undefined;
}

// A reusable date picker built from Popover + Calendar
interface DatePickerFieldProps {
  id: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: { message?: string };
}

function DatePickerField({
  id,
  value,
  onChange,
  placeholder = 'Pick a date',
  error,
}: DatePickerFieldProps) {
  const selected = parseDateString(value);

  const handleSelect = (date: Date | undefined) => {
    onChange(date ? format(date, 'yyyy-MM-dd') : '');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          data-empty={!selected}
          variant="outline"
          className={cn(
            'data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal',
            error && 'border-destructive'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {selected ? format(selected, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selected} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}

export function VisibilitySection({ control }: VisibilitySectionProps) {
  const { field: isActiveField } = useController({ control, name: 'isActive' });
  const { field: startDateField, fieldState: startDateState } = useController({
    control,
    name: 'startDate',
  });
  const { field: endDateField, fieldState: endDateState } = useController({
    control,
    name: 'endDate',
  });
  const { field: startTimeField, fieldState: startTimeState } = useController({
    control,
    name: 'startTime',
  });
  const { field: endTimeField, fieldState: endTimeState } = useController({
    control,
    name: 'endTime',
  });
  const { field: timezoneField, fieldState: timezoneState } = useController({
    control,
    name: 'timezone',
  });

  return (
    <FieldGroup>
      {/* Active toggle */}
      <div className="flex items-center justify-between rounded-md border p-4">
        <div>
          <Label htmlFor="is-active" className="cursor-pointer">
            Active
          </Label>
          <p className="text-muted-foreground text-xs">Inactive bundles are hidden from users</p>
        </div>
        <Switch
          id="is-active"
          checked={isActiveField.value}
          onCheckedChange={isActiveField.onChange}
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="start-date">Start Date</FieldLabel>
          <DatePickerField
            id="start-date"
            value={startDateField.value as string | undefined}
            onChange={startDateField.onChange}
            placeholder="Pick start date"
            error={startDateState.error}
          />
          <FieldError errors={startDateState.error ? [startDateState.error] : []} />
        </Field>

        <Field>
          <FieldLabel htmlFor="end-date">End Date</FieldLabel>
          <DatePickerField
            id="end-date"
            value={endDateField.value as string | undefined}
            onChange={endDateField.onChange}
            placeholder="Pick end date"
            error={endDateState.error}
          />
          <FieldError errors={endDateState.error ? [endDateState.error] : []} />
        </Field>
      </div>

      {/* Time Range */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="start-time">Start Time</FieldLabel>
          <div className="relative">
            <ClockIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="start-time"
              type="time"
              className="pl-9"
              {...startTimeField}
              value={(startTimeField.value as string) ?? ''}
            />
          </div>
          <FieldError errors={startTimeState.error ? [startTimeState.error] : []} />
        </Field>

        <Field>
          <FieldLabel htmlFor="end-time">End Time</FieldLabel>
          <div className="relative">
            <ClockIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="end-time"
              type="time"
              className="pl-9"
              {...endTimeField}
              value={(endTimeField.value as string) ?? ''}
            />
          </div>
          <FieldError errors={endTimeState.error ? [endTimeState.error] : []} />
        </Field>
      </div>

      {/* Timezone */}
      <Field>
        <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
        <Select onValueChange={timezoneField.onChange} defaultValue={timezoneField.value as string}>
          <SelectTrigger id="timezone" className="w-full">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError errors={timezoneState.error ? [timezoneState.error] : []} />
      </Field>
    </FieldGroup>
  );
}
