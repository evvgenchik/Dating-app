import styles from './MainDisplayMatch.module.scss';
import ChatContainer from './Chat/ChatContainer';
import Swiper from './Swiper/Swiper';

function MainDisplayMatch({ contentKey, chatCompanion }) {
  const contents = {
    Swiper: <Swiper />,
    ChatContainer: <ChatContainer chatCompanion={chatCompanion} />,
  };

  return <div className={styles.content}>{contents[contentKey]}</div>;
}

export default MainDisplayMatch;
