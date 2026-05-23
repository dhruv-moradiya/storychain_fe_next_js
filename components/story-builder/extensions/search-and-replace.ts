// Custom TipTap Search and Replace Extension
// Inspired by sereneinserenade/tiptap-search-and-replace (MIT License)
import type { Range } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import type { Node as PMNode } from '@tiptap/pm/model';
import { type EditorState, Plugin, PluginKey, type Transaction } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchAndReplaceOptions {
  searchResultClass: string;
  currentResultClass: string;
  disableRegex: boolean;
}

export interface SearchAndReplaceStorage {
  searchTerm: string;
  replaceTerm: string;
  results: Range[];
  lastSearchTerm: string;
  caseSensitive: boolean;
  lastCaseSensitive: boolean;
  useRegex: boolean;
  lastUseRegex: boolean;
  resultIndex: number;
  lastResultIndex: number;
}

interface TextNodeWithPosition {
  text: string;
  pos: number;
}

// ─── Module augmentation ──────────────────────────────────────────────────────

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    searchAndReplace: {
      setSearchTerm: (searchTerm: string) => ReturnType;
      setReplaceTerm: (replaceTerm: string) => ReturnType;
      setCaseSensitive: (caseSensitive: boolean) => ReturnType;
      setUseRegex: (useRegex: boolean) => ReturnType;
      resetIndex: () => ReturnType;
      nextSearchResult: () => ReturnType;
      previousSearchResult: () => ReturnType;
      replace: () => ReturnType;
      replaceAll: () => ReturnType;
    };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SEARCH_PLUGIN_KEY = new PluginKey('searchAndReplace');

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildRegex(
  searchTerm: string,
  disableRegex: boolean,
  caseSensitive: boolean,
  useRegex: boolean
): RegExp | null {
  if (!searchTerm) return null;

  const pattern = !useRegex || disableRegex ? escapeRegExp(searchTerm) : searchTerm;
  const flags = caseSensitive ? 'g' : 'gi';

  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}

function collectTextNodesWithPosition(doc: PMNode): TextNodeWithPosition[] {
  const textNodes: TextNodeWithPosition[] = [];
  const mergedTextNodes: TextNodeWithPosition[] = [];

  // Collect every text node
  doc.descendants((node, pos) => {
    if (node.isText && node.text) {
      textNodes.push({ text: node.text, pos });
    }
  });

  // Merge adjacent text nodes so that cross-node matches work
  for (let i = 0; i < textNodes.length; i++) {
    const current = textNodes[i];

    if (i === 0) {
      mergedTextNodes.push({ ...current });
      continue;
    }

    const last = mergedTextNodes[mergedTextNodes.length - 1];

    if (current.pos === last.pos + last.text.length) {
      last.text += current.text;
    } else {
      mergedTextNodes.push({ ...current });
    }
  }

  return mergedTextNodes;
}

function findMatches(doc: PMNode, regex: RegExp): Range[] {
  const results: Range[] = [];
  const textNodes = collectTextNodesWithPosition(doc);

  for (const { text, pos } of textNodes) {
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match[0] === '') break; // Prevent infinite loops on zero-length matches
      results.push({ from: pos + match.index, to: pos + match.index + match[0].length });
    }
  }

  return results;
}

function processSearches(
  doc: PMNode,
  storage: SearchAndReplaceStorage,
  options: SearchAndReplaceOptions
): DecorationSet {
  const regex = buildRegex(
    storage.searchTerm,
    options.disableRegex,
    storage.caseSensitive,
    storage.useRegex
  );

  if (!regex) {
    storage.results = [];
    return DecorationSet.empty;
  }

  storage.results = findMatches(doc, regex);

  const decorations: Decoration[] = [];

  for (let i = 0; i < storage.results.length; i++) {
    const result = storage.results[i];
    const isCurrentResult = i === storage.resultIndex;

    decorations.push(
      Decoration.inline(result.from, result.to, {
        class: isCurrentResult ? options.currentResultClass : options.searchResultClass,
      })
    );
  }

  return DecorationSet.create(doc, decorations);
}

function searchWasUpdated(storage: SearchAndReplaceStorage): boolean {
  return (
    storage.searchTerm !== storage.lastSearchTerm ||
    storage.caseSensitive !== storage.lastCaseSensitive ||
    storage.useRegex !== storage.lastUseRegex ||
    storage.resultIndex !== storage.lastResultIndex
  );
}

// ─── Extension ────────────────────────────────────────────────────────────────

export const SearchAndReplace = Extension.create<SearchAndReplaceOptions, SearchAndReplaceStorage>({
  name: 'searchAndReplace',

  addOptions() {
    return {
      searchResultClass: 'bg-yellow-300/40 rounded-sm',
      currentResultClass: 'bg-yellow-400/70 rounded-sm ring-2 ring-yellow-400',
      disableRegex: false,
    };
  },

  addStorage() {
    return {
      searchTerm: '',
      replaceTerm: '',
      results: [],
      lastSearchTerm: '',
      caseSensitive: false,
      lastCaseSensitive: false,
      useRegex: false,
      lastUseRegex: false,
      resultIndex: 0,
      lastResultIndex: 0,
    };
  },

  addCommands() {
    return {
      setSearchTerm: (searchTerm: string) => () => {
        this.storage.searchTerm = searchTerm;
        this.storage.resultIndex = 0;
        return false; // Don't prevent further commands
      },

      setReplaceTerm: (replaceTerm: string) => () => {
        this.storage.replaceTerm = replaceTerm;
        return false;
      },

      setCaseSensitive: (caseSensitive: boolean) => () => {
        this.storage.caseSensitive = caseSensitive;
        this.storage.resultIndex = 0;
        return false;
      },

      setUseRegex: (useRegex: boolean) => () => {
        this.storage.useRegex = useRegex;
        this.storage.resultIndex = 0;
        return false;
      },

      resetIndex: () => () => {
        this.storage.resultIndex = 0;
        return false;
      },

      nextSearchResult: () => () => {
        const nextIndex = this.storage.resultIndex + 1;
        this.storage.resultIndex = nextIndex >= this.storage.results.length ? 0 : nextIndex;
        return false;
      },

      previousSearchResult: () => () => {
        const prevIndex = this.storage.resultIndex - 1;
        this.storage.resultIndex =
          prevIndex < 0 ? Math.max(this.storage.results.length - 1, 0) : prevIndex;
        return false;
      },

      replace:
        () =>
        ({ state, dispatch }) => {
          const { results, resultIndex, replaceTerm } = this.storage;

          if (!results.length) return false;

          const currentResult = results[resultIndex];
          if (!currentResult) return false;

          // Verify the current content matches (guard against stale state)
          const currentText = state.doc.textBetween(currentResult.from, currentResult.to);
          const regex = buildRegex(
            this.storage.searchTerm,
            this.options.disableRegex,
            this.storage.caseSensitive,
            this.storage.useRegex
          );
          if (!regex || !regex.test(currentText)) return false;

          if (dispatch) {
            const tr = state.tr.insertText(replaceTerm, currentResult.from, currentResult.to);
            dispatch(tr);
          }

          // Adjust index after replacement
          if (this.storage.resultIndex >= this.storage.results.length - 1) {
            this.storage.resultIndex = 0;
          }

          return true;
        },

      replaceAll:
        () =>
        ({ state, dispatch }) => {
          const { results, replaceTerm } = this.storage;

          if (!results.length) return false;

          if (dispatch) {
            let offset = 0;
            const transaction = state.tr;

            for (const result of results) {
              transaction.insertText(replaceTerm, result.from + offset, result.to + offset);
              offset += replaceTerm.length - (result.to - result.from);
            }

            dispatch(transaction);
          }

          this.storage.resultIndex = 0;
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const extensionThis = this;

    return [
      new Plugin({
        key: SEARCH_PLUGIN_KEY,
        state: {
          init(_: unknown, state: EditorState) {
            return processSearches(state.doc, extensionThis.storage, extensionThis.options);
          },
          apply(
            tr: Transaction,
            oldDecorationSet: DecorationSet,
            _oldState: EditorState,
            newState: EditorState
          ) {
            if (tr.docChanged || searchWasUpdated(extensionThis.storage)) {
              // Sync "last" values
              extensionThis.storage.lastSearchTerm = extensionThis.storage.searchTerm;
              extensionThis.storage.lastCaseSensitive = extensionThis.storage.caseSensitive;
              extensionThis.storage.lastUseRegex = extensionThis.storage.useRegex;
              extensionThis.storage.lastResultIndex = extensionThis.storage.resultIndex;

              return processSearches(newState.doc, extensionThis.storage, extensionThis.options);
            }

            return oldDecorationSet.map(tr.mapping, tr.doc);
          },
        },
        props: {
          decorations(state: EditorState) {
            return SEARCH_PLUGIN_KEY.getState(state) as DecorationSet;
          },
        },
      }),
    ];
  },
});
