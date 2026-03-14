import { useQuery } from '@tanstack/react-query';
import { NotificationApi } from './notifications-api';
import { QueryKey } from '@/lib/query-keys';

export const useGetNotifications = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: QueryKey.notification.list,
    queryFn: NotificationApi.getNotifications,
    select: (response) => response.data,
    ...options,
  });
};
