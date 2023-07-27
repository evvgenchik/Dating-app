import styles from './About.module.scss';
import couples from '@/assets/about/couple.png';
import map from '@/assets/about/map.png';

function About() {
  return (
    <div className={styles.container}>
      <section className={styles.sectionOne}>
        <div className={styles.textPart}>
          <p className={styles.headingTitle}>Our Values</p>
          <h2 className={styles.sectionOneTitle}>
            Relantionships are at the Core of Everything we do.
          </h2>
          <p className={styles.subtitle}>
            Finder is built on the belief that anyone looking for love should be
            able to find it. It’s also built on a pretty cool algorithm, so we
            can succeed in getting you out on promising dates, not keeping you
            on the app.
          </p>
        </div>
        <div className={styles.IconPart}>
          <img src={couples} alt='couples in love' />
        </div>
      </section>
      <section className={styles.sectionTwo}>
        <h2 className={styles.sectionTwoTitle}>Counters</h2>
        <div className={styles.backgroundIcon} />
        {/* <img src={map} alt='map' /> */}
        <div className={styles.counters}>
          <div className={styles.counterBlock}>
            <p className={styles.amount}>12</p>
            <p className={styles.amountTitle}>Users</p>
          </div>
          <div className={styles.counterBlock}>
            <p className={styles.amount}>6</p>
            <p className={styles.amountTitle}>Matches</p>
          </div>
          <div className={styles.counterBlock}>
            <p className={styles.amount}>3</p>
            <p className={styles.amountTitle}>Dialogs</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
