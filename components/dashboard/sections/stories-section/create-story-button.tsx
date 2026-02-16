'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

const CreateStoryDialog = dynamic(() => import('./create-story-dialog'), {
  ssr: false,
});

export function CreateStoryButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="group border-brand-pink-500/30 from-brand-pink-500/5 to-brand-orange/5 hover:border-brand-pink-500/60 hover:from-brand-pink-500/10 hover:to-brand-orange/10 hover:shadow-brand-pink-500/10 focus-visible:ring-brand-pink-500 relative col-span-1 flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-linear-to-br transition-all duration-300 hover:bg-linear-to-br hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
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
      </button>
      {dialogOpen && <CreateStoryDialog open={dialogOpen} onOpenChange={setDialogOpen} />}
    </>
  );
}

export default CreateStoryButton;
