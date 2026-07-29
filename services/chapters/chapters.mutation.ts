import {
  IChapterRecordReadingSessionRequest,
  IChapterStartReadingSessionRequest,
} from '@/type/chapter/chapter-request.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';
import { QueryKey } from '@/lib/query-keys';

import { chapterApi } from './chapters-api';

export const useStartReadingSession = () => {
  return useMutation({
    mutationFn: (request: IChapterStartReadingSessionRequest) =>
      chapterApi.chapterStartReadingSession(request),
  });
};

export const useRecordReadingSession = () => {
  return useMutation({
    mutationFn: (request: IChapterRecordReadingSessionRequest) =>
      chapterApi.chapterRecordReadingSession(request),
  });
};

export const useReactToChapter = () => {
  return useMutation({
    mutationFn: chapterApi.reactToChapter,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUnlockChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: chapterApi.unlockChapter,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QueryKey.user.getWallet,
      });
      if (variables.storySlug) {
        queryClient.invalidateQueries({
          queryKey: QueryKey.story.bySlug(variables.storySlug),
        });
      }
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: chapterApi.addComment,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chapter', 'comments', variables.chapterSlug],
      });
    },
  });
};
