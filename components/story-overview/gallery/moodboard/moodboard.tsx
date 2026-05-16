import { ImageIcon, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { MoodboardGalleryGrid } from './moodboard-grid';

export const Moodboard = () => {
  return (
    <div className="border-soft space-y-4 rounded-2xl border p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
            <ImageIcon size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
            Moodboard
          </h2>
          <p className="text-text-secondary-65 mt-1 text-xs sm:text-sm">
            A visual moodboard that captures the essence and atmosphere of your story.
          </p>
        </div>
        <Button variant="outline-brand" size="sm">
          <Pencil size={14} />
          Edit Moodboard
        </Button>
      </div>
      <div className="grid gap-4">
        <MoodboardGalleryGrid items={galleryImages} />
      </div>
    </div>
  );
};

const galleryImages = [
  {
    id: 1,
    image: 'https://i.pinimg.com/736x/c4/44/3a/c4443a6e3adb2e3cf528ce1f1eb3d8b9.jpg',
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/control1/736x/24/c5/79/24c57927919c2da45c75933d8f2f5da9.jpg',
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/control1/736x/83/0b/26/830b261490d020ed9fe270b0d2dee88d.jpg',
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/736x/fb/21/0a/fb210a2921f07846a47315c8c6debcc7.jpg',
  },
  {
    id: 5,
    image: 'https://i.pinimg.com/control1/736x/98/5f/e3/985fe3005821ef873f36fa46d74aacaa.jpg',
  },
  {
    id: 6,
    image: 'https://i.pinimg.com/control1/736x/be/08/fb/be08fb62a9c29c17a7856b3c18ec3e9b.jpg',
  },
];
