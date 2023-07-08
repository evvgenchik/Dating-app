import { useState, ChangeEvent, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import heart from '@/assets/Home/heart2.svg';
import checkRed from '@/assets/checkRed.svg';
import axios from '@/app/api/axios';
import Modal from '@/components/Modal/Modal';
import Loader from '@/components/UI/Loader/Loader';
import useAuth from '@/hooks/useAuth';
import MyButton from '@/components/UI/Button/MyButton';
import { UserLogin, UserType } from '@/utils/types';

const LOGIN_URL = '/auth/login';

const Home = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const login = async (userAuthData: UserLogin) => {
    try {
      const res = await axios.post<UserType>(LOGIN_URL, userAuthData);
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error(error);

      if (error?.response?.status === 401) {
        setAuthError('Incorrect email or password');
      }
      return null;
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const user = await login(authData);

    if (user) {
      setAuthError('');
      setSuccess(true);
      setUserName(user.firstName);
      setUser(user);
      setTimeout(() => navigate('/app'), 2000);
    }
    setIsLoading(false);
    return user;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Finder
            <img className={styles.image} src={heart} alt='heart' />
          </h1>
          <div className={styles.content}>
            <h2 className={styles.topTitle}>
              Dating for Grown Ups <br />
              Make a Real Connection
            </h2>
            <h2 className={styles.subtitle}>Find The Chosen One</h2>
          </div>
          <MyButton
            className='home-button'
            onClick={() => setModalActive(true)}
          >
            Get Started
          </MyButton>
        </main>

        <Modal active={modalActive} setActive={setModalActive}>
          {success ? (
            <div className='success-popup'>
              <h2 className='success-title'>
                Authorization successfull{' '}
                <img className='check-mark' src={checkRed} alt='check mark' />
              </h2>
              <h3 className='success-text'>
                Welocome, <span className={styles.name}>{userName}</span>!
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

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;
