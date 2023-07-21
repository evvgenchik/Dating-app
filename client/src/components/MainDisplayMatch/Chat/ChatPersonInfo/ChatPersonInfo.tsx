import styles from './ChatPersonInfo.module.scss';
import { ageCalculate } from '@/utils/helper';
import { useLocation } from 'react-router-dom';

function ChatPersonInfo() {
  const { state: chatCompanion } = useLocation();

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
          type='button'
          className={`${styles.personInfoBtn} ${styles.btnDelete}`}
        >
          REMOVE
        </button>
        <button type='button' className={styles.personInfoBtn}>
          COMPLAINT
        </button>
      </div>
    </div>
  );
}

export default ChatPersonInfo;
