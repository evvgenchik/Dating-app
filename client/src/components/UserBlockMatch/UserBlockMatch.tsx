import styles from './UserBlockMatch.module.scss';
import icon from '@/assets/signUp/girl.jpg';
import Matches from './Matches/Matches';
import Messages from './Messages/Messages';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function UserBlockMatch() {
  const [block, setBlock] = useState('Matches');
  const content = {
    Matches: <Matches />,
    Messages: <Messages />,
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={icon} alt='profile' />
        </div>
        <span className={styles.name}>Julia</span>
      </div>
      <div className={styles.controlPanel}>
        <button
          onClick={() => setBlock('Matches')}
          className={styles.controlBtn}
          type='button'
        >
          Matches
        </button>
        <button
          onClick={() => setBlock('Messages')}
          className={styles.controlBtn}
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
