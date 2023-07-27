import { useContext } from 'react';
import SignUp from '../SignUp/SignUp';
import AuthContext from '@/context/authProvider';

function Profile() {
  const { user } = useContext(AuthContext);

  return <SignUp currentUser={user} />;
}

export default Profile;
