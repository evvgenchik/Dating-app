import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const REFRESH_URL = '/auth/refresh';

const axiosBasic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const axiosReauth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosReauth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error?.config;

    console.log(error);

    if (error.response.status === 401 && !originRequest?.sent) {
      originRequest.sent = true;

      try {
        await axiosBasic.post(REFRESH_URL);
        return await axiosReauth.request(originRequest);
      } catch (errorRefresh) {
        console.error('User not authorized after refresh');
        console.error(errorRefresh);

        localStorage.removeItem('user');

        window.location.href = '/';
      }
    }

    console.log(error.response);
    return Promise.reject(error);
  }
);

export { axiosBasic as axios, axiosReauth };
