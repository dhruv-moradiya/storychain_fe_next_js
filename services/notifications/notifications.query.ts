import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/lib/query-keys';

import { NotificationApi } from './notifications-api';

export const useGetNotifications = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: QueryKey.notification.list,
    queryFn: NotificationApi.getNotifications,
    select: (response) => response.data,
    ...options,
  });
};
