'use client';

import { useCallback, useEffect, useRef } from 'react';

import type { Editor } from '@tiptap/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  CaseSensitive,
  ChevronRight,
  Regex,
  Replace,
  ReplaceAll,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFindAndReplace } from '@/hooks/use-find-and-replace';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FindAndReplaceProps {
  editor: Editor;
  isOpen: boolean;
  showReplace: boolean;
  onOpen: (withReplace?: boolean) => void;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

function FindAndReplace({ editor, isOpen, showReplace, onOpen, onClose }: FindAndReplaceProps) {
  const { state, actions } = useFindAndReplace(editor);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  // Focus & select search input on open
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure animation has started and input is rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ─── Keyboard handlers ──────────────────────────────────────────────────

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        actions.findPrevious();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        actions.findNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [actions, onClose]
  );

  const handleReplaceKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        actions.replaceCurrent();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [actions, onClose]
  );

  // ─── Match counter label ────────────────────────────────────────────────

  const matchLabel =
    state.totalResults > 0
      ? `${state.currentIndex + 1} of ${state.totalResults}`
      : state.searchTerm
        ? 'No results'
        : 'No results';

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            'absolute top-2 right-4 z-50',
            'border-border/60 bg-background/95 rounded-lg border shadow-lg backdrop-blur-md',
            'w-[420px]'
          )}
          role="dialog"
          aria-label="Find and Replace"
        >
          <TooltipProvider delayDuration={300}>
            <div className="flex flex-col gap-1.5 p-2">
              {/* ─── Find Row ──────────────────────────────────────────── */}
              <div className="flex items-center gap-1.5">
                {/* Toggle replace visibility */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 shrink-0"
                      onClick={() => onOpen(!showReplace)}
                      aria-label="Toggle Replace"
                      aria-expanded={showReplace}
                    >
                      <ChevronRight
                        className={cn(
                          'size-3.5 transition-transform duration-150',
                          showReplace && 'rotate-90'
                        )}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    Toggle Replace
                  </TooltipContent>
                </Tooltip>

                {/* Search input */}
                <div className="relative flex flex-1 items-center">
                  <Input
                    ref={searchInputRef}
                    value={state.searchTerm}
                    onChange={(e) => actions.setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Find"
                    className="pr-16 text-xs"
                    aria-label="Search"
                  />

                  {/* Option toggles inside input area */}
                  <div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-0.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Toggle
                          size="sm"
                          pressed={state.caseSensitive}
                          onPressedChange={() => actions.toggleCaseSensitive()}
                          className="size-5 p-0"
                          aria-label="Match Case"
                        >
                          <CaseSensitive className="size-3.5" />
                        </Toggle>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Match Case
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Toggle
                          size="sm"
                          pressed={state.useRegex}
                          onPressedChange={() => actions.toggleRegex()}
                          className="size-5 p-0"
                          aria-label="Use Regular Expression"
                        >
                          <Regex className="size-3.5" />
                        </Toggle>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Use Regular Expression
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Match counter */}
                <span
                  className={cn(
                    'text-text-secondary-65 shrink-0 text-xs tabular-nums',
                    'min-w-[52px] text-center',
                    state.searchTerm && state.totalResults === 0 && 'text-destructive'
                  )}
                >
                  {state.searchTerm ? matchLabel : ''}
                </span>

                <Separator orientation="vertical" className="h-4" />

                {/* Navigation buttons */}
                <div className="flex items-center gap-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={actions.findPrevious}
                        disabled={state.totalResults === 0}
                        aria-label="Previous Match"
                      >
                        <ArrowUp className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      <span>Previous Match</span>
                      <kbd className="bg-cream-60 text-text-secondary-65 ml-2 rounded px-1 py-0.5 font-mono text-[10px]">
                        Shift+Enter
                      </kbd>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={actions.findNext}
                        disabled={state.totalResults === 0}
                        aria-label="Next Match"
                      >
                        <ArrowDown className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      <span>Next Match</span>
                      <kbd className="bg-cream-60 text-text-secondary-65 ml-2 rounded px-1 py-0.5 font-mono text-[10px]">
                        Enter
                      </kbd>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Close button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <X className="size-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    <span>Close</span>
                    <kbd className="bg-cream-60 text-text-secondary-65 ml-2 rounded px-1 py-0.5 font-mono text-[10px]">
                      Esc
                    </kbd>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* ─── Replace Row ───────────────────────────────────────── */}
              <AnimatePresence>
                {showReplace && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-1.5 pl-[30px]">
                      {/* Replace input */}
                      <Input
                        ref={replaceInputRef}
                        value={state.replaceTerm}
                        onChange={(e) => actions.setReplaceTerm(e.target.value)}
                        onKeyDown={handleReplaceKeyDown}
                        placeholder="Replace"
                        className="flex-1 text-xs"
                        aria-label="Replace"
                      />

                      {/* Replace buttons */}
                      <div className="flex items-center gap-0.5">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6"
                              onClick={actions.replaceCurrent}
                              disabled={state.totalResults === 0}
                              aria-label="Replace"
                            >
                              <Replace className="size-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="text-xs">
                            Replace
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6"
                              onClick={actions.replaceAll}
                              disabled={state.totalResults === 0}
                              aria-label="Replace All"
                            >
                              <ReplaceAll className="size-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="text-xs">
                            Replace All
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TooltipProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { FindAndReplace };
