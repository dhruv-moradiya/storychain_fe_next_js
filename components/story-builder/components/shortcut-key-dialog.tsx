'use client';

import { useState } from 'react';

import { ArrowUp, Command, CornerDownLeft, Keyboard, Option as OptionIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { shortcutGroups } from '../data/shortcut-groups';

function renderKeyBadges(keysString: string) {
  const parts = keysString.split('+');

  const renderKeyContent = (part: string) => {
    switch (part) {
      case 'Mod':
        return <Command className="size-3" />;
      case 'Shift':
        return <ArrowUp className="size-3" />;
      case 'Alt':
        return <OptionIcon className="size-3" />;
      case 'Enter':
        return <CornerDownLeft className="size-3" />;
      default:
        return part;
    }
  };

  return (
    <KbdGroup className="gap-1">
      {parts.map((part, i) => (
        <Kbd
          key={i}
          className="border-border/60 bg-card/80 text-text-primary font-ibm-plex-mono inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1.5 text-[11px] font-bold shadow-xs"
        >
          {renderKeyContent(part)}
        </Kbd>
      ))}
    </KbdGroup>
  );
}

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
                  {shortcutGroups[groupIndex].shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="border-border/60 bg-card/40 hover:bg-card/70 flex items-center justify-between rounded-lg border px-3.5 py-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="bg-brand-pink-500/10 text-brand-pink-600 flex size-6 items-center justify-center rounded text-xs font-bold">
                          {shortcut.icon}
                        </span>

                        <span className="text-text-secondary text-sm font-medium">
                          {shortcut.action}
                        </span>
                      </div>

                      {renderKeyBadges(shortcut.keys)}
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
