import { CreateMessageDto, MessageType } from '@/utils/types';
import { axiosReauth } from '../axios';

const MESSAGE_URL = '/message';

export const messageApi = {
  create: async (message: CreateMessageDto) => {
    console.log(message);

    const res = await axiosReauth.post<MessageType>(MESSAGE_URL, {
      ...message,
    });
    return res.data;
  },
};
