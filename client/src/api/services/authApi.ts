import { AuthForm, UserLogin, UserType } from '@/utils/types';
import { axios } from '../axios';

const LOGIN_URL = '/auth/login';
const LOGOUT_URL = '/auth/logout';
const REGISTER_URL = '/auth/register';
const REFRESH_URL = '/auth/refresh';

export const AuthApi = {
  login: async (user: UserLogin) => {
    const res = await axios.post<UserType>(LOGIN_URL, user);
    return res;
  },

  signup: async (user: AuthForm) => {
    const res = await axios.post<UserType>(REGISTER_URL, user);
    return res.data;
  },

  refresh: async () => {
    const res = await axios.post(REFRESH_URL);
    return res;
  },

  logout: async () => {
    const res = await axios.post(LOGOUT_URL);
    return res;
  },
};
