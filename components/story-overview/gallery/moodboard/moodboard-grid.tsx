import Image from 'next/image';

import { cn } from '@/lib/utils';

interface IMoodboardGalleryGridItem {
  id: number;
  image: string;
  alt?: string;
}

interface IMoodboardGalleryGridProps {
  items: IMoodboardGalleryGridItem[];
  className?: string;
}

export function MoodboardGalleryGrid({ items, className }: IMoodboardGalleryGridProps) {
  return (
    <div
      className={cn(
        'grid h-[250px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[300px]',
        className
      )}
    >
      {/* Col 1 */}
      <GalleryImage
        src={items[0]?.image}
        alt={items[0]?.alt}
        className="col-start-1 col-end-2 row-start-1 row-end-3"
      />

      {/* Col 2 */}
      <GalleryImage
        src={items[1]?.image}
        alt={items[1]?.alt}
        className="col-start-2 col-end-3 row-start-1 row-end-2"
      />
      <GalleryImage
        src={items[2]?.image}
        alt={items[2]?.alt}
        className="col-start-2 col-end-3 row-start-2 row-end-3"
      />

      {/* Col 3 */}
      <GalleryImage
        src={items[3]?.image}
        alt={items[3]?.alt}
        className="col-start-3 col-end-4 row-start-1 row-end-3"
      />

      {/* Col 4 */}
      <GalleryImage
        src={items[4]?.image}
        alt={items[4]?.alt}
        className="col-start-4 col-end-5 row-start-1 row-end-3"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               IMAGE COMPONENT                              */
/* -------------------------------------------------------------------------- */

interface IGalleryImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

function GalleryImage({ src, alt, className }: IGalleryImageProps) {
  return (
    <div className={cn('bg-muted relative overflow-hidden', className)}>
      {src && (
        <Image
          src={src}
          alt={alt || 'Gallery Image'}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      )}
    </div>
  );
}
