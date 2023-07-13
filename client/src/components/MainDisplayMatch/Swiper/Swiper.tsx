import React, { useState, useMemo, useEffect, useContext } from 'react';
import TinderCard from 'react-tinder-card';
import styles from './Swiper.module.scss';
import { AiFillHeart as HeartIcon } from 'react-icons/ai';
import { MdOutlineClose as DenyIcon } from 'react-icons/md';
import { TbRefresh as RefreshIcon } from 'react-icons/tb';
import { UserAPI } from '@/api/services/userAPI';
import { MatchType, UserType } from '@/utils/types';
import { ageCalculate } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/UI/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '@/context/authProvider';
import { MatchAPI } from '@/api/services/matchApi';

type Direction = 'left' | 'right' | 'up' | 'down';

function Swiper() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [childRefs, setChildRefs] = useState([]);

  const { isLoading, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: UserAPI.getUsers,
  });

  const propertyGetter = <T,>(arr: T[], key: keyof T) => {
    return arr.map((user) => user[key]);
  };

  const usersFilter = (users: UserType[]) => {
    const dislikeEmails = propertyGetter<UserType>(user.disliking, 'email');
    const matchingEmails = propertyGetter<MatchType>(
      user.matching,
      'userAddressEmail'
    );

    return users.filter(
      ({ email }) =>
        !dislikeEmails.includes(email) && !matchingEmails.includes(email)
    );
  };

  useEffect(() => {
    if (data) {
      const filteredUsers = usersFilter(data);

      setUsers(filteredUsers);
      setCurrentIndex(filteredUsers.length - 1);

      setChildRefs(
        Array(filteredUsers.length)
          .fill(0)
          .map((i) => React.createRef())
      );
    }
  }, [data]);

  //Without react-query!!!
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await UserAPI.getUsers();
  //     const users = res.data;
  //     console.log('two');

  //     setUsers(users);
  //     setCurrentIndex(users.length);
  //   };

  //   fetchUsers().catch(console.log);
  // }, []);

  // const childRefs = useMemo<any>(
  //   () =>
  //     Array(users.length)
  //       .fill(0)
  //       .map((i) => React.createRef()),
  //   []
  // );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
  };

  const canGoBack = currentIndex < users.length - 1;
  const canSwipe = currentIndex >= 0;

  const likeHandler = async (sourceEmail: string) => {
    const match = user.matchedBy.find(
      (match) => match.userSourceEmail === sourceEmail
    );

    if (match) {
      await MatchAPI.update(match.id, true);
    } else {
      await MatchAPI.create(user.email, sourceEmail);
    }
  };

  const swiped = (dir: Direction, email: string, index: number) => {
    if (dir === 'right') {
      likeHandler(email);
    }

    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

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
    <div className={styles.person}>
      <div className={styles.cardContainer}>
        {users &&
          users.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className={styles.swipe}
              key={character.email}
              onSwipe={(dir) => swiped(dir, character.email, index)}
              preventSwipe={['up', 'down']}
              swipeRequirementType='position'
              swipeThreshold={50}
            >
              <div
                style={{ backgroundImage: 'url(' + character.avatar + ')' }}
                className={styles.card}
              >
                <div className={styles.cardInfo}>
                  <p className={styles.name}>
                    {character.firstName}{' '}
                    <span className={styles.age}>
                      {ageCalculate(new Date(character.birthday))}
                    </span>{' '}
                  </p>
                  <p className={styles.description}>{character.descriptrion}</p>
                  {/* <p className={styles.status}>Online now</p>
                  <p className={styles.location}>3km from you</p> */}
                </div>
              </div>
            </TinderCard>
          ))}
      </div>
      <div className={styles.panelControl}>
        <DenyIcon
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => swipe('left')}
          className={`${styles.reject} ${styles.button}`}
        />
        <RefreshIcon
          style={{ backgroundColor: !canGoBack && '#c3c4d3' }}
          onClick={() => goBack()}
          className={`${styles.star} ${styles.button}`}
        />
        <HeartIcon
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => swipe('right')}
          className={`${styles.heart} ${styles.button}`}
        />
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </div>
  );
}

export default Swiper;
