import Image from 'next/image';

import { Ellipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AlbumCardProps {
  id: number;
  image: string;
  title: string;
  imagesCount: number;
}

export const AlbumCard = ({ item }: { item: AlbumCardProps }) => {
  return (
    <div className="border-soft bg-background w-[250px] shrink-0 snap-center overflow-hidden rounded-2xl border p-2 pb-0 sm:w-[280px]">
      {/* Image */}
      <div className="relative aspect-2/1 w-full overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between p-3">
        <div className="space-y-1">
          <h3 className="text-text-secondary-75 text-sm font-semibold">{item.title}</h3>
          <p className="text-text-secondary-65 text-xs">{item.imagesCount} images</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-text-secondary-65 hover:bg-muted -mt-1 -mr-2 h-8 w-8 rounded-lg"
        >
          <Ellipsis size={16} />
        </Button>
      </div>
    </div>
  );
};
