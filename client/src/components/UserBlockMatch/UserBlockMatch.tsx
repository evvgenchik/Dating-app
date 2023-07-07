import styles from './UserBlockMatch.module.scss';
import icon from '@/assets/signUp/girl.jpg';
import Matches from './Matches/Matches';

function UserBlockMatch() {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={icon} alt='profile' />
        </div>
        <span className={styles.name}>Julia</span>
      </div>
      <div className={styles.controlPanel}>
        <button className={styles.controlBtn} type='button'>
          Matches
        </button>
        <button className={styles.controlBtn} type='button'>
          Messages
        </button>
      </div>
      <div className={styles.main}>
        <Matches />
      </div>
    </div>
  );
}

export default UserBlockMatch;
