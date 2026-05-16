import Image from 'next/image';

import { Ellipsis } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';

interface IImageCardProps {
  item: IImageItem;
  view?: 'grid' | 'list';
}

interface IImageItem {
  id: number;
  title: string;
  image: string;
  chapter: string;
  createdAt: string;
}

export const ImageCard = ({ item, view = 'grid' }: IImageCardProps) => {
  if (view === 'list') {
    return (
      <div
        key={item.id}
        className="border-soft bg-background hover:border-border flex items-center gap-3 rounded-xl border p-2 transition-colors"
      >
        {/* Image */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-text-secondary-75 line-clamp-1 text-sm font-medium">
                {item.title}
              </h3>

              <div className="mt-1 flex items-center gap-2">
                {createBadge({
                  label: item.chapter,
                  color: 'gray',
                  size: 'xs',
                })}

                <span className="text-text-secondary-65 text-[11px]">{item.createdAt}</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary-65 hover:bg-muted h-7 w-7 shrink-0 rounded-md"
            >
              <Ellipsis size={14} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={item.id} className="border-soft bg-background overflow-hidden rounded-2xl border">
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={item.image}
          alt="Gallery Image"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        <h3 className="text-text-secondary-75 line-clamp-1 text-sm font-semibold">{item.title}</h3>

        <div className="flex items-center justify-between gap-2">
          {createBadge({
            label: item.chapter,
            color: 'gray',
            size: 'xs',
          })}

          <p className="text-text-secondary-65 text-xs">{item.createdAt}</p>

          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary-65 hover:bg-muted h-8 w-8 rounded-lg"
          >
            <Ellipsis size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
