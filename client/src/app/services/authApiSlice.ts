import { UserLogin, UserSignup, UserType } from '@/utils/types';
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserType, UserLogin>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: build.mutation<UserType, UserSignup>({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    refresh: build.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRefreshMutation, useSignupMutation } =
  authApi;
