import heart from '../../assets/Home/heart2.svg';
import styles from './Home.module.scss';
import Modal from '../../components/Modal/Modal';
import { useState } from 'react';

function Home() {
  const [modalActive, setModalActive] = useState(true);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Finder
            <img className={styles.image} src={heart} alt="heart" />
          </h1>
          <div className={styles.content}>
            <h2 className={styles.topTitle}>
              Dating for Grown Ups <br />
              Make a Real Connection
            </h2>
            <h2 className={styles.subtitle}>Find The Chosen One</h2>
            <h4 className={styles.description}>Online Dating Web App</h4>
          </div>
          <div className={styles.mainFooter}>
            <button
              onClick={() => setModalActive(true)}
              className={styles.button}
              type="button"
            >
              Get Started
            </button>
          </div>
        </main>

        <Modal
          className="login"
          active={modalActive}
          setActive={setModalActive}
        >
          <h2 className={styles.modalTitle}>Sign In</h2>
          <form className={styles.modalfrom}>
            <label className={styles.modallabel}>
              <input
                className={styles.modalinput}
                type="text"
                placeholder="username"
              />
            </label>
            <label className={styles.modallabel}>
              <input
                className={styles.modalinput}
                type="password"
                placeholder="password"
              />
            </label>
          </form>
          <a className={styles.modalForgot} href="#">
            Forgot password?
          </a>
          <button className={styles.modalButton}>Login</button>
          <p className={styles.modalSignup}>
            New to Finder?{' '}
            <a style={{ color: '#0080ff' }} href="#">
              Sign up now
            </a>
          </p>
          <span className={styles.modalInfo}>
            This page is protected by reCAPTCHA to ensure you're not a bot.{' '}
            <a
              style={{ color: '#0080ff' }}
              href="https://policies.google.com/privacy"
            >
              Learn more
            </a>
          </span>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
