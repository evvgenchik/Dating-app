import styles from './MainDisplayMatch.module.scss';
import Swiper from './Swiper/Swiper';
import ChatDisplay from './Chat/ChatDisplay/ChatDisplay';
import ChatPersonInfo from './Chat/ChatPersonInfo/ChatPersonInfo';

function MainDisplayMatch({ contentKey, chatCompanion }) {
  const contents = {
    Swiper: <Swiper />,
    ChatContainer: (
      <>
        <ChatDisplay chatCompanion={chatCompanion} />
        <ChatPersonInfo chatCompanion={chatCompanion} />
      </>
    ),
  };

  return <div className={styles.content}>{contents[contentKey]}</div>;
}

export default MainDisplayMatch;
