import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineSend as SendIcon } from 'react-icons/ai';
import styles from './ChatDisplay.module.scss';
import AuthContext from '@/context/authProvider';
import { ConversationType, MessageType, UserType } from '@/utils/types';
import { format } from 'date-fns';
import Message from '../Message/Message';
import { toast } from 'react-toastify';
import { socket } from '@/socket';
import { useLocation } from 'react-router-dom';
import UnmatchBtn from '@/components/UnmatchBtn/UnmatchBtn';

function ChatDisplay() {
  const { state: chatCompanion } = useLocation();
  const { user } = useContext(AuthContext);
  const [messageText, setMessageText] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationType>(null);
  const conversationRef = useRef<ConversationType>();
  const anchorRef = useRef<HTMLDivElement>();

  useEffect(() => {
    anchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const conversationDto = {
      userSourceEmail: user.email,
      userAddressEmail: chatCompanion.email,
    };

    socket.emit('getConversationForEmails', conversationDto);

    function receiveConversation(value: ConversationType) {
      conversationRef.current = value;
      setConversation(value);
    }

    function receiveMessage(value: MessageType) {
      socket.emit('getConversation', value.conversationId);
    }

    socket.on('receiveConversation', receiveConversation);
    socket.on('receiveMessage', receiveMessage);

    return () => {
      const converstion = conversationRef.current;

      if (converstion && !converstion.messages?.length) {
        socket.emit('deleteConversation', converstion.id);
      }

      socket.off('receiveConversation', receiveConversation);
      socket.off('receiveMessage', receiveMessage);
    };
  }, [chatCompanion.id]);

  const calculateDateMatch = (
    chatCompanionEmail: string,
    currentUser: UserType
  ) => {
    const { createdAt: matchingCreated } = currentUser.matching.find(
      (match) => match.userAddressEmail === chatCompanionEmail
    );
    const { createdAt: matchedByCreated } = currentUser.matchedBy.find(
      (match) => match.userSourceEmail === chatCompanionEmail
    );

    const answerMatchDate = new Date(
      matchingCreated > matchedByCreated ? matchingCreated : matchedByCreated
    );

    return format(answerMatchDate, 'dd/MM/yyyy');
  };

  const mutualMatchDate = calculateDateMatch(chatCompanion.email, user);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!messageText) return;

    const createMessgaeDto = {
      content: messageText,
      userSourceEmail: user.email,
      userAddressEmail: chatCompanion.email,
      conversationId: conversation.id,
    };

    socket.emit('sendMessage', createMessgaeDto);
    setMessageText('');
  };

  // if (error) {
  //   console.error(error);

  //   toast.error('OOPS something went wrong', {
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: 'light',
  //   });
  // }

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      submitHandler(e);
    }
  };

  return (
    <div className={styles.chatDisplayContainer}>
      <div className={styles.ChatInfo}>
        <img
          className={styles.chatCompanionAvatar}
          src={chatCompanion.avatar}
          alt='chatCompanion photo'
        />
        <h3 className={styles.chatHeaderText}>
          {`You and ${chatCompanion.firstName} formed a couple on ${mutualMatchDate}`}
        </h3>
        <div className={styles.UnmatchBtnWrapper}>
          <UnmatchBtn />
        </div>
      </div>
      <div className={styles.display}>
        {conversation &&
          conversation.messages?.map((message) => {
            return (
              <Message
                key={message.id}
                userEmail={user.email}
                message={message}
              />
            );
          })}
        <div ref={anchorRef} />
      </div>
      <form onSubmit={(e) => submitHandler(e)} className={styles.chatFieldForm}>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className={styles.chatField}
          placeholder='Type your message'
          name='message'
          id='message'
          onKeyDown={keyDownHandler}
        />
        <button className={styles.sendBtnContainer} type='submit'>
          <SendIcon className={styles.sendBtn} />
        </button>
      </form>
    </div>
  );
}

export default ChatDisplay;
