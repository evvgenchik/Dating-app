import styles from './Matches.module.scss';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/authProvider';
import { UserType } from '@/utils/types';

function Matches({ changeContentHandler }) {
  const { user } = useContext(AuthContext);

  const clickHanler = (user: UserType) => {
    changeContentHandler('ChatContainer', user);
  };

  return (
    <ul className={styles.Ppllist}>
      {user.matching &&
        user.matching.map((match) => {
          const { userAddressAnswer, userAddress } = match;
          return userAddressAnswer ? (
            <li
              onClick={() => clickHanler(userAddress)}
              key={userAddress.id}
              className={styles.PplItem}
            >
              <img
                className={styles.photo}
                src={userAddress.avatar}
                alt='person'
              />
              <span className={styles.name}>{userAddress.firstName}</span>
            </li>
          ) : (
            ''
          );
        })}
    </ul>
  );
}

export default Matches;
