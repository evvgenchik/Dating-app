import { useState } from 'react';
import styles from './Match.module.scss';
import UserBlockMatch from '@/components/UserBlockMatch/UserBlockMatch';
import MainDisplayMatch from '@/components/MainDisplayMatch/MainDisplayMatch';
import { UserType } from '@/utils/types';

type mainContentType = 'Swiper' | 'ChatContainer';

function Match() {
  const [mainContent, setMainContent] = useState<mainContentType>('Swiper');
  const [chatCompanion, setChatCompanion] = useState<UserType>();

  const changeContentHandler = (content: mainContentType, user?: UserType) => {
    setMainContent(content);
    if (user) setChatCompanion(user);
  };

  return (
    <div className={styles.content}>
      <UserBlockMatch changeContentHandler={changeContentHandler} />
      <MainDisplayMatch
        contentKey={mainContent}
        chatCompanion={chatCompanion}
      />
    </div>
  );
}

export default Match;
