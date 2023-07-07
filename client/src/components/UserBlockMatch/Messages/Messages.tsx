import styles from './Messages.module.scss';
import icon from '@/../assets/signUp/girl.jpg';

function Messages() {
  return (
    <ul className={styles.Ppllist}>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <div className={styles.photoContainer}>
            <img className={styles.photo} src={icon} alt='person' />
          </div>
          <div className={styles.text}>
            <p className={styles.name}>Julia</p>
            <p className={styles.message}>
              Hey man! Whats up? Waht you are doing! how are you
            </p>
          </div>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <div className={styles.photoContainer}>
            <img className={styles.photo} src={icon} alt='person' />
          </div>
          <div className={styles.text}>
            <p className={styles.name}>Julia</p>
            <p className={styles.message}>
              Hey man! Whats up? Waht you are doing! how are you
            </p>
          </div>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.info}>
          <div className={styles.photoContainer}>
            <img className={styles.photo} src={icon} alt='person' />
          </div>
          <div className={styles.text}>
            <p className={styles.name}>Julia</p>
            <p className={styles.message}>
              Hey man! Whats up? Waht you are doing! how are you
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Messages;
