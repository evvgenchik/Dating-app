import { useState } from 'react';
import styles from './Home.module.scss';
import heart from '@/assets/Home/heart2.svg';
import Loader from '@/components/UI/Loader/Loader';
import MyButton from '@/components/UI/Button/MyButton';
import Login from '@/components/Login/Login';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
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
          </div>
          <MyButton
            className='home-button'
            onClick={() => setModalActive(true)}
          >
            Get Started
          </MyButton>
        </main>

        <Login
          setIsLoading={setIsLoading}
          modalActive={modalActive}
          setModalActive={setModalActive}
        />

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Home;
