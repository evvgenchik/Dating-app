import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../app/api/axios';
import { useContext } from 'react';
import AuthContext from '@/context/authProvider';

const REFRESH_URL = '/auth/refresh';

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

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

          navigate('/', { state: { from: location }, replace: true });
          localStorage.removeItem('user');
          setUser(null);
        }
      }

      return Promise.reject(error);
    }
  );
  return axios;
};

export default useAxiosPrivate;
