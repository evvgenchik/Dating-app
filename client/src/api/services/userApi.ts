import { AuthForm, UserType } from '@/utils/types';
import { axios, axiosReauth } from '../axios';

const IMAGE_URL = '/image/upload';
const USERS_URL = '/users';

export const UserApi = {
  getUsers: async () => {
    const res = await axiosReauth.get<UserType[]>(USERS_URL);

    return res.data;
  },

  getUniqueUser: async (id: string) => {
    const res = await axiosReauth.get<UserType>(USERS_URL + '/' + id);

    return res.data;
  },

  getAmount: async () => {
    const res = await axiosReauth.get<number>(USERS_URL + '/amount');

    return res.data;
  },

  update: async (id: string, user: AuthForm) => {
    const res = await axiosReauth.patch<UserType>(USERS_URL + '/' + id, user);

    return res.data;
  },

  updateDislike: async (id: string, email: string) => {
    const res = await axiosReauth.patch<UserType>(
      USERS_URL + '/dislike/' + id,
      { email }
    );

    return res.data;
  },

  avatar: async (icon: File) => {
    const formData = new FormData();
    formData.append('file', icon);
    const res = await axios.post(IMAGE_URL, formData);

    return res;
  },

  getImage: async (url: string) => {
    const res = await axios<Blob>({ url, responseType: 'blob' });
    const blob = res.data;

    return blob;
  },
};
