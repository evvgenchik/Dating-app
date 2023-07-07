import styles from './Swiper.module.scss';
import icon from '@/assets/signUp/girl.jpg';
import PanelControl from './PanelControl/PanelControl';

function Swiper() {
  return (
    <div className={styles.person}>
      <div className={styles.photoContainer}>
        <img className={styles.photo} src={icon} alt='person' />
        <div className={styles.text}>
          <p className={styles.name}>
            Julia <span className={styles.age}>25</span>
          </p>
          <p className={styles.status}>Online now</p>
          <p className={styles.location}>3km from you</p>
        </div>
      </div>
      <PanelControl />
    </div>
  );
}

export default Swiper;
