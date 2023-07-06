import axios from '../api/axios';

const REFRESH_URL = '/auth/refresh';

const useRefreshToken = async () => {
  try {
    await axios.post(REFRESH_URL);
  } catch (error) {
    console.error(error);
  }
};

export default useRefreshToken;
