import styles from "./ChatPersonInfo.module.scss";
import icon from "../../../../assets/signUp/girl.jpg";

function ChatPersonInfo() {
  return (
    <div className={styles.personInfoContainer}>
      <div className={styles.personInfo}>
        <div className={styles.photoContainer}>
          <img className={styles.photo} src={icon} alt="photo" />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>
            Alina <span className={styles.age}>22</span>
          </h2>
          <h2 className={styles.location}>Live in Moscow</h2>
          <h2 className={styles.distance}>400 km from you</h2>
        </div>
        <div className={styles.description}>
          Love books Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Dicta, repellendus? Sapiente eveniet officiis commodi, corporis vero
          debitis delectus nulla soluta explicabo fugit atque rem sequi totam ut
          magni ex dolores?
        </div>
      </div>
      <div className={styles.personInfoControls}>
        <button className={`${styles.personInfoBtn} ${styles.btnDelete}`}>
          REMOVE
        </button>
        <button className={styles.personInfoBtn}>COMPLAINT</button>
      </div>
    </div>
  );
}

export default ChatPersonInfo;
