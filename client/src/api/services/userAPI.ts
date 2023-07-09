import axios from '../axios';

const IMAGE_URL = '/image/upload';

export const FileAPI = {
  avatar: async (icon: File) => {
    const formData = new FormData();
    formData.append('file', icon);
    const res = await axios.post(IMAGE_URL, formData);
    return res;
  },
};
