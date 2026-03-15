import type { INotificationResponse } from '@/type/notification';

import apiClient from '@/lib/api-client';

const NotificationApi = {
  getNotifications: async (): Promise<INotificationResponse> => {
    const response = await apiClient.get<INotificationResponse>('/notifications');
    return response.data;
  },
};

export { NotificationApi };
