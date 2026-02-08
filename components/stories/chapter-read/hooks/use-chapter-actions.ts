'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useChapterActions(slug: string, chapterSlug: string, initialBookmarked = false) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleVote = (vote: 'up' | 'down') => {
    if (userVote === vote) {
      setUserVote(null);
    } else {
      setUserVote(vote);
    }
  };

  const handleBranch = () => {
    router.push(`/stories/${slug}/chapter/${chapterSlug}/new`);
  };

  const handleEdit = () => {
    toast.info('Edit functionality coming soon');
  };

  const handleCreatePR = () => {
    toast.info('Submit request functionality coming soon');
  };

  const handleBack = () => {
    router.back();
  };

  const navigateToChapter = (id: string) => {
    router.push(`/stories/${slug}/chapter/${id}`);
  };

  return {
    isBookmarked,
    userVote,
    handleShare,
    handleBookmark,
    handleVote,
    handleBranch,
    handleEdit,
    handleCreatePR,
    handleBack,
    navigateToChapter,
  };
}
