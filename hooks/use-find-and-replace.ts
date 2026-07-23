import { useCallback, useMemo, useState } from 'react';

import type { Editor } from '@tiptap/react';
import { useEditorState } from '@tiptap/react';

import type { SearchAndReplaceStorage } from '@/components/story-builder/extensions/search-and-replace';

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Safely retrieves the SearchAndReplace extension storage from the editor.
 */
function getSearchStorage(editor: Editor): SearchAndReplaceStorage {
  return (editor.storage as unknown as Record<string, SearchAndReplaceStorage>).searchAndReplace;
}

/**
 * Smoothly scrolls the editor page to bring the active search result into the center of the viewport.
 */
function scrollToCurrentMatch(editor: Editor | null) {
  if (!editor) return;
  requestAnimationFrame(() => {
    setTimeout(() => {
      const el = editor.view.dom.querySelector('.search-result-current');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const { from } = editor.state.selection;
        const coords = editor.view.coordsAtPos(from);
        if (coords && coords.top) {
          window.scrollTo({
            top: window.scrollY + coords.top - window.innerHeight / 2,
            behavior: 'smooth',
          });
        }
      }
    }, 30);
  });
}

export function useFindAndReplace(editor: Editor | null): UseFindAndReplaceReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [showReplace, setShowReplace] = useState(false);

  // Read search & replace state reactively from TipTap extension storage
  const editorSearchState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) {
        return {
          searchTerm: '',
          replaceTerm: '',
          caseSensitive: false,
          useRegex: false,
          currentIndex: 0,
          totalResults: 0,
        };
      }

      const storage = getSearchStorage(ctx.editor);

      if (!storage) {
        return {
          searchTerm: '',
          replaceTerm: '',
          caseSensitive: false,
          useRegex: false,
          currentIndex: 0,
          totalResults: 0,
        };
      }

      return {
        searchTerm: storage.searchTerm,
        replaceTerm: storage.replaceTerm,
        caseSensitive: storage.caseSensitive,
        useRegex: storage.useRegex,
        currentIndex: storage.resultIndex,
        totalResults: storage.results.length,
      };
    },
  });

  const searchTerm = editorSearchState?.searchTerm ?? '';
  const replaceTerm = editorSearchState?.replaceTerm ?? '';
  const caseSensitive = editorSearchState?.caseSensitive ?? false;
  const useRegex = editorSearchState?.useRegex ?? false;
  const currentIndex = editorSearchState?.currentIndex ?? 0;
  const totalResults = editorSearchState?.totalResults ?? 0;

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
            scrollToCurrentMatch(editor);
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
      scrollToCurrentMatch(editor);
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
      scrollToCurrentMatch(editor);
    }
  }, [editor]);

  const toggleRegex = useCallback(() => {
    if (editor) {
      const s = getSearchStorage(editor);
      editor.commands.setUseRegex(!s.useRegex);
      scrollToCurrentMatch(editor);
    }
  }, [editor]);

  const findNext = useCallback(() => {
    editor?.commands.nextSearchResult();
    scrollToCurrentMatch(editor);
  }, [editor]);

  const findPrevious = useCallback(() => {
    editor?.commands.previousSearchResult();
    scrollToCurrentMatch(editor);
  }, [editor]);

  const replaceCurrent = useCallback(() => {
    editor?.commands.replace();
    scrollToCurrentMatch(editor);
  }, [editor]);

  const replaceAllAction = useCallback(() => {
    editor?.commands.replaceAll();
  }, [editor]);

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
