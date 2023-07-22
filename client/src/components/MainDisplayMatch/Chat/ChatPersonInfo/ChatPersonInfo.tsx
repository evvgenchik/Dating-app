import { useContext } from 'react';
import AuthContext from '@/context/authProvider';
import styles from './ChatPersonInfo.module.scss';
import { ageCalculate } from '@/utils/helper';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { MatchAPI } from '@/api/services/matchApi';

function ChatPersonInfo() {
  const { state: chatCompanion } = useLocation();
  const { user } = useContext(AuthContext);

  const deleteMatchMutation = useMutation({
    mutationFn: () => MatchAPI.delete(user.email, chatCompanion.email),
  });

  const removeHandler = () => {
    deleteMatchMutation.mutate();
  };

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
        {/* <button type='button' className={styles.personInfoBtn}>
          COMPLAINT
        </button> */}
      </div>
    </div>
  );
}

export default ChatPersonInfo;
