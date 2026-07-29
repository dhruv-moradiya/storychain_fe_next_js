import {
  IAddCharacterResponse,
  IGenerateSignatureResponse,
  IGetCharactersResponse,
} from '@/type/character/character-response.type';

import type { TCharacterFormValues } from '@/components/add-character/schema/character.schema';
import apiClient from '@/lib/api-client';

export const CharacterApi = {
  AddCharacter: async (slug: string, payload: TCharacterFormValues) => {
    return await apiClient.post<IAddCharacterResponse>(`/characters/story/${slug}`, payload);
  },

  GetCharacters: async (slug: string) => {
    return await apiClient.get<IGetCharactersResponse>(`/characters/story/${slug}`);
  },

  GenerateSignature: async (slug: string) => {
    return await apiClient.post<IGenerateSignatureResponse>(`/characters/story/${slug}/signature`);
  },
};
