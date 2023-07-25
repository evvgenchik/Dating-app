import { useContext, useLayoutEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import styles from './Header.module.scss';
import Logo from '../UI/Logo/Logo';
import AuthContext from '@/context/authProvider';
import DropDown from '../DropDown/DropDown';

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
        <p className={styles.empty} />
        <Logo />
        <div className={styles.MenuWrapper}>
          <Menu />
        </div>
        <DropDown />
        {/* <div className={styles.photoContainer}>
          <img className={styles.photo} src={user.avatar} alt='profile' />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
