import { UserType } from '@/utils/types';
import styles from './ChatPersonInfo.module.scss';
import icon from '@/assets/signUp/girl.jpg';
import { ageCalculate } from '@/utils/helper';

type Props = {
  chatCompanion: UserType;
};

function ChatPersonInfo({ chatCompanion }: Props) {
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
          {/* <h2 className={styles.location}>Live in Moscow</h2>
          <h2 className={styles.distance}>400 km from you</h2> */}
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
