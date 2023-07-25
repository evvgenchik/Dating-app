import { useState, useContext, useRef, useEffect } from 'react';
import AuthContext from '@/context/authProvider';
import styles from './DropDown.module.scss';
import { BiUserCircle as User } from 'react-icons/bi';
import { BiLogOut as Logout } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AuthAPI } from '@/api/services/authApi';
import Loader from '../UI/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';

const DropDown = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const dropDown = useRef<HTMLDivElement>();
  const navigate = useNavigate();

  const {
    mutateAsync: logoutApi,
    isLoading,
    error,
  } = useMutation({
    mutationFn: () => AuthAPI.logout(),
  });

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
    await logoutApi();
    localStorage.removeItem('user');
    navigate('../');
  };

  if (error) {
    console.error(error);

    toast.error('OOPS something went wrong', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  }

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
          <li onClick={logout} className={styles.dropdownItem}>
            {<Logout className={styles.icon} />}
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default DropDown;
