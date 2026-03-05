import {
  ArrowLeft,
  Eye,
  Settings,
  Save,
  Send,
  Loader2,
  ChevronDown,
  FileText,
  GitPullRequest,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { ChapterReader, type ChapterData } from '@/components/common/chapter-reader';
import { SubmitRequestDialog } from '@/components/common/submit-request-dialog';
import { Editor } from '@tiptap/react';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { statusBadge } from '@/components/common/badge';
import { TBuilderMode } from '@/hooks/use-builder-params';
import {
  useAutoSaveContent,
  useConvertToDraft,
  useConvertToPublished,
} from '@/services/auto-save/auto-save.mutation';
import { TAutoSaveContentRequest, TAutoSaveType, AutoSaveType } from '@/type/auto-save';

type ChapterStatus = 'draft' | 'pending' | 'published' | 'rejected';

interface BuilderHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  editor: Editor | null;
  authorName?: string;
  authorAvatar?: string;
  autoSaveId?: string;
  // Context for builder
  mode: TBuilderMode;
  storySlug?: string;
  parentChapterSlug?: string;
  chapterId?: string;
  // Context for submit request dialog
  storyId?: string;
  storyTitle?: string;
  parentChapterTitle?: string;
  draftId?: string;
}

const statusBadgeConfig: Record<
  ChapterStatus,
  { status: 'neutral' | 'warning' | 'success' | 'error'; label: string }
> = {
  draft: { label: 'Draft', status: 'neutral' },
  pending: { label: 'Pending Review', status: 'warning' },
  published: { label: 'Published', status: 'success' },
  rejected: { label: 'Rejected', status: 'error' },
};

/**
 * Helper to determine auto-save type based on builder state
 */
function getAutoSaveType(
  mode: TBuilderMode,
  parentChapterSlug?: string,
  chapterId?: string
): TAutoSaveType {
  if (parentChapterSlug === 'root' || !parentChapterSlug) {
    return AutoSaveType.ROOT_CHAPTER;
  }
  if (mode === 'update' && chapterId) {
    return AutoSaveType.UPDATE_CHAPTER;
  }
  return AutoSaveType.NEW_CHAPTER;
}

/**
 * Builder header component
 * Top section with back button, chapter name, status, and action buttons
 */
function BuilderHeader({
  title,
  onTitleChange,
  editor,
  authorName = 'You',
  authorAvatar,
  autoSaveId,
  mode,
  storySlug,
  parentChapterSlug,
  chapterId,
  storyId,
  storyTitle,
  parentChapterTitle,
  draftId,
}: BuilderHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitRequestOpen, setIsSubmitRequestOpen] = useState(false);
  const status: ChapterStatus = 'draft';
  const config = statusBadgeConfig[status];

  // Mutations
  const { mutate: autoSave, isPending: isSaving } = useAutoSaveContent();
  const { mutate: convertToDraft, isPending: isConvertingToDraft } = useConvertToDraft();
  const { mutate: convertToPublished, isPending: isPublishing } = useConvertToPublished();

  const handleSave = () => {
    if (!title) {
      toast.error('Please enter a title before saving');
      return;
    }

    if (!editor) return;

    const autoSaveType = getAutoSaveType(mode, parentChapterSlug, chapterId);

    const payload: TAutoSaveContentRequest = {
      title,
      content: editor.getHTML(),
      autoSaveType,
      storySlug,
      autoSaveId,
      // API key is parentChapterId; value is now a slug string
      ...(parentChapterSlug && parentChapterSlug !== 'root'
        ? { parentChapterId: parentChapterSlug }
        : {}),
      ...(chapterId ? { chapterId } : {}),
    } as TAutoSaveContentRequest;

    autoSave(payload, {
      onSuccess: (response) => {
        toast.success('Progress saved');
        // Update URL with new autoSaveId if it's the first save
        if (!autoSaveId && response.data?._id) {
          const params = new URLSearchParams(searchParams.toString());
          params.set('autoSaveId', response.data._id);
          router.replace(`?${params.toString()}`);
        }
      },
      onError: () => {
        toast.error('Failed to save progress');
      },
    });
  };

  const handleConvertToDraft = () => {
    if (!autoSaveId) {
      toast.error('Please save your progress first');
      return;
    }

    convertToDraft(autoSaveId, {
      onSuccess: () => {
        toast.success('Saved as draft chapter');
        router.push(`/stories/${storySlug}/chapters`);
      },
      onError: () => {
        toast.error('Failed to save as draft');
      },
    });
  };

  const handlePublish = () => {
    if (!autoSaveId) {
      toast.error('Please save your progress first');
      return;
    }

    convertToPublished(autoSaveId, {
      onSuccess: () => {
        toast.success('Published successfully!');
        router.push(`/stories/${storySlug}/chapters`);
      },
      onError: () => {
        toast.error('Failed to publish chapter');
      },
    });
  };

  // Create chapter data for preview
  const previewChapter: ChapterData = {
    id: 'preview',
    title: title || 'Untitled Chapter',
    content: editor?.getHTML() || '',
    author: {
      id: 'current-user',
      name: authorName,
      avatar: authorAvatar,
    },
    status: 'draft',
  };

  const isActionPending = isSaving || isConvertingToDraft || isPublishing;

  return (
    <div className="border-border/50 bg-cream-95 sticky top-0 z-30 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-2 px-3 py-2 sm:gap-4">
        {/* Left Section - Back button, Chapter Name, Status */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary-65 hover:bg-brand-pink-500/10 hover:text-text-primary h-8 w-8 shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 flex-col">
              <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Untitled Chapter"
                className="text-text-primary placeholder:text-text-secondary-65 focus-visible:ring-brand-pink-500/30 font-ibm-plex-mono h-8 min-w-0 flex-1 border-none bg-transparent text-sm font-medium shadow-none focus-visible:ring-1 sm:max-w-56 sm:text-base"
              />
              {autoSaveId && (
                <span className="text-text-secondary-65 font-ibm-plex-mono truncate pl-3 text-[10px]">
                  Draft ID: {autoSaveId.slice(0, 8)}...
                </span>
              )}
            </div>
            {statusBadge(config.label, config.status, {
              className: 'hidden sm:flex shrink-0',
              size: 'sm',
              dot: true,
            })}
          </div>
        </div>

        {/* Right Section - Preview, Settings, Save, Actions Dropdown */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ResponsiveDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:bg-muted/50 hover:text-text-primary hidden gap-1.5 md:flex"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden lg:inline">Preview</span>
            </Button>

            <ResponsiveDialogContent
              className="sm:max-w-2xl"
              sheetHeight="90%"
              showCloseButton={true}
            >
              <ResponsiveDialogHeader>
                <ResponsiveDialogTitle>Preview</ResponsiveDialogTitle>
              </ResponsiveDialogHeader>
              <div className="mt-4 max-h-[70vh] overflow-y-auto">
                <ChapterReader
                  chapter={previewChapter}
                  showHeader={true}
                  showStats={false}
                  variant="preview"
                />
              </div>
            </ResponsiveDialogContent>
          </ResponsiveDialog>

          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:bg-muted/50 hover:text-text-primary hidden gap-1.5 sm:flex"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden lg:inline">Settings</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-border text-text-secondary hover:bg-muted/50 hover:text-text-primary gap-1.5"
            onClick={handleSave}
            disabled={isActionPending}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>

          {/* Actions Dropdown - Publish, Save as Draft, Submit Request */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-1.5 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
                disabled={isActionPending}
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isPublishing ? 'Publishing...' : 'Publish'}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handlePublish}
                className="gap-2"
                disabled={isActionPending}
              >
                <Send className="h-4 w-4" />
                Publish Directly
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleConvertToDraft}
                className="gap-2"
                disabled={isActionPending}
              >
                <FileText className="h-4 w-4" />
                Save as Draft Chapter
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsSubmitRequestOpen(true)}
                className="gap-2"
                disabled={isActionPending}
              >
                <GitPullRequest className="h-4 w-4" />
                Create Submit Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Submit Request Dialog */}
      <SubmitRequestDialog
        open={isSubmitRequestOpen}
        onOpenChange={setIsSubmitRequestOpen}
        storyId={storyId}
        storyTitle={storyTitle}
        storySlug={storySlug}
        parentChapterId={parentChapterSlug}
        parentChapterTitle={parentChapterTitle}
        draftId={draftId}
        draftTitle={title}
        draftContent={editor?.getHTML() || ''}
      />
    </div>
  );
}

export { BuilderHeader };
export type { ChapterStatus, BuilderHeaderProps };
