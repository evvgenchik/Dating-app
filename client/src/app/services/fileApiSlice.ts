import { UserLogin, UserSignup, UserType } from '@/utils/types';
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    avatar: build.mutation<string, FormData>({
      query: (icon) => ({
        url: '/image/upload',
        method: 'POST',
        body: icon,
      }),
    }),
  }),
});

export const { useAvatarMutation } = authApi;
