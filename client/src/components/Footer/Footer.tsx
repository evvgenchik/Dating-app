import { useState, useLayoutEffect } from 'react';
import styles from './Footer.module.scss';
import Logo from '../UI/Logo/Logo';
import git from '@/assets/github-white.svg';
import Menu from '../Menu/Menu';

function Footer() {
  const mediaMatch = matchMedia('(max-width: 650px)');
  const [isShow, setIsBurger] = useState<boolean>(mediaMatch.matches);

  useLayoutEffect(() => {
    const handler = () => setIsBurger(mediaMatch.matches);
    mediaMatch.addEventListener('change', handler);

    return () => mediaMatch.removeEventListener('change', handler);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        {isShow && <Menu />}
        <span className={styles.text}>© Finder. All rights reserved. </span>
        <div className={styles.git}>
          <a href='https://github.com/evvgenchik'>
            <img src={git} alt='git icon' />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
