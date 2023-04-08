import styles from './Matches.module.scss';
import icon from '../../../assets/signUp/girl.jpg';

const Matches = () => {
  return (
    <ul className={styles.Ppllist}>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <img className={styles.photo} src={icon} alt="photo" />
          <span className={styles.name}>Julia</span>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <img className={styles.photo} src={icon} alt="photo" />
          <span className={styles.name}>Julia</span>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <img className={styles.photo} src={icon} alt="photo" />
          <span className={styles.name}>Julia</span>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <img className={styles.photo} src={icon} alt="photo" />
          <span className={styles.name}>Julia</span>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <img className={styles.photo} src={icon} alt="photo" />
          <span className={styles.name}>Julia</span>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <img className={styles.photo} src={icon} alt="photo" />
          <span className={styles.name}>Julia</span>
        </div>
      </li>
    </ul>
  );
};

export default Matches;
