import {
  ConversationType,
  CreateConversationDto,
  UserType,
} from '@/utils/types';
import { axiosReauth } from '../axios';

const CONVERSTION_URL = '/conversation';

export const conversationApi = {
  create: async (conversation: CreateConversationDto) => {
    const res = await axiosReauth.post<ConversationType>(CONVERSTION_URL, {
      ...conversation,
    });
    return res.data;
  },

  getUniqueConversation: async (id: string) => {
    const res = await axiosReauth.get<ConversationType>(
      CONVERSTION_URL + '/' + id
    );
    return res.data;
  },
};
