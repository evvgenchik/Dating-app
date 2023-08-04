import { UserApi } from '@/api/services/userApi';
import { useQuery } from '@tanstack/react-query';

const useUniqueUserQuery = (storedUser) => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => UserApi.getUniqueUser(storedUser.id),
    enabled: !!storedUser,
  });
};

export default useUniqueUserQuery;
