import Image from 'next/image';

import { Download, Share2, Trash2 } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';

import { IImageItem } from './image-card';

interface IImageDetailDialogProps {
  item: IImageItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImageDetailDialog = ({ item, open, onOpenChange }: IImageDetailDialogProps) => {
  if (!item) return null;

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent
        className="gap-0 overflow-hidden border-0 bg-transparent p-0 shadow-none sm:max-w-3xl"
        showCloseButton={false}
      >
        <div className="bg-background flex max-h-[90vh] flex-col overflow-hidden rounded-xl md:flex-row">
          {/* Image Section */}
          <div className="relative flex min-h-[300px] flex-1 items-center justify-center bg-black/5 p-4 md:min-h-[500px]">
            <div className="relative h-full max-h-[80vh] w-full">
              <Image src={item.image} alt={item.title} fill className="object-contain" />
            </div>
          </div>

          {/* Details Section */}
          <div className="border-soft bg-background flex w-full flex-col border-l md:w-80">
            <ResponsiveDialogHeader className="border-soft border-b p-6">
              <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
                {item.title}
              </ResponsiveDialogTitle>
              <div className="mt-2 flex items-center gap-2">
                {createBadge({
                  label: item.chapter,
                  color: 'gray',
                  size: 'xs',
                })}
                <span className="text-text-secondary-65 text-xs">{item.createdAt}</span>
              </div>
            </ResponsiveDialogHeader>

            <ResponsiveDialogBody className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-text-secondary-75 mb-1 text-sm font-medium">Description</h4>
                  <p className="text-text-secondary-65 text-sm leading-relaxed">
                    A beautiful visual representation used in {item.chapter}. This image was added
                    to the gallery on {item.createdAt}.
                  </p>
                </div>

                {item.type && (
                  <div>
                    <h4 className="text-text-secondary-75 mb-1 text-sm font-medium">Category</h4>
                    <p className="text-text-secondary-65 text-sm capitalize">{item.type}</p>
                  </div>
                )}
              </div>
            </ResponsiveDialogBody>

            <div className="border-soft bg-muted/20 flex items-center justify-between gap-2 border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="text-text-secondary-65 h-8 w-8">
                  <Download size={14} />
                </Button>
                <Button variant="outline" size="icon" className="text-text-secondary-65 h-8 w-8">
                  <Share2 size={14} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                >
                  <Trash2 size={14} />
                </Button>
                <ResponsiveDialogClose asChild>
                  <Button variant="outline" size="sm">
                    Close
                  </Button>
                </ResponsiveDialogClose>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
