import { AiOutlineSend as SendIcon } from 'react-icons/ai';
import styles from './ChatDisplay.module.scss';

const ChatDisplay = () => {
  return (
    <div className={styles.chatDisplayContainer}>
      <div className={styles.chatHeader}>
        <h3 className={styles.chatHeaderText}>
          You and Alina formed a couple on 01.03.2023.
        </h3>
      </div>
      <div className={styles.display}>
        <div className={styles.messageReceived}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}></span>
        </div>
        <div className={styles.messageReceived}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}></span>
        </div>
        <div className={styles.messageSent}>
          <p className={styles.message}>
            Hi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
            incidunt cum? Quidem nihil dolorem quibusdam laboriosam unde autem,
            sit quas porro. Recusandae consectetur tempora impedit
            exercitationem iusto quidem beatae esse?
          </p>
          <span className={styles.messageDate}></span>
        </div>
        <div className={styles.messageReceived}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}></span>
        </div>
        <div className={styles.messageSent}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}></span>
        </div>
        <div className={styles.messageReceived}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}></span>
        </div>
        <div className={styles.messageSent}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}></span>
        </div>
      </div>
      <div className={styles.chatControl}>
        <form>
          <textarea
            placeholder="Type your message"
            name="message"
            id="message"
            cols={30}
            rows={10}
          ></textarea>
          <SendIcon />
        </form>
      </div>
    </div>
  );
};

export default ChatDisplay;
