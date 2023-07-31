import useAuth from '@/hooks/useAuth';
import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import MyButton from '../UI/Button/MyButton';
import { NavLink } from 'react-router-dom';
import styles from './login.module.scss';
import checkRed from '@/assets/checkRed.svg';
import { AuthApi } from '@/api/services/authApi';

interface UserLogin {
  email: string;
  password: string;
}

const Login = ({ modalActive, setModalActive, setIsLoading }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const login = async (userAuthData: UserLogin) => {
    try {
      const res = await AuthApi.login(userAuthData);
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      if (error?.response?.status === 401) {
        setAuthError('Incorrect email or password');
        return null;
      }
      console.error(error);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const user = await login(authData);

    if (user) {
      navigate('/app/match');

      setAuthError('');
      setSuccess(true);
      setUser(user);
      setTimeout(() => navigate('/app/match'), 2000);
    }

    setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Modal active={modalActive} setActive={setModalActive}>
        {success ? (
          <div className='success-popup'>
            <h2 className='success-title'>
              Authorization successfull
              <img className='check-mark' src={checkRed} alt='check mark' />
            </h2>
            <h3 className='success-text'>
              Welocome, <span className={styles.name}>{user.firstName}</span>!
              <p>Hope you are enjoy our app</p>
            </h3>
          </div>
        ) : (
          <div className={styles.login}>
            <h2 className={styles.modalTitle}>Sign In</h2>
            <form onSubmit={handleSubmit} className={styles.modalfrom}>
              <label className={styles.modallabel}>
                <input
                  className={styles.modalinput}
                  type='text'
                  placeholder='Email'
                  name='email'
                  value={authData.email}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.modallabel}>
                <input
                  className={styles.modalinput}
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={authData.password}
                  onChange={handleChange}
                />
              </label>
              <span className={styles.error}>{authError}</span>
              <MyButton type='submit' className='modal-btn'>
                Login
              </MyButton>
            </form>
            <a
              className={styles.modalForgot}
              href='https://policies.google.com/privacy'
            >
              Forgot password?
            </a>
            <p className={styles.modalSignup}>
              New to Finder?
              <br />
              <NavLink style={{ color: '#0080ff' }} to='signup'>
                Sign up now
              </NavLink>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Login;
