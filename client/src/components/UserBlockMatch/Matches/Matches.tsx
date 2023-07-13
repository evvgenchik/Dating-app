import { useQuery } from '@tanstack/react-query';
import styles from './Matches.module.scss';
import icon from '@/assets/signUp/girl.jpg';
import React, { useState, useMemo, useEffect, useContext } from 'react';
import TinderCard from 'react-tinder-card';
import { AiFillHeart as HeartIcon } from 'react-icons/ai';
import { MdOutlineClose as DenyIcon } from 'react-icons/md';
import { TbRefresh as RefreshIcon } from 'react-icons/tb';
import { UserAPI } from '@/api/services/userAPI';
import { MatchType, UserType } from '@/utils/types';
import { ageCalculate } from '@/utils/helper';
import Loader from '@/components/UI/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/authProvider';
import { MatchAPI } from '@/api/services/matchApi';

function Matches() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<UserType[]>([]);

  // const { isLoading, data, error } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: UserAPI.getUsers,
  // });

  // useEffect(() => {
  //   if (data) {
  //     const filteredUsers = usersFilter(data);

  //     setUsers(filteredUsers);
  //     setCurrentIndex(filteredUsers.length - 1);

  //     setChildRefs(
  //       Array(filteredUsers.length)
  //         .fill(0)
  //         .map((i) => React.createRef())
  //     );
  //   }
  // }, [data]);
  console.log(user);

  return (
    <ul className={styles.Ppllist}>
      {user.matching.map((match) => {
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

      {/* <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li>
      <li className={styles.PplItem}>
        <img className={styles.photo} src={icon} alt='person' />
        <span className={styles.name}>Julia</span>
      </li> */}
    </ul>
  );
}

export default Matches;
