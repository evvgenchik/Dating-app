import { useState, useContext, useRef, useEffect } from 'react';
import AuthContext from '@/context/AuthProvider';
import styles from './DropDown.module.scss';
import { BiUserCircle as User } from 'react-icons/bi';
import { BiLogOut as Logout } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import useLogout from '@/hooks/useLogout';

const DropDown = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const dropDown = useRef<HTMLDivElement>();
  const navigate = useNavigate();

  const { mutateAsync: logoutReq, isLoading } = useLogout();

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

  const logout = async () => {
    await logoutReq();
    localStorage.removeItem('user');
    navigate('../');
  };

  return (
    <div ref={dropDown}>
      <img
        onClick={() => setShow(!show)}
        className={styles.photo}
        src={user.avatar}
        alt='profile'
      />
      <div
        role='drowDown'
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
          <li onClick={logout} className={styles.dropdownItem}>
            {<Logout className={styles.icon} />}
            Logout
          </li>
        </ul>
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default DropDown;
