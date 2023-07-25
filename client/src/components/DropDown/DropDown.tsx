import { useState, useContext, useRef, useEffect } from 'react';
import AuthContext from '@/context/authProvider';
import styles from './DropDown.module.scss';
import { BiUserCircle as User } from 'react-icons/bi';
import { BiLogOut as Logout } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const DropDown = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const dropDown = useRef<HTMLDivElement>();

  useEffect(() => {
    const checkClick = (e) => {
      if (show && !dropDown.current.contains(e.target)) {
        setShow(!show);
      }
    };

    document.addEventListener('mousedown', checkClick);

    return () => {
      document.removeEventListener('mousedown', checkClick);
    };
  });

  return (
    <div ref={dropDown}>
      <img
        onClick={() => setShow(!show)}
        className={styles.photo}
        src={user.avatar}
        alt='profile'
      />
      <div
        className={`${styles.dropdownMenu} ${
          show ? styles.active : styles.inactive
        }`}
      >
        <h3 className={styles.name}>{user.firstName}</h3>
        <ul>
          <li className={styles.dropdownItem}>
            {<User className={styles.icon} />}
            <NavLink to='./profile'>My Profile</NavLink>
          </li>
          <li className={styles.dropdownItem}>
            {<Logout className={styles.icon} />}
            <NavLink to='../'>Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
