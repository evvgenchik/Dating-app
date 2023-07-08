import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import styles from './Swiper.module.scss';
import { AiFillHeart as HeartIcon } from 'react-icons/ai';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';
import { TbRefresh as RefreshIcon } from 'react-icons/tb';

type Direction = 'left' | 'right' | 'up' | 'down';

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Erlich Bachman',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Monica Hall',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Jared Dunn',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
];

function Swiper() {
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);

  const childRefs = useMemo<any>(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (
    direction: Direction,
    nameToDelete: string,
    index: number
  ) => {
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
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
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={styles.swipe}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            preventSwipe={['up', 'down']}
            swipeRequirementType='position'
            swipeThreshold={50}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className={styles.card}
            >
              <div className={styles.cardInfo}>
                <p className={styles.name}>
                  {character.name} <span className={styles.age}>25</span>{' '}
                </p>
                <p className={styles.status}>Online now</p>
                <p className={styles.location}>3km from you</p>
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
