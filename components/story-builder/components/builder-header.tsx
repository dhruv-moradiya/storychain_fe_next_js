import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { IChapterDetailExtended } from '@/type';
import { AutoSaveType, TAutoSaveContentRequest, TAutoSaveType } from '@/type/auto-save';
import { formatForDisplay, useHotkey } from '@tanstack/react-hotkeys';
import { Editor } from '@tiptap/react';
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  FileText,
  GitPullRequest,
  Loader2,
  Save,
  Send,
  Settings,
} from 'lucide-react';

import { statusBadge } from '@/components/common/badge';
import { ChapterReader } from '@/components/common/chapter-reader';
import { SubmitRequestDialog } from '@/components/common/submit-request-dialog';
import toast from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { TBuilderMode } from '@/hooks/use-builder-params';
import { getErrorMessage } from '@/lib/error';
import { useAutoSaveContent, useConvertAutoSave } from '@/services/auto-save/auto-save.mutation';

import { ShortcutKeys } from '../types/shortcut-keys.enum';

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
  storyTitle?: string;
  parentChapterTitle?: string;
  draftId?: string;
}

interface ChapterData {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    username: string;
  };
  status: ChapterStatus;
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
  const { mutate: convertAutoSave, isPending: isConverting } = useConvertAutoSave(storySlug ?? '');

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
      ...(parentChapterSlug && parentChapterSlug !== 'root' ? { parentChapterSlug } : {}),
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
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const _handleConvertToDraft = () => {
    if (!autoSaveId) {
      toast.error('Please save your progress first');
      return;
    }

    convertAutoSave(
      { autoSaveId, type: 'draft' },
      {
        onSuccess: () => {
          toast.success('Saved as draft chapter');
          // router.push(`/stories/${storySlug}/chapters`);
        },
        onError: () => {
          toast.error('Failed to save as draft');
        },
      }
    );
  };

  const handlePublish = () => {
    if (!autoSaveId) {
      toast.error('Please save your progress first');
      return;
    }

    convertAutoSave(
      { autoSaveId, type: 'publish' },
      {
        onSuccess: () => {
          router.push(`/stories/${storySlug}/chapters`);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  // Create chapter data for preview
  const previewChapter: ChapterData = {
    id: 'preview',
    title: title || 'Untitled Chapter',
    content: editor?.getHTML() || '',
    author: {
      id: 'current-user',
      name: authorName,
      avatar: authorAvatar ?? '',
      username: authorName,
    },
    status: 'draft',
  };

  const isActionPending = isSaving || isConverting;

  useHotkey(ShortcutKeys.Save, () => {
    handleSave();
  });

  useHotkey(ShortcutKeys.Preview, () => {
    setIsPreviewOpen(true);
  });

  useHotkey(ShortcutKeys.CreateSubmitRequest, () => {
    setIsSubmitRequestOpen(true);
  });

  return (
    <div className="border-border/50 bg-cream-95 sticky top-0 z-30 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-275 items-center justify-between gap-2 px-3 py-2 sm:gap-4">
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
              className="h-[92vh] w-full overflow-hidden border-none bg-transparent p-0 shadow-none sm:max-w-4xl"
              sheetHeight="95%"
              showCloseButton={true}
            >
              <div className="bg-bg-cream-light relative flex h-full flex-col overflow-hidden border border-black/5 shadow-2xl">
                {/* Immersive Header */}
                <ResponsiveDialogHeader className="border-border border-b px-8 py-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <ResponsiveDialogTitle className="font-playfair text-text-tertiary text-2xl font-bold tracking-tight">
                        Chapter Preview
                      </ResponsiveDialogTitle>
                      <p className="text-text-secondary-50 font-ibm-plex-mono mt-1.5 flex items-center gap-2 text-[10px] tracking-wider uppercase">
                        <span className="bg-brand-pink-500 h-1.5 w-1.5 animate-pulse rounded-full" />
                        Live Draft Rendering
                      </p>
                    </div>
                  </div>
                </ResponsiveDialogHeader>

                {/* Readable Content Area */}
                <div className="relative flex-1 overflow-y-auto px-6 py-8 sm:px-14 sm:py-12">
                  {/* Subtle Paper Texture Background Effect */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.03]" />

                  <div className="relative z-10 mx-auto max-w-2xl">
                    <ChapterReader
                      chapter={previewChapter as unknown as IChapterDetailExtended}
                      showHeader={true}
                      showStats={false}
                      variant="preview"
                    />
                  </div>
                </div>

                {/* Preview Footer */}
                <div className="border-border flex items-center justify-between border-t px-8 py-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="text-text-secondary-40 font-ibm-plex-mono flex items-center gap-2 text-[10px]">
                      <span>{previewChapter.title.length} characters</span>
                      <span className="opacity-30">|</span>
                      <span>Story Chain Engine</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-pink-500 hover:text-brand-pink-600 hover:bg-brand-pink-500/5 text-xs font-bold"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    Return to Editor
                  </Button>
                </div>
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
            disabled={isSaving || isConverting}
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
                disabled={isSaving || isConverting}
              >
                {isConverting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isConverting ? 'Publishing...' : 'Publish'}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={handlePublish}
                className="gap-2"
                disabled={isActionPending}
              >
                <Send className="h-4 w-4" />
                Publish Directly
                <DropdownMenuShortcut>
                  {formatForDisplay(ShortcutKeys.Publish)}
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setIsSubmitRequestOpen(true)}
                className="gap-2"
                disabled={isActionPending}
              >
                <GitPullRequest className="h-4 w-4" />
                Create Submit Request
                <DropdownMenuShortcut>
                  {formatForDisplay(ShortcutKeys.CreateSubmitRequest)}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Submit Request Dialog */}
      <SubmitRequestDialog
        open={isSubmitRequestOpen}
        onOpenChange={setIsSubmitRequestOpen}
        storySlug={storySlug}
        storyTitle={storyTitle}
        parentChapterSlug={parentChapterSlug}
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
