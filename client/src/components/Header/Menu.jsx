import { NavLink } from 'react-router-dom';
import heart from '../../assets/Home/heart2.svg';
import styles from './Menu.module.scss';

function Menu() {
  return (
    <>
      <div>
        <NavLink to="./">About</NavLink>
        <h3>Finder</h3>
        <img className={styles.image} src={heart} alt="heart" />
      </div>
      <nav>
        <NavLink to="." end>
          Home
        </NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="about">Match</NavLink>
        <NavLink to="about">Community</NavLink>
      </nav>
    </>
  );
}

export default Menu;
