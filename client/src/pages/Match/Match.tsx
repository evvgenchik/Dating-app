import styles from './Match.module.scss';
import UserBlockMatch from '@/components/UserBlockMatch/UserBlockMatch';
import MainDisplayMatch from '@/components/MainDisplayMatch/MainDisplayMatch';

function Match() {
  return (
    <div className={styles.content}>
      <div className={styles.UserBlockMatch}>
        <UserBlockMatch />
      </div>
      <div className={styles.MainDisplayMatch}>
        <MainDisplayMatch />
      </div>
    </div>
  );
}

export default Match;
