import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('sending refresh token');
    const refreshResult = await baseQuery(
      {
        url: 'token/refresh/',
        method: 'POST',
      },
      api,
      extraOptions
    );

    if (refreshResult.error && result.error.status === 401) {
      console.error('User not authorized after refresh');
      console.error(refreshResult.error);
      return result;
    }

    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const apiBasic = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});

export const apiReauth = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
