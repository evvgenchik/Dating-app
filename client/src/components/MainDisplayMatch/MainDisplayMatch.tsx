import styles from './MainDisplayMatch.module.scss';
import ChatContainer from './Chat/ChatContainer';
import Swiper from './Swiper/Swiper';

function MainDisplayMatch() {
  return (
    <div className={styles.content}>
      <Swiper />
    </div>
  );
}

export default MainDisplayMatch;
