import {
  ICoinBundleCreateResponse,
  ICoinBundleDeleteResponse,
  ICoinBundleDisplayOrderResponse,
  ICoinBundleListFilters,
  ICoinBundleListResponse,
  ICoinBundleThumbnailResponse,
  ICoinBundleToggleActiveResponse,
  ICoinBundleUpdateResponse,
  ICreateCoinBundlePayload,
  IUpdateCoinBundlePayload,
} from '@/type/coin-bundle/coin-bundle.type';
import { ICloudinarySignatureResponse } from '@/type/story/story-response.type';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';

const CoinBundlesApi = {
  // ── POST /coin-bundles ────────────────────────────────────────────────────
  /**
   * Create a new coin bundle.
   * SUPER_ADMIN only.
   */
  createCoinBundle: async (
    payload: ICreateCoinBundlePayload
  ): Promise<AxiosResponse<ICoinBundleCreateResponse>> => {
    return await apiClient.post<ICoinBundleCreateResponse>('/coin-bundles', payload);
  },

  // ── GET /admin/coin-bundles ───────────────────────────────────────────────
  /**
   * Retrieve all coin bundles (admin view) with optional filtering and sorting.
   * Results are never cached server-side.
   */
  getCoinBundles: async (
    filters: ICoinBundleListFilters = {}
  ): Promise<AxiosResponse<ICoinBundleListResponse>> => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.isActive !== undefined) params.append('isActive', String(filters.isActive));
    if (filters.isDeleted !== undefined) params.append('isDeleted', String(filters.isDeleted));
    if (filters.bundleType) params.append('bundleType', filters.bundleType);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    return await apiClient.get<ICoinBundleListResponse>(
      `/coin-bundles/admin/coin-bundles?${params}`
    );
  },

  // ── PUT /coin-bundles/:slug ───────────────────────────────────────────────
  /**
   * Full update of an existing coin bundle.
   * `slug` cannot be changed.
   */
  updateCoinBundle: async (
    slug: string,
    payload: IUpdateCoinBundlePayload
  ): Promise<AxiosResponse<ICoinBundleUpdateResponse>> => {
    return await apiClient.put<ICoinBundleUpdateResponse>(`/coin-bundles/${slug}`, payload);
  },

  // ── PATCH /coin-bundles/:slug/toggle-active ───────────────────────────────
  /**
   * Flip the `isActive` flag of a coin bundle.
   */
  toggleActiveStatus: async (
    slug: string
  ): Promise<AxiosResponse<ICoinBundleToggleActiveResponse>> => {
    return await apiClient.patch<ICoinBundleToggleActiveResponse>(
      `/coin-bundles/${slug}/toggle-active`
    );
  },

  // ── PATCH /coin-bundles/:slug/display-order ───────────────────────────────
  /**
   * Update the `displayOrder` of a single bundle (drag-to-reorder).
   */
  updateDisplayOrder: async (
    slug: string,
    displayOrder: number
  ): Promise<AxiosResponse<ICoinBundleDisplayOrderResponse>> => {
    return await apiClient.patch<ICoinBundleDisplayOrderResponse>(
      `/coin-bundles/${slug}/display-order`,
      { displayOrder }
    );
  },

  // ── DELETE /coin-bundles/:slug ─────────────────────────────────────────────────────────
  /**
   * Soft-delete a coin bundle.
   * The document is preserved for CoinOrder references.
   */
  deleteCoinBundle: async (slug: string): Promise<AxiosResponse<ICoinBundleDeleteResponse>> => {
    return await apiClient.delete<ICoinBundleDeleteResponse>(`/coin-bundles/${slug}`);
  },

  // ── GET /coin-bundles/signature-url ─────────────────────────────────────────────────
  /**
   * Get a signed Cloudinary upload URL for a coin-bundle thumbnail.
   * The returned uploadURL contains all required query params (signature, api_key, etc.).
   */
  getSignatureUrl: async (): Promise<AxiosResponse<ICloudinarySignatureResponse>> => {
    return await apiClient.get<ICloudinarySignatureResponse>('/coin-bundles/signature-url');
  },

  // ── PATCH /coin-bundles/:slug/thumbnail ────────────────────────────────────────────────
  /**
   * Update only the thumbnail of an existing bundle (post-create).
   */
  updateThumbnail: async (
    slug: string,
    thumbnail: { url: string; publicId: string }
  ): Promise<AxiosResponse<ICoinBundleThumbnailResponse>> => {
    return await apiClient.patch<ICoinBundleThumbnailResponse>(`/coin-bundles/${slug}/thumbnail`, {
      thumbnail,
    });
  },
};

export { CoinBundlesApi };
