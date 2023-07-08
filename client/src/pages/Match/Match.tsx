import styles from './Match.module.scss';
import UserBlockMatch from '@/components/UserBlockMatch/UserBlockMatch';
import MainDisplayMatch from '@/components/MainDisplayMatch/MainDisplayMatch';

function Match() {
  return (
    <div className={styles.content}>
      <UserBlockMatch />
      <MainDisplayMatch />
    </div>
  );
}

export default Match;
