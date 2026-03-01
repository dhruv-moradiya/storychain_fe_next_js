import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, Search, XCircle } from 'lucide-react';
import type { ISearchUser } from './invite-dialog.types';

// ── SearchSkeletonRow ─────────────────────────────────────────────────────────

export function SearchSkeletonRow() {
  return (
    <div className="bg-muted/20 flex animate-pulse items-center gap-3 rounded-lg p-2.5">
      <div className="bg-muted h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <div className="bg-muted h-2.5 w-24 rounded" />
      </div>
    </div>
  );
}

// ── SearchEmptyState ──────────────────────────────────────────────────────────

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <div className="animate-in fade-in-0 zoom-in-95 p-5 text-center duration-200">
      <div className="bg-muted/20 mx-auto mb-2.5 flex size-10 items-center justify-center rounded-full">
        <Search className="text-text-secondary-65 h-4 w-4" />
      </div>
      <p className="text-text-secondary-65 text-xs">
        No users found for "<span className="font-semibold">{query}</span>"
      </p>
    </div>
  );
}

// ── SearchErrorState ──────────────────────────────────────────────────────────

export function SearchErrorState({ message }: { message: string }) {
  return (
    <div className="animate-in fade-in-0 zoom-in-95 p-4 text-center duration-200">
      <div className="bg-destructive/10 text-destructive mx-auto mb-2 flex size-10 items-center justify-center rounded-full">
        <XCircle className="h-4 w-4" />
      </div>
      <p className="text-destructive text-xs font-medium">{message}</p>
    </div>
  );
}

// ── SearchUserRow ─────────────────────────────────────────────────────────────

interface SearchUserRowProps {
  user: ISearchUser;
  index: number;
  onSelect: (user: ISearchUser) => void;
}

export function SearchUserRow({ user, index, onSelect }: SearchUserRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      style={{ animationDelay: `${index * 40}ms` }}
      className="animate-in fade-in-0 slide-in-from-left-2 group border-border/30 hover:border-brand-pink-500/20 hover:bg-brand-pink-500/5 fill-mode-both flex w-full items-center gap-2.5 border-b p-2.5 text-left duration-150 last:border-0"
    >
      <Avatar className="border-border/30 group-hover:border-brand-pink-500/30 h-8 w-8 border-2 transition-colors">
        <AvatarImage src={user.avatarUrl} alt={user.username} />
        <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-xs font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="text-text-primary group-hover:text-brand-pink-600 flex-1 text-xs font-semibold transition-colors">
        @{user.username}
      </span>
      <ChevronDown className="text-text-secondary-65 h-3.5 w-3.5 -rotate-90 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

// ── SearchResultsContent ──────────────────────────────────────────────────────

interface SearchResultsContentProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  results: ISearchUser[];
  query: string;
  onSelect: (user: ISearchUser) => void;
}

export function SearchResultsContent({
  isLoading,
  isError,
  errorMessage,
  results,
  query,
  onSelect,
}: SearchResultsContentProps) {
  if (isLoading) {
    return (
      <div className="space-y-1 p-2">
        {[1, 2, 3].map((i) => (
          <SearchSkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <SearchErrorState message={errorMessage ?? 'Something went wrong'} />;
  }

  if (results.length === 0) {
    return <SearchEmptyState query={query} />;
  }

  return (
    <div>
      {results.map((user, i) => (
        <SearchUserRow key={user.clerkId} user={user} index={i} onSelect={onSelect} />
      ))}
    </div>
  );
}
