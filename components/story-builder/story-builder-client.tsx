'use client';

import { useState, Suspense } from 'react';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { TableKit } from '@tiptap/extension-table';
import { FontSize, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import {
  BuilderCanvas,
  BuilderHeader,
  BuilderStatusBar,
  BuilderToolbar,
  DraftRecoveryBanner,
} from '@/components/story-builder';

const DEFAULT_CONTENT = `
  <h2>Welcome to StoryChain</h2>
  <p>Start writing your chapter here. Your work will be automatically saved as you type.</p>
  <p>When you're ready, you can publish directly or create a submit request for review.</p>
`;

const extensions = [
  TextStyleKit,
  StarterKit,
  FontSize,
  TextStyle,
  Underline,
  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
  }),
  TableKit.configure({ table: { resizable: true } }),
];

function StoryBuilderContent() {
  const [editorContent, _setEditorContent] = useState<string>(DEFAULT_CONTENT);
  const [title, setTitle] = useState<string>('');
  const searchParams = useSearchParams();
  const _router = useRouter();
  const autoSaveId = searchParams?.get('autoSaveId');

  // Mock data for now as we don't have the hooks
  const _draftList = [];
  const _selectedDraft = undefined;

  const editor = useEditor({
    extensions,
    content: editorContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none max-w-none',
      },
    },
  });

  const handleSave = () => {
    toast.success('Chapter saved locally');
  };

  const handleSaveAsDraft = () => {
    toast.success('Saved as draft');
  };

  const handlePublish = () => {
    toast.success('Published successfully');
  };

  if (!editor) return null;

  const wordCount = editor.getText().trim() ? editor.getText().trim().split(/\s+/).length : 0;
  const charCount = editor.getText().length;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DraftRecoveryBanner />
      <BuilderHeader
        title={title}
        onTitleChange={setTitle}
        onSave={handleSave}
        isSaving={false}
        onPublish={handlePublish}
        onSaveAsDraft={handleSaveAsDraft}
        editorContent={editor.getHTML()}
        autoSaveId={autoSaveId}
      />
      <BuilderToolbar editor={editor} />
      <BuilderCanvas editor={editor} />
      <BuilderStatusBar wordCount={wordCount} charCount={charCount} />
    </div>
  );
}

export default function StoryBuilderClient() {
  return (
    <Suspense fallback={<div>Loading builder...</div>}>
      <StoryBuilderContent />
    </Suspense>
  );
}
