import { FormEvent, useContext, useEffect, useState } from 'react';
import { AiOutlineSend as SendIcon } from 'react-icons/ai';
import styles from './ChatDisplay.module.scss';
import AuthContext from '@/context/authProvider';
import {
  ConversationType,
  CreateConversationDto,
  CreateMessageDto,
  UserType,
} from '@/utils/types';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';
import { conversationApi } from '@/api/services/conversationApi';
import Message from '../Message/Message';
import { toast } from 'react-toastify';
import Loader from '@/components/UI/Loader/Loader';
import { messageApi } from '@/api/services/messageApi';

type Props = {
  chatCompanion: UserType;
};

function ChatDisplay({ chatCompanion }: Props) {
  const { user } = useContext(AuthContext);
  const [messageText, setMessageText] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationType>(null);
  const { id: conversationId } = {
    ...user.conversations.find((conversation) =>
      conversation.users.some(({ email }) => email === chatCompanion.email)
    ),
  };

  const { data, error, isInitialLoading } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => conversationApi.getUniqueConversation(conversationId),
    enabled: !!conversationId,
  });
  const createConversation = useMutation({
    mutationFn: (createConversationDto: CreateConversationDto) => {
      return conversationApi.create(createConversationDto);
    },
  });
  const createMessage = useMutation({
    mutationFn: (createMessgaeDto: CreateMessageDto) => {
      return messageApi.create(createMessgaeDto);
    },
  });

  useEffect(() => {
    setConversation(data);
  }, [data]);

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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!conversation) {
      const createConversationDto = {
        userSourceEmail: user.email,
        userAddressEmail: chatCompanion.email,
      };

      createConversation.mutate(createConversationDto);
    }

    const createMessgaeDto = {
      content: messageText,
      userSourceEmail: user.email,
      userAddressEmail: chatCompanion.email,
      conversationId: conversation.id,
    };

    createMessage.mutate(createMessgaeDto);
    setMessageText('');
  };

  if (error) {
    console.error(error);

    toast.error('OOPS something went wrong', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  }

  return (
    <div className={styles.chatDisplayContainer}>
      <h3 className={styles.chatHeaderText}>
        {`You and ${chatCompanion.firstName} formed a couple on ${mutualMatchDate}`}
      </h3>
      <div className={styles.display}>
        {conversation &&
          conversation.messages.map((message) => {
            return (
              <Message
                key={message.id}
                userEmail={user.email}
                message={message}
              />
            );
          })}
      </div>
      <form onSubmit={(e) => submitHandler(e)} className={styles.chatFieldForm}>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className={styles.chatField}
          placeholder='Type your message'
          name='message'
          id='message'
        />
        <button className={styles.sendBtnContainer} type='submit'>
          <SendIcon className={styles.sendBtn} />
        </button>
      </form>
      {isInitialLoading && <Loader />}
    </div>
  );
}

export default ChatDisplay;
