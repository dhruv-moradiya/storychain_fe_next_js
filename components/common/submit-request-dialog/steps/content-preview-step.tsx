'use client';

import { useFormContext } from 'react-hook-form';

import { motion } from 'framer-motion';
import { AlertTriangle, FileEdit, FileText, Plus } from 'lucide-react';

import { ChapterOption, DraftOption } from '../types/submit-request-dialog.types';
import { TSubmitRequestFormData } from '../types/submit-request.schema';

interface ContentPreviewStepProps {
  chapters: ChapterOption[];
  drafts: DraftOption[];
}

const MOTION_PROPS = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.15 },
};

/**
 * Step 4 - Preview
 * Shows a preview of what will change based on the PullRequestType.
 */
export function ContentPreviewStep({ chapters, drafts }: ContentPreviewStepProps) {
  const { watch } = useFormContext<TSubmitRequestFormData>();
  const { PullRequestType, parentChapterSlug, chapterSlug, draftId } = watch();

  const isNewChapter = PullRequestType === 'new_chapter';
  const activeChapterSlug = isNewChapter ? parentChapterSlug : chapterSlug;

  const selectedChapter = chapters.find((c) => c.slug === activeChapterSlug);
  const targetChapterTitle =
    activeChapterSlug === 'root' ? 'Story Introduction' : selectedChapter?.title;

  const selectedDraft = drafts.find((d) => d.id === draftId);

  // ── Delete ─────────────────────────────────────────────────────────────────
  if (PullRequestType === 'delete_chapter') {
    return (
      <motion.div key="content-delete" {...MOTION_PROPS} className="space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-red-700">Deletion Submit Request</p>
              <p className="mt-1 font-mono text-sm text-red-600/70">
                You're requesting to delete this chapter. Please ensure you've provided a clear
                reason in the description field.
              </p>
            </div>
          </div>
        </div>

        {(selectedChapter || activeChapterSlug === 'root') && (
          <div className="border-border bg-muted/50 rounded-xl border p-4">
            <p className="text-text-secondary-65 mb-2 font-mono text-xs uppercase">
              Chapter to be deleted
            </p>
            <p className="text-text-primary font-medium">{targetChapterTitle}</p>
            {selectedChapter?.content && (
              <div className="border-soft bg-card mt-3 max-h-[150px] overflow-y-auto rounded-lg border p-3">
                <p className="text-text-secondary-75 text-sm leading-relaxed">
                  {selectedChapter.content}
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  }

  // ── New Chapter ─────────────────────────────────────────────────────────────
  if (isNewChapter) {
    return (
      <motion.div key="content-new" {...MOTION_PROPS} className="space-y-4">
        <div className="rounded-xl border border-[#10b981]/20 bg-[#10b981]/5 p-4">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#10b981]/15">
              <Plus className="h-4 w-4 text-[#10b981]" />
            </div>
            <div>
              <p className="font-medium text-[#10b981]">New Chapter SR</p>
              <p className="mt-0.5 font-mono text-sm text-[#10b981]/70">
                Will be inserted after &quot;{targetChapterTitle}&quot;
              </p>
            </div>
          </div>
        </div>

        {selectedDraft && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-65 font-mono text-xs uppercase">Draft Content</p>
              <p className="text-text-secondary-65 font-mono text-xs">{selectedDraft.title}</p>
            </div>
            <div className="border-border bg-card/50 rounded-xl border p-4">
              <div className="border-soft bg-muted/50 max-h-[200px] overflow-y-auto rounded-lg border p-3">
                <p className="text-text-primary text-sm leading-relaxed">{selectedDraft.content}</p>
              </div>
            </div>
          </div>
        )}

        {selectedChapter?.content && (
          <div className="space-y-2">
            <p className="text-text-secondary-65 font-mono text-xs uppercase">
              Parent Chapter Preview
            </p>
            <div className="border-border bg-muted/50 rounded-xl border p-4">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="text-text-secondary-65 h-4 w-4" />
                <p className="text-text-primary text-sm font-medium">{selectedChapter.title}</p>
              </div>
              <div className="border-soft bg-card max-h-[100px] overflow-y-auto rounded-lg border p-3">
                <p className="text-text-secondary-75 text-sm leading-relaxed">
                  {selectedChapter.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // ── Edit Chapter ────────────────────────────────────────────────────────────
  return (
    <motion.div key="content-edit" {...MOTION_PROPS} className="space-y-4">
      <div className="border-brand-blue/20 bg-brand-blue/5 rounded-xl border p-4">
        <div className="flex gap-3">
          <div className="bg-brand-blue/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <FileEdit className="text-brand-blue h-4 w-4" />
          </div>
          <div>
            <p className="text-brand-blue font-medium">Edit Chapter SR</p>
            <p className="text-brand-blue/70 mt-0.5 font-mono text-sm">
              Proposing changes to &quot;{targetChapterTitle}&quot;
            </p>
          </div>
        </div>
      </div>

      {selectedChapter && (
        <div className="space-y-2">
          <p className="text-text-secondary-65 font-mono text-xs uppercase">Original Content</p>
          <div className="border-border bg-card/50 rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="text-text-secondary-65 h-4 w-4" />
              <p className="text-text-primary text-sm font-medium">{selectedChapter.title}</p>
            </div>
            <div className="border-soft bg-muted/50 max-h-[200px] overflow-y-auto rounded-lg border p-3">
              <p className="text-text-secondary-75 text-sm leading-relaxed">
                {selectedChapter.content || 'No content available'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="border-strong bg-muted/50 rounded-xl border border-dashed p-6 text-center">
        <FileEdit className="text-text-secondary-65 mx-auto mb-2 h-8 w-8" />
        <p className="text-text-secondary-65 font-mono text-sm">
          Your proposed changes will appear here
        </p>
        <p className="text-text-secondary-65 mt-1 font-mono text-xs">
          Edited content from story builder
        </p>
      </div>
    </motion.div>
  );
}
