import { motion } from 'framer-motion';
import { AlertTriangle, FileText, Plus, FileEdit } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { TSubmitRequestFormData } from '../types/submit-request.schema';
import { ChapterOption, DraftOption } from '../types/submit-request-dialog.types';

interface ContentPreviewStepProps {
  chapters: ChapterOption[];
  drafts: DraftOption[];
}

export function ContentPreviewStep({ chapters, drafts }: ContentPreviewStepProps) {
  const { watch } = useFormContext<TSubmitRequestFormData>();
  const { submitRequestType, parentChapterSlug, chapterId, draftId } = watch();

  const isNewChapter = submitRequestType === 'new_chapter';
  const targetId = isNewChapter ? parentChapterSlug : chapterId;

  // Get chapter content for preview
  const selectedChapter = chapters.find((c) => c.id === targetId);
  const targetChapterTitle = targetId === 'root' ? 'Story Introduction' : selectedChapter?.title;

  // Get draft info
  const selectedDraft = drafts.find((d) => d.id === draftId);

  // For delete_chapter, show the warning
  if (submitRequestType === 'delete_chapter') {
    return (
      <motion.div
        key="content-delete"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.15 }}
        className="space-y-4"
      >
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-red-700">Deletion Request</p>
              <p className="mt-1 font-mono text-sm text-red-600/70">
                You're requesting to delete this chapter. Please ensure you've provided a clear
                reason in the description field.
              </p>
            </div>
          </div>
        </div>

        {/* Show chapter being deleted */}
        {(selectedChapter || targetId === 'root') && (
          <div className="rounded-xl border border-black/10 bg-black/2 p-4">
            <p className="text-text-secondary-65 mb-2 font-mono text-xs uppercase">
              Chapter to be deleted
            </p>
            <p className="text-text-primary font-medium">{targetChapterTitle}</p>
            {selectedChapter?.content && (
              <div className="mt-3 max-h-[150px] overflow-y-auto rounded-lg border border-black/5 bg-white p-3">
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

  // For new_chapter, show the draft content and where it will be inserted
  if (isNewChapter) {
    return (
      <motion.div
        key="content-new"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.15 }}
        className="space-y-4"
      >
        <div className="rounded-xl border border-[#10b981]/20 bg-[#10b981]/5 p-4">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#10b981]/15">
              <Plus className="h-4 w-4 text-[#10b981]" />
            </div>
            <div>
              <p className="font-medium text-[#10b981]">New Chapter</p>
              <p className="mt-0.5 font-mono text-sm text-[#10b981]/70">
                Will be inserted after "{targetChapterTitle}"
              </p>
            </div>
          </div>
        </div>

        {/* Show the selected draft content */}
        {selectedDraft && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-65 font-mono text-xs uppercase">Draft Content</p>
              <p className="text-text-secondary-65 font-mono text-xs">{selectedDraft.title}</p>
            </div>
            <div className="rounded-xl border border-black/10 bg-white/50 p-4">
              <div className="max-h-[200px] overflow-y-auto rounded-lg border border-black/5 bg-black/2 p-3">
                <p className="text-text-primary text-sm leading-relaxed">{selectedDraft.content}</p>
              </div>
            </div>
          </div>
        )}

        {/* Preview parent chapter context */}
        {selectedChapter && selectedChapter.content && (
          <div className="space-y-2">
            <p className="text-text-secondary-65 font-mono text-xs uppercase">
              Parent Chapter Preview
            </p>
            <div className="rounded-xl border border-black/10 bg-black/2 p-4">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="text-text-secondary-65 h-4 w-4" />
                <p className="text-text-primary text-sm font-medium">{selectedChapter.title}</p>
              </div>
              <div className="max-h-[100px] overflow-y-auto rounded-lg border border-black/5 bg-white p-3">
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

  // For edit_chapter, show original content
  return (
    <motion.div
      key="content-edit"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-4"
    >
      <div className="border-brand-blue/20 bg-brand-blue/5 rounded-xl border p-4">
        <div className="flex gap-3">
          <div className="bg-brand-blue/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <FileEdit className="text-brand-blue h-4 w-4" />
          </div>
          <div>
            <p className="text-brand-blue font-medium">Edit Chapter</p>
            <p className="text-brand-blue/70 mt-0.5 font-mono text-sm">
              Proposing changes to "{targetChapterTitle}"
            </p>
          </div>
        </div>
      </div>

      {/* Show original content */}
      {selectedChapter && (
        <div className="space-y-2">
          <p className="text-text-secondary-65 font-mono text-xs uppercase">Original Content</p>
          <div className="rounded-xl border border-black/10 bg-white/50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="text-text-secondary-65 h-4 w-4" />
              <p className="text-text-primary text-sm font-medium">{selectedChapter.title}</p>
            </div>
            <div className="max-h-[200px] overflow-y-auto rounded-lg border border-black/5 bg-black/2 p-3">
              <p className="text-text-secondary-75 text-sm leading-relaxed">
                {selectedChapter.content || 'No content available'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for proposed changes */}
      <div className="rounded-xl border border-dashed border-black/20 bg-black/2 p-6 text-center">
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
