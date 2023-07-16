import ChatPersonInfo from './ChatPersonInfo/ChatPersonInfo';
import ChatDisplay from './ChatDisplay/ChatDisplay';

function ChatContainer({ chatCompanion }) {
  return (
    <>
      <ChatDisplay chatCompanion={chatCompanion} />
      <ChatPersonInfo chatCompanion={chatCompanion} />
    </>
  );
}

export default ChatContainer;
