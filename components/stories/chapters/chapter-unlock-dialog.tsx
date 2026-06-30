import toast from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
} from '@/components/ui/responsive-dialog';
import { Spinner } from '@/components/ui/spinner';
import { getApiError, getErrorMessage } from '@/lib/error';
import { useUnlockChapter } from '@/services/chapters/chapters.mutation';

interface ChapterUnlockDialogProps {
  slug: string;
  storySlug: string;
  onClose: () => void;
}

export const ChapterUnlockDialog = ({ slug, storySlug, onClose }: ChapterUnlockDialogProps) => {
  const { mutate, isPending } = useUnlockChapter();

  const handleUnlockChapter = () => {
    mutate(
      {
        slug,
        storySlug,
      },
      {
        onSuccess: () => {
          toast.success('Chapter unlocked successfully');
          onClose();
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  return (
    <ResponsiveDialog defaultOpen={true} open={true} onOpenChange={(open) => !open && onClose()}>
      <ResponsiveDialogContent sheetHeight="400px" dismissible={false}>
        <ResponsiveDialogHeader className="px-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Unlock Chapter</h2>
          </div>
        </ResponsiveDialogHeader>
        <div className="px-6 py-4">
          <p className="text-text-secondary-50 text-sm">
            You need to unlock this chapter to view its content. This will cost you 7 coins.
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <ResponsiveDialogFooter>
              <Button
                variant="outline-editorial"
                className="cursor-pointer rounded-sm px-8"
                onClick={onClose}
              >
                Cancel
              </Button>
            </ResponsiveDialogFooter>
            <Button
              className="hover:bg-brand-pink-600 cursor-pointer rounded-sm px-8 font-semibold"
              onClick={handleUnlockChapter}
              disabled={isPending}
            >
              {isPending ? <Spinner className="h-5 w-5" /> : 'Unlock'}
            </Button>
          </div>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
