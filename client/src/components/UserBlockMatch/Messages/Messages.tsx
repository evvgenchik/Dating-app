import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Messages.module.scss';
import AuthContext from '@/context/authProvider';
import { conversationApi } from '@/api/services/conversationApi';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/UI/Loader/Loader';
import { toast } from 'react-toastify';

function Messages() {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);

  const clickHanler = ({ id }) => {
    navigate(`/app/message/${id}`);
  };

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['allConversationForUser'],
    queryFn: () => conversationApi.getAllForUser(currentUser.id),
  });
  console.log(data);

  if (error) {
    console.error(error);

    toast.error('OOPS something went wrong', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  }

  return (
    <ul className={styles.Ppllist}>
      {
        isSuccess &&
          data.map((conversation) => {
            const chatCompanion = conversation.users.find(
              (user) => user.email !== currentUser.email
            );
            return (
              <li className={styles.PplItem}>
                <div className={styles.photoContainer}>
                  <img
                    className={styles.photo}
                    src={chatCompanion.avatar}
                    alt='person'
                  />
                </div>
                <div className={styles.text}>
                  <p className={styles.name}>{chatCompanion.firstName}</p>
                  <p className={styles.message}>
                    {conversation.messages[0]?.content}
                  </p>
                </div>
              </li>
            );
          })
        // <li className={styles.PplItem}>
        //   <div className={styles.photoContainer}>
        //     <img className={styles.photo} src={icon} alt='person' />
        //   </div>
        //   <div className={styles.text}>
        //     <p className={styles.name}>Julia</p>
        //     <p className={styles.message}>
        //       Hey man! Whats up? Waht you are doing! how are you
        //     </p>
        //   </div>
        // </li>
        // <li className={styles.PplItem}>
        //   <div className={styles.photoContainer}>
        //     <img className={styles.photo} src={icon} alt='person' />
        //   </div>
        //   <div className={styles.text}>
        //     <p className={styles.name}>Julia</p>
        //     <p className={styles.message}>
        //       Hey man! Whats up? Waht you are doing! how are you
        //     </p>
        //   </div>
        // </li>
        // <li className={styles.PplItem}>
        //   <div className={styles.photoContainer}>
        //     <img className={styles.photo} src={icon} alt='person' />
        //   </div>
        //   <div className={styles.text}>
        //     <p className={styles.name}>Julia</p>
        //     <p className={styles.message}>
        //       Hey man! Whats up? Waht you are doing! how are you
        //     </p>
        //   </div>
        // </li>
      }
      {isLoading && <Loader />}
    </ul>
  );
}

export default Messages;
