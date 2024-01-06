import styles from './Logo.module.scss';
import heart from '@/assets/Home/heart2.svg';

import { NavLink } from 'react-router-dom';

function Logo() {
  return (
    <NavLink className={styles.logoText} to='../' end>
      Finder
      <img className={styles.logoImage} src={heart} alt='heart' />
    </NavLink>
  )
}

export default Logo;
