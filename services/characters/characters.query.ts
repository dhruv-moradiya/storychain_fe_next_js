import { IGetCharactersResponse } from '@/type/character/character-response.type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { CharacterApi } from './characters-api';

const getCharactersQueryFn = async (slug: string) => {
  const response = await CharacterApi.GetCharacters(slug);
  return response.data;
};

export const useGetCharacters = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      IGetCharactersResponse,
      AxiosError,
      IGetCharactersResponse,
      ReturnType<typeof QueryKey.character.byStorySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.character.byStorySlug(slug),
    queryFn: () => getCharactersQueryFn(slug),
    enabled: !!slug,
    ...options,
  });
};

export { getCharactersQueryFn };
