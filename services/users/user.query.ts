import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { UserApi } from './user-api';

export const useSearchUsers = (username: string) => {
  return useQuery({
    queryKey: ['users', 'search', username],
    queryFn: () => UserApi.searchUsers(username),
    enabled: username.length > 0,
  });
};

export const useMe = () => {
  const { isSignedIn } = useAuth();
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => UserApi.getMe(),
    enabled: !!isSignedIn,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
