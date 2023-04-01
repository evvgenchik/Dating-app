import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <footer>BJKBNKL</footer>
      </div>
    </div>
  );
}

export default MainLayout;
