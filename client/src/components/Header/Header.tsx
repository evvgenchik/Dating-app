import { useContext, useLayoutEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import styles from './Header.module.scss';
import Logo from '../UI/Logo/Logo';
import AuthContext from '@/context/authProvider';

function Header() {
  const { user } = useContext(AuthContext);
  // const mediaMatch = matchMedia('(max-width: 766px)');
  // const [isBurger, setIsBurger] = useState<boolean>(mediaMatch.matches);

  // useLayoutEffect(() => {
  //   const handler = () => setIsBurger(mediaMatch.matches);
  //   mediaMatch.addEventListener('change', handler);

  //   return () => mediaMatch.removeEventListener('change', handler);
  // }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p />
        <Logo />
        <div className={styles.MenuWrapper}>
          <Menu />
        </div>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={user.avatar} alt='profile' />
        </div>
      </div>
    </header>
  );
}

export default Header;
