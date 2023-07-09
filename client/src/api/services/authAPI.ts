import { AuthForm, UserLogin, UserType } from '@/utils/types';
import axios from '../axios';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/register';

export const AuthAPI = {
  login: async (user: UserLogin) => {
    const res = await axios.post<UserType>(LOGIN_URL, user);
    return res;
  },
  signup: async (user: AuthForm) => {
    const res = await axios.post<UserType>(REGISTER_URL, user);
    return res;
  },
};
