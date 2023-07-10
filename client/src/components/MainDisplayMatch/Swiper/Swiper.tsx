import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import styles from './Swiper.module.scss';
import { AiFillHeart as HeartIcon } from 'react-icons/ai';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';
import { TbRefresh as RefreshIcon } from 'react-icons/tb';
import { UserAPI } from '@/api/services/userAPI';
import { UserType } from '@/utils/types';
import { ageCalculate } from '@/pages/SignUp/signUpValidator';

type Direction = 'left' | 'right' | 'up' | 'down';

// const db = [
//   {
//     name: 'Richard Hendricks',
//     url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
//   {
//     name: 'Erlich Bachman',
//     url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
//   {
//     name: 'Monica Hall',
//     url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
//   {
//     name: 'Jared Dunn',
//     url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
//   {
//     name: 'Dinesh Chugtai',
//     url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
// ];

function Swiper() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(users.length - 1);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await UserAPI.getUsers();
      const users = res.data;

      setUsers(users);
      setCurrentIndex(users.length);
    };

    fetchUsers().catch(console.log);
  }, []);

  const childRefs = useMemo<any>(
    () =>
      Array(users.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

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

  return (
    <div className={styles.person}>
      <div className={styles.cardContainer}>
        {users &&
          users.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className={styles.swipe}
              key={character.email}
              onSwipe={(dir) => swiped(dir, character.firstName, index)}
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
        <CloseIcon
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
    </div>
  );
}

export default Swiper;
