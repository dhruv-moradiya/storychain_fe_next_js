import { useCallback, useMemo, useState } from 'react';

import type { Editor } from '@tiptap/react';
import { useEditorState } from '@tiptap/react';

import type { SearchAndReplaceStorage } from '@/components/story-builder/extensions/search-and-replace';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FindAndReplaceState {
  isOpen: boolean;
  showReplace: boolean;
  searchTerm: string;
  replaceTerm: string;
  caseSensitive: boolean;
  useRegex: boolean;
  currentIndex: number;
  totalResults: number;
}

interface FindAndReplaceActions {
  open: (withReplace?: boolean) => void;
  close: () => void;
  toggleReplace: () => void;
  setSearchTerm: (term: string) => void;
  setReplaceTerm: (term: string) => void;
  toggleCaseSensitive: () => void;
  toggleRegex: () => void;
  findNext: () => void;
  findPrevious: () => void;
  replaceCurrent: () => void;
  replaceAll: () => void;
}

interface UseFindAndReplaceReturn {
  state: FindAndReplaceState;
  actions: FindAndReplaceActions;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Safely retrieves the SearchAndReplace extension storage from the editor.
 * TipTap v3 types `editor.storage` as the browser's `Storage` interface,
 * so we need to cast through `unknown` to access extension-specific storage.
 */
function getSearchStorage(editor: Editor): SearchAndReplaceStorage {
  return (editor.storage as unknown as Record<string, SearchAndReplaceStorage>).searchAndReplace;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFindAndReplace(editor: Editor | null): UseFindAndReplaceReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [showReplace, setShowReplace] = useState(false);

  // Read the search state reactively from the TipTap extension storage
  const editorSearchState = useEditorState({
    editor,
    selector: (ctx): { currentIndex: number; totalResults: number } => {
      if (!ctx.editor) {
        return { currentIndex: 0, totalResults: 0 };
      }

      const storage = getSearchStorage(ctx.editor);

      if (!storage) {
        return { currentIndex: 0, totalResults: 0 };
      }

      return {
        currentIndex: storage.resultIndex,
        totalResults: storage.results.length,
      };
    },
  });

  // Read current search/replace terms from extension storage
  const storage = editor ? getSearchStorage(editor) : undefined;
  const searchTerm = storage?.searchTerm ?? '';
  const replaceTerm = storage?.replaceTerm ?? '';
  const caseSensitive = storage?.caseSensitive ?? false;
  const useRegex = storage?.useRegex ?? false;

  // ─── Actions ──────────────────────────────────────────────────────────────

  const open = useCallback(
    (withReplace = false) => {
      setIsOpen(true);
      setShowReplace(withReplace);

      // Pre-fill search with current editor selection
      if (editor) {
        const { from, to, empty } = editor.state.selection;
        if (!empty) {
          const selectedText = editor.state.doc.textBetween(from, to);
          if (selectedText.length > 0 && selectedText.length <= 200) {
            editor.commands.setSearchTerm(selectedText);
          }
        }
      }
    },
    [editor]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    if (editor) {
      editor.commands.setSearchTerm('');
      editor.commands.setReplaceTerm('');
      editor.commands.focus();
    }
  }, [editor]);

  const toggleReplace = useCallback(() => {
    setShowReplace((prev) => !prev);
  }, []);

  const setSearchTermAction = useCallback(
    (term: string) => {
      editor?.commands.setSearchTerm(term);
    },
    [editor]
  );

  const setReplaceTermAction = useCallback(
    (term: string) => {
      editor?.commands.setReplaceTerm(term);
    },
    [editor]
  );

  const toggleCaseSensitive = useCallback(() => {
    if (editor) {
      const s = getSearchStorage(editor);
      editor.commands.setCaseSensitive(!s.caseSensitive);
    }
  }, [editor]);

  const toggleRegex = useCallback(() => {
    if (editor) {
      const s = getSearchStorage(editor);
      editor.commands.setUseRegex(!s.useRegex);
    }
  }, [editor]);

  const findNext = useCallback(() => {
    editor?.commands.nextSearchResult();
  }, [editor]);

  const findPrevious = useCallback(() => {
    editor?.commands.previousSearchResult();
  }, [editor]);

  const replaceCurrent = useCallback(() => {
    editor?.commands.replace();
  }, [editor]);

  const replaceAllAction = useCallback(() => {
    editor?.commands.replaceAll();
  }, [editor]);

  // ─── Memoized return ─────────────────────────────────────────────────────

  const currentIndex = editorSearchState?.currentIndex ?? 0;
  const totalResults = editorSearchState?.totalResults ?? 0;

  const state: FindAndReplaceState = useMemo(
    () => ({
      isOpen,
      showReplace,
      searchTerm,
      replaceTerm,
      caseSensitive,
      useRegex,
      currentIndex,
      totalResults,
    }),
    [
      isOpen,
      showReplace,
      searchTerm,
      replaceTerm,
      caseSensitive,
      useRegex,
      currentIndex,
      totalResults,
    ]
  );

  const actions: FindAndReplaceActions = useMemo(
    () => ({
      open,
      close,
      toggleReplace,
      setSearchTerm: setSearchTermAction,
      setReplaceTerm: setReplaceTermAction,
      toggleCaseSensitive,
      toggleRegex,
      findNext,
      findPrevious,
      replaceCurrent,
      replaceAll: replaceAllAction,
    }),
    [
      open,
      close,
      toggleReplace,
      setSearchTermAction,
      setReplaceTermAction,
      toggleCaseSensitive,
      toggleRegex,
      findNext,
      findPrevious,
      replaceCurrent,
      replaceAllAction,
    ]
  );

  return { state, actions };
}
