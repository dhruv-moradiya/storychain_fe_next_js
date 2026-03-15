import { useHotkey } from '@tanstack/react-hotkeys';
import type { Editor } from '@tiptap/react';

import { ShortcutKeys } from '../types/shortcut-keys.enum';

export function useInitializeToolbarShortcutKey(editor: Editor) {
  useHotkey(
    ShortcutKeys.Undo,
    () => {
      editor.chain().focus().undo().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Redo,
    () => {
      editor.chain().focus().redo().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Bold,
    () => {
      editor.chain().focus().toggleBold().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Italic,
    () => {
      editor.chain().focus().toggleItalic().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Underline,
    () => {
      editor.chain().focus().toggleUnderline().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Strike,
    () => {
      editor.chain().focus().toggleStrike().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Paragraph,
    () => {
      editor.chain().focus().setParagraph().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Heading1,
    () => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Heading2,
    () => {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Heading3,
    () => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Heading4,
    () => {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.AlignLeft,
    () => {
      editor.chain().focus().setTextAlign('left').run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.AlignCenter,
    () => {
      editor.chain().focus().setTextAlign('center').run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.AlignRight,
    () => {
      editor.chain().focus().setTextAlign('right').run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.AlignJustify,
    () => {
      editor.chain().focus().setTextAlign('justify').run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.BulletList,
    () => {
      editor.chain().focus().toggleBulletList().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.OrderedList,
    () => {
      editor.chain().focus().toggleOrderedList().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.Blockquote,
    () => {
      editor.chain().focus().toggleBlockquote().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.InlineCode,
    () => {
      editor.chain().focus().toggleCode().run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.InsertLink,
    () => {
      editor.chain().focus().setLink({ href: '' }).run();
    },
    { requireReset: true }
  );

  useHotkey(
    ShortcutKeys.RemoveLink,
    () => {
      editor.chain().focus().extendMarkRange('link').run();
      editor.chain().focus().unsetLink().run();
    },
    { requireReset: true }
  );
}
