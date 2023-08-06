import { conversationApi } from '@/api/services/conversationApi';
import { toastError } from '@/utils/toaster';
import { useQuery } from '@tanstack/react-query';

const useConversationsQuery = (id: string) => {
  return useQuery({
    queryKey: ['allConversationForUser'],
    queryFn: () => conversationApi.getAllForUser(id),
    onError: (err) => {
      if (err instanceof Error) {
        console.error(err);
        toastError();
      }
    },
  });
};

export { useConversationsQuery };
