import styles from './Matches.module.scss';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/authProvider';

function Matches() {
  const { user } = useContext(AuthContext);

  return (
    <ul className={styles.Ppllist}>
      {user.matching &&
        user.matching.map((match) => {
          const { userAddress } = match;
          return userAddress ? (
            <li key={userAddress.id} className={styles.PplItem}>
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
