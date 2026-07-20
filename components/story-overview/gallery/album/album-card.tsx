import { Ellipsis, ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface IAlbumItem {
  id: number;
  image: string;
  title: string;
  imagesCount: number;
}

export const AlbumCard = ({ item, onClick }: { item: IAlbumItem; onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="border-soft bg-background hover:border-brand-pink-500/40 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-xl border p-4 transition-colors"
    >
      {/* Content */}
      <div className="flex items-center gap-4">
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
          <ImageIcon className="text-text-secondary-50 h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-text-secondary-75 text-sm font-semibold">{item.title}</h3>
          <p className="text-text-secondary-65 text-xs">{item.imagesCount} images</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-text-secondary-65 hover:bg-muted h-8 w-8 rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Ellipsis size={16} />
      </Button>
    </div>
  );
};
