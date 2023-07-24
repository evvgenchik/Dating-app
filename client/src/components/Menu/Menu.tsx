import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

function Menu() {
  return (
    <nav className={styles.nav}>
      <NavLink className={styles.link} to='../' end>
        Home
      </NavLink>
      <NavLink className={styles.link} to='about'>
        About
      </NavLink>
      <NavLink className={styles.link} to='.'>
        Match
      </NavLink>
      <NavLink className={styles.link} to='asd'>
        Community
      </NavLink>
    </nav>
  );
}

export default Menu;
