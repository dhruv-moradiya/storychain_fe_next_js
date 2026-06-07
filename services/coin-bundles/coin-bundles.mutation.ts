import {
  ICreateCoinBundlePayload,
  IUpdateCoinBundlePayload,
} from '@/type/coin-bundle/coin-bundle.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toast } from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';
import { QueryKey } from '@/lib/query-keys';

import { CoinBundlesApi } from './coin-bundles-api';

// ── Create ────────────────────────────────────────────────────────────────────

/**
 * POST /coin-bundles
 * Create a new coin bundle.
 */
export const useCreateCoinBundle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateCoinBundlePayload) => CoinBundlesApi.createCoinBundle(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.coinBundle.all });
        toast.success(response.data.message || 'Coin bundle created successfully');
      } else {
        toast.error(response.data.message || 'Failed to create coin bundle');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while creating the coin bundle'));
    },
  });
};

// ── Update ────────────────────────────────────────────────────────────────────

/**
 * PUT /coin-bundles/:slug
 * Perform a full update of an existing coin bundle.
 */
export const useUpdateCoinBundle = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateCoinBundlePayload) =>
      CoinBundlesApi.updateCoinBundle(slug, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.coinBundle.all });
        toast.success(response.data.message || 'Coin bundle updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update coin bundle');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong while updating');
    },
  });
};

// ── Toggle Active ─────────────────────────────────────────────────────────────

/**
 * PATCH /coin-bundles/:slug/toggle-active
 * Flip the isActive status of a coin bundle.
 */
export const useToggleCoinBundleActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => CoinBundlesApi.toggleActiveStatus(slug),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.coinBundle.all });
        const isActive = response.data.data?.isActive;
        toast.success(response.data.message || `Bundle is now ${isActive ? 'active' : 'inactive'}`);
      } else {
        toast.error(response.data.message || 'Failed to toggle bundle status');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while toggling status'));
    },
  });
};

// ── Update Display Order ──────────────────────────────────────────────────────

/**
 * PATCH /coin-bundles/:slug/display-order
 * Update only the displayOrder (drag-to-reorder).
 */
export const useUpdateCoinBundleDisplayOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, displayOrder }: { slug: string; displayOrder: number }) =>
      CoinBundlesApi.updateDisplayOrder(slug, displayOrder),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.coinBundle.all });
      } else {
        toast.error(response.data.message || 'Failed to update display order');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while updating display order'));
    },
  });
};

// ── Delete ────────────────────────────────────────────────────────────────────

/**
 * DELETE /coin-bundles/:slug
 * Soft-delete a coin bundle.
 */
export const useDeleteCoinBundle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => CoinBundlesApi.deleteCoinBundle(slug),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.coinBundle.all });
        toast.success(response.data.message || 'Coin bundle deleted successfully');
      } else {
        toast.error(response.data.message || 'Failed to delete coin bundle');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const status = error?.response?.status;
      if (status === 400) {
        toast.error('This bundle has already been deleted');
      } else {
        toast.error(error?.response?.data?.message || 'Something went wrong while deleting');
      }
    },
  });
};

// ── Upload Thumbnail ──────────────────────────────────────────────────────────

/**
 * Full thumbnail upload flow (same pattern as story images):
 *  1. GET /coin-bundles/signature-url  → signed Cloudinary uploadURL
 *  2. POST to Cloudinary               → get secure_url + public_id
 *  3. PATCH /coin-bundles/:slug/thumbnail (optional — only when slug is known)
 *
 * When used inside the **create** form (no slug yet), call without `slug` —
 * the returned { url, publicId } is stored in form state and sent with the
 * create payload.  When called on an existing bundle, pass the slug to also
 * hit the PATCH endpoint.
 */
export const useUploadCoinBundleThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      slug,
    }: {
      file: File;
      /** Pass slug to also PATCH the existing bundle; omit for create-form usage. */
      slug?: string;
    }): Promise<{ url: string; publicId: string }> => {
      // 1. Get signature URL
      const signatureResponse = await CoinBundlesApi.getSignatureUrl();
      if (!signatureResponse.data.success || !signatureResponse.data.data.uploadURL) {
        throw new Error('Failed to get upload signature');
      }

      const uploadURL = signatureResponse.data.data.uploadURL;
      const parsedUrl = new URL(uploadURL);
      const params = parsedUrl.searchParams;

      // 2. Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      if (params.get('timestamp')) formData.append('timestamp', params.get('timestamp')!);
      if (params.get('signature')) formData.append('signature', params.get('signature')!);
      if (params.get('api_key')) formData.append('api_key', params.get('api_key')!);
      if (params.get('folder')) formData.append('folder', params.get('folder')!);
      // eager must be sent — the backend signature was computed over { eager, folder, timestamp }
      // URLSearchParams.get() auto-decodes the percent-encoded value, so we get the raw string.
      if (params.get('eager')) formData.append('eager', params.get('eager')!);

      const uploadEndpoint = `${parsedUrl.origin}${parsedUrl.pathname}`;
      const cloudinaryResponse = await fetch(uploadEndpoint, { method: 'POST', body: formData });

      if (!cloudinaryResponse.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const thumbnail = {
        url: cloudinaryData.secure_url as string,
        publicId: cloudinaryData.public_id as string,
      };

      // 3. Optionally PATCH the existing bundle
      if (slug) {
        await CoinBundlesApi.updateThumbnail(slug, thumbnail);
        queryClient.invalidateQueries({ queryKey: QueryKey.coinBundle.all });
      }

      return thumbnail;
    },
    onSuccess: (_, variables) => {
      if (variables.slug) {
        toast.success('Thumbnail updated successfully');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while uploading the thumbnail'));
    },
  });
};
