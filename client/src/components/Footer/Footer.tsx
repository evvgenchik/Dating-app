import styles from './Footer.module.scss';
import git from '@/assets/github-white.svg';

import useScreenSize from '@/hooks/useScreenSize';
import Logo from '@/components/Logo/Logo';
import Menu from '@/components/Menu/Menu';

function Footer() {
  const {width: screenWidth} = useScreenSize();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        {screenWidth <= 900 && <Menu />}
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
