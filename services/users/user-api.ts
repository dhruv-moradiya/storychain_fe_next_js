import { IBaseResponse } from '@/type/base-response.type';
import { IMeResponse } from '@/type/user/user-response.type';

import { api } from '@/lib/api-client';

export interface ISearchUser {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

export type ISearchUsersResponse = IBaseResponse<ISearchUser[]>;

const UserApi = {
  searchUsers: async (username: string): Promise<ISearchUsersResponse> => {
    return await api.post<ISearchUsersResponse>('/users/search', { username });
  },

  getMe: async (): Promise<IMeResponse> => {
    return await api.get<IMeResponse>('/users/me');
  },
};

export { UserApi };
