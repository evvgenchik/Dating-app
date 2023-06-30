import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import heart from '../../assets/Home/heart2.svg';
import styles from './Home.module.scss';
import Modal from '../../components/Modal/Modal';
import MyButton from '../../components/UI/Button/MyButton';

const Home = () => {
  const [modalActive, setModalActive] = useState(false);

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
            <h4 className={styles.description}>Online Dating Web App</h4>
          </div>
          <MyButton
            className='home-button'
            onClick={() => setModalActive(true)}
          >
            Get Started
          </MyButton>
        </main>

        <Modal active={modalActive} setActive={setModalActive}>
          <div className={styles.login}>
            <h2 className={styles.modalTitle}>Sign In</h2>
            <form className={styles.modalfrom}>
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
            </form>
            <a
              className={styles.modalForgot}
              href='https://policies.google.com/privacy'
            >
              Forgot password?
            </a>
            <MyButton className='modal-btn'>Login</MyButton>
            <p className={styles.modalSignup}>
              New to Finder?
              <p>
                <NavLink style={{ color: '#0080ff' }} to='signup'>
                  Sign up now
                </NavLink>
              </p>
            </p>
            {/* <span className={styles.modalInfo}>
              This page is protected by reCAPTCHA to ensure you&aposre not a
              bot.
              <a
                style={{ color: '#0080ff' }}
                href='https://policies.google.com/privacy'
              >
                Learn more
              </a>
            </span> */}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
