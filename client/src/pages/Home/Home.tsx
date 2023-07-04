import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import heart from '../../assets/Home/heart2.svg';
import styles from './Home.module.scss';
import Modal from '../../components/Modal/Modal';
import MyButton from '../../components/UI/Button/MyButton';

const Home = () => {
  const [modalActive, setModalActive] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('br');
    setSuccess(true);
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
            <div>
              Logged
              <h1>Logged</h1>
            </div>
          ) : (
            <div className={styles.login}>
              <h2 className={styles.modalTitle}>Sign In</h2>
              <form onSubmit={handleSubmit} className={styles.modalfrom}>
                <label className={styles.modallabel}>
                  <input
                    className={styles.modalinput}
                    type='text'
                    placeholder='username'
                  />
                </label>
                <label className={styles.modallabel}>
                  <input
                    className={styles.modalinput}
                    type='password'
                    placeholder='password'
                  />
                </label>
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
    </div>
  );
};

export default Home;
