import styles from './MainDisplayMatch.module.scss';
import ChatContainer from './Chat/ChatContainer';

function MainDisplayMatch() {
  return (
    <div className={styles.content}>
      <ChatContainer />
    </div>
  );
}

export default MainDisplayMatch;
