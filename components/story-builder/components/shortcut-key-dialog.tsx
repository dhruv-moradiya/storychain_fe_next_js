'use client';

import {
  AlignCenter,
  Keyboard,
  Link as LinkIcon,
  ListOrdered,
  Save,
  Type,
  Undo2,
} from 'lucide-react';
import { useState } from 'react';

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { shortcutGroups } from '../data/shortcut-groups';
import { formatForDisplay } from '@tanstack/react-hotkeys';

function ShortcutKeysDialog() {
  const [open, setOpen] = useState(false);

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-text-secondary-65 hover:text-text-primary hover:bg-cream-50 gap-2"
        >
          <Keyboard className="size-4" />
          <span className="hidden sm:inline">Shortcut Keys</span>
        </Button>
      </ResponsiveDialogTrigger>

      <ResponsiveDialogContent
        className="p-0 md:min-w-2xl lg:min-w-3xl"
        sheetHeight="85%"
        showCloseButton
      >
        <ResponsiveDialogHeader className="from-cream-80 via-cream-60 border-border/50 space-y-1 rounded-2xl border-b bg-linear-to-br to-transparent px-6 pt-6 pb-4">
          <ResponsiveDialogTitle className="flex items-center justify-center gap-2.5 sm:justify-start">
            <div className="from-brand-pink-500 to-brand-orange flex size-8 items-center justify-center rounded-lg bg-linear-to-br shadow-sm">
              <Keyboard className="size-4.5 text-white" />
            </div>
            <span className="font-serif text-xl">Shortcut Keys</span>
          </ResponsiveDialogTitle>

          <ResponsiveDialogDescription className="text-text-secondary-65">
            Quickly format and control the editor using keyboard shortcuts
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ScrollArea className="max-h-[calc(85vh-140px)] sm:max-h-[70vh]">
          <div className="space-y-6 p-6">
            {shortcutGroups.map((group, groupIndex) => (
              <section key={groupIndex}>
                <div className="mb-3 flex items-center gap-2">
                  <div className="bg-brand-pink-500/10 text-brand-pink-500 flex size-6 items-center justify-center rounded-md">
                    {group.icon}
                  </div>

                  <h3 className="text-text-primary text-sm font-semibold tracking-wide uppercase">
                    {group.title}
                  </h3>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {group.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="bg-cream-40/50 border-border/80 flex items-center justify-between rounded-lg border px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="bg-brand-pink-500/10 text-brand-pink-600 flex size-6 items-center justify-center rounded text-xs font-bold">
                          {shortcut.icon}
                        </span>

                        <span className="text-text-secondary text-sm">{shortcut.action}</span>
                      </div>

                      <kbd className="bg-bg-cream border-border text-text-primary font-ibm-plex-mono rounded-md border px-2 py-1 text-xs shadow-sm">
                        {formatForDisplay(shortcut.keys)}
                      </kbd>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </ScrollArea>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export { ShortcutKeysDialog };
