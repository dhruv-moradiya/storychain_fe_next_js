'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface SubmitRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storyId?: string;
  storyTitle?: string;
  storySlug?: string;
  parentChapterId?: string;
  parentChapterTitle?: string;
  draftId?: string;
  draftTitle?: string;
  draftContent?: string;
  onSubmit: (data: { description: string }) => void;
}

export function SubmitRequestDialog({
  open,
  onOpenChange,
  storyTitle,
  parentChapterTitle,
  draftTitle,
  onSubmit,
}: SubmitRequestDialogProps) {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock submit
    setTimeout(() => {
      onSubmit({ description });
      setIsSubmitting(false);
      onOpenChange(false);
      setDescription('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Pull Request</DialogTitle>
          <DialogDescription>Propose your changes to be merged into the story.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">Story</Label>
            <p className="text-sm font-medium">{storyTitle || 'Untitled Story'}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">Branching From</Label>
            <p className="text-sm font-medium">{parentChapterTitle || 'Root'}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">Your Chapter</Label>
            <p className="text-sm font-medium">{draftTitle || 'Untitled Chapter'}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pr-desc">Description</Label>
            <Textarea
              id="pr-desc"
              placeholder="Describe your changes and why they should be merged..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !description.trim()}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
