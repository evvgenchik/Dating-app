import { UserLogin, UserType } from '@/utils/types';
import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserType, UserLogin>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
