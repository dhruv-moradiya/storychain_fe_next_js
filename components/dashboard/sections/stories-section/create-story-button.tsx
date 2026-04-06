'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { FileDown, LayoutTemplate, Plus } from 'lucide-react';

const CreateStoryDialog = dynamic(() => import('./create-story-dialog'), {
  ssr: false,
});

export function CreateStoryButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="border-border bg-card hover:bg-card/60 col-span-1 flex min-h-[220px] w-full flex-col gap-3 rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <span className="text-text-secondary-65 mb-2 text-xs font-semibold tracking-wider">
          CREATE STORY
        </span>

        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="group hover:bg-muted/40 flex w-full items-center gap-3 rounded-lg p-2.5 transition-colors"
        >
          <div className="border-border/50 bg-brand-pink-500/10 text-brand-pink-500 dark:border-brand-pink-500/20 flex h-8 w-8 items-center justify-center rounded-md border">
            <Plus className="h-4 w-4" />
          </div>
          <span className="text-text-primary group-hover:text-brand-pink-500 text-sm font-medium transition-colors">
            Create from Blank
          </span>
        </button>

        <button
          type="button"
          disabled
          className="group flex w-full cursor-not-allowed items-center gap-3 rounded-lg p-2.5 opacity-60 transition-colors"
        >
          <div className="border-border/50 bg-muted/40 text-text-secondary-65 flex h-8 w-8 items-center justify-center rounded-md border">
            <LayoutTemplate className="h-4 w-4" />
          </div>
          <span className="text-text-secondary-65 text-sm font-medium">Create from Template</span>
        </button>

        <button
          type="button"
          disabled
          className="group flex w-full cursor-not-allowed items-center gap-3 rounded-lg p-2.5 opacity-60 transition-colors"
        >
          <div className="border-border/50 bg-muted/40 text-text-secondary-65 flex h-8 w-8 items-center justify-center rounded-md border">
            <FileDown className="h-4 w-4" />
          </div>
          <span className="text-text-secondary-65 text-sm font-medium">Import DSL file</span>
        </button>
      </div>

      {dialogOpen && <CreateStoryDialog open={dialogOpen} onOpenChange={setDialogOpen} />}
    </>
  );
}

export default CreateStoryButton;
