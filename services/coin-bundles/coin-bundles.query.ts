import {
  ICoinBundleListFilters,
  ICoinBundleListResponse,
} from '@/type/coin-bundle/coin-bundle.type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { CoinBundlesApi } from './coin-bundles-api';

// ── Query function (importable for SSR / prefetch) ────────────────────────────

export const getCoinBundlesQueryFn = async (filters?: ICoinBundleListFilters) => {
  const response = await CoinBundlesApi.getCoinBundles(filters);
  return response.data;
};

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Fetches the admin coin-bundle list.
 *
 * Results are never cached server-side (per API spec) so staleTime is 0.
 * Pass `filters` to search, filter, or sort the list.
 */
export const useGetCoinBundles = (
  filters?: ICoinBundleListFilters,
  options?: Omit<
    UseQueryOptions<
      ICoinBundleListResponse,
      AxiosError,
      ICoinBundleListResponse,
      ReturnType<typeof QueryKey.coinBundle.list>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.coinBundle.list(filters),
    queryFn: () => getCoinBundlesQueryFn(filters),
    staleTime: 0, // results are never cached per API spec
    ...options,
  });
};
