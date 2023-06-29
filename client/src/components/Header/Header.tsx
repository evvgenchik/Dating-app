import Menu from './Menu/Menu';
import styles from './Header.module.scss';
import icon from '../../assets/signUp/girl.jpg';
import Logo from '../UI/Logo/Logo';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Menu />
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={icon} alt='profile' />
        </div>
      </div>
    </header>
  );
}

export default Header;
