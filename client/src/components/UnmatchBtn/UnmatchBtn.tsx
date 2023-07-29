import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '@/context/AuthProvider';
import styles from './UnmatchBtn.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../UI/Loader/Loader';
import useUnmatchMutate from '@/hooks/useUnmatchMutate';

const UnmatchBtn = () => {
  const { user, refetch } = useContext(AuthContext);
  const { state: chatCompanion } = useLocation();
  const navigate = useNavigate();

  const { mutateAsync: deleteMatchMutation, isLoading } = useUnmatchMutate(
    user.email,
    chatCompanion.email
  );

  const removeHandler = async () => {
    await deleteMatchMutation();
    refetch();
    navigate(`/app`);
  };

  return (
    <div className={styles.unmatchBtContainer}>
      <button
        onClick={removeHandler}
        type='button'
        className={styles.unMatchBtn}
      >
        UNMATCH
      </button>
      {isLoading && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default UnmatchBtn;
