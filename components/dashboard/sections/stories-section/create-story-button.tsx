'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateStoryDialog } from './create-story-dialog';

export function CreateStoryButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        className="group border-brand-pink-500/30 from-brand-pink-500/5 to-brand-orange/5 hover:border-brand-pink-500/60 hover:from-brand-pink-500/10 hover:to-brand-orange/10 hover:shadow-brand-pink-500/10 relative col-span-1 flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-linear-to-br transition-all duration-300 hover:bg-linear-to-br hover:shadow-lg"
        onClick={() => setDialogOpen(true)}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br transition-transform duration-300 group-hover:scale-110">
            <Plus className="text-brand-pink-500 h-6 w-6" />
          </div>
          <span className="text-text-secondary group-hover:text-brand-pink-500 font-medium transition-colors">
            Create Story
          </span>
          <span className="text-text-secondary-65 text-xs">Start a new adventure</span>
        </div>
      </div>
      <CreateStoryDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

export default CreateStoryButton;
