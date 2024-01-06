import { toast } from 'react-toastify';

const errorMessage = 'OOPS something went wrong';

const toastError = (message = errorMessage) => {
  toast.error(message, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
};

export { toastError };
