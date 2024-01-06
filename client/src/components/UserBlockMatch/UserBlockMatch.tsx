import { useState, useContext } from 'react';
import { RiMessage2Line as MessageIcon } from 'react-icons/ri';
import styles from './UserBlockMatch.module.scss';
import Matches from './Matches/Matches';
import Messages from './Messages/Messages';
import AuthContext from '@/context/AuthProvider';

const enum ActiveBlock {
  Matches = 'Matches',
  Messages = 'Messages'
};

const content = {
  Matches: <Matches />,
  Messages: <Messages />,
};

function UserBlockMatch({ isShow }) {
  const [block, setBlock] = useState<ActiveBlock>(ActiveBlock.Matches);
  const { user } = useContext(AuthContext);

  return (
    <div className={`${styles.content} ${isShow && styles.active}`}>
      <div className={styles.header}>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={user.avatar} alt='profile' />
        </div>
        <span className={styles.name}>{user.firstName}</span>
      </div>

      <div className={styles.controlPanel}>
        <button
          onClick={() => setBlock(ActiveBlock.Matches)}
          className={`${styles.controlBtn} ${block === ActiveBlock.Matches ? styles.active : ""}`}
          type='button'
        >
          Matches
        </button>
        <button
          onClick={() => setBlock(ActiveBlock.Messages)}
          className={`${styles.controlBtn} ${block === ActiveBlock.Messages ? styles.active : ""}`}
          type='button'
        >
          Messages
        </button>
      </div>
      <div className={styles.main}>{content[block]}</div>
    </div>
  );
}

export default UserBlockMatch;
