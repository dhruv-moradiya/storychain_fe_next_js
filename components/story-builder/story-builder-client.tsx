'use client';

import { useBuilderParams } from '@/hooks/use-builder-params';
import { useGetAutoSaveDraft } from '@/services/auto-save/auto-save.query';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Paragraph from '@tiptap/extension-paragraph';
import { TableKit } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { FontSize, TextStyle, TextStyleKit } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Suspense, useEffect, useMemo, useState } from 'react';

import {
  BuilderCanvas,
  BuilderHeader,
  BuilderStatusBar,
  BuilderToolbar,
  DraftRecoveryBanner,
} from '@/components/story-builder';
import { useHotkey } from '@tanstack/react-hotkeys';

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
  const draftList = draftResponse?.data?.docs || [];

  const [title, setTitle] = useState<string>('');

  const selectedDraft = useMemo(() => {
    return draftList.find((d) => d._id === autoSaveId);
  }, [draftList, autoSaveId]);

  const editor = useEditor({
    extensions,
    content: DEFAULT_CONTENT,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none max-w-none',
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
