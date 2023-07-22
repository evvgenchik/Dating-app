import { useContext } from 'react';
import AuthContext from '@/context/authProvider';
import styles from './ChatPersonInfo.module.scss';
import { ageCalculate } from '@/utils/helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { MatchAPI } from '@/api/services/matchApi';
import Loader from '@/components/UI/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';

function ChatPersonInfo() {
  const { state: chatCompanion } = useLocation();
  const { user } = useContext(AuthContext);
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
    <div className={styles.personInfoContainer}>
      <div className={styles.personInfo}>
        <div className={styles.photoContainer}>
          <img
            className={styles.photo}
            src={chatCompanion.avatar}
            alt='person'
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>
            {chatCompanion.firstName}{' '}
            <span className={styles.age}>
              {ageCalculate(new Date(chatCompanion.birthday))}
            </span>
          </h2>
        </div>
        <div className={styles.description}>{chatCompanion.descriptrion}</div>
      </div>
      <div className={styles.personInfoControls}>
        <button
          onClick={removeHandler}
          type='button'
          className={`${styles.personInfoBtn} ${styles.btnDelete}`}
        >
          UNMATCH
        </button>
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </div>
  );
}

export default ChatPersonInfo;
