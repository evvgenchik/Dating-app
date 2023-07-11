import styles from './Matches.module.scss';
import icon from '@/assets/signUp/girl.jpg';

function Matches() {
  return (
    <ul className={styles.Ppllist}>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
    </ul>
  );
}

export default Matches;
