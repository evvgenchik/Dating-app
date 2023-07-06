import axios from '../api/axios';

const REFRESH_URL = '/auth/refresh';

const useAxiosPrivate = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originRequest = error?.config;

      if (error.response.status === 401 && !originRequest?.sent) {
        originRequest.sent = true;
        try {
          await axios.post(REFRESH_URL);
          return await axios.request(originRequest);
        } catch (errorRefresh) {
          console.error('User not authorized after refresh');
          console.error(errorRefresh);
        }
      }

      return Promise.reject(error);
    }
  );
  return axios;
};

export default useAxiosPrivate;
