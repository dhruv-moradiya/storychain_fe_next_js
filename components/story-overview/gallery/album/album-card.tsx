'use client';

import React from 'react';

import { IAlbum } from '@/type/album/album.types';
import { Edit2, Ellipsis, FolderPlus, ImageIcon, Trash2 } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface IAlbumItem {
  id: string | number;
  title: string;
  image?: string;
  imagesCount?: number;
}

interface IAlbumCardProps {
  album: IAlbum;
  onClick?: () => void;
  onEdit?: (album: IAlbum) => void;
  onAddImages?: (album: IAlbum) => void;
  onDelete?: (albumId: string) => void;
}

export const AlbumCard = ({ album, onClick, onEdit, onAddImages, onDelete }: IAlbumCardProps) => {
  const count = album.imageCount ?? 0;

  return (
    <div
      onClick={onClick}
      className="border-soft bg-background hover:border-brand-pink-500/40 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-xl border p-4 transition-colors"
    >
      {/* Content */}
      <div className="flex items-center gap-4">
        <div className="bg-brand-pink-500/10 text-brand-pink-500 flex h-11 w-11 items-center justify-center rounded-xl">
          <ImageIcon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-text-secondary-75 text-sm font-semibold">{album.title}</h3>
            {createBadge({
              label: album.visibility.replace('_', ' '),
              size: 'xs',
              color: album.visibility === 'public' ? 'emerald' : 'gray',
            })}
          </div>
          {album.description ? (
            <p className="text-text-secondary-65 line-clamp-1 text-xs">{album.description}</p>
          ) : (
            <p className="text-text-secondary-65 text-xs">
              {count} {count === 1 ? 'image' : 'images'}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary-65 hover:bg-muted h-8 w-8 rounded-lg"
            >
              <Ellipsis size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {onAddImages && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onAddImages(album);
                }}
              >
                <FolderPlus size={14} className="mr-2" />
                Add Images
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(album);
                }}
              >
                <Edit2 size={14} className="mr-2" />
                Edit Album
              </DropdownMenuItem>
            )}
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(album._id);
                  }}
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete Album
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
