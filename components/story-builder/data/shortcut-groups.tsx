import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Unlink,
  Undo2,
  Redo2,
  Save,
  FilePenLine,
  Eye,
  CornerDownLeft,
  Rocket,
  Type,
} from 'lucide-react';

interface ShortcutItem {
  keys: string;
  action: string;
  icon: React.ReactNode;
}

interface ShortcutGroup {
  title: string;
  icon: React.ReactNode;
  shortcuts: ShortcutItem[];
}

export const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Text Formatting',
    icon: <Type className="size-4" />,
    shortcuts: [
      { keys: 'Mod+B', action: 'Bold', icon: <Bold className="size-3.5" /> },
      { keys: 'Mod+I', action: 'Italic', icon: <Italic className="size-3.5" /> },
      { keys: 'Mod+U', action: 'Underline', icon: <Underline className="size-3.5" /> },
      { keys: 'Mod+Shift+X', action: 'Strike', icon: <Strikethrough className="size-3.5" /> },
    ],
  },
  {
    title: 'Headings & Paragraph',
    icon: <Heading className="size-4" />,
    shortcuts: [
      { keys: 'Mod+Alt+0', action: 'Paragraph', icon: <Pilcrow className="size-3.5" /> },
      { keys: 'Mod+Alt+1', action: 'Heading 1', icon: <Heading1 className="size-3.5" /> },
      { keys: 'Mod+Alt+2', action: 'Heading 2', icon: <Heading2 className="size-3.5" /> },
      { keys: 'Mod+Alt+3', action: 'Heading 3', icon: <Heading3 className="size-3.5" /> },
      { keys: 'Mod+Alt+4', action: 'Heading 4', icon: <Heading4 className="size-3.5" /> },
    ],
  },
  {
    title: 'Alignment',
    icon: <AlignCenter className="size-4" />,
    shortcuts: [
      { keys: 'Mod+Shift+L', action: 'Align Left', icon: <AlignLeft className="size-3.5" /> },
      {
        keys: 'Mod+Shift+E',
        action: 'Align Center',
        icon: <AlignCenter className="size-3.5" />,
      },
      { keys: 'Mod+Shift+R', action: 'Align Right', icon: <AlignRight className="size-3.5" /> },
      {
        keys: 'Mod+Shift+J',
        action: 'Justify',
        icon: <AlignJustify className="size-3.5" />,
      },
    ],
  },
  {
    title: 'Lists & Quotes',
    icon: <ListOrdered className="size-4" />,
    shortcuts: [
      {
        keys: 'Mod+Shift+7',
        action: 'Bullet List',
        icon: <List className="size-3.5" />,
      },
      {
        keys: 'Mod+Shift+8',
        action: 'Ordered List',
        icon: <ListOrdered className="size-3.5" />,
      },
      { keys: 'Mod+Q', action: 'Blockquote', icon: <Quote className="size-3.5" /> },
      { keys: 'Mod+E', action: 'Inline Code', icon: <Code className="size-3.5" /> },
    ],
  },
  {
    title: 'Links',
    icon: <LinkIcon className="size-4" />,
    shortcuts: [
      { keys: 'Mod+K', action: 'Insert Link', icon: <LinkIcon className="size-3.5" /> },
      { keys: 'Mod+Shift+K', action: 'Remove Link', icon: <Unlink className="size-3.5" /> },
    ],
  },
  {
    title: 'History',
    icon: <Undo2 className="size-4" />,
    shortcuts: [
      { keys: 'Mod+Z', action: 'Undo', icon: <Undo2 className="size-3.5" /> },
      { keys: 'Mod+Shift+Z', action: 'Redo', icon: <Redo2 className="size-3.5" /> },
    ],
  },
  {
    title: 'Actions',
    icon: <Save className="size-4" />,
    shortcuts: [
      { keys: 'Mod+S', action: 'Save', icon: <Save className="size-3.5" /> },
      { keys: 'Mod+Shift+D', action: 'Save Draft', icon: <FilePenLine className="size-3.5" /> },
      { keys: 'Mod+Shift+P', action: 'Preview', icon: <Eye className="size-3.5" /> },
      {
        keys: 'Mod+Enter',
        action: 'Create Submit Request',
        icon: <CornerDownLeft className="size-3.5" />,
      },
      { keys: 'Mod+P', action: 'Publish', icon: <Rocket className="size-3.5" /> },
    ],
  },
];
