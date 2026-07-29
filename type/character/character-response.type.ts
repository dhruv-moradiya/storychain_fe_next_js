import { IBaseResponse } from '..';
import { ICharacter } from './characters.type';

export interface IAddCharacterResponse extends IBaseResponse<{ id: string }> {}

export interface IGetCharactersResponse extends IBaseResponse<ICharacter[]> {}

export interface IGenerateSignatureResponse extends IBaseResponse<{
  uploadURL: string;
}> {}
