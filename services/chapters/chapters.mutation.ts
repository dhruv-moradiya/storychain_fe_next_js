import {
  IChapterRecordReadingSessionRequest,
  IChapterStartReadingSessionRequest,
} from '@/type/chapter/chapter-request.type';
import { useMutation } from '@tanstack/react-query';

import toast from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';

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
