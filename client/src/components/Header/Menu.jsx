import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <NavLink to="." end>
        Home
      </NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="about">Community</NavLink>
    </nav>
  );
}

export default Menu;
