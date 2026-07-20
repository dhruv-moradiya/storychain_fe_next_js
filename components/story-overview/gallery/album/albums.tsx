import { ImageIcon, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { AlbumCard, IAlbumItem } from './album-card';

export const Albums = ({ onAlbumSelect }: { onAlbumSelect?: (album: IAlbumItem) => void }) => {
  return (
    <div className="border-soft relative space-y-4 rounded-2xl border p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
            <ImageIcon size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
            Albums
          </h2>
          <p className="text-text-secondary-65 mt-1 text-xs sm:text-sm">
            Organize your images into themed collections.
          </p>
        </div>
        <Button variant="outline-brand" size="sm">
          <Plus size={14} />
          New Album
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {albumItems.map((item) => (
          <AlbumCard key={item.id} item={item} onClick={() => onAlbumSelect?.(item)} />
        ))}
      </div>
    </div>
  );
};

export const albumItems = [
  {
    id: 1,
    title: 'Ports & Cities',
    imagesCount: 12,
    image: 'https://i.pinimg.com/1200x/14/f3/3d/14f33df448691ebc5fa86a5f8480df05.jpg',
  },
  {
    id: 2,
    title: 'Characters',
    imagesCount: 8,
    image: 'https://i.pinimg.com/control1/736x/b0/35/31/b035314c4e0e4582468f62278e0a19a1.jpg',
  },
  {
    id: 3,
    title: 'Objects & Artifacts',
    imagesCount: 6,
    image: 'https://i.pinimg.com/736x/ed/6a/34/ed6a34d97fdc66f2347f5e0936c51d4c.jpg',
  },
  {
    id: 4,
    title: 'Events & Moments',
    imagesCount: 6,
    image: 'https://i.pinimg.com/736x/02/b8/74/02b8743b9f902d9a2e863256ec203905.jpg',
  },
];
