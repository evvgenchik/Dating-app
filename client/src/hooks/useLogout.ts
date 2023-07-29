import { AuthApi } from '@/api/services/authApi';
import { toastError } from '@/utils/toaster';
import { useMutation } from '@tanstack/react-query';

const useLogout = () => {
  return useMutation({
    mutationFn: () => AuthApi.logout(),
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err);
        toastError();
      }
    },
  });
};

export default useLogout;
