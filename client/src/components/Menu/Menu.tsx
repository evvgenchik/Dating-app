import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

function Menu() {
  return (
    <nav className={styles.nav}>
      <NavLink className={styles.link} to='../' end>
        Home
      </NavLink>
      <NavLink className={styles.link} to='match'>
        Match
      </NavLink>
      <NavLink className={styles.link} to='about'>
        About
      </NavLink>
    </nav>
  );
}

export default Menu;
