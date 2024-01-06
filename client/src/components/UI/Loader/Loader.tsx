import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.heart}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
      </div>
      <div className={styles.text}>
        {/* <p>Loading ...</p> */}
      </div>
    </div>
  );
};

export default Loader;
