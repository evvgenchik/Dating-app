import styles from './Messages.module.scss';
import icon from '@/assets/signUp/girl.jpg';

function Messages({ changeContentHandler }) {
  const clickHanler = () => {
    changeContentHandler('ChatContainer');
  };

  return (
    <ul className={styles.Ppllist}>
      <li onClick={clickHanler} className={styles.PplItem}>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={icon} alt='person' />
        </div>
        <div className={styles.text}>
          <p className={styles.name}>Julia</p>
          <p className={styles.message}>
            Hey man! Whats up? Waht you are doing! how are you
          </p>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={icon} alt='person' />
        </div>
        <div className={styles.text}>
          <p className={styles.name}>Julia</p>
          <p className={styles.message}>
            Hey man! Whats up? Waht you are doing! how are you
          </p>
        </div>
      </li>
      <li className={styles.PplItem}>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={icon} alt='person' />
        </div>
        <div className={styles.text}>
          <p className={styles.name}>Julia</p>
          <p className={styles.message}>
            Hey man! Whats up? Waht you are doing! how are you
          </p>
        </div>
      </li>
    </ul>
  );
}

export default Messages;
