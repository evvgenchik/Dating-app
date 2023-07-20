import { FormEvent, useContext, useEffect, useState } from 'react';
import { AiOutlineSend as SendIcon } from 'react-icons/ai';
import styles from './ChatDisplay.module.scss';
import AuthContext from '@/context/authProvider';
import {
  ConversationType,
  CreateConversationDto,
  CreateMessageDto,
  MessageType,
  UserType,
} from '@/utils/types';
import { format } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';
import { conversationApi } from '@/api/services/conversationApi';
import Message from '../Message/Message';
import { toast } from 'react-toastify';
import Loader from '@/components/UI/Loader/Loader';
import { messageApi } from '@/api/services/messageApi';
import { socket } from '@/socket';

type Props = {
  chatCompanion: UserType;
};

function ChatDisplay({ chatCompanion }: Props) {
  const { user } = useContext(AuthContext);
  const [messageText, setMessageText] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationType>(null);
  // const { id: conversationId } = {
  //   ...user.conversations.find((conversation) =>
  //     conversation.users.some(({ email }) => email === chatCompanion.email)
  //   ),
  // };

  // const { data, error, isInitialLoading } = useQuery({
  //   queryKey: ['conversation', conversationId],
  //   queryFn: () => conversationApi.getUniqueConversation(conversationId),
  //   enabled: !!conversationId,
  // });
  // const createConversation = useMutation({
  //   mutationFn: (createConversationDto: CreateConversationDto) => {
  //     return conversationApi.create(createConversationDto);
  //   },
  // });
  // const createMessage = useMutation({
  //   mutationFn: (createMessgaeDto: CreateMessageDto) => {
  //     return messageApi.create(createMessgaeDto);
  //   },
  // });

  // useEffect(() => {
  //   setConversation(data);
  // }, [data]);

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

    // if (!conversation) {
    //   const createConversationDto = {
    //     userSourceEmail: user.email,
    //     userAddressEmail: chatCompanion.email,
    //   };

    //   const createdNovConversation = await createConversation.mutateAsync(
    //     createConversationDto
    //   );

    //   setConversation(createdNovConversation);
    //   createMessgaeDto.conversationId = createdNovConversation.id;
    // }

    // createMessage.mutate(createMessgaeDto);
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

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    const conversationDto = {
      userSourceEmail: user.email,
      userAddressEmail: chatCompanion.email,
    };

    setConversation(null);
    socket.emit('getConversationForEmails', conversationDto);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function receiveConversation(value: ConversationType) {
      console.log('Dude its a conversation from websocket');
      console.log(value);
      setConversation(value);
    }

    function receiveMessage(value: MessageType) {
      socket.emit('getConversation', value.conversationId);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receiveConversation', receiveConversation);
    socket.on('receiveMessage', receiveMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receiveConversation', receiveConversation);
      socket.off('receiveMessage', receiveMessage);
    };
  }, [chatCompanion.id]);

  return (
    <div className={styles.chatDisplayContainer}>
      <h3 className={styles.chatHeaderText}>
        {`You and ${chatCompanion.firstName} formed a couple on ${mutualMatchDate}`}
      </h3>
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
      {/* {isInitialLoading && <Loader />} */}
    </div>
  );
}

export default ChatDisplay;
