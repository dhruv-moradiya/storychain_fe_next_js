import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { TCharacterFormValues } from '@/components/add-character/schema/character.schema';
import { toast } from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';
import { QueryKey } from '@/lib/query-keys';

import { CharacterApi } from './characters-api';

/**
 * Mutation hook to add a character to a story.
 */
export const useAddCharacter = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCharacterFormValues) => CharacterApi.AddCharacter(slug, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.character.byStorySlug(slug) });
        toast.success(response.data.message || 'Character added successfully');
      } else {
        toast.error(response.data.message || 'Failed to add character');
      }
    },
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while adding character'));
    },
  });
};

/**
 * Mutation hook to generate a Cloudinary upload signature for a character.
 */
export const useGenerateCharacterSignature = (slug: string) => {
  return useMutation({
    mutationFn: () => CharacterApi.GenerateSignature(slug),
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Failed to generate upload signature'));
    },
  });
};
