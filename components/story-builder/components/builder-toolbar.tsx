import { formatForDisplay } from '@tanstack/react-hotkeys';
import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import { useEditorState } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { useInitializeToolbarShortcutKey } from '../hooks/useInitializeToolbarShortcutKey';
import { ShortcutKeys } from '../types/shortcut-keys.enum';

interface BuilderToolbarProps {
  editor: Editor;
}

const headingOptions = [
  { level: 1 as Level, label: 'Heading 1', icon: Heading1, className: 'text-lg font-bold' },
  { level: 2 as Level, label: 'Heading 2', icon: Heading2, className: 'text-base font-bold' },
  { level: 3 as Level, label: 'Heading 3', icon: Heading3, className: 'text-sm font-semibold' },
];

interface ToolButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  shortcutKey?: string;
  children: React.ReactNode;
  className?: string;
}

function ToolButton({
  onClick,
  isActive = false,
  disabled = false,
  title,
  shortcutKey,
  children,
  className,
}: ToolButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'size-8 transition-all duration-150',
            isActive &&
              'bg-brand-pink-500/15 text-brand-pink-600 hover:bg-brand-pink-500/25 hover:text-brand-pink-700',
            !isActive && 'text-text-secondary hover:bg-cream-60 hover:text-text-primary',
            disabled && 'opacity-40',
            className
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <div className="flex items-center gap-2">
          <span>{title}</span>
          {shortcutKey && (
            <kbd className="bg-cream-60 text-text-secondary-65 rounded px-1.5 py-0.5 font-mono text-[10px]">
              {formatForDisplay(shortcutKey)}
            </kbd>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function ToolGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'border-border/40 bg-cream-40/50 flex items-center gap-0.5 rounded-lg border p-0.5',
        className
      )}
    >
      {children}
    </div>
  );
}

function ToolSeparator() {
  return <Separator orientation="vertical" className="bg-border/50 mx-1.5 h-5" />;
}

/**
 * Builder toolbar component
 * Enhanced formatting tools with better visual design
 */
function BuilderToolbar({ editor }: BuilderToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
      isStrike: ctx.editor.isActive('strike'),
      isCode: ctx.editor.isActive('code'),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isBlockquote: ctx.editor.isActive('blockquote'),
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
      isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
      isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
      isAlignRight: ctx.editor.isActive({ textAlign: 'right' }),
      isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }),
      currentHeading: headingOptions.find((h) =>
        ctx.editor.isActive('heading', { level: h.level })
      ),
    }),
  });

  const currentHeadingLabel = editorState.currentHeading?.label || 'Paragraph';
  const HeadingIcon = editorState.currentHeading?.icon || Pilcrow;

  useInitializeToolbarShortcutKey(editor);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="border-border/50 from-cream-90 via-cream-85 to-cream-90 w-full border-b bg-linear-to-r">
        <div className="scrollbar-hide mx-auto flex max-w-[1100px] flex-wrap items-center gap-2 overflow-x-auto px-3 py-2 sm:px-4">
          {/* History Tools */}
          <ToolGroup>
            <ToolButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editorState.canUndo}
              title="Undo"
              shortcutKey={ShortcutKeys.Undo}
            >
              <Undo className="size-4" />
            </ToolButton>
            <ToolButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editorState.canRedo}
              title="Redo"
              shortcutKey={ShortcutKeys.Redo}
            >
              <Redo className="size-4" />
            </ToolButton>
          </ToolGroup>

          <ToolSeparator />

          {/* Heading Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="border-border/40 bg-cream-40/50 hover:bg-cream-60 text-text-secondary hover:text-text-primary h-8 min-w-[120px] justify-between gap-2 rounded-lg border px-3"
              >
                <div className="flex items-center gap-2">
                  <HeadingIcon className="size-4" />
                  <span className="text-sm font-medium">{currentHeadingLabel}</span>
                </div>
                <ChevronDown className="size-3.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-bg-cream w-48">
              {headingOptions.map((heading) => (
                <DropdownMenuItem
                  key={heading.level}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: heading.level }).run()
                  }
                  className={cn('flex items-center gap-2', heading.className)}
                >
                  <heading.icon className="size-4" />
                  {heading.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setParagraph().run()}
                className="flex items-center gap-2 text-sm"
              >
                <Pilcrow className="size-4" />
                Paragraph
                {formatForDisplay(ShortcutKeys.Paragraph)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ToolSeparator />

          {/* Text Formatting */}
          <ToolGroup>
            <ToolButton
              isActive={editorState.isBold}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
              shortcutKey={ShortcutKeys.Bold}
            >
              <Bold className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isItalic}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
              shortcutKey={ShortcutKeys.Italic}
            >
              <Italic className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isUnderline}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline"
              shortcutKey={ShortcutKeys.Underline}
            >
              <Underline className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isStrike}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Strikethrough"
              shortcutKey={ShortcutKeys.Strike}
            >
              <Strikethrough className="size-4" />
            </ToolButton>
          </ToolGroup>

          <ToolSeparator />

          {/* Text Alignment */}
          <ToolGroup>
            <ToolButton
              isActive={editorState.isAlignLeft}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="Align Left"
              shortcutKey={ShortcutKeys.AlignLeft}
            >
              <AlignLeft className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isAlignCenter}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="Align Center"
              shortcutKey={ShortcutKeys.AlignCenter}
            >
              <AlignCenter className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isAlignRight}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              title="Align Right"
              shortcutKey={ShortcutKeys.AlignRight}
            >
              <AlignRight className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isAlignJustify}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              title="Justify"
              shortcutKey={ShortcutKeys.AlignJustify}
            >
              <AlignJustify className="size-4" />
            </ToolButton>
          </ToolGroup>

          <ToolSeparator />

          {/* Lists & Block Elements */}
          <ToolGroup>
            <ToolButton
              isActive={editorState.isBulletList}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
              shortcutKey={ShortcutKeys.BulletList}
            >
              <List className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isOrderedList}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Numbered List"
              shortcutKey={ShortcutKeys.OrderedList}
            >
              <ListOrdered className="size-4" />
            </ToolButton>
            <ToolButton
              isActive={editorState.isBlockquote}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Blockquote"
              shortcutKey={ShortcutKeys.Blockquote}
            >
              <Quote className="size-4" />
            </ToolButton>
          </ToolGroup>

          {/* Additional Tools (visible on larger screens) */}
          <div className="hidden items-center gap-2 sm:flex">
            <ToolSeparator />

            {/* Insert Tools */}
            <ToolGroup>
              <ToolButton
                isActive={editorState.isCode}
                onClick={() => editor.chain().focus().toggleCode().run()}
                title="Inline Code"
                shortcutKey={ShortcutKeys.InlineCode}
              >
                <Code className="size-4" />
              </ToolButton>
              <ToolButton
                onClick={() => {}}
                title="Insert Link"
                shortcutKey={ShortcutKeys.InsertLink}
              >
                <Link2 className="size-4" />
              </ToolButton>

              {/* Horizontal Line Tool */}
              <ToolButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Line"
              >
                <Minus className="size-4" />
              </ToolButton>
            </ToolGroup>

            <ToolSeparator />

            {/* Clear Formatting */}
            <ToolButton
              onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
              title="Clear Formatting"
              className="border-border/40 bg-cream-40/50 rounded-lg border"
            >
              <RemoveFormatting className="size-4" />
            </ToolButton>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export { BuilderToolbar };
