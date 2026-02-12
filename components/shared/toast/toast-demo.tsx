'use client';

import { toast } from './toast';
import { Button } from '@/components/ui/button';

export function ToastDemo() {
  return (
    <div className="bg-background/50 fixed right-4 bottom-4 z-50 flex flex-wrap gap-2 rounded-lg border p-4 shadow-xl backdrop-blur-sm">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.success('Successfully saved changes!', {
            description: 'Your story has been updated.',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.error('Something went wrong', { description: 'Please try again later.' })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.warning('Warning: Unsaved changes', { description: 'You have unsaved work.' })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.info('New feature available', { description: 'Check out the new editor.' })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const promise = new Promise((resolve) => setTimeout(resolve, 2000));
          toast.promise(promise, {
            loading: 'Saving...',
            success: 'Saved!',
            error: 'Error',
          });
        }}
      >
        Promise
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.default('Default toast notification')}
      >
        Default
      </Button>
    </div>
  );
}
