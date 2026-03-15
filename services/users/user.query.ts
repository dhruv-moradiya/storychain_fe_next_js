import { useQuery } from '@tanstack/react-query';

import { UserApi } from './user-api';

export const useSearchUsers = (username: string) => {
  return useQuery({
    queryKey: ['users', 'search', username],
    queryFn: () => UserApi.searchUsers(username),
    enabled: username.length > 0,
  });
};
