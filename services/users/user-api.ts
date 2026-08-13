import { IBaseResponse } from '@/type/base-response.type';
import { IPaginatedUserQueryParams } from '@/type/user/user-request.type';
import {
  IBanUserResponse,
  IMeResponse,
  IPaginatedUserListResponse,
  IUserDetailPageResponse,
  TGetWalletResponse,
} from '@/type/user/user-response.type';

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

  getUserDetailByClerkId: async (clerkId: string): Promise<IUserDetailPageResponse> => {
    return await api.get<IUserDetailPageResponse>(`/users/clerk/${clerkId}`);
  },

  getWallet: async (): Promise<TGetWalletResponse> => {
    return await api.get<TGetWalletResponse>('/wallet/balance');
  },

  getUsersList: async (params?: IPaginatedUserQueryParams): Promise<IPaginatedUserListResponse> => {
    return await api.get<IPaginatedUserListResponse>('/users/list', { params });
  },

  banUser: async () => {
    return await api.post<IBanUserResponse>('/bans');
  },
};

export { UserApi };
