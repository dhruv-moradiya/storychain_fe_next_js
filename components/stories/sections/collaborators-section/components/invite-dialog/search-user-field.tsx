import { CheckCircle, Search, X, XCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import type { ISearchUser, InviteFormData } from './invite-dialog.types';
import { SearchResultsContent } from './search-results-content';

// ── SelectedUserBadge ─────────────────────────────────────────────────────────

interface SelectedUserBadgeProps {
  user: NonNullable<InviteFormData['selectedUser']>;
  onRemove: () => void;
}

function SelectedUserBadge({ user, onRemove }: SelectedUserBadgeProps) {
  return (
    <div className="animate-in fade-in-0 zoom-in-95 border-brand-pink-500/30 from-brand-pink-500/5 to-brand-blue/5 relative overflow-hidden rounded-xl border bg-linear-to-br p-3 duration-200">
      <div className="radial-gradient-orb-pink absolute -top-8 -right-8 size-16 opacity-30 blur-xl" />
      <div className="relative flex items-center gap-3">
        <Avatar className="border-brand-pink-500/30 h-9 w-9 border shadow-sm">
          <AvatarImage src={user.avatarUrl} alt={user.username} />
          <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-600 text-xs font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col">
          <span className="text-text-primary flex items-center gap-1.5 text-sm font-semibold">
            {user.username}
            <CheckCircle className="text-brand-pink-500 h-3.5 w-3.5" />
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="hover:bg-brand-pink-500/10 text-text-secondary-65 hover:text-brand-pink-600 rounded-lg p-1.5 transition-all"
          aria-label="Remove selected user"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── SearchUserField ───────────────────────────────────────────────────────────

interface SearchUserFieldProps {
  search: string;
  debouncedSearch: string;
  isSearchFocused: boolean;
  selectedUser: InviteFormData['selectedUser'];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  results: ISearchUser[];
  onSearchChange: (value: string) => void;
  onFocus: () => void;
  onPopoverOpenChange: (open: boolean) => void;
  onSelectUser: (user: ISearchUser) => void;
  onRemoveUser: () => void;
}

export function SearchUserField({
  search,
  debouncedSearch,
  isSearchFocused,
  selectedUser,
  isLoading,
  isError,
  errorMessage,
  results,
  onSearchChange,
  onFocus,
  onPopoverOpenChange,
  onSelectUser,
  onRemoveUser,
}: SearchUserFieldProps) {
  const isPopoverOpen = isSearchFocused && !!debouncedSearch && !selectedUser;

  return (
    <div className="space-y-2.5">
      <label className="text-text-primary block text-xs font-semibold tracking-wide uppercase">
        Search User
      </label>

      <Popover open={isPopoverOpen} onOpenChange={onPopoverOpenChange}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'relative overflow-hidden rounded-xl border transition-all duration-200',
              isSearchFocused
                ? 'border-brand-pink-500/40 shadow-brand-pink-shadow25 shadow-md'
                : 'border-border/50 hover:border-brand-pink-500/20'
            )}
          >
            {isSearchFocused && (
              <div className="from-brand-pink-500/5 to-brand-blue/5 absolute inset-0 bg-linear-to-r" />
            )}
            <div className="relative flex items-center">
              <Search
                className={cn(
                  'absolute left-4 h-4 w-4 transition-colors',
                  isSearchFocused ? 'text-brand-pink-500' : 'text-text-secondary-65'
                )}
              />
              <Input
                placeholder="Search by username or email..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onFocus}
                disabled={!!selectedUser}
                className="h-11 border-0 bg-transparent pr-4 pl-11 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {search && !selectedUser && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="text-text-secondary-65 hover:text-brand-pink-500 absolute right-4 transition-colors"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="border-border/50 animate-in fade-in-0 zoom-in-95 w-(--radix-popover-trigger-width) overflow-hidden rounded-xl p-0 shadow-xl duration-150"
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-56 overflow-y-auto">
            <SearchResultsContent
              isLoading={isLoading}
              isError={isError}
              errorMessage={errorMessage}
              results={results}
              query={debouncedSearch}
              onSelect={onSelectUser}
            />
          </div>
        </PopoverContent>
      </Popover>

      {selectedUser && <SelectedUserBadge user={selectedUser} onRemove={onRemoveUser} />}
    </div>
  );
}
