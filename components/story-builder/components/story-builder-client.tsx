'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';

import { useHotkey } from '@tanstack/react-hotkeys';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Paragraph from '@tiptap/extension-paragraph';
import { TableKit } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { FontSize, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
  BuilderCanvas,
  BuilderHeader,
  BuilderStatusBar,
  BuilderToolbar,
  DraftRecoveryBanner,
} from '@/components/story-builder';
import { useBuilderParams } from '@/hooks/use-builder-params';
import { cn } from '@/lib/utils';
import { useGetAutoSaveDraft } from '@/services/auto-save/auto-save.query';

const DEFAULT_CONTENT = `
  <h2>Welcome to StoryChain</h2>
  <p>Start writing your chapter here. Your work will be automatically saved as you type.</p>
  <p>When you're ready, you can publish directly or create a submit request for review.</p>
`;

const CustomHorizontalRule = HorizontalRule.extend({
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const extensions = [
  TextStyleKit,
  StarterKit.configure({
    paragraph: false,
    horizontalRule: false,
  }),
  CustomParagraph,
  CustomHorizontalRule,
  FontSize,
  CustomTextStyle,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
  }),
  TableKit.configure({ table: { resizable: true } }),
];

function StoryBuilderContent() {
  const { storySlug, autoSaveId, mode, parentChapterSlug } = useBuilderParams();
  const { data: draftResponse } = useGetAutoSaveDraft();
  const draftedDocs = draftResponse?.data?.docs;

  const [title, setTitle] = useState<string>('');

  const selectedDraft = useMemo(() => {
    const draftList = draftedDocs || [];
    return draftList.find((d) => d._id === autoSaveId);
  }, [draftedDocs, autoSaveId]);

  const editor = useEditor({
    extensions,
    content: DEFAULT_CONTENT,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          'focus:outline-none',
          'chapter-reader-content',
          'prose prose-lg prose-gray dark:prose-invert',
          'mx-auto max-w-none',
          'prose-p:text-[1rem] prose-p:leading-[1.9] prose-p:tracking-[0.01em]',
          'prose-p:text-text-secondary prose-p:my-6',
          'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-text-primary',
          'prose-h2:mt-12 prose-h2:mb-5 prose-h2:text-xl',
          'prose-h3:mt-10 prose-h3:mb-4',
          'prose-a:text-brand-pink-500 prose-a:font-medium prose-a:no-underline',
          'hover:prose-a:underline',
          'prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1',
          'prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1',
          'prose-li:text-[1.125rem] prose-li:leading-[1.9]',
          'prose-blockquote:border-l-4',
          'prose-blockquote:border-l-brand-pink-500/40',
          'prose-blockquote:pl-6 prose-blockquote:py-1',
          'prose-blockquote:italic',
          'prose-blockquote:text-text-secondary-65',
          'selection:bg-primary selection:text-muted text-sm'
        ),
      },
    },
  });

  // Hydrate title when a draft is selected or loaded
  const [hydratedId, setHydratedId] = useState<string | undefined>('');
  if (autoSaveId !== hydratedId) {
    if (selectedDraft) {
      setHydratedId(autoSaveId);
      setTitle(selectedDraft.title || '');
    } else if (!autoSaveId && hydratedId !== undefined) {
      setHydratedId(undefined);
      setTitle('');
    }
  }

  // Sync editor content when a draft is selected or loaded
  useEffect(() => {
    if (editor && selectedDraft) {
      editor.commands.setContent(selectedDraft.content);
    } else if (editor && !autoSaveId) {
      editor.commands.setContent(DEFAULT_CONTENT);
    }
  }, [selectedDraft, editor, autoSaveId]);

  useHotkey(
    'Mod+S',
    () => {
      console.log('save');
    },
    { requireReset: true }
  );

  if (!editor) return null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DraftRecoveryBanner />
      <BuilderHeader
        title={title}
        onTitleChange={setTitle}
        editor={editor}
        autoSaveId={autoSaveId}
        storySlug={storySlug}
        mode={mode}
        parentChapterSlug={parentChapterSlug}
        draftId={autoSaveId}
      />
      <BuilderToolbar editor={editor} />
      <BuilderCanvas editor={editor} />
      <BuilderStatusBar editor={editor} />
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
