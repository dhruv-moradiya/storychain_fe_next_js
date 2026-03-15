'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IBaseResponse } from '@/type/base-response.type';
import axios from 'axios';

import { toast } from '@/components/shared/toast/toast';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useDebounce } from '@/hooks/use-debounce';
import { useSendInvitation } from '@/services/stories/stories.mutation';
import { useSearchUsers } from '@/services/users/user.query';

import { InviteDialogFooter } from './invite-dialog-footer';
import { InviteDialogHeader } from './invite-dialog-header';
import type { ISearchUser, InviteDialogProps, InviteFormData } from './invite-dialog.types';
import { MessageField } from './message-field';
import { RoleSelector } from './role-selector';
import { SearchUserField } from './search-user-field';

function InviteDialog({ open, onOpenChange, slug }: InviteDialogProps) {
  const [search, setSearch] = useState('');
  const [invited, setInvited] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const { control, handleSubmit, setValue, watch, reset } = useForm<InviteFormData>({
    mode: 'onChange',
    defaultValues: { selectedUser: null, role: 'contributor', message: '' },
  });

  // eslint-disable-next-line
  const selectedUser = watch('selectedUser');
  const messageValue = watch('message');

  // ── Search users ────────────────────────────────────────────────────────────
  const {
    data: searchResponse,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchApiError,
  } = useSearchUsers(debouncedSearch);

  const searchResults = searchResponse?.data ?? [];

  const searchErrorMessage = axios.isAxiosError<IBaseResponse<unknown>>(searchApiError)
    ? (searchApiError.response?.data?.message ?? searchApiError.message)
    : searchApiError instanceof Error
      ? searchApiError.message
      : null;

  useEffect(() => {
    if (searchErrorMessage) toast.error('Search failed', { description: searchErrorMessage });
  }, [searchErrorMessage]);

  // ── Send invitation mutation ─────────────────────────────────────────────────
  const { mutate: sendInvitation, isPending: isSending } = useSendInvitation(slug);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSelectUser = (user: ISearchUser) => {
    setValue(
      'selectedUser',
      { id: user.clerkId, username: user.username, email: user.email, avatarUrl: user.avatarUrl },
      { shouldValidate: true }
    );
    setSearch('');
    setIsSearchFocused(false);
  };

  const handleRemoveUser = () => setValue('selectedUser', null);

  const handleDialogClose = (v: boolean) => {
    if (!v) {
      reset();
      setSearch('');
      setInvited(0);
      setShowMessage(false);
      setIsSearchFocused(false);
    }
    onOpenChange(v);
  };

  const onSubmit = (data: InviteFormData) => {
    if (!data.selectedUser) return;

    sendInvitation(
      {
        role: data.role,
        invitedUserId: data.selectedUser.id,
        invitedUserName: data.selectedUser.username,
      },
      {
        onSuccess: () => {
          setInvited((prev) => prev + 1);
          setValue('selectedUser', null);
          setValue('message', '');
          setSearch('');
          setShowMessage(false);
        },
      }
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="border-border/50 max-w-lg gap-0 overflow-hidden p-0">
        <InviteDialogHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="space-y-5 px-6 py-5">
            {/* Search User */}
            <SearchUserField
              search={search}
              debouncedSearch={debouncedSearch}
              isSearchFocused={isSearchFocused}
              selectedUser={selectedUser}
              isLoading={isSearchLoading}
              isError={isSearchError}
              errorMessage={searchErrorMessage}
              results={searchResults}
              onSearchChange={setSearch}
              onFocus={() => setIsSearchFocused(true)}
              onPopoverOpenChange={setIsSearchFocused}
              onSelectUser={handleSelectUser}
              onRemoveUser={handleRemoveUser}
            />

            {/* Role Selection */}
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <RoleSelector value={field.value} onChange={field.onChange} />}
            />

            {/* Personal Message */}
            <MessageField
              show={showMessage}
              value={messageValue}
              onToggle={() => setShowMessage((prev) => !prev)}
              onChange={(v) => setValue('message', v)}
            />
          </div>

          <InviteDialogFooter
            invitedCount={invited}
            hasSelectedUser={!!selectedUser}
            isSending={isSending}
            onCancel={() => handleDialogClose(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteDialog;
