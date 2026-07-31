import { IBaseResponse } from '../base-response.type';
import { IAlbum, IAlbumWithImages } from './album.types';

export interface IGetAlbumsResponse extends IBaseResponse<IAlbum[]> {}

export interface IGetAlbumDetailsResponse extends IBaseResponse<IAlbumWithImages> {}

export interface ICreateAlbumResponse extends IBaseResponse<IAlbum> {}

export interface IAddImagesToAlbumResponse extends IBaseResponse<IAlbum> {}

export interface IUpdateAlbumResponse extends IBaseResponse<IAlbum> {}

export interface IDeleteAlbumResponse extends IBaseResponse<Record<string, never>> {}
