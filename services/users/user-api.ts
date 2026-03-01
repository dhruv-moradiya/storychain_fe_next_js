import { api } from '@/lib/api-client';
import { IBaseResponse } from '@/type/base-response.type';

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
};

export { UserApi };
