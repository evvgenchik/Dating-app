import styles from './Logo.module.scss';
import heart from '../../../assets/Home/heart2.svg';

const Logo = () => {
  return (
    <div className={styles.logoText}>
      Finder
      <img className={styles.logoImage} src={heart} alt="heart" />
    </div>
  );
};

export default Logo;
