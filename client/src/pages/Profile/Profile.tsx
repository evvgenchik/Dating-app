import { useContext } from 'react';
import SignUp from '../SignUp/SignUp';
import AuthContext from '@/context/authProvider';
import styles from './Profile.module.scss';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <SignUp currentUser={user} />
    </div>
  );
}

export default Profile;
