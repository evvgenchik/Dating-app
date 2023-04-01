import heart from '../../assets/Home/heart2.svg';
import styles from './Home.module.scss';

function Home() {
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
          <button className={styles.button} type="button">
            Get Started
          </button>
        </main>
      </div>
    </div>
  );
}

export default Home;
