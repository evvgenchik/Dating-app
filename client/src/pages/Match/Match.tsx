import styles from './Match.module.scss';
import UserBlockMatch from '@/components/UserBlockMatch/UserBlockMatch';
import { Outlet } from 'react-router-dom';

function Match() {
  return (
    <div className={styles.content}>
      <UserBlockMatch />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default Match;
