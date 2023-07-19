import { useLocation } from 'react-router-dom';
import ChatDisplay from '../ChatDisplay/ChatDisplay';
import ChatPersonInfo from '../ChatPersonInfo/ChatPersonInfo';

function ChatContainer() {
  const { state: user } = useLocation();

  return (
    <>
      <ChatDisplay chatCompanion={user} />
      <ChatPersonInfo chatCompanion={user} />
    </>
  );
}

export default ChatContainer;
