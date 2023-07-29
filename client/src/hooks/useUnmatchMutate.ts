import { MatchApi } from '@/api/services/matchApi';
import { toastError } from '@/utils/toaster';
import { useMutation } from '@tanstack/react-query';

const useUnmatchMutate = (userEmail: string, companionEmail: string) => {
  return useMutation({
    mutationFn: () => MatchApi.delete(userEmail, companionEmail),
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err);
        toastError();
      }
    },
  });
};

export default useUnmatchMutate;
