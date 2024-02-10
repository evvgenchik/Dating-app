import Menu from '../Menu/Menu';
import styles from './Header.module.scss';
import Logo from '@/components/Logo/Logo';
import DropDown from '../DropDown/DropDown';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p className={styles.empty} />
        
        <Logo />
        
        <div className={styles.MenuWrapper}>
          <Menu />
        </div>
        
        <DropDown />
      </div>
    </header>
  );
}

export default Header;
