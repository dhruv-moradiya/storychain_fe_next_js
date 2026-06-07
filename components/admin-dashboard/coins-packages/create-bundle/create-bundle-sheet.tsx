'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Package2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  CoinBundleFormInput,
  CoinBundleFormValues,
  coinBundleDefaultValues,
  coinBundleFormSchema,
} from '../schema/coin-bundle.schema';
import { CoinsSection } from './form-sections/coins-section';
import { DisplaySection } from './form-sections/display-section';
import { IdentitySection } from './form-sections/identity-section';
import { PricingSection } from './form-sections/pricing-section';
import { RestrictionsSection } from './form-sections/restrictions-section';
import { ThumbnailSection } from './form-sections/thumbnail-section';
import { VisibilitySection } from './form-sections/visibility-section';

interface CreateBundleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CoinBundleFormValues) => void | Promise<void>;
}

export function CreateBundleSheet({ open, onOpenChange, onSubmit }: CreateBundleSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const { control, handleSubmit, reset, setValue } = useForm<
    CoinBundleFormInput,
    unknown,
    CoinBundleFormValues
  >({
    resolver: zodResolver(coinBundleFormSchema),
    defaultValues: coinBundleDefaultValues,
  });

  const handleFormSubmit = async (data: CoinBundleFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit?.(data);
      reset();
      onOpenChange(false);
    } catch {
      // Error handling delegated to parent
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex h-full w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-xl"
      >
        {/* Header */}
        <SheetHeader className="border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
              <Package2 className="text-primary h-5 w-5" />
            </div>
            <div>
              <SheetTitle className="text-base font-semibold">Create Coin Bundle</SheetTitle>
              <SheetDescription className="text-xs">
                Fill in the details below to create a new coin bundle.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Form Body */}
        <div className="relative h-full w-full flex-1 overflow-y-scroll">
          <form
            id="create-bundle-form"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="px-6 py-6"
          >
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Identity</FieldLegend>
                <FieldDescription>Basic identification details for this bundle.</FieldDescription>
                <FieldGroup>
                  <IdentitySection control={control} setValue={setValue} />
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Thumbnail</FieldLegend>
                <FieldDescription>
                  Upload a cover image for this bundle. JPEG, PNG, WebP or GIF.
                </FieldDescription>
                <FieldGroup>
                  <ThumbnailSection control={control} onUploadingChange={setIsUploadingThumbnail} />
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Coins</FieldLegend>
                <FieldDescription>Set the coin amounts included in this bundle.</FieldDescription>
                <FieldGroup>
                  <CoinsSection control={control} />
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Pricing</FieldLegend>
                <FieldDescription>Configure pricing and supported currencies.</FieldDescription>
                <FieldGroup>
                  <PricingSection control={control} />
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Display</FieldLegend>
                <FieldDescription>Control how this bundle appears to users.</FieldDescription>
                <FieldGroup>
                  <DisplaySection control={control} />
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Visibility &amp; Lifecycle</FieldLegend>
                <FieldDescription>
                  Manage when and for how long this bundle is visible.
                </FieldDescription>
                <FieldGroup>
                  <VisibilitySection control={control} />
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Purchase Restrictions</FieldLegend>
                <FieldDescription>
                  Limit how many times users can purchase this bundle.
                </FieldDescription>
                <FieldGroup>
                  <RestrictionsSection control={control} />
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </div>

        {/* Footer */}
        <SheetFooter className="flex-row justify-end gap-3 border-t px-6 py-4">
          <SheetClose asChild>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            form="create-bundle-form"
            disabled={isSubmitting || isUploadingThumbnail}
          >
            {isUploadingThumbnail
              ? 'Uploading image…'
              : isSubmitting
                ? 'Creating…'
                : 'Create Bundle'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
