import styles from './About.module.scss';
import couples from '@/assets/about/couple.png';
import hands from '@/assets/about/hands.webp';

import { useEffect, useState } from 'react';
import { ConversationApi } from '@/api/services/ConversationApi';
import { UserApi } from '@/api/services/userApi';
import { MatchApi } from '@/api/services/matchApi';
import useScreenSize from '@/hooks/useScreenSize';
import Loader from '@/components/UI/Loader/Loader';
import BackButton from '@/components/BackButton/BackButton';

interface IStaticsData {
  users: number,
  matches: number,
  dialogs: number
}

function About() {
  const [isLoading, setIsLoading] = useState(false);
  const {width: screenWidth} = useScreenSize();
  const [statisticData, setStatisticData] = useState<IStaticsData>({
    users: 0,
    matches: 0,
    dialogs: 0
  });

  useEffect(() => {
    fetchStatisticData();
  }, []);

  async function fetchStatisticData(): Promise<void> {
    setIsLoading(true);
    

    try {
      const [users, matches, dialogs] = await Promise.all([
        UserApi.getAmount(),
        MatchApi.getAmount(),
        ConversationApi.getAmount(),
      ])

      const statisticData = {
        users,
        matches,
        dialogs
      };

      setStatisticData(statisticData);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      {screenWidth <= 900 && 
        <div className={styles.header}>
          <BackButton />
        </div>
      }

      <section className={styles.sectionOne}>
        <div className={styles.sectionOneIcon}>
          <img className={styles.image} src={hands} alt='hands together' />
        </div>
        <h2 className={styles.sectionOneTitle}>
          At the heart of the <br /> Finder.
        </h2>
      </section>
      <section className={styles.sectionTwo}>
        <div className={styles.textPart}>
          <p className={styles.headingTitle}>Our Values</p>
          <h2 className={styles.sectionTwoTitle}>
            Relationships are at the Core of Everything we do.
          </h2>
          <p className={styles.subtitle}>
            Finder is built on the belief that anyone looking for love should be
            able to find it. It’s also built on a pretty cool algorithm, so we
            can succeed in getting you out on promising dates, not keeping you
            on the app.
          </p>
        </div>
        <div className={styles.iconPart}>
          <img src={couples} alt='couples in love' />
        </div>
      </section>
      <section className={styles.sectionThree}>
        <h2 className={styles.sectionThreeTitle}>Counters</h2>
        <div className={styles.counters}>
          <div className={styles.counterBlock}>
            <p className={styles.amount}>{statisticData.users}</p>
            <p className={styles.amountTitle}>Users</p>
          </div>
          <div className={styles.counterBlock}>
            <p className={styles.amount}>{statisticData.matches}</p>
            <p className={styles.amountTitle}>Matches</p>
          </div>
          <div className={styles.counterBlock}>
            <p className={styles.amount}>{statisticData.dialogs}</p>
            <p className={styles.amountTitle}>Dialogs</p>
          </div>
        </div>
      </section>

      {isLoading && <Loader />}
    </div>
  );
}

export default About;
