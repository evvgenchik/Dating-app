import { ConversationType, CreateConversationDto } from '@/utils/types';
import { axiosReauth } from '../axios';

const CONVERSTION_URL = '/conversation';

export const ConversationApi = {
  getUnique: async (id: string) => {
    const res = await axiosReauth.get<ConversationType>(
      CONVERSTION_URL + '/' + id
    );

    return res.data;
  },

  getAllForUser: async (id: string) => {
    const res = await axiosReauth.get<ConversationType[]>(
      CONVERSTION_URL + '/all/' + id
    );

    return res.data;
  },

  getAmount: async () => {
    const res = await axiosReauth.get<number>(
      CONVERSTION_URL + '/' + 'amount'
    );

    return res.data;
  },

  create: async (conversation: CreateConversationDto) => {
    const res = await axiosReauth.post<ConversationType>(CONVERSTION_URL, {
      ...conversation,
    });

    return res.data;
  },
};
