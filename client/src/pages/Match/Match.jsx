import styles from './Match.module.scss';
import icon from '../../assets/signUp/girl.jpg';

const Match = () => {
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.photoContainer}>
            <img className={styles.photo} src={icon} alt="photo profile" />
          </div>
          <span className={styles.name}>Julia</span>
        </div>
        <div className={styles.main}>
          <div className={styles.mainHeader}>
            <p className={styles.mainBtn}>Matches</p>
            <p className={styles.mainBtn}>Messages</p>
          </div>
          <div className={styles.mainPpl}>
            <ul className={styles.Ppllist}>
              <li className={styles.PplItem}>
                <div>
                  <img src={icon} alt="photo" />
                  <span className={styles.photo}></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Match;
