import styles from './MainDisplayMatch.module.scss';
import Swiper from './Swiper/Swiper';
import ChatContainer from './Chat/ChatContainer';

const MainDisplayMatch = () => {
  return (
    <div className={styles.content}>
      <ChatContainer />
    </div>
  );
};

export default MainDisplayMatch;
