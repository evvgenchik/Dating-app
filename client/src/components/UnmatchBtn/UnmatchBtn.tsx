import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '@/context/authProvider';
import { MatchAPI } from '@/api/services/matchApi';
import styles from './UnmatchBtn.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../UI/Loader/Loader';

const UnmatchBtn = () => {
  const { user } = useContext(AuthContext);
  const { state: chatCompanion } = useLocation();
  const navigate = useNavigate();

  const {
    mutateAsync: deleteMatchMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: () => MatchAPI.delete(user.email, chatCompanion.email),
  });

  const removeHandler = async () => {
    await deleteMatchMutation();
    navigate(`/app`);
  };

  if (error) {
    console.error(error);

    toast.error('OOPS something went wrong', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  }

  return (
    <button onClick={removeHandler} type='button' className={styles.unMatchBtn}>
      UNMATCH
      {isLoading && <Loader />}
      <ToastContainer />
    </button>
  );
};

export default UnmatchBtn;
