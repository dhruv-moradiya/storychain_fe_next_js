'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { IChapterAutoSave } from '@/type/auto-save';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, FileText, NotebookPen, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useDeleteAutoSave } from '@/services/auto-save/auto-save.mutation';
import { useGetAutoSaveDraft } from '@/services/auto-save/auto-save.query';

// Inline Draft Item Component
const DraftItem = ({
  draft,
  onContinue,
  onDelete,
}: {
  draft: IChapterAutoSave;
  onContinue: () => void;
  onDelete: (id: string) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('autoSaveId', draft._id);
    params.set('storySlug', draft.storySlug || '');
    router.push(`?${params.toString()}`);
    onContinue();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="border-border/50 bg-cream-95 hover:bg-cream-90 flex items-center gap-2 rounded-lg border p-2.5 transition-colors"
      >
        <div className="bg-brand-orange/15 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <FileText className="text-brand-orange h-4 w-4" />
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[140px] min-w-0 flex-1 overflow-hidden">
              <p className="text-text-primary font-ibm-plex-mono line-clamp-1 text-xs font-medium">
                {draft.title || 'Untitled Draft'}
              </p>
              <p className="text-text-secondary-65 font-ibm-plex-mono line-clamp-1 text-[10px]">
                {formatDistanceToNow(new Date(draft.lastSavedAt), { addSuffix: true })}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[200px]">
            <p className="text-xs font-medium wrap-break-word">{draft.title || 'Untitled Draft'}</p>
            <p className="text-muted-foreground text-[10px]">
              Saved {formatDistanceToNow(new Date(draft.lastSavedAt), { addSuffix: true })}
            </p>
          </TooltipContent>
        </Tooltip>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 w-7"
                onClick={() => onDelete(draft._id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Delete draft</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="bg-brand-pink-500 hover:bg-brand-pink-600 h-7 w-7 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
                onClick={handleContinue}
              >
                <NotebookPen className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Continue editing</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export const DraftRecoveryBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const { data: draftResponse, isLoading } = useGetAutoSaveDraft();
  const { mutate: deleteDraft } = useDeleteAutoSave();

  const draftList = draftResponse?.data?.docs || [];

  if (isLoading || draftList.length === 0 || isDismissed) return null;

  const handleDraftContinue = () => {
    setIsExpanded(false);
  };

  const handleDeleteDraft = (id: string) => {
    deleteDraft(id, {
      onSuccess: () => {
        toast.success('Draft deleted');
      },
      onError: () => {
        toast.error('Failed to delete draft');
      },
    });
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  const count = draftList.length;

  return (
    <AnimatePresence>
      {!isExpanded && (
        <motion.div
          key="mobile-collapsed"
          className="fixed right-4 bottom-4 z-50 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleExpand}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl',
              'from-brand-orange/20 to-brand-pink-500/20 bg-linear-to-br',
              'border-brand-orange/30 border shadow-lg backdrop-blur-sm',
              'transition-all duration-200 hover:shadow-xl',
              'hover:border-brand-pink-500/50'
            )}
          >
            <div className="relative">
              <FileText className="text-brand-orange h-5 w-5" />
              {count > 0 && (
                <span className="bg-brand-pink-500 absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </div>
          </motion.button>
        </motion.div>
      )}

      <motion.div
        key="full-banner"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'fixed right-4 bottom-4 z-50 overflow-hidden rounded-xl',
          'border-border/50 bg-cream-95 border shadow-2xl backdrop-blur-sm',
          isExpanded ? 'block' : 'hidden md:block',
          'w-[calc(100vw-2rem)] max-w-[340px] sm:w-[380px]'
        )}
      >
        <div
          className="from-brand-orange/15 to-brand-pink-500/10 flex cursor-pointer items-center justify-between bg-linear-to-r px-4 py-3"
          onClick={handleToggleExpand}
        >
          <div className="flex items-center gap-3">
            <div className="from-brand-orange/25 to-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br">
              <FileText className="text-brand-orange h-4 w-4" />
            </div>
            <div>
              <p className="text-text-primary font-ibm-plex-mono text-xs font-medium">
                {count > 1 ? `${count} Unsaved Drafts` : 'Unsaved Draft'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-brand-orange/10 h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="text-text-secondary-65 h-4 w-4" />
              ) : (
                <ChevronUp className="text-text-secondary-65 h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10 h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              aria-label="Close"
            >
              <X className="text-text-secondary-65 h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="draft-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-3 py-3">
                <p className="text-text-secondary-65 font-ibm-plex-mono mb-2 text-[10px]">
                  {count} draft{count !== 1 ? 's' : ''} available
                </p>
                <div className="max-h-[300px] space-y-2 overflow-y-auto pr-2 md:max-h-[500px]">
                  {draftList.map((draft, index) => (
                    <motion.div
                      key={draft._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <DraftItem
                        draft={draft}
                        onContinue={handleDraftContinue}
                        onDelete={handleDeleteDraft}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
