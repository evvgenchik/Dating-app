import { useContext } from 'react';
import { AiOutlineSend as SendIcon } from 'react-icons/ai';
import styles from './ChatDisplay.module.scss';
import AuthContext from '@/context/authProvider';
import { UserType } from '@/utils/types';
import { format } from 'date-fns';

type Props = {
  chatCompanion: UserType;
};

function ChatDisplay({ chatCompanion }: Props) {
  const { user } = useContext(AuthContext);

  const calculateMutualMatch = (
    chatCompanionEmail: string,
    currentUser: UserType
  ) => {
    const { createdAt: matchingCreated } = currentUser.matching.find(
      (match) => match.userAddressEmail === chatCompanionEmail
    );
    const { createdAt: matchedByCreated } = currentUser.matchedBy.find(
      (match) => match.userSourceEmail === chatCompanionEmail
    );

    const answerDate = new Date(
      matchingCreated > matchedByCreated ? matchingCreated : matchedByCreated
    );

    return format(answerDate, 'dd/MM/yyyy');
  };

  const mutualMatchDate = calculateMutualMatch(chatCompanion.email, user);

  return (
    <div className={styles.chatDisplayContainer}>
      <h3 className={styles.chatHeaderText}>
        {`You and ${chatCompanion.firstName} formed a couple on ${mutualMatchDate}`}
      </h3>
      <div className={styles.display}>
        <div className={`${styles.messageContainer} ${styles.messageReceived}`}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}>12:12</span>
        </div>
        <div className={`${styles.messageContainer} ${styles.messageReceived}`}>
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}>12:12</span>
        </div>
        <div className={`${styles.messageContainer} ${styles.messageSent}`}>
          <span className={styles.messageDate}>12:12</span>
          <p className={styles.message}>
            Hi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
            incidunt cum? Quidem nihil dolorem quibusdam laboriosam unde autem,
            sit quas porro. Recusandae consectetur tempora impedit
            exercitationem iusto quidem beatae esse?
          </p>
        </div>
        <div
          className={`${styles.messageContainer} ${styles.messageReceived}}`}
        >
          <p className={styles.message}>Hi there</p>
          <span className={styles.messageDate}>12:12</span>
        </div>
      </div>
      <form className={styles.chatFieldForm}>
        <textarea
          className={styles.chatField}
          placeholder='Type your message'
          name='message'
          id='message'
        />
        <SendIcon className={styles.sendBtn} />
      </form>
    </div>
  );
}

export default ChatDisplay;
