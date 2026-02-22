'use client';

import { useDebounce } from '@/hooks/use-debounce';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  CheckCircle,
  ChevronDown,
  Eye,
  Handshake,
  Mail,
  PenTool,
  Search,
  Shield,
  UserPlus,
  X,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type TStoryCollaboratorRole } from '@/type/story/story.types';
import { toast } from 'sonner';

// Roles that can be invited (exclude OWNER)
const INVITABLE_ROLES: TStoryCollaboratorRole[] = [
  'co_author',
  'moderator',
  'reviewer',
  'contributor',
];

// Role configuration with descriptions
const ROLE_CONFIG: Record<
  string,
  {
    icon: LucideIcon;
    label: string;
    description: string;
  }
> = {
  co_author: {
    icon: PenTool,
    label: 'Co-Author',
    description: 'Full editing rights, can publish chapters, manage PRs',
  },
  moderator: {
    icon: Shield,
    label: 'Moderator',
    description: 'Can moderate content, manage reports, review PRs',
  },
  reviewer: {
    icon: Eye,
    label: 'Reviewer',
    description: 'Can review and comment on PRs, provide feedback',
  },
  contributor: {
    icon: Handshake,
    label: 'Contributor',
    description: 'Can submit chapters via PR, comment on story',
  },
};

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  slug: string;
}

interface ISearchUser {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

interface InviteFormData {
  selectedUser: {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string;
  } | null;
  role: TStoryCollaboratorRole;
  message: string;
}

function InviteDialog({ open, onOpenChange, slug: _slug }: InviteDialogProps) {
  const [search, setSearch] = useState('');
  const [invited, setInvited] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<InviteFormData>({
    mode: 'onChange',
    defaultValues: {
      selectedUser: null,
      role: 'contributor',
      message: '',
    },
  });

  // Mock search results
  const searchResult: ISearchUser[] = debouncedSearch
    ? [
        {
          clerkId: 'user1',
          username: 'alex_writer',
          email: 'alex@example.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=1',
        },
        {
          clerkId: 'user2',
          username: 'sam_editor',
          email: 'sam@example.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        {
          clerkId: 'user3',
          username: 'jordan_reviewer',
          email: 'jordan@example.com',
          avatarUrl: 'https://i.pravatar.cc/150?img=3',
        },
      ].filter(
        (u) =>
          u.username.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];

  const isLoading = false;
  const isError = false;
  const error = null;

  const handleSelectUser = (user: ISearchUser) => {
    setValue(
      'selectedUser',
      {
        id: user.clerkId,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      { shouldValidate: true }
    );
    setSearch('');
    setIsSearchFocused(false);
  };

  const onSubmit = (data: InviteFormData) => {
    if (!data.selectedUser) return;

    // Mock invitation
    toast.success(`Invitation sent to @${data.selectedUser.username}`, {
      position: 'top-right',
      description: `Role: ${ROLE_CONFIG[data.role].label}`,
    });

    setInvited((prev) => [...prev, data.selectedUser!.email]);

    // Reset form but keep the role selection
    setValue('selectedUser', null);
    setValue('message', '');
    setSearch('');
    setShowMessage(false);
  };

  const handleDialogClose = (v: boolean) => {
    if (!v) {
      reset();
      setSearch('');
      setInvited([]);
      setShowMessage(false);
      setIsSearchFocused(false);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="border-border/50 max-w-lg gap-0 overflow-hidden p-0">
        {/* Header with gradient matching theme */}
        <DialogHeader className="border-border/50 relative overflow-hidden border-b px-6 pt-5 pb-4">
          {/* Gradient background */}
          <div className="from-cream-80 via-cream-60 absolute inset-0 bg-linear-to-br to-transparent" />

          {/* Decorative gradient orbs */}
          <div className="radial-gradient-orb-pink absolute -top-10 -right-10 size-32 opacity-20 blur-2xl" />
          <div className="radial-gradient-orb-blue absolute -bottom-10 -left-10 size-32 opacity-15 blur-2xl" />

          <div className="relative">
            <DialogTitle className="text-text-primary flex items-center gap-2.5 font-serif text-xl font-semibold">
              <div className="from-brand-pink-500 to-brand-orange flex size-9 items-center justify-center rounded-xl bg-linear-to-br shadow-md ring-2 ring-white/50">
                <UserPlus className="h-4.5 w-4.5 text-white" />
              </div>
              Invite Collaborator
            </DialogTitle>
            <DialogDescription className="text-text-secondary-65 mt-2 text-sm">
              Invite someone to collaborate on your story. Select their role and send a personalized
              invitation.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="space-y-5 px-6 py-5">
            {/* Search Section - Wrapped in Controller to access selectedUser value */}
            <Controller
              name="selectedUser"
              control={control}
              render={({ field: selectedUserField }) => (
                <div className="space-y-2.5">
                  <label className="text-text-primary block text-xs font-semibold tracking-wide uppercase">
                    Search User
                  </label>

                  <div className="relative">
                    <div
                      className={cn(
                        'relative overflow-hidden rounded-xl border transition-all duration-200',
                        isSearchFocused
                          ? 'border-brand-pink-500/40 shadow-brand-pink-shadow25 shadow-md'
                          : 'border-border/50 hover:border-brand-pink-500/20'
                      )}
                    >
                      {/* Gradient accent on focus */}
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
                          onChange={(e) => setSearch(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                          disabled={!!selectedUserField.value}
                          className="h-11 border-0 bg-transparent pr-4 pl-11 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {search && !selectedUserField.value && (
                          <button
                            type="button"
                            onClick={() => setSearch('')}
                            className="text-text-secondary-65 hover:text-brand-pink-500 absolute right-4 transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                      {debouncedSearch && !selectedUserField.value && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="border-border/50 absolute z-10 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-xl"
                        >
                          <div className="max-h-64 overflow-y-auto">
                            {isLoading && (
                              <div className="space-y-1 p-2">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="bg-muted/20 flex animate-pulse items-center gap-3 rounded-lg p-3"
                                  >
                                    <div className="bg-muted h-10 w-10 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                      <div className="bg-muted h-3 w-24 rounded" />
                                      <div className="bg-muted/50 h-2.5 w-32 rounded" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {isError && (
                              <div className="p-4 text-center">
                                <div className="bg-destructive/10 text-destructive mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
                                  <XCircle className="h-5 w-5" />
                                </div>
                                <p className="text-destructive text-sm font-medium">
                                  {error || 'Something went wrong'}
                                </p>
                              </div>
                            )}

                            {!isLoading && !isError && searchResult?.length === 0 && (
                              <div className="p-6 text-center">
                                <div className="bg-muted/20 mx-auto mb-3 flex size-12 items-center justify-center rounded-full">
                                  <Search className="text-text-secondary-65 h-5 w-5" />
                                </div>
                                <p className="text-text-secondary-65 text-sm">
                                  No users found for "
                                  <span className="font-semibold">{debouncedSearch}</span>"
                                </p>
                              </div>
                            )}

                            {!isLoading &&
                              !isError &&
                              searchResult?.map((user, index) => (
                                <motion.button
                                  key={user.clerkId}
                                  type="button"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  onClick={() => handleSelectUser(user)}
                                  className="hover:bg-brand-pink-500/5 group border-border/30 hover:border-brand-pink-500/20 flex w-full items-center gap-3 border-b p-3 text-left transition-all last:border-0"
                                >
                                  <Avatar className="border-border/30 group-hover:border-brand-pink-500/30 h-10 w-10 border-2 transition-colors">
                                    <AvatarImage src={user.avatarUrl} alt={user.username} />
                                    <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-sm font-semibold">
                                      {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-1 flex-col">
                                    <span className="text-text-primary group-hover:text-brand-pink-600 text-sm font-semibold transition-colors">
                                      @{user.username}
                                    </span>
                                    <span className="text-text-secondary-65 text-xs">
                                      {user.email}
                                    </span>
                                  </div>
                                  <ChevronDown className="text-text-secondary-65 h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            />

            {/* Selected User Display */}
            <Controller
              name="selectedUser"
              control={control}
              render={({ field }) => (
                <AnimatePresence>
                  {field.value && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="border-brand-pink-500/30 from-brand-pink-500/5 to-brand-blue/5 relative overflow-hidden rounded-xl border bg-linear-to-br p-3.5"
                    >
                      {/* Decorative corner gradient */}
                      <div className="radial-gradient-orb-pink absolute -top-8 -right-8 size-20 opacity-30 blur-xl" />

                      <div className="relative flex items-center gap-3">
                        <Avatar className="border-brand-pink-500/30 h-10 w-10 border shadow-sm">
                          <AvatarImage src={field.value.avatarUrl} alt={field.value.username} />
                          <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-600 text-sm font-semibold">
                            {field.value.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-1 flex-col">
                          <span className="text-text-primary flex items-center gap-2 text-sm font-semibold">
                            @{field.value.username}
                            <CheckCircle className="text-brand-pink-500 h-4 w-4" />
                          </span>
                          <span className="text-text-secondary-65 text-xs">
                            {field.value.email}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => field.onChange(null)}
                          className="hover:bg-brand-pink-500/10 text-text-secondary-65 hover:text-brand-pink-600 rounded-lg p-2 transition-all"
                          aria-label="Remove selected user"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            />

            {/* Role Selection */}
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="space-y-2.5">
                  <label className="text-text-primary block text-xs font-semibold tracking-wide uppercase">
                    Select Role
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {INVITABLE_ROLES.map((role) => {
                      const config = ROLE_CONFIG[role];
                      if (!config) return null;

                      const Icon = config.icon;
                      const isSelected = field.value === role;

                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => field.onChange(role)}
                          className={cn(
                            'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all duration-200',
                            isSelected
                              ? 'border-brand-pink-500 from-brand-pink-500/10 to-brand-blue/5 shadow-brand-pink-shadow25 bg-linear-to-br shadow-md'
                              : 'border-border/50 hover:border-brand-pink-300/40 bg-white/60 hover:bg-white hover:shadow-sm'
                          )}
                        >
                          <div className="flex w-full items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'rounded-lg p-1.5 transition-all',
                                  isSelected
                                    ? 'bg-brand-pink-500/15 text-brand-pink-600 shadow-sm'
                                    : 'bg-muted/50 text-text-secondary-65 group-hover:bg-muted'
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <span
                                className={cn(
                                  'text-sm font-semibold',
                                  isSelected ? 'text-brand-pink-700' : 'text-text-primary'
                                )}
                              >
                                {config.label}
                              </span>
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="from-brand-pink-500 to-brand-pink-600 flex size-5 items-center justify-center rounded-full bg-linear-to-br"
                              >
                                <CheckCircle className="h-3.5 w-3.5 fill-white text-white" />
                              </motion.div>
                            )}
                          </div>
                          <p className="text-text-secondary-65 line-clamp-2 text-xs leading-relaxed">
                            {config.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            />

            {/* Personal Message - Collapsible */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowMessage(!showMessage)}
                className="text-text-secondary-65 hover:text-brand-pink-500 flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', showMessage && 'rotate-180')}
                />
                Add personal message (optional)
              </button>

              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Write a personalized message to the collaborator..."
                          rows={3}
                          className="border-border/50 resize-none bg-white/60 text-sm transition-all focus:bg-white focus:shadow-md"
                        />
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="bg-muted/10 border-border/50 flex-row items-center justify-between border-t px-6 py-4">
            {invited.length > 0 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 ring-1 ring-green-500/20"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-xs font-semibold text-green-700">
                  {invited.length} invitation{invited.length > 1 ? 's' : ''} sent
                </p>
              </motion.div>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleDialogClose(false)}
                className="text-text-secondary hover:text-text-primary hover:bg-muted/50 font-medium"
              >
                Cancel
              </Button>
              <Controller
                name="selectedUser"
                control={control}
                render={({ field }) => (
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!field.value}
                    className="bg-brand-pink-500 hover:bg-brand-pink-600 group shadow-brand-pink-shadow25 relative overflow-hidden font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
                  >
                    {/* Button gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <Mail className="relative mr-2 h-4 w-4" />
                    <span className="relative">Send Invite</span>
                  </Button>
                )}
              />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteDialog;
