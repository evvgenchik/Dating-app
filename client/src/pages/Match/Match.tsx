import styles from './Match.module.scss';
import { RiMessage2Line as MessageIcon } from 'react-icons/ri';
import UserBlockMatch from '@/components/UserBlockMatch/UserBlockMatch';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Match() {
  const [isShow, setIsShow] = useState<boolean>(false);

  const showMatchesHandler = () => {
    setIsShow(!isShow);
  };

  return (
    <div className={styles.content}>
      {isShow && (
        <div onClick={showMatchesHandler} className={styles.showBtnWrapper} />
      )}
      <MessageIcon onClick={showMatchesHandler} className={styles.showBtn} />
      <UserBlockMatch isShow={isShow} />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default Match;
