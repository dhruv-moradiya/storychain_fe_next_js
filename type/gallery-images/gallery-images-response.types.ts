import { IBaseResponse } from '../base-response.type';
import { IGalleryImage } from './gallery-images.types';

export interface IGetGalleryImagesResponse extends IBaseResponse<IGalleryImage[]> {}

export interface IAddGalleryImageResponse extends IBaseResponse<IGalleryImage> {}

export interface IGenerateGalleryImageSignatureResponse extends IBaseResponse<{
  uploadURL: string;
}> {}
