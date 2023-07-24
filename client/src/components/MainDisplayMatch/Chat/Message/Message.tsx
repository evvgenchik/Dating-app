import styles from './Message.module.scss';
import { MessageType } from '@/utils/types';
import { format } from 'date-fns';

type Props = {
  message: MessageType;
  userEmail: string;
};

function Message({ message, userEmail }: Props) {
  const messageClass =
    userEmail === message.userSourceEmail ? 'messageSent' : 'messageReceived';

  return (
    <div className={`${styles.messageContainer} ${styles[messageClass]}`}>
      <p className={styles.message}>{message.content}</p>
      <span className={styles.messageDate}>
        {format(new Date(message.createdAt), 'HH:mm')}
      </span>
    </div>
  );
}

export default Message;
