import { UserApi } from '@/api/services/userApi';
import { toastError } from '@/utils/toaster';
import { useQuery } from '@tanstack/react-query';

const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: UserApi.getUsers,
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err);
        toastError();
      }
    },
  });
};

export default useUsersQuery;
