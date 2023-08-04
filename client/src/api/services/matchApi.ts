import { MatchType, UserType } from '@/utils/types';
import { axios, axiosReauth } from '../axios';

const MATCH_URL = '/match';

export const MatchApi = {
  create: async (userSourceEmail: string, userAddressEmail: string) => {
    const res = await axiosReauth.post<MatchType>(MATCH_URL, {
      userSourceEmail,
      userAddressEmail,
    });
    return res.data;
  },

  update: async (id: string, userAddressAnswer: boolean) => {
    const res = await axiosReauth.patch<MatchType>(MATCH_URL + '/' + id, {
      userAddressAnswer,
    });
    return res.data;
  },

  delete: async (userSourceEmail: string, userAddressEmail: string) => {
    const res = await axiosReauth.delete<MatchType>(MATCH_URL, {
      data: {
        userSourceEmail,
        userAddressEmail,
      },
    });
    return res.data;
  },
};
