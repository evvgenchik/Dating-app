import styles from './About.module.scss';
import hands from '../../assets/match/hands.webp';

function About() {
  return (
    <h1>
      {' '}
      <section className={styles.sectionOne}>
        <div>
          <img src={hands} alt='hands together' />
        </div>
      </section>
    </h1>
  );
}

export default About;
