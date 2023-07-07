import styles from './Footer.module.scss';
import Logo from '../UI/Logo/Logo';
import git from '@/assets/github-white.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Logo />
        <span>© Finder. All rights reserved. </span>
        <div>
          <a href='https://github.com/evvgenchik'>
            <img src={git} alt='git icon' />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
