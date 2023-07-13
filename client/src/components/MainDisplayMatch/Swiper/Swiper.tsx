import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import styles from './Swiper.module.scss';
import { AiFillHeart as HeartIcon } from 'react-icons/ai';
import { MdOutlineClose as DenyIcon } from 'react-icons/md';
import { TbRefresh as RefreshIcon } from 'react-icons/tb';
import { UserAPI } from '@/api/services/userAPI';
import { UserType } from '@/utils/types';
import { ageCalculate } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/UI/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Direction = 'left' | 'right' | 'up' | 'down';

function Swiper() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [childRefs, setChildRefs] = useState([]);
  const { isLoading, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: UserAPI.getUsers,
  });
  useEffect(() => {
    if (data) {
      setUsers(data);
      setCurrentIndex(data.length - 1);

      setChildRefs(
        Array(data.length)
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

  const swiped = (
    direction: Direction,
    nameToDelete: string,
    index: number
  ) => {
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
