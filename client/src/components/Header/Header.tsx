import { useContext } from 'react';
import Menu from './Menu/Menu';
import styles from './Header.module.scss';
import Logo from '../UI/Logo/Logo';
import AuthContext from '@/context/authProvider';

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Menu />
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={user.avatar} alt='profile' />
        </div>
      </div>
    </header>
  );
}

export default Header;
